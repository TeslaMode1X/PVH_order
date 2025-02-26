package systems

import (
	"database/sql"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/systems"
	"github.com/gofrs/uuid"
	"golang.org/x/net/context"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) GetAllSystemsRepository(ctx context.Context) ([]*systems.Object, error) {
	const op = "repository.systems.GetAllSystemsRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT s.id, s.name, m.name FROM systems s JOIN materials m ON s.material_id = m.id")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var systemsObj []*systems.Object

	rows, err := stmt.QueryContext(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer rows.Close()

	for rows.Next() {
		var systemObj systems.Object
		err = rows.Scan(&systemObj.ID, &systemObj.Name, &systemObj.MaterialName)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", op, err)
		}
		systemsObj = append(systemsObj, &systemObj)
	}

	return systemsObj, nil
}

func (r *Repository) GetSystemByIdRepository(ctx context.Context, id string) (*systems.Object, error) {
	const op = "repository.systems.GetSystemByIdRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT s.id, s.name, m.name FROM systems s JOIN materials m ON s.material_id = m.id WHERE s.id = $1")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var systemObj systems.Object

	err = stmt.QueryRowContext(ctx, id).Scan(&systemObj.ID, &systemObj.Name, &systemObj.MaterialName)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return &systemObj, nil
}

func (r *Repository) CreateSystemRepository(ctx context.Context, materialId string, creation systems.ObjectCreation) error {
	const op = "repository.systems.CreateSystemRepository"

	id, _ := uuid.NewV4()

	stmt, err := r.DB.PrepareContext(ctx, "INSERT INTO systems (id, name, material_id) VALUES ($1, $2, $3)")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, id, creation.Name, materialId)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (r *Repository) UpdateSystemByIdRepository(ctx context.Context, id, materialId string, creation systems.ObjectCreation) error {
	const op = "repository.systems.UpdateSystemByIdRepository"

	stmt, err := r.DB.PrepareContext(ctx, "UPDATE systems SET name = $1, material_id = $2 WHERE id = $3")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, creation.Name, materialId, id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (r *Repository) DeleteSystemByIdRepository(ctx context.Context, id string) error {
	const op = "repository.systems.DeleteSystemByIdRepository"

	stmt, err := r.DB.PrepareContext(ctx, "DELETE FROM systems WHERE id = $1")
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
