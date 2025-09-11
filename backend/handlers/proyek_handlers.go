package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/schemas"
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type ProjectHandler struct {
	Repo *repositories.ProjectRepository
}

// Constructor
func NewProjectHandler(repo *repositories.ProjectRepository) *ProjectHandler {
	return &ProjectHandler{Repo: repo}
}

// Create Project
func (h *ProjectHandler) CreateProject(c *gin.Context) {
	var req schemas.ProjectRequest

	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file, err := c.FormFile("gambar")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gambar is required"})
		return
	}

	// Simpan file di folder uploads
	filename := fmt.Sprintf("%d_%s", time.Now().Unix(), filepath.Base(file.Filename))
	filePath := "uploads/" + filename
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	proyek := models.Proyek{
		Judul:          req.Judul,
		Deskripsi:      req.Deskripsi,
		ProjectManager: req.ProjectManager,
		Gambar:         filePath,
	}

	if err := h.Repo.CreateProject(proyek); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Project created successfully", "data": proyek})
}

// Get All Projects
func (h *ProjectHandler) GetAllProjects(c *gin.Context) {
	projects, err := h.Repo.GetAllProjects()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": projects})
}

// Get Project By ID
func (h *ProjectHandler) GetProjectByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	project, err := h.Repo.GetProjectByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": project})
}
