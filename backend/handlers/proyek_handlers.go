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

	// Upload gambar (opsional)
	file, _ := c.FormFile("gambar")
	var filePath string
	if file != nil {
		filename := fmt.Sprintf("%d_%s", time.Now().Unix(), filepath.Base(file.Filename))
		filePath = filepath.Join("uploads", filename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}
	}

	proyek := models.Proyek{
		Judul:          req.Judul,
		Deskripsi:      req.Deskripsi,
		ProjectManager: req.ProjectManager,
		Budget:         req.Budget,
		GambarURL:      filePath,
		RegionID:       req.RegionID,
		Status:         req.Status,
		Kategori:       req.Kategori,
	}

	if err := h.Repo.CreateProject(proyek); err != nil {
		fmt.Println("DEBUG ERROR:", err) // 👉 cek error sebenarnya
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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
