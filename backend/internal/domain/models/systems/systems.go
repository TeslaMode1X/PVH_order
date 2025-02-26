package systems

import "github.com/gofrs/uuid"

type Object struct {
	ID           uuid.UUID `json:"id"`
	Name         string    `json:"name"`
	MaterialName string    `json:"material_name"`
} // @name SystemsReadObject

type ObjectCreation struct {
	Name         string `json:"name"`
	MaterialName string `json:"material_name"`
} // @name SystemsWriteObject
