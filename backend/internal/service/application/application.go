package application

import (
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/application"
	"golang.org/x/net/context"
)

type Service struct {
	Repo interfaces.ApplicationRepository
}

func (s *Service) GetAllApplicationsService(ctx context.Context) ([]*application.Object, error) {
	const op = "service.application.GetAllApplicationsService"

	applications, err := s.Repo.GetAllApplicationsRepository(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return applications, nil
}

func (s *Service) GetApplicationByIdService(ctx context.Context, id string) (*application.Object, error) {
	const op = "service.application.GetApplicationByIdService"

	applicationObject, err := s.Repo.GetApplicationByIdRepository(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return applicationObject, nil
}

func (s *Service) CreateApplicationService(ctx context.Context, creation application.Create) error {
	const op = "service.application.CreateApplicationService"

	err := s.Repo.CreateApplicationRepository(ctx, creation)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (s *Service) DeleteApplicationService(ctx context.Context, id string) error {
	const op = "service.application.DeleteApplicationService"

	err := s.Repo.DeleteApplicationRepository(ctx, id)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
