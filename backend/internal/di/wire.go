//go:build wireinject
// +build wireinject

package di

import (
	"github.com/TeslaMode1X/PVH_order/internal/api"
	"github.com/TeslaMode1X/PVH_order/internal/config"
	"github.com/google/wire"
	"log/slog"
)

func InitializeAPI(cfg *config.Config, log *slog.Logger) (*api.ServerHTTP, error) {
	panic(wire.Build(
		//db.ConnectToDB,
		api.NewServerHTTP,
	))
}
