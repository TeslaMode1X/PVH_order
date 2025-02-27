package file

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/go-chi/chi/v5"
	"log/slog"
	"net/http"
)

type Handler struct {
	Svc interfaces.FileService
	Log *slog.Logger
}

func (h *Handler) NewFileHandler(r chi.Router) {
	r.Route("/file", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Handle("/*", h.GetStaticImage())
		})
	})
}

func (h *Handler) GetStaticImage() http.Handler {
	fs := http.FileServer(http.Dir("/app/static"))

	return http.StripPrefix("/api/file/", fs)
}
