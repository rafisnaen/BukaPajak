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

// ✅ UploadProposalAndProjectHandler
// ✅ Fixed UploadProposalAndProjectHandler with better error handling
func UploadProposalAndProjectHandler(c *gin.Context) {
	// 🔑 Ambil userId dari JWT
	userIDRaw, exists := c.Get("userId")
	if !exists {
		fmt.Printf("DEBUG: No userId found in JWT token\n")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in token"})
		return
	}

	userIDStr, ok := userIDRaw.(string)
	if !ok {
		fmt.Printf("DEBUG: userId format invalid: %v\n", userIDRaw)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID format"})
		return
	}

	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		fmt.Printf("DEBUG: Failed to parse userId: %s, error: %v\n", userIDStr, err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to parse user ID"})
		return
	}

	fmt.Printf("=== DEBUG: Processing request for userID: %d ===\n", userID)

	// ✅ Debug log isi FormData
	form, _ := c.MultipartForm()
	fmt.Printf("Received form values: %+v\n", form.Value)
	fmt.Printf("Received files: %+v\n", form.File)

	// Ambil data proyek dengan validasi
	projectName := c.PostForm("judul")
	category := c.PostForm("kategori")
	description := c.PostForm("deskripsi")
	regionIDStr := c.PostForm("region_id")
	budgetStr := c.PostForm("budget")

	// ✅ Validasi field wajib
	if projectName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project name (judul) is required"})
		return
	}
	if category == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category (kategori) is required"})
		return
	}
	if description == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Description (deskripsi) is required"})
		return
	}
	if budgetStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Budget is required"})
		return
	}

	fmt.Printf("DEBUG: Project data - Name: %s, Category: %s, Budget: %s, Region: %s\n",
		projectName, category, budgetStr, regionIDStr)

	// Convert budget → float
	budget, err := strconv.ParseFloat(budgetStr, 64)
	if err != nil {
		fmt.Printf("DEBUG: Invalid budget format: %s, error: %v\n", budgetStr, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid budget format"})
		return
	}

	// Convert region_id → int (opsional)
	var regionID *int
	if regionIDStr != "" {
		regionInt, err := strconv.Atoi(regionIDStr)
		if err != nil {
			fmt.Printf("DEBUG: Invalid region_id format: %s, error: %v\n", regionIDStr, err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid region_id format"})
			return
		}
		regionID = &regionInt
		fmt.Printf("DEBUG: Using region_id: %d\n", *regionID)
	} else {
		fmt.Printf("DEBUG: No region_id provided\n")
	}

	// ✅ Validasi file uploads
	imageFile, _ := c.FormFile("gambar")
	proposalFile, _ := c.FormFile("proposal")

	if imageFile == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Image file (gambar) is required"})
		return
	}
	if proposalFile == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Proposal file (proposal) is required"})
		return
	}

	fmt.Printf("DEBUG: Files - Image: %s, Proposal: %s\n", imageFile.Filename, proposalFile.Filename)

	// Pastikan folder uploads ada
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		if err := os.Mkdir("uploads", os.ModePerm); err != nil {
			fmt.Printf("DEBUG: Failed to create uploads directory: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
			return
		}
	}

	// Upload gambar proyek
	var imagePath string
	if imageFile != nil {
		filename := fmt.Sprintf("%d_%s", time.Now().Unix(), filepath.Base(imageFile.Filename))
		imagePath = filepath.Join("uploads", filename)
		if err := c.SaveUploadedFile(imageFile, imagePath); err != nil {
			fmt.Printf("DEBUG: Failed to save image: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}
		fmt.Printf("DEBUG: Image saved to: %s\n", imagePath)
	}

	// ✅ Simpan ke tabel proyek
	proyek := models.Proyek{
		Judul:     projectName,
		Deskripsi: description,
		Budget:    budget,
		GambarURL: imagePath,
		RegionID:  regionID,
		Status:    "belum dimulai",
		Kategori:  category,
	}

	fmt.Printf("DEBUG: Creating project: %+v\n", proyek)

	repo := repositories.NewProjectRepository()
	projectID, err := repo.CreateProject(proyek)
	if err != nil {
		fmt.Printf("DEBUG: Failed to create project: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create project",
			"details": err.Error(),
		})
		return
	}

	fmt.Printf("DEBUG: Project created with ID: %d\n", projectID)

	// Upload file proposal (PDF)
	var proposalPath string
	if proposalFile != nil {
		filename := fmt.Sprintf("%d_%s", time.Now().Unix(), filepath.Base(proposalFile.Filename))
		proposalPath = filepath.Join("uploads", filename)
		if err := c.SaveUploadedFile(proposalFile, proposalPath); err != nil {
			fmt.Printf("DEBUG: Failed to save proposal: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save proposal"})
			return
		}
		fmt.Printf("DEBUG: Proposal saved to: %s\n", proposalPath)
	}

	// ✅ Simpan ke tabel proposal
	proposal := models.Proposal{
		FileURL:        proposalPath,
		StatusProposal: "pending",
		UserID:         userID,
		ProjectID:      projectID,
	}

	fmt.Printf("DEBUG: Creating proposal: %+v\n", proposal)

	if err := repositories.CreateProposal(proposal); err != nil {
		fmt.Printf("DEBUG: Failed to create proposal: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create proposal",
			"details": err.Error(),
		})
		return
	}

	fmt.Printf("DEBUG: Proposal created successfully\n")

	// ✅ Success response
	c.JSON(http.StatusOK, gin.H{
		"message": "Proposal & Project created successfully",
		"data": gin.H{
			"project_id": projectID,
			"project":    proyek,
			"proposal":   proposal,
		},
	})
}
