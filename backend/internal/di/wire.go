//go:build wireinject
// +build wireinject

package di

import (
	"github.com/TeslaMode1X/PVH_order/internal/api"
	"github.com/TeslaMode1X/PVH_order/internal/config"
	"github.com/TeslaMode1X/PVH_order/internal/db"
	authProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/auth"
	materialProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/materials"
	systemProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/systems"
	userProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/user"
	windowProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/windowtypes"
	"github.com/google/wire"
	"log/slog"
)

func InitializeAPI(cfg *config.Config, log *slog.Logger) (*api.ServerHTTP, error) {
	panic(wire.Build(
		authProvider.ProviderSet,
		userProvider.ProviderSet,
		materialProvider.ProviderSet,
		systemProvider.ProviderSet,
		windowProvider.ProviderSet,

		db.ConnectToDB,
		api.NewServerHTTP,
	))
}
