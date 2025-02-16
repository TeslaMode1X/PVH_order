package api

import (
	"fmt"
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

func NewServerHTTP(cfg *config.Config) *ServerHTTP {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.DefaultLogger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(10 * time.Second))

	handler := cors.AllowAll().Handler(r)

	r.Route("/", func(r chi.Router) {
		r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Hello from Go server!")
		})
	})

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
