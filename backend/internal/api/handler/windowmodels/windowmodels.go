package windowmodels

import (
	"encoding/json"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	_ "github.com/TeslaMode1X/PVH_order/internal/domain/models/response"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/windowmodels"
	"github.com/TeslaMode1X/PVH_order/internal/service/file"
	responseApi "github.com/TeslaMode1X/PVH_order/internal/utils/response"
	"github.com/TeslaMode1X/PVH_order/pkg/logger/slogError"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/pkg/errors"
	"golang.org/x/net/context"
	"log/slog"
	"net/http"
	"strings"
)

type Handler struct {
	Svc interfaces.WindowModelService
	Log *slog.Logger
}

func (h *Handler) NewWindowModelHandler(r chi.Router) {
	r.Route("/window/model", func(r chi.Router) {
		r.Get("/", h.GetAllWindowModels)
		r.Post("/", h.CreateWindowModel)

		r.Get("/{id}", h.GetWindowModelByID)
		r.Put("/{id}", h.UpdateWindowModelCharacteristics)
		r.Delete("/{id}", h.DeleteWindowModel)
	})
}

// GetAllWindowModels godoc
//
//	@Summary      Get all window models
//	@Description  Retrieve all window models from the database
//	@Tags         window-model
//	@Accept       application/json
//	@Produce      json
//	@Success      200  {object}  map[string]interface{} "List of window models"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window/model [get]
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

	responseApi.WriteJson(w, r, http.StatusOK, map[string]interface{}{"data": window})
}

// GetWindowModelByID godoc
//
//	@Summary      Get window model by ID
//	@Description  Retrieve window model details from the database using its unique identifier
//	@Tags         window-model
//	@Accept       application/json
//	@Produce      json
//	@Param        id   path      string  true  "ID of the window model to retrieve"
//	@Success      200  {object}  windowmodels.Object "Window model object"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window/model/{id} [get]
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

