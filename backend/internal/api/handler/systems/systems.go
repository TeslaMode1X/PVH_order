package systems

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	_ "github.com/TeslaMode1X/PVH_order/internal/domain/models/response"
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

// GetAllSystems godoc
//
//	@Summary      Get all systems
//	@Description  Retrieve a list of all systems from the database
//	@Tags         systems
//	@Accept       application/json
//	@Produce      json
//	@Success      200  {array}    systems.Object "List of all systems"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /systems [get]
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

// GetSystemById godoc
//
//	@Summary      Get system by ID
//	@Description  Retrieve a specific system by its unique identifier
//	@Tags         systems
//	@Accept       application/json
//	@Produce      json
//	@Param        id    path      string    true   "ID of the system to retrieve"
//	@Success      200  {object}   systems.Object "System details"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /systems/{id} [get]
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

// CreateSystem godoc
//
//	@Summary      Create a new system
//	@Description  Add a new system to the database with the provided details
//	@Tags         systems
//	@Accept       application/json
//	@Produce      json
//	@Param        system  body      systems.ObjectCreation  true   "System details"
//	@Success      201  {object}   map[string]interface{} "System created successfully"
//	@Failure      400  {object}   response.ErrorResponse "Bad request - invalid input"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /systems [post]
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

// UpdateSystemById godoc
//
//	@Summary      Update system
//	@Description  Update an existing system's information by ID
//	@Tags         systems
//	@Accept       application/json
//	@Produce      json
//	@Param        id       path      string                 true   "ID of the system to update"
//	@Param        system   body      systems.ObjectCreation true   "Updated system details"
//	@Success      200  {object}   map[string]interface{} "System updated successfully"
//	@Failure      400  {object}   response.ErrorResponse "Bad request - invalid input"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /systems/{id} [put]
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

// DeleteSystemById godoc
//
//	@Summary      Delete a system
//	@Description  Remove a system from the database using its unique identifier
//	@Tags         systems
//	@Accept       application/json
//	@Produce      json
//	@Param        id    path      string    true   "ID of the system to delete"
//	@Success      200  {object}   map[string]interface{} "System deleted successfully"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /systems/{id} [delete]
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
