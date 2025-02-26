package windowtypes

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowtypes"
	responseApi "github.com/TeslaMode1X/PVH_order/internal/utils/response"
	"github.com/TeslaMode1X/PVH_order/pkg/jsonReader"
	"github.com/TeslaMode1X/PVH_order/pkg/logger/slogError"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/pkg/errors"
	"golang.org/x/net/context"
	"log/slog"
	"net/http"
)

type Handler struct {
	Svc interfaces.WindowTypesService
	Log *slog.Logger
}

func (h *Handler) NewWindowTypesHandler(r chi.Router) {
	r.Route("/window", func(r chi.Router) {
		r.Get("/", h.GetAllWindowTypes)
		r.Post("/", h.CreateWindowType)

		r.Get("/{id}", h.GetWindowTypeById)
		r.Put("/{id}", h.UpdateWindowType)
		r.Delete("/{id}", h.DeleteWindowType)

	})
}

func (h *Handler) GetAllWindowTypes(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowtypes.GetAllWindowTypes"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	windows, err := h.Svc.GetAllWindowTypesService(context.Background())
	if err != nil {
		h.Log.Error("error while getting window types")
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, windows)
}

func (h *Handler) GetWindowTypeById(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowtypes.GetWindowTypeById"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	window, err := h.Svc.GetWindowTypeByIdService(context.Background(), id)
	if err != nil {
		h.Log.Error("error while getting window type")
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, window)
}

func (h *Handler) CreateWindowType(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowtypes.CreateWindowType"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	var materialCurrent windowtypes.ObjectCreation
	if err := jsonReader.ReadJson(w, r, &materialCurrent); err != nil {
		h.Log.Error("failed to decode request body", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("failed to decode request body")))
		return
	}

	err := h.Svc.CreateWindowTypeService(context.Background(), materialCurrent)
	if err != nil {
		h.Log.Error("error while creating window type", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusCreated, map[string]interface{}{"object created": materialCurrent})
}

func (h *Handler) UpdateWindowType(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowtypes.UpdateWindowType"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	var materialCurrent windowtypes.ObjectCreation
	if err := jsonReader.ReadJson(w, r, &materialCurrent); err != nil {
		h.Log.Error("failed to decode request body", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("failed to decode request body")))
		return
	}

	err := h.Svc.UpdateWindowTypeService(context.Background(), id, materialCurrent)
	if err != nil {
		h.Log.Error("error while creating window type", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusCreated, map[string]interface{}{"object updated": materialCurrent})
}

func (h *Handler) DeleteWindowType(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowtypes.DeleteWindowType"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	err := h.Svc.DeleteWindowTypeService(context.Background(), id)
	if err != nil {
		h.Log.Error("error while deleting window type", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, nil)
}
