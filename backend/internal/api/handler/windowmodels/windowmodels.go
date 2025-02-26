package windowmodels

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	responseApi "github.com/TeslaMode1X/PVH_order/internal/utils/response"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"golang.org/x/net/context"
	"log/slog"
	"net/http"
)

type Handler struct {
	Svc interfaces.WindowModelService
	Log *slog.Logger
}

func (h *Handler) NewWindowModelHandler(r chi.Router) {
	r.Route("/window/model", func(r chi.Router) {
		r.Get("/", h.GetAllWindowModels)

		r.Get("/{id}", h.GetWindowModelByID)
	})
}

func (h *Handler) GetAllWindowModels(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowmodels.GetAllWindowModels"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	window, err := h.Svc.GetAllWindowModelsService(context.Background())
	if err != nil {
		h.Log.Error("error getting window models", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, window)
}

func (h *Handler) GetWindowModelByID(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowmodels.GetWindowModelByIDRepository"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	window, err := h.Svc.GetWindowModelByIDService(context.Background(), id)
	if err != nil {
		h.Log.Error("error getting window models", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, window)
}
