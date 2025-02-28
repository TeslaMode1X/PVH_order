package interfaces

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/application"
	"golang.org/x/net/context"
	"net/http"
)

type (
	ApplicationRepository interface {
		GetAllApplicationsRepository(ctx context.Context) ([]*application.Object, error)
		GetApplicationByIdRepository(ctx context.Context, id string) (*application.Object, error)
		CreateApplicationRepository(ctx context.Context, creation application.Create) error
		DeleteApplicationRepository(ctx context.Context, id string) error
	}
)

type (
	ApplicationService interface {
		GetAllApplicationsService(ctx context.Context) ([]*application.Object, error)
		GetApplicationByIdService(ctx context.Context, id string) (*application.Object, error)
		CreateApplicationService(ctx context.Context, creation application.Create) error
		DeleteApplicationService(ctx context.Context, id string) error
	}
)

type (
	ApplicationHandler interface {
		GetAllApplications(w http.ResponseWriter, r *http.Request)
		GetApplicationById(w http.ResponseWriter, r *http.Request)
		CreateApplication(w http.ResponseWriter, r *http.Request)
		DeleteApplication(w http.ResponseWriter, r *http.Request)
	}
)
