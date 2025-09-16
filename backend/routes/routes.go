package routes

import (
	"backend/handlers"
	"backend/middlewares"
	"backend/repositories"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)
}

func ProjectRoutes(r *gin.Engine) {
	repo := repositories.NewProjectRepository()
	projectHandler := handlers.NewProjectHandler(repo)

	api := r.Group("/admin/projects")
	api.Use(middlewares.AuthMiddleware())
	{
		api.POST("", projectHandler.CreateProject)

	}
	Project := r.Group("/admin/projects")
	{
		Project.GET("", projectHandler.GetAllProjects)
		Project.GET("/:id", projectHandler.GetProjectByID)
	}
}
func RegionRoutes(r *gin.Engine) {
	api := r.Group("/api/v1/regions") // ✅ konsisten dengan frontend
	{
		// Public GET
		api.GET("", handlers.GetAllRegions)

		// Protected POST
		api.Use(middlewares.AuthMiddleware())
		api.POST("", handlers.CreateRegionHandler)
	}
}

func ProgressRoutes(r *gin.Engine) {
	repo := repositories.NewProgressRepository()
	progressHandler := handlers.NewProgressHandler(repo)

	api := r.Group("/admin/progress") // ← Change to /admin/progress
	api.Use(middlewares.AuthMiddleware())
	{
		api.POST("", progressHandler.CreateProgress)                   // POST /admin/progress
		api.GET("", progressHandler.GetAllProgress)                    // GET /admin/progress
		api.GET("/:proyek_id", progressHandler.GetProgressByProjectID) // GET /admin/progress/:proyek_id
	}
}
func CommentRoutes(r *gin.Engine) {
	comment := r.Group("/comments")
	{
		comment.POST("/progress", handlers.CreateCommentHandler)
		comment.GET("/progress", handlers.GetAllCommentsHandler)
		comment.GET("/progress/:progress_id", handlers.GetCommentsByProgressIDHandler)
	}
}

func CommentRoutes_Proyek(r *gin.Engine) {
	comment := r.Group("/comments")
	{
		comment.POST("/proyek", handlers.CreateCommentHandler_Proyek)
		comment.GET("/proyek", handlers.GetAllCommentsHandler_Proyek)
		comment.GET("/proyek/:proyek_id", handlers.GetCommentsByProyekIDHandler_Proyek) // Changed handler name
	}
}

func Feedback(r *gin.Engine) {
	Feedback := r.Group("/feedback")
	{
		Feedback.POST("", handlers.CreateFeedback)
		Feedback.GET("", handlers.GetAllFeedbacks)
	}
}

func SmartContract(router *gin.Engine) {
	api := router.Group("/api/v1")
	{
		// Proposal endpoints
		api.POST("/proposals_sc", handlers.SubmitProposalHandler) // Renamed to avoid conflict
		api.GET("/proposals_sc/pending", handlers.GetPendingProposalsHandler)
		api.GET("/proposals_sc/status/:status", handlers.GetProposalsByStatusHandler)
		// api.GET("/proposals_sc/user/:address", handlers.GetUserProposalsHandler) // This is now handled by /proposals/me
		api.POST("/proposals_sc/:id/approve", handlers.ApproveProposalHandler)
		api.POST("/proposals_sc/:id/reject", handlers.RejectProposalHandler)

		// Fund management endpoints
		api.POST("/deposit", handlers.DepositHandler)
		api.POST("/release", handlers.ReleaseFundsHandler)

		// Info endpoints
		api.GET("/balance", handlers.GetContractBalanceHandler)
		api.GET("/available-funds", handlers.GetAvailableFundsHandler)
	}
}

func WalletRoutes(r *gin.Engine) {
	api := r.Group("/api")

	api.GET("/wallet/nonce", handlers.GenerateNonce)
	api.POST("/wallet/verify", handlers.VerifyWallet)
}

func ProposalRoutes(r *gin.Engine) {
	api := r.Group("/api/v1")
	// Semua rute di grup ini memerlukan autentikasi
	api.Use(middlewares.AuthMiddleware())
	{
		// Rute untuk membuat project + proposal sekaligus
		api.POST("/proposals/full", handlers.UploadProposalAndProjectHandler)

		// Rute untuk mendapatkan semua proposal (mungkin untuk admin/auditor)
		api.GET("/proposals", handlers.GetAllProposalsHandler)

		// Rute untuk mendapatkan proposal milik user yang sedang login
		api.GET("/proposals/me", handlers.GetUserProposalsHandler)

		// Rute untuk mendapatkan detail proposal berdasarkan ID
		api.GET("/proposals/:id", handlers.GetProposalByIDHandler)
	}
}

func VerifikasiRoute(r *gin.Engine) {
	api := r.Group("/api")
	api.POST("/verify", handlers.VerifySecretKey)
}
