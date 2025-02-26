package windowmodels

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowmodels"
	"golang.org/x/net/context"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) GetAllWindowModelsRepository(ctx context.Context) ([]*windowmodels.Object, error) {
	const op = "repository.windowmodels.GetAllWindowModelsRepository"

	query := `
		SELECT wm.id, wm.name, 
		       wt.name as type_name, 
		       m.name as material_name, 
		       s.name as system_name, 
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
		       wt.name as type_name, 
		       m.name as material_name, 
		       s.name as system_name, 
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
