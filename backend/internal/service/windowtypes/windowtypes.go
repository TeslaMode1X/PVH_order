package windowtypes

import (
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowtypes"
	"golang.org/x/net/context"
)

type Service struct {
	Repo interfaces.WindowTypesRepository
}

func (s *Service) GetAllWindowTypesService(ctx context.Context) ([]*windowtypes.Object, error) {
	const op = "service.windowtypes.GetAllWindowTypesService"

	windows, err := s.Repo.GetAllWindowTypesRepository(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return windows, nil
}

func (s *Service) GetWindowTypeByIdService(ctx context.Context, id string) (*windowtypes.Object, error) {
	const op = "service.windowtypes.GetWindowTypeByIdService"

	window, err := s.Repo.GetWindowTypeByIdRepository(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return window, nil
}

func (s *Service) CreateWindowTypeService(ctx context.Context, creation windowtypes.ObjectCreation) error {
	const op = "service.windowtypes.CreateWindowTypeService"

	err := s.Repo.CreateWindowTypeRepository(ctx, creation)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (s *Service) UpdateWindowTypeService(ctx context.Context, id string, creation windowtypes.ObjectCreation) error {
	const op = "service.windowtypes.UpdateWindowTypeService"

	err := s.Repo.UpdateWindowTypeRepository(ctx, id, creation)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (s *Service) DeleteWindowTypeService(ctx context.Context, id string) error {
	const op = "service.windowtypes.DeleteWindowTypeService"

	err := s.Repo.DeleteWindowTypeRepository(ctx, id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
