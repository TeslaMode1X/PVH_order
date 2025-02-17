package auth

import (
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/auth"
	"github.com/TeslaMode1X/PVH_order/internal/service"
	"golang.org/x/net/context"
)

type Service struct {
	AuthRepo interfaces.AuthRepository
	UserRepo interfaces.UserRepository
}

func (s *Service) LoginService(ctx context.Context, login auth.Login) (string, error) {
	const op = "auth.service.LoginService"

	userExists, err := s.UserRepo.CheckUserExists(ctx, login.Email)
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}

	if !userExists {
		return "", fmt.Errorf("%s: %w", op, service.ErrUserNotFound)
	}

	userID, err := s.AuthRepo.UserLogin(ctx, login)
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}

	return userID, nil
}

func (s *Service) RegistrationService(ctx context.Context, registration auth.Registration) (string, error) {
	const op = "auth.service.RegistrationService"

	userExists, err := s.UserRepo.CheckUserExists(ctx, registration.Email)
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}

	if userExists {
		return "", fmt.Errorf("%s: %w", op, service.ErrUserAlreadyExists)
	}

	userID, err := s.AuthRepo.UserRegistration(ctx, registration)
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}

	userFound, err := s.UserRepo.FindUserByID(ctx, userID)
	if err != nil {
		return "", fmt.Errorf("%s: %w", op, err)
	}

	if userFound == nil {
		return "", fmt.Errorf("%s: %w", op, service.ErrUserNotFound)
	}

	return userID, nil
}
