package systems

import (
	"database/sql"
	systemsHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/systems"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	systemsRepo "github.com/TeslaMode1X/PVH_order/internal/repo/systems"
	systemsSvc "github.com/TeslaMode1X/PVH_order/internal/service/systems"
	"github.com/google/wire"
	"log/slog"
	"sync"
)

var (
	hdl     *systemsHdl.Handler
	hdlOnce sync.Once

	svc     *systemsSvc.Service
	svcOnce sync.Once

	repo     *systemsRepo.Repository
	repoOnce sync.Once
)

var ProviderSet = wire.NewSet(
	ProvideSystemsHandler,
	ProvideSystemsService,
	ProvideSystemsRepository,

	wire.Bind(new(interfaces.SystemsHandler), new(*systemsHdl.Handler)),
	wire.Bind(new(interfaces.SystemsService), new(*systemsSvc.Service)),
	wire.Bind(new(interfaces.SystemsRepository), new(*systemsRepo.Repository)),
)

func ProvideSystemsHandler(svc interfaces.SystemsService, log *slog.Logger) *systemsHdl.Handler {
	hdlOnce.Do(func() {
		hdl = &systemsHdl.Handler{
			Svc: svc,
			Log: log,
		}
	})

	return hdl
}

func ProvideSystemsService(systemRepo interfaces.SystemsRepository, materialRepo interfaces.MaterialRepository) *systemsSvc.Service {
	svcOnce.Do(func() {
		svc = &systemsSvc.Service{
			SystemRepo:    systemRepo,
			MaterialsRepo: materialRepo,
		}
	})

	return svc
}

func ProvideSystemsRepository(db *sql.DB) *systemsRepo.Repository {
	repoOnce.Do(func() {
		repo = &systemsRepo.Repository{
			DB: db,
		}
	})

	return repo
}
