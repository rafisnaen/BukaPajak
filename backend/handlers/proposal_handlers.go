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

	// ✅ use UploadFile (takes io.Reader)
	_, err = configs.Storage.UploadFile("proposals", path, src, storage_go.FileOptions{
		ContentType: &contentType,
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload to Supabase: %w", err)
	}

	// build public URL (since bucket is Public)
	publicURL := fmt.Sprintf(
		"%s/storage/v1/object/public/proposals/%s",
		os.Getenv("SUPABASEURL"),
		path,
	)

	return publicURL, nil
}

// ✅ Upload proposal handler
// ✅ Upload proposal handler
func UploadProposalHandler(c *gin.Context) {

	if !configs.IsStorageEnabled() {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"error":   "File upload service temporarily unavailable",
			"details": "Storage service is not configured or connected",
		})
		return
	}

	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in token"})
		return
	}

	// ✅ Convert userId ke int64
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

	// Get file
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File is required"})
		return
	}

	// Upload to Supabase
	publicURL, err := UploadFileToSupabase(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Upload failed",
			"details": err.Error(),
		})
		return
	}

	// Save proposal in DB
	proposal := models.Proposal{
		UserID:         int(userID), // ✅ sudah int64
		FileURL:        publicURL,
		StatusProposal: "menunggu",
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

	// ✅ convert string → int64
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

// Add this to your handlers/proposal.go
func CheckConfigHandler(c *gin.Context) {
	config := gin.H{
		"supabase_connected":  configs.Supabase != nil,
		"storage_connected":   configs.Storage != nil,
		"storage_enabled":     configs.IsStorageEnabled(),
		"supabase_ref":        configs.SupabaseRef,
		"env_url_set":         os.Getenv("SUPABASEURL") != "",
		"env_service_key_set": os.Getenv("SUPABASE_SERVICE_KEY") != "",
	}

	c.JSON(http.StatusOK, config)
}
