package application

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/application"
	responseApi "github.com/TeslaMode1X/PVH_order/internal/utils/response"
	"github.com/TeslaMode1X/PVH_order/pkg/jsonReader"
	"github.com/TeslaMode1X/PVH_order/pkg/logger/slogError"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"golang.org/x/net/context"
	"log/slog"
	"net/http"
)

type Handler struct {
	Svc interfaces.ApplicationService
	Log *slog.Logger
}

func (h *Handler) NewApplicationHandler(r chi.Router) {
	r.Route("/application", func(r chi.Router) {
		r.Get("/", h.GetAllApplications)
		r.Post("/", h.CreateApplication)

		r.Get("/{id}", h.GetApplicationById)
		r.Delete("/{id}", h.DeleteApplication)
	})
}

func (h *Handler) GetAllApplications(w http.ResponseWriter, r *http.Request) {
	const op = "handler.application.GetAllApplications"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	applications, err := h.Svc.GetAllApplicationsService(context.Background())
	if err != nil {
		h.Log.Error("error in getting all applications", "error", err, "op", op)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, applications)
}

func (h *Handler) GetApplicationById(w http.ResponseWriter, r *http.Request) {
	const op = "handler.application.GetApplicationById"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	applicationObject, err := h.Svc.GetApplicationByIdService(context.Background(), id)
	if err != nil {
		h.Log.Error("error in getting application", "error", err, "op", op)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, applicationObject)
}

func (h *Handler) CreateApplication(w http.ResponseWriter, r *http.Request) {
	const op = "handler.application.CreateApplication"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	var applicationObject application.Create
	if err := jsonReader.ReadJson(w, r, &applicationObject); err != nil {
		h.Log.Error("failed to read user from request", "error", err.Error())
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	err := h.Svc.CreateApplicationService(context.Background(), applicationObject)
	if err != nil {
		h.Log.Error("error in creating application", "error", err, "op", op)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusCreated, map[string]interface{}{"application created": applicationObject})
}

func (h *Handler) DeleteApplication(w http.ResponseWriter, r *http.Request) {
	const op = "handler.application.DeleteApplication"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	err := h.Svc.DeleteApplicationService(context.Background(), id)
	if err != nil {
		h.Log.Error("error in deleting application", "error", err, "op", op)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, "application deleted!")
}
