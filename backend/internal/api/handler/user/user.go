package user

import (
	"database/sql"
	"errors"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	_ "github.com/TeslaMode1X/PVH_order/internal/domain/models/auth"
	_ "github.com/TeslaMode1X/PVH_order/internal/domain/models/response"
	"github.com/TeslaMode1X/PVH_order/internal/service"
	responseApi "github.com/TeslaMode1X/PVH_order/internal/utils/response"
	"github.com/TeslaMode1X/PVH_order/pkg/logger/slogError"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"golang.org/x/net/context"
	"log/slog"
	"net/http"
)

type Handler struct {
	Svc interfaces.UserService
	Log *slog.Logger
}

func (h *Handler) NewUserHandler(r chi.Router) {
	r.Route("/user", func(r chi.Router) {
		r.Get("/{userId}", h.GetUserByID)
	})
}

// GetUserByID godoc
//
//	@Summary      Get user by ID
//	@Description  Retrieve user details from the database using its unique identifier
//	@Tags         user
//	@Accept       application/json
//	@Produce      json
//	@Param        userId path     string  true  "ID of the user to retrieve"
//	@Success      200    {object} auth.User "Returns the user object"
//	@Failure      404    {object} response.ErrorResponse "User not found"
//	@Failure      400    {object} response.ErrorResponse "Bad Request"
//	@Router       /user/{userId} [get]
func (h *Handler) GetUserByID(w http.ResponseWriter, r *http.Request) {
	const op = "handler.user.GetUserByID"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	var userID = chi.URLParam(r, "userId")

	user, err := h.Svc.GetUserByID(context.Background(), userID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			h.Log.Error("failed to find user by id", "error", err.Error())
			responseApi.WriteError(w, r, http.StatusNotFound, slogError.Err(err))
			return
		}
		if errors.Is(err, service.ErrUserNotFound) {
			h.Log.Error("failed to find user by id", "error", err.Error())
			responseApi.WriteError(w, r, http.StatusNotFound, slogError.Err(err))
			return
		}
		h.Log.Error("failed to find user by id", "error", err.Error())
		responseApi.WriteError(w, r, http.StatusBadRequest, slogError.Err(err))
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, user)
}
