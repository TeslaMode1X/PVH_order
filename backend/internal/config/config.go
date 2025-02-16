package config

import (
	"errors"
	"flag"
	"fmt"
	configDB "github.com/TeslaMode1X/PVH_order/internal/config/db"
	configSrv "github.com/TeslaMode1X/PVH_order/internal/config/server"
	"github.com/joho/godotenv"
	"log"
)

type Environment string

const (
	StageEnv Environment = "stage"
	LocalEnv Environment = "local"
	DevEnv   Environment = "dev"
	ProdEnv  Environment = "prod"
)

var GlobalEnv Environment

type Config struct {
	DB     configDB.Database
	Server configSrv.Server
}

func LoadConfig() *Config {
	err := loadFlags()
	if err != nil {
		log.Fatal(err)
	}

	err = loadDotEnv()
	if err != nil {
		log.Fatal(err)
	}

	db := configDB.InitDbConfig()
	srv := configSrv.InitServerConfig()

	return &Config{
		DB:     db,
		Server: srv,
	}
}

func loadDotEnv() error {
	filePath := fmt.Sprintf(".env.%s", GlobalEnv)

	err := godotenv.Load(filePath)
	return err
}

func loadFlags() error {
	envFlag := flag.String("env", string(LocalEnv), "Environment type")
	flag.Parse()

	switch Environment(*envFlag) {
	case StageEnv, LocalEnv, DevEnv, ProdEnv:
		GlobalEnv = Environment(*envFlag)
	default:
		return errors.New("invalid environment type")
	}

	return nil
}
