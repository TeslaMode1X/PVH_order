package auth

import (
	"database/sql"
	authHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/auth"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	authRepo "github.com/TeslaMode1X/PVH_order/internal/repo/auth"
	authSvc "github.com/TeslaMode1X/PVH_order/internal/service/auth"
	"github.com/google/wire"
	"log/slog"
	"sync"
)

var (
	hdl     *authHdl.Handler
	hdlOnce sync.Once

	svc     *authSvc.Service
	svcOnce sync.Once

	repo     *authRepo.Repository
	repoOnce sync.Once
)

var ProviderSet = wire.NewSet(
	ProvideAuthHandler,
	ProvideAuthService,
	ProvideAuthRepository,

	wire.Bind(new(interfaces.AuthHandler), new(*authHdl.Handler)),
	wire.Bind(new(interfaces.AuthService), new(*authSvc.Service)),
	wire.Bind(new(interfaces.AuthRepository), new(*authRepo.Repository)),
)

func ProvideAuthHandler(svc interfaces.AuthService, log *slog.Logger) *authHdl.Handler {
	hdlOnce.Do(func() {
		hdl = &authHdl.Handler{
			Svc: svc,
			Log: log,
		}
	})

	return hdl
}

func ProvideAuthService(authRepo interfaces.AuthRepository, userRepo interfaces.UserRepository) *authSvc.Service {
	svcOnce.Do(func() {
		svc = &authSvc.Service{
			AuthRepo: authRepo,
			UserRepo: userRepo,
		}
	})

	return svc
}

func ProvideAuthRepository(db *sql.DB) *authRepo.Repository {
	repoOnce.Do(func() {
		repo = &authRepo.Repository{
			DB: db,
		}
	})

	return repo
}
