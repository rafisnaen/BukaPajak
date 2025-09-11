package main

import (
	"backend/configs"
	"backend/routes"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	configs.ConnectSupaBase()

	r := gin.Default()

	routes.AuthRoutes(r)

	fmt.Println("Server running on port 8080 🚀")
	r.Run(":8080")
}
