package application

import (
	"database/sql"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/application"
	"github.com/gofrs/uuid"
	"golang.org/x/net/context"
	"time"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) GetAllApplicationsRepository(ctx context.Context) ([]*application.Object, error) {
	const op = "repository.application.GetAllApplicationsRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id, name, phone_number from applications")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var applications []*application.Object

	rows, err := stmt.QueryContext(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	for rows.Next() {
		var applicationObject application.Object

		if err := rows.Scan(&applicationObject.ID, &applicationObject.Name, &applicationObject.PhoneNumber); err != nil {
			return nil, fmt.Errorf("%s: %w", op, err)
		}
		applications = append(applications, &applicationObject)
	}

	return applications, nil
}

func (r *Repository) GetApplicationByIdRepository(ctx context.Context, id string) (*application.Object, error) {
	const op = "repository.application.GetApplicationByIdRepository"

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id, name, phone_number from applications where id = $1")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var applicationObject application.Object

	if err := stmt.QueryRowContext(ctx, id).Scan(&applicationObject.ID, &applicationObject.Name, &applicationObject.PhoneNumber); err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return &applicationObject, nil
}

func (r *Repository) CreateApplicationRepository(ctx context.Context, creation application.Create) error {
	const op = "repository.application.CreateApplicationRepository"

	id, _ := uuid.NewV4()

	stmt, err := r.DB.PrepareContext(ctx, "INSERT INTO applications (id, name, phone_number, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, id, creation.Name, creation.PhoneNumber, time.Now(), time.Now())
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (r *Repository) DeleteApplicationRepository(ctx context.Context, id string) error {
	const op = "repository.application.DeleteApplicationRepository"

	stmt, err := r.DB.PrepareContext(ctx, "DELETE FROM applications WHERE id = $1")
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	if _, err := stmt.ExecContext(ctx, id); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
