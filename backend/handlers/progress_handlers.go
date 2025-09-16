// handlers/progress_handler.go
package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/schemas"
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

type ProgressHandler struct {
	Repo *repositories.ProgressRepository
}

func NewProgressHandler(repo *repositories.ProgressRepository) *ProgressHandler {
	return &ProgressHandler{Repo: repo}
}

// Create Progress
func (h *ProgressHandler) CreateProgress(c *gin.Context) {
	var req schemas.ProgressRequest

	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Upload file gambar (opsional)
	var filePath string
	file, err := c.FormFile("gambar")
	if err == nil {
		filename := fmt.Sprintf("%d_%s", time.Now().Unix(), filepath.Base(file.Filename))
		filePath = "uploads/" + filename
		if saveErr := c.SaveUploadedFile(file, filePath); saveErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}
	}

	progress := models.ProgressProyek{
		ProyekID:       req.ProyekID,
		Title:          req.Title,
		Gambar:         filePath,
		Deskripsi:      req.Deskripsi,
		Penjelasan:     req.Penjelasan,
		ProjectManager: req.ProjectManager,
		Anggaran:       req.Anggaran,
		Status:         req.Status,
	}

	if err := h.Repo.CreateProgress(progress); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create progress"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Progress created successfully", "data": progress})
}

// Get All Progress
func (h *ProgressHandler) GetAllProgress(c *gin.Context) {
	progresses, err := h.Repo.GetAllProgress()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch progress"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": progresses})
}

// Get Progress By Project ID
func (h *ProgressHandler) GetProgressByProjectID(c *gin.Context) {
	projectID := c.Param("proyek_id")

	progresses, err := h.Repo.GetProgressByProjectID(toInt(projectID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch progress"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": progresses})
}

// helper convert string to int
func toInt(s string) int {
	var i int
	fmt.Sscan(s, &i)
	return i
}
