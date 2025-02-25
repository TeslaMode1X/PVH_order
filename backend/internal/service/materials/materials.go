package materials

import (
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/materials"
	"golang.org/x/net/context"
)

type Service struct {
	Repo interfaces.MaterialRepository
}

func (s *Service) GetAllMaterialsService(ctx context.Context) ([]*materials.Object, error) {
	const op = "service.materials.GetAllMaterialsService"

	materialsObj, err := s.Repo.GetAllMaterialsRepository(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return materialsObj, nil
}

func (s *Service) GetMaterialByIdService(ctx context.Context, id string) (*materials.Object, error) {
	const op = "service.materials.GetMaterialByIdService"

	material, err := s.Repo.GetMaterialByIdRepository(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return material, nil
}

func (s *Service) CreateMaterialService(ctx context.Context, materialName materials.Create) error {
	const op = "service.materials.CreateMaterialService"

	err := s.Repo.CreateMaterialRepository(ctx, materialName)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (s *Service) UpdateMaterialByIdService(ctx context.Context, updatedMaterial *materials.Object) error {
	const op = "service.materials.UpdateMaterialByIdService"

	err := s.Repo.UpdateMaterialByIdRepository(ctx, updatedMaterial)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (s *Service) DeleteMaterialByIdService(ctx context.Context, id string) error {
	const op = "service.materials.DeleteMaterialByIdService"

	err := s.Repo.DeleteMaterialByIdRepository(ctx, id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
