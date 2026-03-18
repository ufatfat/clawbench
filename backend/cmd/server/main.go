package main

import (
	"log"

	"github.com/ufatfat/clawbench/backend/pkg/config"
	"github.com/ufatfat/clawbench/backend/pkg/database"
	"github.com/ufatfat/clawbench/backend/pkg/logger"
	"github.com/ufatfat/clawbench/backend/internal/api"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	logger.Init(cfg.Log.Level)

	db, err := database.NewPostgres(cfg.DB)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	rdb, err := database.NewRedis(cfg.Redis)
	if err != nil {
		log.Fatalf("failed to connect to redis: %v", err)
	}

	router := api.NewRouter(db, rdb)
	router.Run(":" + cfg.Server.Port)
}
