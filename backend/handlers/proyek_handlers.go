package handlers

import (
	"backend/configs"
	"backend/models"
	"backend/repositories" // ✅ tambahkan ini
	"context"
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	storage_go "github.com/supabase-community/storage-go"
)

func CreateProyekHandler(c *gin.Context) {
	var proyek models.Proyek

	// Ambil field dari form-data
	proyek.Judul = c.PostForm("judul")
	proyek.Deskripsi = c.PostForm("deskripsi")
	proyek.Status = c.PostForm("status")
	proyek.Kategori = c.PostForm("kategori")
	proyek.Alamat = c.PostForm("alamat")

	// Budget
	if budgetStr := c.PostForm("budget"); budgetStr != "" {
		budget, err := strconv.ParseFloat(budgetStr, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid budget"})
			return
		}
		proyek.Budget = budget
	}

	// Region ID
	if regionStr := c.PostForm("region_id"); regionStr != "" {
		regionID, err := strconv.ParseInt(regionStr, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid region_id"})
			return
		}
		proyek.RegionID = &regionID
	}

	// Upload file ke Supabase Storage
	file, err := c.FormFile("gambar")
	if err == nil { // kalau user upload file
		src, err := file.Open()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "cannot open file"})
			return
		}
		defer src.Close()

		ext := filepath.Ext(file.Filename)
		fileName := fmt.Sprintf("proyek_%d%s", time.Now().UnixNano(), ext)

		ct := file.Header.Get("Content-Type")

		// ✅ UploadFile tanpa file.Size
		_, err = configs.Storage.UploadFile(
			"proposals",
			fileName,
			src,
			storage_go.FileOptions{ContentType: &ct},
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload file: " + err.Error()})
			return
		}

		// URL publik
		publicURL := fmt.Sprintf(
			"https://%s.supabase.co/storage/v1/object/public/proposals/%s",
			configs.SupabaseRef,
			fileName,
		)
		proyek.GambarURL = publicURL
	} // <-- This closes the if statement for file upload

	// TODO: Add code here to save the proyek to database
	// For example:
	// err = repositories.CreateProyek(context.Background(), &proyek)
	// if err != nil {
	//     c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	//     return
	// }

	c.JSON(http.StatusOK, gin.H{"message": "Proyek created successfully", "proyek": proyek})
} // <-- This was the missing closing brace for the function

func GetAllProyekHandler(c *gin.Context) {
	list, err := repositories.GetAllProyek(context.Background()) // ✅
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

func GetProyekByIDHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	proyek, err := repositories.GetProyekByID(context.Background(), id) // ✅
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, proyek)
}
