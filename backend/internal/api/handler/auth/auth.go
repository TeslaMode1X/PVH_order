package auth

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/auth"
	mw "github.com/TeslaMode1X/PVH_order/internal/middleware"
	"github.com/TeslaMode1X/PVH_order/internal/service"
	responseApi "github.com/TeslaMode1X/PVH_order/internal/utils/response"
	"github.com/TeslaMode1X/PVH_order/pkg/jsonReader"
	"github.com/TeslaMode1X/PVH_order/pkg/logger/slogError"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"golang.org/x/net/context"
	"log/slog"
	"net/http"
	"time"
)

type Handler struct {
	Svc interfaces.AuthService
	Log *slog.Logger
}

func (h *Handler) NewAuthHandler(r chi.Router) {
	r.Route("/auth", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Post("/login", h.Login)
			r.Post("/registration", h.Registration)
		})

		r.Group(func(r chi.Router) {
			r.Use(mw.WithAuth)
			// TODO
			// something in future
		})
	})
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	const op = "handler.auth.Login"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	cookie, err := r.Cookie("jwt-token")
	if err == nil {
		h.Log.Error("jwt token expired", "error", err)
		responseApi.WriteError(w, r, http.StatusUnauthorized, errors.New("already logged in"))
		return
	}

	var user auth.Login
	if err := jsonReader.ReadJson(w, r, &user); err != nil {
		h.Log.Error("failed to read user from request", "error", err.Error())
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	userID, err := h.Svc.LoginService(context.Background(), user)
	if err != nil {
		if errors.Is(err, service.ErrUserNotFound) {
			h.Log.Error("user not found", "error", err.Error())
			responseApi.WriteError(w, r, http.StatusNotFound, slogError.Err(service.ErrUserNotFound))
			return
		}
		h.Log.Error("failed to login", "error", err.Error())
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp":     time.Now().Add(time.Hour * 1).Unix(), // token expires in 1 hour
		"user_id": userID,
	})

	tokenString, err := token.SignedString([]byte("your-secret-key"))
	if err != nil {
		h.Log.Error("failed to sign token", "error", err.Error())
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}
	cookie = &http.Cookie{
		Name:     "jwt-token",
		Value:    tokenString,
		Expires:  time.Now().Add(time.Hour * 1),
		HttpOnly: true,
	}
	http.SetCookie(w, cookie)

	responseApi.WriteJson(w, r, http.StatusOK, userID)
}

func (h *Handler) Registration(w http.ResponseWriter, r *http.Request) {
	const op = "handler.auth.Registration"

	h.Log = h.Log.With(
		slog.String("op", op),
		slog.String("request_id", middleware.GetReqID(r.Context())),
	)

	var user auth.Registration
	if err := jsonReader.ReadJson(w, r, &user); err != nil {
		h.Log.Error("failed to read user from request", "error", err.Error())
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	hashedPassword := sha256.Sum256([]byte(user.Password))
	user.Password = hex.EncodeToString(hashedPassword[:])

	userID, err := h.Svc.RegistrationService(context.Background(), user)
	if err != nil {
		if errors.Is(err, service.ErrUserAlreadyExists) {
			h.Log.Error("user already exists", "error", err.Error())
			responseApi.WriteError(w, r, http.StatusConflict, slogError.Err(service.ErrUserAlreadyExists))
			return
		}
		if errors.Is(err, service.ErrUserNotFound) {
			h.Log.Error("user does not exist", "error", err.Error())
			responseApi.WriteError(w, r, http.StatusNotFound, slogError.Err(service.ErrUserNotFound))
			return
		}
		h.Log.Error("failed to register user", "error", err.Error())
		responseApi.WriteError(w, r, http.StatusInternalServerError, slogError.Err(err))
		return
	}

	responseApi.WriteJson(w, r, http.StatusOK, userID)
}
