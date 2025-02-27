package windowtypes

import (
	"database/sql"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowtypes"
	"github.com/gofrs/uuid"
	"golang.org/x/net/context"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) GetAllWindowTypesRepository(ctx context.Context) ([]*windowtypes.Object, error) {
	const op = "repository.windowtypes.GetAllWindowTypesRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id, name, description FROM window_types")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var windows []*windowtypes.Object

	rows, err := stmt.QueryContext(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	for rows.Next() {
		var window windowtypes.Object

		err = rows.Scan(&window.ID, &window.Name, &window.Description)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", op, err)
		}
		windows = append(windows, &window)
	}

	return windows, nil
}

func (r *Repository) GetWindowTypeByIdRepository(ctx context.Context, id string) (*windowtypes.Object, error) {
	const op = "repository.windowtypes.GetWindowTypeByIdRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id, name, description FROM window_types where id = $1")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var window windowtypes.Object
	err = stmt.QueryRowContext(ctx, id).Scan(&window.ID, &window.Name, &window.Description)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return &window, nil
}

func (r *Repository) GetWindowTypeIdByNameRepository(ctx context.Context, name string) (string, error) {
	const op = "repository.windowtypes.GetWindowTypeIdByNameRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id FROM window_types where name = $1")
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var id string
	err = stmt.QueryRowContext(ctx, name).Scan(&id)
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}

	return id, nil
}

func (r *Repository) CreateWindowTypeRepository(ctx context.Context, creation windowtypes.ObjectCreation) error {
	const op = "repository.windowtypes.CreateWindowTypeRepository"

	id, _ := uuid.NewV4()

	stmt, err := r.DB.PrepareContext(ctx, "INSERT INTO window_types (id, name, description) VALUES ($1, $2, $3)")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(id, creation.Name, creation.Description)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (r *Repository) UpdateWindowTypeRepository(ctx context.Context, id string, creation windowtypes.ObjectCreation) error {
	const op = "repository.windowtypes.UpdateWindowTypeRepository"

	stmt, err := r.DB.PrepareContext(ctx, "UPDATE window_types SET name = $1, description = $2 WHERE id = $3")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(creation.Name, creation.Description, id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (r *Repository) DeleteWindowTypeRepository(ctx context.Context, id string) error {
	const op = "repository.windowtypes.DeleteWindowTypeRepository"

	stmt, err := r.DB.PrepareContext(ctx, "DELETE FROM window_types WHERE id = $1")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
