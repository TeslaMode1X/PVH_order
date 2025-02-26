package windowtypes

import "github.com/gofrs/uuid"

type Object struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
} // @name WindowTypesRead

type ObjectCreation struct {
	Name        string `json:"name"`
	Description string `json:"description"`
} // @name WindowTypesCreate
