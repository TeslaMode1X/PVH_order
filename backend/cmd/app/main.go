package main

import (
	"github.com/TeslaMode1X/PVH_order/internal/config"
	"github.com/TeslaMode1X/PVH_order/internal/di"
	"github.com/TeslaMode1X/PVH_order/pkg/logger"
)

func main() {
	cfg := config.LoadConfig()
	log := logger.New()

	if server, err := di.InitializeAPI(cfg, log); err == nil {
		server.Start(cfg, log)
	}
}
