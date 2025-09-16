package handlers

import (
	"backend/configs"
	"backend/models"
	"backend/repositories"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	storage_go "github.com/supabase-community/storage-go"
)

// ✅ Upload file helper
func UploadFileToSupabase(file *multipart.FileHeader) (string, error) {
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("failed to open file: %w", err)
	}
	defer src.Close()

	// unique file path
	path := fmt.Sprintf("%d-%s", time.Now().Unix(), file.Filename)

	// must use pointer for ContentType
	contentType := "application/pdf"

	// ✅ upload ke bucket "proposals"
	_, err = configs.Storage.UploadFile("proposals", path, src, storage_go.FileOptions{
		ContentType: &contentType,
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload to Supabase: %w", err)
	}

	// build public URL (karena bucket Public)
	publicURL := fmt.Sprintf(
		"%s/storage/v1/object/public/proposals/%s",
		os.Getenv("SUPABASEURL"),
		path,
	)

	return publicURL, nil
}

// ✅ Upload proposal handler
func UploadProposalHandler(c *gin.Context) {
	if !configs.IsStorageEnabled() {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"error":   "File upload service temporarily unavailable",
			"details": "Storage service is not configured or connected",
		})
		return
	}

	// ✅ ambil userId dari token
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in token"})
		return
	}

	userIDStr, ok := userIDRaw.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID format"})
		return
	}

	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to parse user ID"})
		return
	}

	// ✅ ambil file dari form-data
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File is required"})
		return
	}

	// upload ke Supabase Storage
	publicURL, err := UploadFileToSupabase(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Upload failed",
			"details": err.Error(),
		})
		return
	}

	// simpan ke database
	proposal := models.Proposal{
		UserID:         userID,
		FileURL:        publicURL,
		StatusProposal: "menunggu", // ✅ enum sesuai schema
	}

	created, err := repositories.InsertProposal(proposal)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to save proposal",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Proposal uploaded successfully",
		"proposal": created,
	})
}

// ✅ Get all proposals
func GetAllProposalsHandler(c *gin.Context) {
	proposals, err := repositories.GetAllProposals()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch proposals"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"proposals": proposals})
}

// ✅ Get proposals by current logged-in user
func GetUserProposalsHandler(c *gin.Context) {
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in token"})
		return
	}

	userIDStr, ok := userIDRaw.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID format"})
		return
	}

	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to parse user ID"})
		return
	}

	proposals, err := repositories.GetProposalsByUser(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user proposals"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"proposals": proposals})
}

// ✅ Get proposal by ID
func GetProposalByIDHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid proposal ID"})
		return
	}

	proposal, err := repositories.GetProposalByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Proposal not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"proposal": proposal})
}
