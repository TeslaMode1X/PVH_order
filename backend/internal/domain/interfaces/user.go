package interfaces

import (
	"github.com/TeslaMode1X/PVH_order/internal/domain/models/auth"
	"golang.org/x/net/context"
	"net/http"
)

type (
	UserRepository interface {
		CheckUserExists(ctx context.Context, email string) (bool, error)
		FindUserByID(ctx context.Context, id string) (*auth.User, error)
	}
)

type (
	UserService interface {
		GetUserByID(ctx context.Context, userID string) (*auth.User, error)
	}
)

type (
	UserHandler interface {
		GetUserByID(w http.ResponseWriter, r *http.Request)
	}
)
