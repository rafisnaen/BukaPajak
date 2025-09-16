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

// ✅ Upload file helper
// ✅ Upload file helper yang diperbaiki

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
	userID := userIDRaw.(int)

	proposals, err := repositories.GetProposalsByUser(int64(userID))
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

// Add this import to your existing imports

// Enhanced handler with better file handling and error recovery
func UploadProposalAndProjectHandler(c *gin.Context) {
	fmt.Println("📥 Mulai proses upload proposal + project")

	// Ambil user ID dari context (token)
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in token"})
		return
	}

	var userID int64
	switch v := userIDRaw.(type) {
	case string:
		parsed, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID format"})
			return
		}
		userID = parsed
	case int:
		userID = int64(v)
	case int64:
		userID = v
	default:
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID type"})
		return
	}

	// Ambil form data
	projectName := strings.TrimSpace(c.PostForm("judul"))
	category := strings.TrimSpace(c.PostForm("kategori"))
	description := strings.TrimSpace(c.PostForm("deskripsi"))
	regionIDStr := strings.TrimSpace(c.PostForm("region_id"))
	budgetStr := strings.TrimSpace(c.PostForm("budget"))

	// Validasi wajib isi
	validationErrors := make(map[string]string)
	if projectName == "" {
		validationErrors["judul"] = "Judul proyek wajib diisi"
	}
	if category == "" {
		validationErrors["kategori"] = "Kategori proyek wajib diisi"
	}
	if description == "" {
		validationErrors["deskripsi"] = "Deskripsi proyek wajib diisi"
	}
	if budgetStr == "" {
		validationErrors["budget"] = "Budget wajib diisi"
	}
	if len(validationErrors) > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Validasi gagal", "details": validationErrors})
		return
	}

	// Parse budget
	budget, err := strconv.ParseFloat(budgetStr, 64)
	if err != nil || budget <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format budget tidak valid"})
		return
	}

	// Parse region_id -> int64
	var regionID *int64
	if regionIDStr != "" {
		rid, err := strconv.ParseInt(regionIDStr, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Format region_id tidak valid"})
			return
		}

		// Cek region ada/tidak
		repo := repositories.NewProjectRepository()
		exists, err := repo.CheckRegionExists(rid)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal validasi provinsi", "details": err.Error()})
			return
		}
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Provinsi tidak valid"})
			return
		}
		regionID = &rid
	}

	// Validasi file
	imageFile, err := c.FormFile("gambar")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File gambar wajib diupload"})
		return
	}
	proposalFile, err := c.FormFile("proposal")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File proposal wajib diupload"})
		return
	}

	// Validasi ukuran file
	const maxImageSize = 5 * 1024 * 1024     // 5MB
	const maxProposalSize = 10 * 1024 * 1024 // 10MB
	if imageFile.Size > maxImageSize {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ukuran gambar tidak boleh lebih dari 5MB"})
		return
	}
	if proposalFile.Size > maxProposalSize {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ukuran file proposal tidak boleh lebih dari 10MB"})
		return
	}

	// Validasi ekstensi
	imageExt := strings.ToLower(filepath.Ext(imageFile.Filename))
	if imageExt != ".jpg" && imageExt != ".jpeg" && imageExt != ".png" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format gambar harus JPG/PNG"})
		return
	}
	if strings.ToLower(filepath.Ext(proposalFile.Filename)) != ".pdf" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format proposal harus PDF"})
		return
	}

	// Upload gambar (retry 3x)
	var imageURL string
	maxRetries := 3
	for retry := 0; retry < maxRetries; retry++ {
		imageURL, err = UploadFileToSupabase(imageFile)
		if err == nil {
			break
		}
		if retry == maxRetries-1 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal upload gambar", "details": err.Error()})
			return
		}
		time.Sleep(time.Second * time.Duration(retry+1))
	}

	// Buat object proyek
	proyek := models.Proyek{
		Judul:     projectName,
		Deskripsi: description,
		Budget:    budget,
		GambarURL: imageURL,
		RegionID:  regionID,
		Status:    "belum dimulai",
		Kategori:  category,
	}

	// Insert proyek ke DB
	repo := repositories.NewProjectRepository()
	projectID, err := repo.CreateProject(proyek)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat proyek", "details": err.Error()})
		return
	}
	proyek.ID = projectID

	// Upload proposal (retry 3x)
	var proposalURL string
	for retry := 0; retry < maxRetries; retry++ {
		proposalURL, err = UploadFileToSupabase(proposalFile)
		if err == nil {
			break
		}
		if retry == maxRetries-1 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal upload proposal", "details": err.Error()})
			return
		}
		time.Sleep(time.Second * time.Duration(retry+1))
	}

	// Insert proposal ke DB
	proposal := models.Proposal{
		FileURL:        proposalURL,
		StatusProposal: "menunggu",
		UserID:         userID,
		ProjectID:      projectID,
	}
	if err := repositories.CreateProposal(proposal); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat proposal", "details": err.Error()})
		return
	}

	// Response sukses
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Proposal & proyek berhasil dibuat",
		"data": gin.H{
			"project_id": projectID,
			"project":    proyek,
			"proposal":   proposal,
		},
	})
}

// Enhanced file upload with better error handling
func UploadFileToSupabase(file *multipart.FileHeader) (string, error) {
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
