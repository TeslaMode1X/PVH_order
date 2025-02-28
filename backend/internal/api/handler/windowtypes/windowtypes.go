package windowtypes

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	_ "github.com/TeslaMode1X/PVH_order/internal/domain/models/response"
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

// GetAllWindowTypes godoc
//
//	@Summary      Get all window types
//	@Description  Retrieve all window types from the database
//	@Tags         window
//	@Accept       application/json
//	@Produce      json
//	@Success      200  {array}   windowtypes.Object "List of window types"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window [get]
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

// GetWindowTypeById godoc
//
//	@Summary      Get window type by ID
//	@Description  Retrieve window type details from the database using its unique identifier
//	@Tags         window
//	@Accept       application/json
//	@Produce      json
//	@Param        id   path      string  true  "ID of the window type to retrieve"
//	@Success      200  {object}  windowtypes.Object "Window type object"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window/{id} [get]
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

// CreateWindowType godoc
//
//	@Summary      Create a new window type
//	@Description  Create a new window type with the provided data
//	@Tags         window
//	@Accept       application/json
//	@Produce      json
//	@Param        body  body  windowtypes.ObjectCreation  true  "Window type data"
//	@Success      201  {object}  map[string]interface{} "Object created successfully"
//	@Failure      400  {object}  response.ErrorResponse "Bad Request"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window [post]
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

// UpdateWindowType godoc
//
//	@Summary      Update window type
//	@Description  Update window type data by ID
//	@Tags         window
//	@Accept       application/json
//	@Produce      json
//	@Param        id    path  string                     true  "ID of the window type to update"
//	@Param        body  body  windowtypes.ObjectCreation true  "Updated window type data"
//	@Success      201  {object}  map[string]interface{} "Object updated successfully"
//	@Failure      400  {object}  response.ErrorResponse "Bad Request"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window/{id} [put]
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

// DeleteWindowType godoc
//
//	@Summary      Delete a window type
//	@Description  Remove a window type from the database using its unique identifier
//	@Tags         window
//	@Accept       application/json
//	@Produce      json
//	@Param        id   path      string  true  "ID of the window type to delete"
//	@Success      200  {object}  nil     "Window type deleted successfully"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window/{id} [delete]
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
