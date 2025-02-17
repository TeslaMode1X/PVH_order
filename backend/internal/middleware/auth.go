package middleware

import (
	"errors"
	"fmt"
	responseApi "github.com/TeslaMode1X/PVH_order/internal/utils/response"
	"github.com/TeslaMode1X/PVH_order/pkg/logger/slogError"
	"github.com/dgrijalva/jwt-go/v4"
	"golang.org/x/net/context"
	"net/http"
	"os"
)

func WithAuth(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString, err := getTokenFromRequest(r)
		if err != nil {
			permissionDenied(w, r, "unable to get token from request")
		}

		token, err := validateToken(tokenString)
		if err != nil {
			permissionDenied(w, r, "invalid token")
		}

		userId, err := getUserIDFromToken(token)
		if err != nil {
			permissionDenied(w, r, "unable to get user ID from token")
		}

		ctx := context.WithValue(r.Context(), "userId", userId)
		r = r.WithContext(ctx)

		handler.ServeHTTP(w, r)
	})
}

func permissionDenied(w http.ResponseWriter, r *http.Request, error string) {
	responseApi.WriteError(w, r, http.StatusUnauthorized, slogError.Err(errors.New("permission denied: "+error)))
	return
}

func getTokenFromRequest(r *http.Request) (string, error) {
	cookie, err := r.Cookie("jwt-token")
	if err != nil {
		return "", err
	}

	tokenString := cookie.Value

	return tokenString, nil
}

func validateToken(token string) (*jwt.Token, error) {
	return jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET_KEY_AUTH")), nil
	})
}

func getUserIDFromToken(token *jwt.Token) (string, error) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("invalid token claims")
	}

	userID, ok := claims["user_id"].(string)
	if !ok {
		return "", errors.New("invalid user ID in token")
	}

	return userID, nil
}
