package systems

import (
	"errors"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/systems"
	"golang.org/x/net/context"
)

type Service struct {
	SystemRepo    interfaces.SystemsRepository
	MaterialsRepo interfaces.MaterialRepository
}

func (s *Service) GetAllSystemsService(ctx context.Context) ([]*systems.Object, error) {
	const op = "service.systems.GetAllSystemsService"

	systemsObj, err := s.SystemRepo.GetAllSystemsRepository(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return systemsObj, nil
}

func (s *Service) GetSystemByIdService(ctx context.Context, id string) (*systems.Object, error) {
	const op = "service.systems.GetSystemByIdService"

	systemObj, err := s.SystemRepo.GetSystemByIdRepository(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return systemObj, err
}

func (s *Service) CreateSystemService(ctx context.Context, creation systems.ObjectCreation) error {
	const op = "service.systems.CreateSystemService"

	exists, err := s.MaterialsRepo.MaterialExistsByName(ctx, creation.MaterialName)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if !exists {
		return fmt.Errorf("%s: %w", op, errors.New("material does not exist"))
	}

	materialId, err := s.MaterialsRepo.GetMaterialIdByName(ctx, creation.MaterialName)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	err = s.SystemRepo.CreateSystemRepository(ctx, materialId, creation)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (s *Service) UpdateSystemByIdService(ctx context.Context, id string, creation systems.ObjectCreation) error {
	const op = "service.systems.UpdateSystemByIdService"

	exists, err := s.MaterialsRepo.MaterialExistsByName(ctx, creation.MaterialName)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if !exists {
		return fmt.Errorf("%s: %w", op, errors.New("material does not exist"))
	}

	materialId, err := s.MaterialsRepo.GetMaterialIdByName(ctx, creation.MaterialName)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	err = s.SystemRepo.UpdateSystemByIdRepository(ctx, id, materialId, creation)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (s *Service) DeleteSystemByIdService(ctx context.Context, id string) error {
	const op = "service.systems.DeleteSystemByIdService"

	err := s.SystemRepo.DeleteSystemByIdRepository(ctx, id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
