package materials

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/materials"
	_ "github.com/TeslaMode1X/PVH_order/internal/domain/models/response"
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
	Svc interfaces.MaterialService
	Log *slog.Logger
}

func (h *Handler) NewMaterialHandler(r chi.Router) {
	r.Route("/materials", func(r chi.Router) {
		r.Get("/", h.GetAllMaterials)

		r.Get("/{id}", h.GetMaterialById)
		r.Delete("/{id}", h.DeleteMaterialById)

		r.Post("/", h.CreateMaterial)
		r.Put("/", h.UpdateMaterialById)
	})
}

// GetAllMaterials godoc
//
//	@Summary      Get all materials
//	@Description  Retrieve a list of all materials from the system
//	@Tags         materials
//	@Accept       application/json
//	@Produce      json
//	@Success      200  {array}    materials.Object "List of all materials"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /materials [get]
func (h *Handler) GetAllMaterials(w http.ResponseWriter, r *http.Request) {
	const op = "handler.materials.GetAllMaterials"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	materials, err := h.Svc.GetAllMaterialsService(context.Background())
	if err != nil {
		h.Log.Error("error getting materials", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, materials)
}

// GetMaterialById godoc
//
//	@Summary      Get material by ID
//	@Description  Retrieve a specific material by its unique identifier
//	@Tags         materials
//	@Accept       application/json
//	@Produce      json
//	@Param        id    path      string    true   "ID of the material to retrieve"
//	@Success      200  {object}   materials.Object "Material details"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /materials/{id} [get]
func (h *Handler) GetMaterialById(w http.ResponseWriter, r *http.Request) {
	const op = "handler.materials.GetMaterialById"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	materialsObj, err := h.Svc.GetMaterialByIdService(context.Background(), id)
	if err != nil {
		h.Log.Error("error getting materials", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, materialsObj)
}

// CreateMaterial godoc
//
//	@Summary      Create a new material
//	@Description  Add a new material to the system with the provided details
//	@Tags         materials
//	@Accept       application/json
//	@Produce      json
//	@Param        material  body      materials.Create  true   "Material details"
//	@Success      201  {string}   string "Material created successfully"
//	@Failure      400  {object}   response.ErrorResponse "Bad request - invalid input"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /materials [post]
func (h *Handler) CreateMaterial(w http.ResponseWriter, r *http.Request) {
	const op = "handler.materials.CreateMaterial"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	var materialCurrent materials.Create
	if err := jsonReader.ReadJson(w, r, &materialCurrent); err != nil {
		h.Log.Error("failed to decode request body", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("failed to decode request body")))
		return
	}

	err := h.Svc.CreateMaterialService(context.Background(), materialCurrent)
	if err != nil {
		h.Log.Error("error creating material", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusCreated, "material created")
}

// UpdateMaterialById godoc
//
//  @Summary      Update material
//  @Description  Update an existing material's information
//  @Tags         materials
//  @Accept       application/json
//  @Produce      json
//  @Param        material  body      materials.Object  true   "Updated material details"
//  @Success      200  {object}   map[string]interface{} "Material updated successfully"
//  @Failure      400  {object}   response.ErrorResponse "Bad request - invalid input"
//  @Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//  @Router       /materials [put]

func (h *Handler) UpdateMaterialById(w http.ResponseWriter, r *http.Request) {
	const op = "handler.materials.UpdateMaterialById"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	var materialCurrent *materials.Object
	if err := jsonReader.ReadJson(w, r, &materialCurrent); err != nil {
		h.Log.Error("failed to decode request body", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("failed to decode request body")))
		return
	}

	err := h.Svc.UpdateMaterialByIdService(context.Background(), materialCurrent)
	if err != nil {
		h.Log.Error("error updating material", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, map[string]interface{}{"material updated": materialCurrent})
}

// DeleteMaterialById godoc
//
//	@Summary      Delete a material
//	@Description  Remove a material from the system using its unique identifier
//	@Tags         materials
//	@Accept       application/json
//	@Produce      json
//	@Param        id    path      string    true   "ID of the material to delete"
//	@Success      200  {string}   string "Material deleted successfully"
//	@Failure      500  {object}   response.ErrorResponse "Internal Server Error"
//	@Router       /materials/{id} [delete]
func (h *Handler) DeleteMaterialById(w http.ResponseWriter, r *http.Request) {
	const op = "handler.materials.DeleteMaterialById"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	err := h.Svc.DeleteMaterialByIdService(context.Background(), id)
	if err != nil {
		h.Log.Error("error deleting material", "error", err)
		responseApi.WriteError(w, r, http.StatusInternalServerError, err)
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, "material successfully deleted")
}
