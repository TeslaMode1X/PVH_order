package auth

import (
	"database/sql"
	applHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/application"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	applRepo "github.com/TeslaMode1X/PVH_order/internal/repo/application"
	applSvc "github.com/TeslaMode1X/PVH_order/internal/service/application"
	"github.com/google/wire"
	"log/slog"
	"sync"
)

var (
	hdl     *applHdl.Handler
	hdlOnce sync.Once

	svc     *applSvc.Service
	svcOnce sync.Once

	repo     *applRepo.Repository
	repoOnce sync.Once
)

var ProviderSet = wire.NewSet(
	ProvideApplicationHandler,
	ProvideApplicatonService,
	ProvideApplicationRepository,

	wire.Bind(new(interfaces.ApplicationHandler), new(*applHdl.Handler)),
	wire.Bind(new(interfaces.ApplicationService), new(*applSvc.Service)),
	wire.Bind(new(interfaces.ApplicationRepository), new(*applRepo.Repository)),
)

func ProvideApplicationHandler(svc interfaces.ApplicationService, log *slog.Logger) *applHdl.Handler {
	hdlOnce.Do(func() {
		hdl = &applHdl.Handler{
			Svc: svc,
			Log: log,
		}
	})

	return hdl
}

func ProvideApplicatonService(applRepo interfaces.ApplicationRepository) *applSvc.Service {
	svcOnce.Do(func() {
		svc = &applSvc.Service{
			Repo: applRepo,
		}
	})

	return svc
}

func ProvideApplicationRepository(db *sql.DB) *applRepo.Repository {
	repoOnce.Do(func() {
		repo = &applRepo.Repository{
			DB: db,
		}
	})

	return repo
}
