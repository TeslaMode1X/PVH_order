package interfaces

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/systems"
	"golang.org/x/net/context"
	"net/http"
)

type (
	SystemsRepository interface {
		GetAllSystemsRepository(ctx context.Context) ([]*systems.Object, error)
		GetSystemByIdRepository(ctx context.Context, id string) (*systems.Object, error)
		CreateSystemRepository(ctx context.Context, materialId string, creation systems.ObjectCreation) error
		UpdateSystemByIdRepository(ctx context.Context, id, materialId string, creation systems.ObjectCreation) error
		DeleteSystemByIdRepository(ctx context.Context, id string) error
	}
)

type (
	SystemsService interface {
		GetAllSystemsService(ctx context.Context) ([]*systems.Object, error)
		GetSystemByIdService(ctx context.Context, id string) (*systems.Object, error)
		CreateSystemService(ctx context.Context, creation systems.ObjectCreation) error
		UpdateSystemByIdService(ctx context.Context, id string, creation systems.ObjectCreation) error
		DeleteSystemByIdService(ctx context.Context, id string) error
	}
)

type (
	SystemsHandler interface {
		GetAllSystems(w http.ResponseWriter, r *http.Request)
		GetSystemById(w http.ResponseWriter, r *http.Request)
		CreateSystem(w http.ResponseWriter, r *http.Request)
		UpdateSystemById(w http.ResponseWriter, r *http.Request)
		DeleteSystemById(w http.ResponseWriter, r *http.Request)
	}
)
