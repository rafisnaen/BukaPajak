package handlers

import (
	"backend/configs"
	"backend/models"
	"backend/repositories"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	storage_go "github.com/supabase-community/storage-go"
)

// POST /proposals
func UploadProposalHandler(c *gin.Context) {
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	userID, _ := strconv.ParseInt(fmt.Sprint(userIDRaw), 10, 64)

	projectIDStr := c.PostForm("project_id")
	projectID, err := strconv.ParseInt(projectIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project_id"})
		return
	}

	// File proposal wajib
	proposalFile, err := c.FormFile("proposal")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Proposal file is required"})
		return
	}

	// Validasi PDF
	if filepath.Ext(proposalFile.Filename) != ".pdf" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Proposal must be PDF"})
		return
	}

	proposalURL, err := UploadFileToSupabase(proposalFile)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Gagal upload proposal",
			"details": err.Error(),
		})
		return
	}

	proposal := models.Proposal{
		FileURL:        proposalURL,
		StatusProposal: "menunggu",
		UserID:         userID,
		ProjectID:      projectID,
	}

	if err := repositories.CreateProposal(proposal); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Gagal menyimpan proposal",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Proposal berhasil diupload",
		"data":    proposal,
	})
}

// Enhanced file upload with better error handling
func UploadFileToSupabase(file *multipart.FileHeader) (string, error) {
	if !configs.IsStorageEnabled() {
		return "", fmt.Errorf("fitur storage tidak aktif, periksa konfigurasi server")
	}

	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("failed to open file: %w", err)
	}
	defer src.Close()

	// Create unique file path
	ext := filepath.Ext(file.Filename)
	fileName := strings.TrimSuffix(filepath.Base(file.Filename), ext)

	// Clean filename to avoid issues
	fileName = strings.ReplaceAll(fileName, " ", "_")
	fileName = strings.ReplaceAll(fileName, "(", "")
	fileName = strings.ReplaceAll(fileName, ")", "")

	path := fmt.Sprintf("%d-%s%s", time.Now().Unix(), fileName, ext)

	// Determine content type
	var contentType string
	switch strings.ToLower(ext) {
	case ".pdf":
		contentType = "application/pdf"
	case ".jpg", ".jpeg":
		contentType = "image/jpeg"
	case ".png":
		contentType = "image/png"
	default:
		contentType = "application/octet-stream"
	}

	fmt.Printf("Uploading file: %s (type: %s, size: %d bytes)\n", path, contentType, file.Size)

	// Upload to bucket
	_, err = configs.Storage.UploadFile("proposals", path, src, storage_go.FileOptions{
		ContentType: &contentType,
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload to Supabase: %w", err)
	}

	// Build public URL
	publicURL := fmt.Sprintf(
		"%s/storage/v1/object/public/proposals/%s",
		os.Getenv("SUPABASEURL"),
		path,
	)

	fmt.Printf("File uploaded successfully: %s\n", publicURL)
	return publicURL, nil
}

func GetAllProposalsHandler(c *gin.Context) {
	proposals, err := repositories.GetAllProposals()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch proposals",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, proposals)
}

// Get Proposals for the logged-in user
func GetUserProposalsHandler(c *gin.Context) {
	// Ambil userID dari context yang sudah di-set oleh middleware
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	userID, ok := userIDRaw.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID type in context"})
		return
	}

	proposals, err := repositories.GetProposalsByUser(int64(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch user proposals",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, proposals)
}

// Get Proposal by ID
func GetProposalByIDHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid proposal ID format"})
		return
	}

	proposal, err := repositories.GetProposalByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Proposal not found",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, proposal)
}

func GetAllProposalsWithDetailHandler(c *gin.Context) {
	proposals, err := repositories.GetAllProposalsWithDetail()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch proposals with detail",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, proposals)
}
