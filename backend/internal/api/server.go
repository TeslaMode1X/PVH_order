package api

import (
	"fmt"
	applHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/application"
	authHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/auth"
	fileHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/file"
	materialHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/materials"
	systemsHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/systems"
	userHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/user"
	windowMdlHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/windowmodels"
	windowHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/windowtypes"
	"github.com/TeslaMode1X/PVH_order/internal/config"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
	"log/slog"
	"net/http"
	"time"
)

type ServerHTTP struct {
	router http.Handler
}

func NewServerHTTP(cfg *config.Config, authHandler *authHdl.Handler,
	userHandler *userHdl.Handler,
	materialHandler *materialHdl.Handler,
	systemHandler *systemsHdl.Handler,
	windowHandler *windowHdl.Handler,
	windowModelHandler *windowMdlHdl.Handler,
	fileHandler *fileHdl.Handler,
	applHandler *applHdl.Handler) *ServerHTTP {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.DefaultLogger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(10 * time.Second))

	r.Route("/", func(r chi.Router) {
		authHandler.NewAuthHandler(r)
		userHandler.NewUserHandler(r)
		materialHandler.NewMaterialHandler(r)
		systemHandler.NewSystemsHandler(r)
		windowHandler.NewWindowTypesHandler(r)
		windowModelHandler.NewWindowModelHandler(r)
		fileHandler.NewFileHandler(r)
		applHandler.NewApplicationHandler(r)
	})

	handler := cors.AllowAll().Handler(r)

	return &ServerHTTP{router: handler}
}

func (sh *ServerHTTP) Start(cfg *config.Config, log *slog.Logger) {
	fmt.Print(fmt.Sprintf("Port is %s", cfg.Server.Port))
	log.Info(fmt.Sprintf("Starting server on port: %s", cfg.Server.Port))
	addr := cfg.Server.Addr + ":" + cfg.Server.Port
	err := http.ListenAndServe(addr, sh.router)
	if err != nil {
		log.Error(err.Error())
		return
	}
}
