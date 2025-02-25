package materials

import (
	"database/sql"
	materialsHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/materials"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	materialsRepo "github.com/TeslaMode1X/PVH_order/internal/repo/materials"
	materialsSvc "github.com/TeslaMode1X/PVH_order/internal/service/materials"
	"github.com/google/wire"
	"log/slog"
	"sync"
)

var (
	hdl     *materialsHdl.Handler
	hdlOnce sync.Once

	svc     *materialsSvc.Service
	svcOnce sync.Once

	repo     *materialsRepo.Repository
	repoOnce sync.Once
)

var ProviderSet = wire.NewSet(
	ProvideMaterialHandler,
	ProvideMaterialService,
	ProvideMaterialRepository,

	wire.Bind(new(interfaces.MaterialHandler), new(*materialsHdl.Handler)),
	wire.Bind(new(interfaces.MaterialService), new(*materialsSvc.Service)),
	wire.Bind(new(interfaces.MaterialRepository), new(*materialsRepo.Repository)),
)

func ProvideMaterialHandler(svc interfaces.MaterialService, log *slog.Logger) *materialsHdl.Handler {
	hdlOnce.Do(func() {
		hdl = &materialsHdl.Handler{
			Svc: svc,
			Log: log,
		}
	})

	return hdl
}

func ProvideMaterialService(authRepo interfaces.MaterialRepository) *materialsSvc.Service {
	svcOnce.Do(func() {
		svc = &materialsSvc.Service{
			Repo: authRepo,
		}
	})

	return svc
}

func ProvideMaterialRepository(db *sql.DB) *materialsRepo.Repository {
	repoOnce.Do(func() {
		repo = &materialsRepo.Repository{
			DB: db,
		}
	})

	return repo
}
