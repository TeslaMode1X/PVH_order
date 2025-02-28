package interfaces

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/auth"
	"golang.org/x/net/context"
	"net/http"
)

type (
	AuthRepository interface {
		UserLogin(ctx context.Context, login auth.Login) (string, error)
		UserRegistration(ctx context.Context, registration auth.Registration) (string, error)
		UserRole(ctx context.Context, id string) (string, error)
	}
)

type (
	AuthService interface {
		LoginService(ctx context.Context, login auth.Login) (string, error)
		RegistrationService(ctx context.Context, registration auth.Registration) (string, error)
		UserRoleService(ctx context.Context, id string) (string, error)
	}
)

type (
	AuthHandler interface {
		Login(w http.ResponseWriter, r *http.Request)
		Registration(w http.ResponseWriter, r *http.Request)
	}
)
