package user

import (
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/auth"
	"golang.org/x/net/context"
)

type Service struct {
	UserRepo interfaces.UserRepository
}

func (s *Service) GetUserByID(ctx context.Context, userID string) (*auth.User, error) {
	const op = "service.user.GetUserByID"

	user, err := s.UserRepo.FindUserByID(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return user, nil
}
