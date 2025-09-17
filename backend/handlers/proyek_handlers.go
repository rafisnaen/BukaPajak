package handlers

import (
	"backend/configs"
	"backend/models"
	"backend/repositories" // ✅ tambahkan ini
	"backend/schemas"
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
	var req schemas.ProjectRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// mapping request -> model
	proyek := models.Proyek{
		Judul:     req.Judul,
		Deskripsi: req.Deskripsi,
		Budget:    req.Budget,
		Kategori:  req.Kategori,
		Alamat:    req.Alamat,
		Status:    req.Status,
	}
	proyek.RegionID = &req.RegionID

	// upload file ke Supabase (opsional, jika ada gambar)
	file, err := c.FormFile("gambar")
	if err == nil {
		src, err := file.Open()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "cannot open file"})
			return
		}
		defer src.Close()

		ext := filepath.Ext(file.Filename)
		fileName := fmt.Sprintf("proyek_%d%s", time.Now().UnixNano(), ext)
		ct := file.Header.Get("Content-Type")

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

		publicURL := fmt.Sprintf(
			"https://%s.supabase.co/storage/v1/object/public/proposals/%s",
			configs.SupabaseRef,
			fileName,
		)
		proyek.GambarURL = publicURL
	}

	// simpan ke database via repository
	if err := repositories.CreateProyek(context.Background(), &proyek); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Proyek created successfully",
		"proyek":  proyek,
	})
}

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
