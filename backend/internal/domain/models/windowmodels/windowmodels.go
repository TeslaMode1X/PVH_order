package windowmodels

type Object struct {
	ID              string          `json:"id"`
	Name            string          `json:"name"`
	TypeID          string          `json:"type_id"`
	MaterialID      string          `json:"material_id"`
	SystemID        string          `json:"system_id"`
	SmallImagePath  string          `json:"small_image_path"`
	MediumImagePath string          `json:"medium_image_path"`
	LargeImagePath  string          `json:"large_image_path"`
	Characteristics Characteristics `json:"characteristics"`
}

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
}
