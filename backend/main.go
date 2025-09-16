package main

import (
	"backend/configs"
	"backend/routes"
	"log"
	"time"

	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to Supabase
	if err := configs.ConnectSupaBase(); err != nil {
		log.Printf("⚠️  Supabase connection issues: %v", err)
		log.Printf("⚠️  Some features may be limited, but starting server anyway...")
	}

	// Connect to Ethereum (but don't crash if it fails)
	var ethErr error
	var ethClient *ethclient.Client
	ethClient, ethErr = configs.ConnectEth()
	if ethErr != nil {
		log.Printf("⚠️  Ethereum connection failed: %v", ethErr)
		log.Printf("⚠️  Smart contract features will be disabled")
	} else {
		defer ethClient.Close()
		log.Printf("✅ Ethereum client connected successfully")
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8081", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Register routes
	routes.AuthRoutes(r)
	routes.ProjectRoutes(r)
	routes.ProgressRoutes(r)
	routes.CommentRoutes(r)
	routes.CommentRoutes_Proyek(r)
	routes.Feedback(r)
	routes.SmartContract(r)
	routes.WalletRoutes(r)
	routes.RegionRoutes(r)
	routes.ProposalRoutes(r)
	routes.VerifikasiRoute(r)

	// Health check endpoint
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message":            "Backend server is running",
			"status":             "healthy",
			"ethereum_connected": ethErr == nil,
			"supabase_connected": configs.Supabase != nil,
			"storage_connected":  configs.Storage != nil,
		})
	})

	// 404 handler
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{
			"error":   "Endpoint not found",
			"path":    c.Request.URL.Path,
			"message": "Check the API documentation for available endpoints",
		})
	})

	log.Printf("Server running on port 8080 🚀")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
