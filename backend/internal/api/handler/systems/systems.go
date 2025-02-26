package systems

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/systems"
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
	Svc interfaces.SystemsService
	Log *slog.Logger
}

func (h *Handler) NewSystemsHandler(r chi.Router) {
	r.Route("/systems", func(r chi.Router) {
		r.Get("/", h.GetAllSystems)
		r.Post("/", h.CreateSystem)

		r.Get("/{id}", h.GetSystemById)
		r.Put("/{id}", h.UpdateSystemById)
		r.Delete("/{id}", h.DeleteSystemById)
	})
}

func (h *Handler) GetAllSystems(w http.ResponseWriter, r *http.Request) {
	const op = "handler.systems.GetAllSystems"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	systemsObj, err := h.Svc.GetAllSystemsService(context.Background())
	if err != nil {
		h.Log.Error("failed to fetch systems", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, systemsObj)
}

func (h *Handler) GetSystemById(w http.ResponseWriter, r *http.Request) {
	const op = "handler.systems.GetSystemById"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	system, err := h.Svc.GetSystemByIdService(context.Background(), id)
	if err != nil {
		h.Log.Error("failed to fetch system", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, system)
}

func (h *Handler) CreateSystem(w http.ResponseWriter, r *http.Request) {
	const op = "handler.systems.CreateSystem"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	var systemObject systems.ObjectCreation
	if err := jsonReader.ReadJson(w, r, &systemObject); err != nil {
		h.Log.Error("failed to decode request body", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("failed to decode request body")))
		return
	}

	err := h.Svc.CreateSystemService(context.Background(), systemObject)
	if err != nil {
		h.Log.Error("error while creating system")
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusCreated, map[string]interface{}{"object created": systemObject})

}

func (h *Handler) UpdateSystemById(w http.ResponseWriter, r *http.Request) {
	const op = "handler.systems.UpdateSystemById"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	var systemCurrent systems.ObjectCreation
	if err := jsonReader.ReadJson(w, r, &systemCurrent); err != nil {
		h.Log.Error("failed to decode request body", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("failed to decode request body")))
		return
	}

	err := h.Svc.UpdateSystemByIdService(context.Background(), id, systemCurrent)
	if err != nil {
		h.Log.Error("failed to update system", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, map[string]interface{}{"system updated!": systemCurrent})
}

func (h *Handler) DeleteSystemById(w http.ResponseWriter, r *http.Request) {
	const op = "handler.systems.DeleteSystemByIdService"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	err := h.Svc.DeleteSystemByIdService(context.Background(), id)
	if err != nil {
		h.Log.Error("failed to delete system", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, map[string]interface{}{"system deleted!": nil})
}
