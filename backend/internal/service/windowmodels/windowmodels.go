package windowmodels

import (
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowmodels"
	"github.com/TeslaMode1X/PVH_order/internal/service/file"
	"github.com/TeslaMode1X/PVH_order/pkg/checker"
	"golang.org/x/net/context"
	"log/slog"
)

type Service struct {
	WindowRepo   interfaces.WindowModelRepository
	TypeRepo     interfaces.WindowTypesRepository
	MaterialRepo interfaces.MaterialRepository
	SystemRepo   interfaces.SystemsRepository
	FileSvc      interfaces.FileService
	Log          *slog.Logger
}

func (s *Service) GetAllWindowModelsService(ctx context.Context) ([]*windowmodels.Object, error) {
	const op = "service.windowmodels.GetAllWindowModelsService"

	windows, err := s.WindowRepo.GetAllWindowModelsRepository(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return windows, nil
}

func (s *Service) GetWindowModelByIDService(ctx context.Context, id string) (*windowmodels.Object, error) {
	const op = "service.windowmodels.GetWindowModelByIDService"

	window, err := s.WindowRepo.GetWindowModelByIDRepository(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return window, nil
}

func (s *Service) CreateWindowModelService(ctx context.Context, largeImageData, mediumImageData, smallImageData []byte, objectCreate windowmodels.ObjectCreation) error {
	const op = "service.windowmodels.CreateWindowModelService"

	largeImageType, err := checker.DetectImageType(largeImageData)
	if err != nil {
		return fmt.Errorf("%s: failed to detect large image type: %w", op, err)
	}

	mediumImageType, err := checker.DetectImageType(mediumImageData)
	if err != nil {
		return fmt.Errorf("%s: failed to detect medium image type: %w", op, err)
	}

	smallImageType, err := checker.DetectImageType(smallImageData)
	if err != nil {
		return fmt.Errorf("%s: failed to detect small image type: %w", op, err)
	}

	largeImagePath, err := s.FileSvc.UploadImage(largeImageData, largeImageType, file.FilePathWindowImages)
	if err != nil {
		return fmt.Errorf("%s: failed to upload large image: %w", op, err)
	}

	mediumImagePath, err := s.FileSvc.UploadImage(mediumImageData, mediumImageType, file.FilePathWindowImages)
	if err != nil {
		return fmt.Errorf("%s: failed to upload medium image: %w", op, err)
	}

	smallImagePath, err := s.FileSvc.UploadImage(smallImageData, smallImageType, file.FilePathWindowImages)
	if err != nil {
		return fmt.Errorf("%s: failed to upload small image: %w", op, err)
	}

	typeId, err := s.TypeRepo.GetWindowTypeIdByNameRepository(ctx, objectCreate.TypeID)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	materialId, err := s.MaterialRepo.GetMaterialIdByName(ctx, objectCreate.MaterialID)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	systemId, err := s.SystemRepo.GetSystemIdByNameRepository(ctx, objectCreate.SystemID)
	if err != nil {
		return fmt.Errorf("%s: failed to get system id: %w", op, err)
	}

	s.Log.Info("CreateWindowModelService", "typeId", typeId)
	s.Log.Info("CreateWindowModelService", "materialId", materialId)
	s.Log.Info("CreateWindowModelService", "systemId", systemId)
	s.Log.Info("CreateWindowModelService", "smallImagePath", smallImagePath)
	s.Log.Info("CreateWindowModelService", "mediumImagePath", mediumImagePath)
	s.Log.Info("CreateWindowModelService", "largeImagePath", largeImagePath)

	objectCreate.TypeID = typeId
	objectCreate.MaterialID = materialId
	objectCreate.SystemID = systemId

	err = s.WindowRepo.CreateWindowModelRepository(ctx, largeImagePath, mediumImagePath, smallImagePath, objectCreate)
	if err != nil {
		return fmt.Errorf("%s: failed to create window model in database: %w", op, err)
	}

	return nil
}

func (s *Service) UpdateWindowModelCharacteristicsService(ctx context.Context, id string, characteristics windowmodels.CharacteristicsUpdate) error {
	const op = "service.windowmodels.UpdateWindowModelCharacteristicsCheckerService"

	if characteristics.TypeID != "" {
		typeId, err := s.TypeRepo.GetWindowTypeIdByNameRepository(ctx, characteristics.TypeID)
		if err != nil {
			return fmt.Errorf("%s: %w", op, err)
		}
		characteristics.TypeID = typeId
	}

	if characteristics.MaterialID != "" {
		materialId, err := s.MaterialRepo.GetMaterialIdByName(ctx, characteristics.MaterialID)
		if err != nil {
			return fmt.Errorf("%s: %w", op, err)
		}
		characteristics.MaterialID = materialId
	}

	if characteristics.SystemID != "" {
		systemId, err := s.SystemRepo.GetSystemIdByNameRepository(ctx, characteristics.SystemID)
		if err != nil {
			return fmt.Errorf("%s: failed to get system id: %w", op, err)
		}
		characteristics.SystemID = systemId
	}

	err := s.WindowRepo.UpdateWindowModelCharacteristicsRepository(ctx, id, characteristics)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (s *Service) UpdateWindowModelCharacteristicsCheckerService(ctx context.Context, characteristics windowmodels.CharacteristicsUpdate) error {
	const op = "service.windowmodels.UpdateWindowModelCharacteristicsCheckerService"
	s.Log.Info("Characteristics in Service", characteristics)
	s.Log.Info("UpdateWindowModelCharacteristicsCheckerService", "characteristics", characteristics.Profile)

	if characteristics.Profile == "" {
		return fmt.Errorf("%s: no characteristics profile specified", op)
	}
	if len(characteristics.Executions) == 0 {
		return fmt.Errorf("%s: no characteristics executions specified", op)
	}
	if len(characteristics.SealColors) == 0 {
		return fmt.Errorf("%s: no characteristics seal_colors specified", op)
	}
	if len(characteristics.SealMaterial) == 0 {
		return fmt.Errorf("%s: no characteristics seal_material specified", op)
	}
	if characteristics.Chambers == "" {
		return fmt.Errorf("%s: no characteristics chambers specified", op)
	}
	if characteristics.GlassType == "" {
		return fmt.Errorf("%s: no characteristics glass_type specified", op)
	}
	if characteristics.Width <= 0 {
		return fmt.Errorf("%s: invalid characteristics width", op)
	}
	if characteristics.ThermalResistance <= 0 {
		return fmt.Errorf("%s: invalid characteristics thermal_resistance", op)
	}
	if characteristics.FalzHeight <= 0 {
		return fmt.Errorf("%s: invalid characteristics falz_height", op)
	}
	if characteristics.FrameSashHeight <= 0 {
		return fmt.Errorf("%s: invalid characteristics frame_sash_height", op)
	}

	return nil
}
