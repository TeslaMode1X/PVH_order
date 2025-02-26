package windowmodels

import (
	"database/sql"
	windowHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/windowmodels"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	windowRepo "github.com/TeslaMode1X/PVH_order/internal/repo/windowmodels"
	windowSvc "github.com/TeslaMode1X/PVH_order/internal/service/windowmodels"
	"github.com/google/wire"
	"log/slog"
	"sync"
)

var (
	hdl     *windowHdl.Handler
	hdlOnce sync.Once

	svc     *windowSvc.Service
	svcOnce sync.Once

	repo     *windowRepo.Repository
	repoOnce sync.Once
)

var ProviderSet = wire.NewSet(
	ProvideWindowHandler,
	ProvideWindowService,
	ProvideWindowRepository,

	wire.Bind(new(interfaces.WindowModelHandler), new(*windowHdl.Handler)),
	wire.Bind(new(interfaces.WindowModelService), new(*windowSvc.Service)),
	wire.Bind(new(interfaces.WindowModelRepository), new(*windowRepo.Repository)),
)

func ProvideWindowHandler(svc interfaces.WindowModelService, log *slog.Logger) *windowHdl.Handler {
	hdlOnce.Do(func() {
		hdl = &windowHdl.Handler{
			Svc: svc,
			Log: log,
		}
	})

	return hdl
}

func ProvideWindowService(repo interfaces.WindowModelRepository) *windowSvc.Service {
	svcOnce.Do(func() {
		svc = &windowSvc.Service{
			Repo: repo,
		}
	})

	return svc
}

func ProvideWindowRepository(db *sql.DB) *windowRepo.Repository {
	repoOnce.Do(func() {
		repo = &windowRepo.Repository{
			DB: db,
		}
	})

	return repo
}
