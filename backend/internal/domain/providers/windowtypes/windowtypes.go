package windowtypes

import (
	"database/sql"
	windowHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/windowtypes"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	windowRepo "github.com/TeslaMode1X/PVH_order/internal/repo/windowtypes"
	windowSvc "github.com/TeslaMode1X/PVH_order/internal/service/windowtypes"
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

	wire.Bind(new(interfaces.WindowTypesHandler), new(*windowHdl.Handler)),
	wire.Bind(new(interfaces.WindowTypesService), new(*windowSvc.Service)),
	wire.Bind(new(interfaces.WindowTypesRepository), new(*windowRepo.Repository)),
)

func ProvideWindowHandler(svc interfaces.WindowTypesService, log *slog.Logger) *windowHdl.Handler {
	hdlOnce.Do(func() {
		hdl = &windowHdl.Handler{
			Svc: svc,
			Log: log,
		}
	})

	return hdl
}

func ProvideWindowService(repo interfaces.WindowTypesRepository) *windowSvc.Service {
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
