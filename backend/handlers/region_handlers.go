package handlers

import (
	"backend/models"
	"backend/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST /regions
func CreateRegionHandler(c *gin.Context) {
	var req models.Region
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
			"msg":   err.Error(),
		})
		return
	}

	if err := repositories.CreateRegion(req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to create region",
			"msg":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "region created successfully",
		"data":    req,
	})
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
