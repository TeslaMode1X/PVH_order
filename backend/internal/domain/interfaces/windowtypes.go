package interfaces

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowtypes"
	"golang.org/x/net/context"
	"net/http"
)

type (
	WindowTypesRepository interface {
		GetAllWindowTypesRepository(ctx context.Context) ([]*windowtypes.Object, error)
		GetWindowTypeByIdRepository(ctx context.Context, id string) (*windowtypes.Object, error)
		CreateWindowTypeRepository(ctx context.Context, creation windowtypes.ObjectCreation) error
		UpdateWindowTypeRepository(ctx context.Context, id string, creation windowtypes.ObjectCreation) error
		DeleteWindowTypeRepository(ctx context.Context, id string) error
	}
)

type (
	WindowTypesService interface {
		GetAllWindowTypesService(ctx context.Context) ([]*windowtypes.Object, error)
		GetWindowTypeByIdService(ctx context.Context, id string) (*windowtypes.Object, error)
		CreateWindowTypeService(ctx context.Context, creation windowtypes.ObjectCreation) error
		UpdateWindowTypeService(ctx context.Context, id string, creation windowtypes.ObjectCreation) error
		DeleteWindowTypeService(ctx context.Context, id string) error
	}
)

type (
	WindowTypesHandler interface {
		GetAllWindowTypes(w http.ResponseWriter, r *http.Request)
		GetWindowTypeById(w http.ResponseWriter, r *http.Request)
		CreateWindowType(w http.ResponseWriter, r *http.Request)
		UpdateWindowType(w http.ResponseWriter, r *http.Request)
		DeleteWindowType(w http.ResponseWriter, r *http.Request)
	}
)
