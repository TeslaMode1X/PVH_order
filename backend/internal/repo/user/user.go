package user

import (
	"database/sql"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/auth"
	_ "github.com/lib/pq"
	"golang.org/x/net/context"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) CheckUserExists(ctx context.Context, email string) (bool, error) {
	const op = "repo.user.CheckUserExists"

	stmt, err := r.DB.PrepareContext(ctx, `SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)`)
	if err != nil {
		return false, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var exists bool
	err = stmt.QueryRowContext(ctx, email).Scan(&exists)
	if err != nil {
		return false, fmt.Errorf("%s: %w", op, err)
	}

	return exists, nil
}

func (r *Repository) FindUserByID(ctx context.Context, id string) (*auth.User, error) {
	const op = "repo.user.FindUserByID"

	stmt, err := r.DB.PrepareContext(ctx, `SELECT id, username, email, role FROM users WHERE id = $1`)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	var user auth.User
	err = stmt.QueryRowContext(ctx, id).Scan(&user.ID, &user.Name, &user.Email, &user.Role)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return &user, nil
}
