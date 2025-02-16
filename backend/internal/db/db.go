package db

import (
	"database/sql"
	"fmt"
	"github.com/TeslaMode1X/PVH_order/internal/config"
	"github.com/sirupsen/logrus"
	"log"
)

func ConnectToDB(cfg *config.Config) (*sql.DB, error) {
	addr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.DB.Host,
		cfg.DB.Port,
		cfg.DB.User,
		cfg.DB.Password,
		cfg.DB.DatabaseName,
		cfg.DB.SSLMode,
	)

	db, err := sql.Open("postgres", addr)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		logrus.Fatal(err)
		return nil, err
	}

	logrus.Info("Successfully connected to BD")
	return db, nil
}
