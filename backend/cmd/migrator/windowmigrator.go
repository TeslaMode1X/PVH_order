package main

import (
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"github.com/gofrs/uuid"
	"log"
	"os"

	_ "github.com/lib/pq"
)

type WindowType struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
}

type Material struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

type System struct {
	ID         uuid.UUID `json:"id"`
	Name       string    `json:"name"`
	MaterialID uuid.UUID `json:"material_id"`
}

type WindowModel struct {
	ID              uuid.UUID       `json:"id"`
	Name            string          `json:"name"`
	TypeID          uuid.UUID       `json:"type_id"`
	MaterialID      uuid.UUID       `json:"material_id"`
	SystemID        uuid.UUID       `json:"system_id"`
	Characteristics json.RawMessage `json:"characteristics"`
}

func main() {
	dbPath, err := getDbPath()
	if err != nil {
		log.Fatal(fmt.Errorf("error getting database path: %v", err))
	}

	db, err := sql.Open("postgres", dbPath)
	if err != nil {
		log.Fatal(fmt.Errorf("error opening database connection: %v", err))
	}
	defer db.Close()

	loadWindowTypes(db)
	loadMaterials(db)
	loadSystems(db)
	loadWindowModels(db)

	fmt.Println("Data has been successfully inserted into the database!")
}

func loadWindowTypes(db *sql.DB) {
	content, err := os.ReadFile("./json_migrations/window_types.json")
	if err != nil {
		log.Fatal(fmt.Errorf("error reading window_types.json: %v", err))
	}

	var windowTypes []WindowType
	if err := json.Unmarshal(content, &windowTypes); err != nil {
		log.Fatal(fmt.Errorf("error parsing JSON: %v", err))
	}

	stmt, err := db.Prepare("INSERT INTO window_types (id, name, description) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING")
	if err != nil {
		log.Fatal(fmt.Errorf("error preparing statement: %v", err))
	}

	for _, wt := range windowTypes {
		_, err := stmt.Exec(wt.ID, wt.Name, wt.Description)
		if err != nil {
			log.Fatal(fmt.Errorf("error inserting row: %v", err))
		}
	}
}

func loadMaterials(db *sql.DB) {
	content, err := os.ReadFile("./json_migrations/materials.json")
	if err != nil {
		log.Fatal(fmt.Errorf("error reading materials.json: %v", err))
	}

	var materials []Material
	if err := json.Unmarshal(content, &materials); err != nil {
		log.Fatal(fmt.Errorf("error parsing JSON: %v", err))
	}

	stmt, err := db.Prepare("INSERT INTO materials (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING")
	if err != nil {
		log.Fatal(fmt.Errorf("error preparing statement: %v", err))
	}

	for _, m := range materials {
		_, err := stmt.Exec(m.ID, m.Name)
		if err != nil {
			log.Fatal(fmt.Errorf("error inserting row: %v", err))
		}
	}
}

func loadSystems(db *sql.DB) {
	content, err := os.ReadFile("./json_migrations/systems.json")
	if err != nil {
		log.Fatal(fmt.Errorf("error reading systems.json: %v", err))
	}

	var systems []System
	if err := json.Unmarshal(content, &systems); err != nil {
		log.Fatal(fmt.Errorf("error parsing JSON: %v", err))
	}

	stmt, err := db.Prepare("INSERT INTO systems (id, name, material_id) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING")
	if err != nil {
		log.Fatal(fmt.Errorf("error preparing statement: %v", err))
	}

	for _, s := range systems {
		_, err := stmt.Exec(s.ID, s.Name, s.MaterialID)
		if err != nil {
			log.Fatal(fmt.Errorf("error inserting row: %v", err))
		}
	}
}

func loadWindowModels(db *sql.DB) {
	content, err := os.ReadFile("./json_migrations/window_models.json")
	if err != nil {
		log.Fatal(fmt.Errorf("error reading window_models.json: %v", err))
	}

	var models []WindowModel
	if err := json.Unmarshal(content, &models); err != nil {
		log.Fatal(fmt.Errorf("error parsing JSON: %v", err))
	}

	stmt, err := db.Prepare("INSERT INTO window_models (id, name, type_id, material_id, system_id, characteristics) VALUES ($1, $2, $3, $4, $5, $6::jsonb) ON CONFLICT (id) DO NOTHING")
	if err != nil {
		log.Fatal(fmt.Errorf("error preparing statement: %v", err))
	}

	for _, wm := range models {
		_, err := stmt.Exec(wm.ID, wm.Name, wm.TypeID, wm.MaterialID, wm.SystemID, wm.Characteristics)
		if err != nil {
			log.Fatal(fmt.Errorf("error inserting row: %v", err))
		}
	}
}

func getDbPath() (string, error) {
	var dbUserName, dbPass, dbHost, dbName string

	flag.StringVar(&dbUserName, "db-user-name", "postgres", "Database user")
	flag.StringVar(&dbPass, "db-pass", "postgres", "Database password")
	flag.StringVar(&dbHost, "db-host", "db:5432", "Database host")
	flag.StringVar(&dbName, "db-name", "windows", "Database name")
	flag.Parse()

	if dbName == "" {
		return "", fmt.Errorf("db-name is required")
	}

	dbPath := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", dbUserName, dbPass, dbHost, dbName)
	return dbPath, nil
}
