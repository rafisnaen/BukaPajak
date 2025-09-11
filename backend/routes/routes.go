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
