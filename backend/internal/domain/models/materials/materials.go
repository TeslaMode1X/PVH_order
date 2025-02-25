package materials

import "github.com/gofrs/uuid"

type Object struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
} // @Name MaterialObject

type Create struct {
	Name string `json:"name"`
} // @Name MaterialCreate
