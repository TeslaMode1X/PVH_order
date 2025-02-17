package api

import (
	"fmt"
	authHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/auth"
	userHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/user"
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
	userHandler *userHdl.Handler) *ServerHTTP {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.DefaultLogger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(10 * time.Second))

	r.Route("/", func(r chi.Router) {
		authHandler.NewAuthHandler(r)
		userHandler.NewUserHandler(r)
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
