package materials

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/materials"
	"github.com/gofrs/uuid"
	"golang.org/x/net/context"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) GetAllMaterialsRepository(ctx context.Context) ([]*materials.Object, error) {
	const op = "repo.materials.GetAllMaterialsRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id, name from materials")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var materialsObject []*materials.Object

	rows, err := stmt.QueryContext(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	for rows.Next() {
		var materialObj materials.Object
		err = rows.Scan(&materialObj.ID, &materialObj.Name)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", op, err)
		}
		materialsObject = append(materialsObject, &materialObj)
	}

	return materialsObject, nil
}

func (r *Repository) GetMaterialByIdRepository(ctx context.Context, id string) (*materials.Object, error) {
	const op = "repo.materials.GetMaterialByIdRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id, name from materials WHERE id = $1")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var materialObj materials.Object

	err = stmt.QueryRowContext(ctx, id).Scan(&materialObj.ID, &materialObj.Name)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return &materialObj, nil
}

func (r *Repository) CreateMaterialRepository(ctx context.Context, materialName materials.Create) error {
	const op = "repo.materials.CreateMaterialRepository"

	id, _ := uuid.NewV4()

	stmt, err := r.DB.PrepareContext(ctx, "INSERT INTO materials (name, id) VALUES ($1, $2)")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, materialName.Name, id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (r *Repository) UpdateMaterialByIdRepository(ctx context.Context, updatedMaterial *materials.Object) error {
	const op = "repo.materials.UpdateMaterialByIdRepository"

	stmt, err := r.DB.PrepareContext(ctx, "UPDATE materials SET name = $1 WHERE id = $2")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, updatedMaterial.Name, updatedMaterial.ID)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (r *Repository) DeleteMaterialByIdRepository(ctx context.Context, id string) error {
	const op = "repo.materials.DeleteMaterialByIdRepository"

	stmt, err := r.DB.PrepareContext(ctx, "DELETE FROM materials WHERE id = $1")
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

func (r *Repository) MaterialExistsByName(ctx context.Context, name string) (bool, error) {
	const op = "repo.materials.MaterialExistsByName"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT EXISTS (SELECT 1 FROM materials WHERE name = $1)")
	if err != nil {
		return false, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var exists bool
	err = stmt.QueryRowContext(ctx, name).Scan(&exists)
	if err != nil {
		return false, fmt.Errorf("%s: %w", op, err)
	}

	return exists, nil
}

func (r *Repository) GetMaterialIdByName(ctx context.Context, name string) (string, error) {
	const op = "repo.materials.GetMaterialIdByName"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id FROM materials WHERE name = $1")
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var materialID string
	err = stmt.QueryRowContext(ctx, name).Scan(&materialID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return "", fmt.Errorf("%s: %w", op, errors.New("material doesn't exist"))
		}
		return "", fmt.Errorf("%s: %w", op, err)
	}

	return materialID, nil
}
