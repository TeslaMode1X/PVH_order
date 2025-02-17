//go:build wireinject
// +build wireinject

package di

import (
	"github.com/TeslaMode1X/PVH_order/internal/api"
	"github.com/TeslaMode1X/PVH_order/internal/config"
	"github.com/TeslaMode1X/PVH_order/internal/db"
	authProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/auth"
	userProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/user"
	"github.com/google/wire"
	"log/slog"
)

func InitializeAPI(cfg *config.Config, log *slog.Logger) (*api.ServerHTTP, error) {
	panic(wire.Build(
		authProvider.ProviderSet,
		userProvider.ProviderSet,

		db.ConnectToDB,
		api.NewServerHTTP,
	))
}
