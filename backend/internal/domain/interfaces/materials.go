package interfaces

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/materials"
	"golang.org/x/net/context"
	"net/http"
)

type (
	MaterialRepository interface {
		GetAllMaterialsRepository(ctx context.Context) ([]*materials.Object, error)
		GetMaterialByIdRepository(ctx context.Context, id string) (*materials.Object, error)
		CreateMaterialRepository(ctx context.Context, materialName materials.Create) error
		UpdateMaterialByIdRepository(ctx context.Context, updatedMaterial *materials.Object) error
		DeleteMaterialByIdRepository(ctx context.Context, id string) error
		MaterialExistsByName(ctx context.Context, name string) (bool, error)
		GetMaterialIdByName(ctx context.Context, name string) (string, error)
	}
)

type (
	MaterialService interface {
		GetAllMaterialsService(ctx context.Context) ([]*materials.Object, error)
		GetMaterialByIdService(ctx context.Context, id string) (*materials.Object, error)
		CreateMaterialService(ctx context.Context, materialName materials.Create) error
		UpdateMaterialByIdService(ctx context.Context, updatedMaterial *materials.Object) error
		DeleteMaterialByIdService(ctx context.Context, id string) error
	}
)

type (
	MaterialHandler interface {
		GetAllMaterials(w http.ResponseWriter, r *http.Request)
		GetMaterialById(w http.ResponseWriter, r *http.Request)
		CreateMaterial(w http.ResponseWriter, r *http.Request)
		UpdateMaterialById(w http.ResponseWriter, r *http.Request)
		DeleteMaterialById(w http.ResponseWriter, r *http.Request)
	}
)
