//go:build wireinject
// +build wireinject

package di

import (
	"github.com/TeslaMode1X/PVH_order/internal/api"
	"github.com/TeslaMode1X/PVH_order/internal/config"
	"github.com/TeslaMode1X/PVH_order/internal/db"
	applProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/application"
	authProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/auth"
	fileProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/file"
	materialProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/materials"
	systemProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/systems"
	userProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/user"
	windowMdlProvider "github.com/TeslaMode1X/PVH_order/internal/domain/providers/windowmodels"
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
		windowMdlProvider.ProviderSet,
		fileProvider.ProviderSet,
		applProvider.ProviderSet,

		db.ConnectToDB,
		api.NewServerHTTP,
	))
}
