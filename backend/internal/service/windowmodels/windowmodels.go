package windowmodels

import (
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowmodels"
	"golang.org/x/net/context"
)

type Service struct {
	Repo interfaces.WindowModelRepository
}

func (s *Service) GetAllWindowModelsService(ctx context.Context) ([]*windowmodels.Object, error) {
	const op = "service.windowmodels.GetAllWindowModelsService"

	windows, err := s.Repo.GetAllWindowModelsRepository(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return windows, nil
}

func (s *Service) GetWindowModelByIDService(ctx context.Context, id string) (*windowmodels.Object, error) {
	const op = "service.windowmodels.GetWindowModelByIDService"

	window, err := s.Repo.GetWindowModelByIDRepository(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return window, nil
}
