package auth

import (
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/auth"
	"github.com/TeslaMode1X/PVH_order/internal/repo"
	"github.com/gofrs/uuid"
	"golang.org/x/net/context"
	"time"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) UserLogin(ctx context.Context, login auth.Login) (string, error) {
	const op = "repo.auth.LoginRepository"

	var storedPassword string
	var userID string
	var roleID int

	stmt, err := r.DB.PrepareContext(ctx, "SELECT id, role, password FROM users WHERE email = $1")
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return "", fmt.Errorf("%s: %w", op, repo.ErrUserNotFound)
		}
		return "", fmt.Errorf("%s: %w", op, err)
	}
	defer stmt.Close()

	err = stmt.QueryRowContext(ctx, login.Email).Scan(&userID, &roleID, &storedPassword)
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}

	hashedPassword := sha256.Sum256([]byte(login.Password))
	hashedPasswordHex := hex.EncodeToString(hashedPassword[:])

	if hashedPasswordHex != storedPassword {
		return "", fmt.Errorf("%s: %w", op, repo.ErrPasswordNotMatch)
	}

	return userID, nil
}

func (r *Repository) UserRegistration(ctx context.Context, registration auth.Registration) (string, error) {
	const op = "repo.auth.UserRegistration"

	id, err := uuid.NewV4()
	if err != nil {
		return "", fmt.Errorf("%s: failed to generate UUID: %w", op, err)
	}

	stmt, err := r.DB.PrepareContext(ctx, `
        INSERT INTO users (id, name, email, password, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
    `)
	if err != nil {
		return "", fmt.Errorf("%s: failed to prepare statement: %w", op, err)
	}
	defer stmt.Close()

	currentTime := time.Now()
	rfc1123zTime := currentTime.Format(time.RFC1123Z)

	_, err = stmt.ExecContext(ctx, id, registration.UserName, registration.Email, registration.Password, rfc1123zTime, rfc1123zTime)
	if err != nil {
		return "", fmt.Errorf("%s: failed to execute query: %w", op, err)
	}

	return id.String(), nil
}