// CreateWindowModel godoc
//
//	@Summary      Create a new window model
//	@Description  Create a new window model with images and characteristics
//	@Tags         window-model
//	@Accept       multipart/form-data
//	@Produce      json
//	@Param        large_image   formData  file    true  "Large image file (jpeg/png)"
//	@Param        medium_image  formData  file    true  "Medium image file (jpeg/png)"
//	@Param        small_image   formData  file    true  "Small image file (jpeg/png)"
//	@Param        object_data   formData  string  true  "Window model data in JSON format"
//	@Success      201  {object}  map[string]interface{} "Window model created successfully"
//	@Failure      400  {object}  response.ErrorResponse "Bad Request"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window/model [post]
func (h *Handler) CreateWindowModel(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowmodels.CreateWindowModel"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	r.Body = http.MaxBytesReader(w, r.Body, file.MaxImageMemorySize)

	err := r.ParseMultipartForm(file.MaxImageMemorySize)
	if err != nil {
		h.Log.Error("failed to parse form", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(err))
		return
	}

	largeImage, largeHeader, err := r.FormFile("large_image")
	if err != nil {
		h.Log.Error("failed to parse large image", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(err))
		return
	}
	defer largeImage.Close()

	contentType := largeHeader.Header.Get("Content-Type")
	if !(strings.Contains(contentType, "image/jpeg") || strings.Contains(contentType, "image/png")) {
		h.Log.Error("unsupported content type for large image", slogError.Err(errors.New("unsupported content type for large image")))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("unsupported content type for large image")))
		return
	}

	mediumImage, mediumHeader, err := r.FormFile("medium_image")
	if err != nil {
		h.Log.Error("failed to parse medium image", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(err))
		return
	}
	defer mediumImage.Close()

	contentType = mediumHeader.Header.Get("Content-Type")
	if !(strings.Contains(contentType, "image/jpeg") || strings.Contains(contentType, "image/png")) {
		h.Log.Error("unsupported content type for medium image", slogError.Err(errors.New("unsupported content type for medium image")))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("unsupported content type for medium image")))
		return
	}

	smallImage, smallHeader, err := r.FormFile("small_image")
	if err != nil {
		h.Log.Error("failed to parse small image", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(err))
		return
	}
	defer smallImage.Close()

	contentType = smallHeader.Header.Get("Content-Type")
	if !(strings.Contains(contentType, "image/jpeg") || strings.Contains(contentType, "image/png")) {
		h.Log.Error("unsupported content type for small image", slogError.Err(errors.New("unsupported content type for small image")))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(errors.New("unsupported content type for small image")))
		return
	}

	largeImageBuf := make([]byte, largeHeader.Size)
	if _, err := largeImage.Read(largeImageBuf); err != nil {
		h.Log.Error("failed to read large image", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	mediumImageBuf := make([]byte, mediumHeader.Size)
	if _, err := mediumImage.Read(mediumImageBuf); err != nil {
		h.Log.Error("failed to read medium image", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	smallImageBuf := make([]byte, smallHeader.Size)
	if _, err := smallImage.Read(smallImageBuf); err != nil {
		h.Log.Error("failed to read small image", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	if len(largeImageBuf) == 0 || len(mediumImageBuf) == 0 || len(smallImageBuf) == 0 {
		h.Log.Error("failed to read small image", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	var objectCreate windowmodels.ObjectCreation
	objectData := r.FormValue("object_data")
	if objectData == "" {
		h.Log.Error("missing object data", slogError.Err(errors.New("missing object data")))
		responseApi.WriteError(w, r, http.StatusBadRequest, errors.New("missing object data"))
		return
	}

	if err := json.Unmarshal([]byte(objectData), &objectCreate); err != nil {
		h.Log.Error("error parsing object data", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(err))
		return
	}

	//h.Log.Info("Creating window model",
	//	slog.Any("objectCreate", objectCreate),
	//	slog.Int("largeImageSize", len(largeImageBuf)),
	//	slog.Int("mediumImageSize", len(mediumImageBuf)),
	//	slog.Int("smallImageSize", len(smallImageBuf)))

	err = h.Svc.CreateWindowModelService(
		r.Context(),
		largeImageBuf, mediumImageBuf, smallImageBuf,
		objectCreate,
	)

	if err != nil {
		h.Log.Error("service failed to create window model", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	responseApi.WriteJson(w, r, http.StatusCreated, map[string]interface{}{"Window model created successfully": objectCreate})
}

// UpdateWindowModelCharacteristics godoc
//
//	@Summary      Update window model characteristics
//	@Description  Update window model characteristics by ID
//	@Tags         window-model
//	@Accept       multipart/form-data
//	@Produce      json
//	@Param        id          path      string  true  "ID of the window model to update"
//	@Param        object_data formData  string  true  "Updated window model characteristics in JSON format"
//	@Success      200  {object}  map[string]interface{} "Window model updated successfully"
//	@Failure      400  {object}  response.ErrorResponse "Bad Request"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window/model/{id} [put]
func (h *Handler) UpdateWindowModelCharacteristics(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowmodels.UpdateWindowModelCharacteristics"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	var objectUpdate windowmodels.CharacteristicsUpdate
	objectData := r.FormValue("object_data")
	if objectData == "" {
		h.Log.Error("missing object data", slogError.Err(errors.New("missing object data")))
		responseApi.WriteError(w, r, http.StatusBadRequest, errors.New("missing object data"))
		return
	}

	if err := json.Unmarshal([]byte(objectData), &objectUpdate); err != nil {
		h.Log.Error("error parsing object data", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(err))
		return
	}

	h.Log.Info("Characteristics in handler", objectUpdate)

	err := h.Svc.UpdateWindowModelCharacteristicsCheckerService(context.Background(), objectUpdate)
	if err != nil {
		h.Log.Error("service failed to update window model", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	err = h.Svc.UpdateWindowModelCharacteristicsService(context.Background(), id, objectUpdate)
	if err != nil {
		h.Log.Error("service failed to update window model", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, map[string]interface{}{"Window model updated successfully": objectUpdate})
}

// DeleteWindowModel godoc
//
//	@Summary      Delete a window model
//	@Description  Remove a window model from the database using its unique identifier
//	@Tags         window-model
//	@Accept       application/json
//	@Produce      json
//	@Param        id   path      string  true  "ID of the window model to delete"
//	@Success      200  {string}  string  "window model deleted!"
//	@Failure      500  {object}  response.ErrorResponse "Internal Server Error"
//	@Router       /window/model/{id} [delete]
func (h *Handler) DeleteWindowModel(w http.ResponseWriter, r *http.Request) {
	const op = "handler.windowmodels.DeleteWindowModel"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	id := chi.URLParam(r, "id")

	err := h.Svc.DeleteWindowModelService(context.Background(), id)
	if err != nil {
		h.Log.Error("service failed to delete window model", slogError.Err(err))
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, "window model deleted!")
}
