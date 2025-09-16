package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/schemas"
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST /regions
func CreateRegionHandler(c *gin.Context) {
	var req schemas.CreateRegionRequest
	if err := c.ShouldBindJSON(&req); err != nil { // JSON
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	region := models.Region{
		NamaRegion:     req.NamaRegion,
		DanaDiterima:   req.DanaDiterima,
		DanaDipakai:    req.DanaDipakai,
		Kota:           req.Kota,
		TotalProyek:    req.TotalProyek,
		Selesai:        req.Selesai,
		Berlangsung:    req.Berlangsung,
		JumlahPenduduk: req.JumlahPenduduk,
	}

	if err := repositories.CreateRegion(region); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Region created successfully", "data": region})
}

// GET /regions
func GetAllRegions(c *gin.Context) {
	regions, err := repositories.GetAllRegions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch regions",
			"msg":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, regions)
}
