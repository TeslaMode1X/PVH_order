package windowmodels

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowmodels"
	"github.com/gofrs/uuid"
	"golang.org/x/net/context"
	"time"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) GetAllWindowModelsRepository(ctx context.Context) ([]*windowmodels.Object, error) {
	const op = "repository.windowmodels.GetAllWindowModelsRepository"

	query := `
		SELECT wm.id, wm.name, 
			   wt.id as type_id,     
			   m.id as material_id,  
			   s.id as system_id,    
			   wm.image_large,
			   wm.image_medium,
			   wm.image_small,
			   wm.characteristics
		FROM window_models wm
		JOIN window_types wt ON wm.type_id = wt.id
		JOIN materials m ON wm.material_id = m.id
		JOIN systems s ON wm.system_id = s.id
	`

	rows, err := r.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer rows.Close()

	var models []*windowmodels.Object

	for rows.Next() {
		var model windowmodels.Object
		var characteristicsJSON []byte

		err := rows.Scan(
			&model.ID,
			&model.Name,
			&model.TypeID,
			&model.MaterialID,
			&model.SystemID,
			&model.LargeImagePath,
			&model.MediumImagePath,
			&model.SmallImagePath,
			&characteristicsJSON,
		)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", op, err)
		}

		if err := json.Unmarshal(characteristicsJSON, &model.Characteristics); err != nil {
			return nil, fmt.Errorf("%s: failed to unmarshal characteristics: %w", op, err)
		}

		models = append(models, &model)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return models, nil
}

func (r *Repository) GetWindowModelByIDRepository(ctx context.Context, id string) (*windowmodels.Object, error) {
	const op = "repository.windowmodels.GetWindowModelByIDRepository"

	query := `
		SELECT wm.id, wm.name, 
			   wt.id as type_id,     
			   m.id as material_id, 
			   s.id as system_id,   
			   wm.image_large,
			   wm.image_medium,
			   wm.image_small,
			   wm.characteristics
		FROM window_models wm
		JOIN window_types wt ON wm.type_id = wt.id
		JOIN materials m ON wm.material_id = m.id
		JOIN systems s ON wm.system_id = s.id
		WHERE wm.id = $1
	`

	stmt, err := r.DB.PrepareContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var model windowmodels.Object
	var characteristicsJSON []byte

	err = stmt.QueryRowContext(ctx, id).Scan(
		&model.ID,
		&model.Name,
		&model.TypeID,
		&model.MaterialID,
		&model.SystemID,
		&model.LargeImagePath,
		&model.MediumImagePath,
		&model.SmallImagePath,
		&characteristicsJSON,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, fmt.Errorf("%s: %w", op, errors.New("no window model found"))
		}
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	if err := json.Unmarshal(characteristicsJSON, &model.Characteristics); err != nil {
		return nil, fmt.Errorf("%s: failed to unmarshal characteristics: %w", op, err)
	}

	return &model, nil
}

func (r *Repository) CreateWindowModelRepository(ctx context.Context, largeImagePath, mediumImagePath, smallImagePath string, objectCreate windowmodels.ObjectCreation) error {
	const op = "repository.windowmodels.CreateWindowModelRepository"

	id, _ := uuid.NewV4()

	query := `
		INSERT INTO window_models (
			id,
			name, 
			type_id, 
			material_id, 
			system_id, 
			image_large, 
			image_medium, 
			image_small, 
			characteristics,
			created_at,
			updated_at
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
		) RETURNING id
	`

	stmt, err := r.DB.PrepareContext(ctx, query)
	if err != nil {
		return fmt.Errorf("%s: failed to prepare statement: %w", op, err)
	}
	defer stmt.Close()

	var windowModelID uuid.UUID

	characteristicsJSON, err := json.Marshal(objectCreate.Characteristics)
	if err != nil {
		return fmt.Errorf("%s: failed to marshal characteristics to JSON: %w", op, err)
	}

	err = stmt.QueryRowContext(
		ctx,
		id,
		objectCreate.Name,
		objectCreate.TypeID,
		objectCreate.MaterialID,
		objectCreate.SystemID,
		largeImagePath,
		mediumImagePath,
		smallImagePath,
		characteristicsJSON,
		time.Now(),
		time.Now(),
	).Scan(&windowModelID)

	if err != nil {
		return fmt.Errorf("%s: failed to execute query: %w", op, err)
	}

	return nil
}

func (r *Repository) UpdateWindowModelCharacteristicsRepository(ctx context.Context, id string, characteristics windowmodels.CharacteristicsUpdate) error {
	const op = "repository.windowmodels.UpdateWindowModelCharacteristicsRepository"

	characteristicsData := windowmodels.Characteristics{
		Profile:           characteristics.Profile,
		Executions:        characteristics.Executions,
		SealColors:        characteristics.SealColors,
		SealMaterial:      characteristics.SealMaterial,
		Chambers:          characteristics.Chambers,
		GlassType:         characteristics.GlassType,
		Width:             characteristics.Width,
		ThermalResistance: characteristics.ThermalResistance,
		FalzHeight:        characteristics.FalzHeight,
		FrameSashHeight:   characteristics.FrameSashHeight,
	}

	characteristicsJSON, err := json.Marshal(characteristicsData)
	if err != nil {
		return fmt.Errorf("%s: failed to marshal characteristics to JSON: %w", op, err)
	}

	query := `
		UPDATE window_models 
		SET 
			name = COALESCE(NULLIF($1, ''), name),
			type_id = COALESCE(NULLIF($2::UUID, NULL), type_id),
			material_id = COALESCE(NULLIF($3::UUID, NULL), material_id),
			system_id = COALESCE(NULLIF($4::UUID, NULL), system_id),
			characteristics = $5,
			updated_at = CURRENT_TIMESTAMP
		WHERE id = $6::UUID;
	`

	_, err = r.DB.ExecContext(ctx, query,
		characteristics.Name,
		characteristics.TypeID,
		characteristics.MaterialID,
		characteristics.SystemID,
		characteristicsJSON,
		id,
	)
	if err != nil {
		return fmt.Errorf("%s: failed to update window model characteristics: %w", op, err)
	}

	return nil
}

func (r *Repository) DeleteWindowModelRepository(ctx context.Context, id string) error {
	const op = "repository.windowmodels.DeleteWindowModelRepository"

	stmt, err := r.DB.PrepareContext(ctx, "DELETE FROM window_models WHERE id = $1")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
