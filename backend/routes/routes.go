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
		api.GET("", projectHandler.GetAllProjects)
		api.GET("/:id", projectHandler.GetProjectByID)
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
		api.POST("/proposals", handlers.SubmitProposalHandler)
		api.GET("/proposals/pending", handlers.GetPendingProposalsHandler)
		api.GET("/proposals/status/:status", handlers.GetProposalsByStatusHandler)
		api.GET("/proposals/user/:address", handlers.GetUserProposalsHandler)
		api.GET("/proposals/:id", handlers.GetProposalHandler)
		api.POST("/proposals/:id/approve", handlers.ApproveProposalHandler)
		api.POST("/proposals/:id/reject", handlers.RejectProposalHandler)

		// Fund management endpoints
		api.POST("/deposit", handlers.DepositHandler)
		api.POST("/release", handlers.ReleaseFundsHandler)

		// Info endpoints
		api.GET("/balance", handlers.GetContractBalanceHandler)
		api.GET("/available-funds", handlers.GetAvailableFundsHandler)
	}
}
