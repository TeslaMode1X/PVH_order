package interfaces

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowmodels"
	"golang.org/x/net/context"
	"net/http"
)

type (
	WindowModelRepository interface {
		GetAllWindowModelsRepository(ctx context.Context) ([]*windowmodels.Object, error)
		GetWindowModelByIDRepository(ctx context.Context, id string) (*windowmodels.Object, error)
	}
)

type (
	WindowModelService interface {
		GetAllWindowModelsService(ctx context.Context) ([]*windowmodels.Object, error)
		GetWindowModelByIDService(ctx context.Context, id string) (*windowmodels.Object, error)
	}
)

type (
	WindowModelHandler interface {
		GetAllWindowModels(w http.ResponseWriter, r *http.Request)
		GetWindowModelByID(w http.ResponseWriter, r *http.Request)
	}
)
