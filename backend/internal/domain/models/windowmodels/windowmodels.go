package windowmodels

import "github.com/gofrs/uuid"

type Object struct {
	ID              uuid.UUID       `json:"id"`
	Name            string          `json:"name"`
	TypeID          string          `json:"type_id"`       // Эти поля останутся для других операций
	MaterialID      string          `json:"material_id"`   // Эти поля останутся для других операций
	SystemID        string          `json:"system_id"`     // Эти поля останутся для других операций
	TypeName        string          `json:"type_name"`     // Новые поля для хранения имен
	MaterialName    string          `json:"material_name"` // Новые поля для хранения имен
	SystemName      string          `json:"system_name"`   // Новые поля для хранения имен
	SmallImagePath  string          `json:"small_image_path"`
	MediumImagePath string          `json:"medium_image_path"`
	LargeImagePath  string          `json:"large_image_path"`
	Characteristics Characteristics `json:"characteristics"`
} // @name WindowModelReadObject

type ObjectCreation struct {
	Name            string          `json:"name"`
	TypeID          string          `json:"type_id"`
	MaterialID      string          `json:"material_id"`
	SystemID        string          `json:"system_id"`
	Characteristics Characteristics `json:"characteristics"`
} // @name WindowModelCreateObject

type Characteristics struct {
	Profile           string   `json:"profile"`
	Executions        []string `json:"executions"`
	SealColors        []string `json:"seal_colors"`
	SealMaterial      []string `json:"seal_material"`
	Chambers          string   `json:"chambers"`
	GlassType         string   `json:"glass_type"`
	Width             int      `json:"width"`
	ThermalResistance float64  `json:"thermal_resistance"`
	FalzHeight        int      `json:"falz_height"`
	FrameSashHeight   int      `json:"frame_sash_height"`
} // @name WindowModelCharacteristics
