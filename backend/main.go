package main

import (
	"backend/configs"
	"backend/routes"
	"fmt"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	configs.ConnectSupaBase()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8081"}, // asal frontend-mu
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// ✅ Daftarin routes
	routes.AuthRoutes(r)
	routes.ProjectRoutes(r)
	routes.ProgressRoutes(r)

	fmt.Println("Server running on port 8080 🚀")
	r.Run(":8080")
}
