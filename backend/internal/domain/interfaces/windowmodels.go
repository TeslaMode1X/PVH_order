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
		CreateWindowModelRepository(ctx context.Context, largeImageData, mediumImageData, smallImageData string, objectCreate windowmodels.ObjectCreation) error
	}
)

type (
	WindowModelService interface {
		GetAllWindowModelsService(ctx context.Context) ([]*windowmodels.Object, error)
		GetWindowModelByIDService(ctx context.Context, id string) (*windowmodels.Object, error)
		CreateWindowModelService(ctx context.Context, largeImageData, mediumImageData, smallImageData []byte, objectCreate windowmodels.ObjectCreation) error
	}
)

type (
	WindowModelHandler interface {
		GetAllWindowModels(w http.ResponseWriter, r *http.Request)
		GetWindowModelByID(w http.ResponseWriter, r *http.Request)
		CreateWindowModel(w http.ResponseWriter, r *http.Request)
	}
)
