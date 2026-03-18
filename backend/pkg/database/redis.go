package database

import (
	"fmt"

	"github.com/redis/go-redis/v9"
	"github.com/ufatfat/clawbench/backend/pkg/config"
)

func NewRedis(cfg config.RedisConfig) (*redis.Client, error) {
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", cfg.Host, cfg.Port),
		Password: cfg.Password, // no password set
		DB:       cfg.DB,       // use default DB
	})

	return rdb, nil
}
