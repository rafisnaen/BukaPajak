package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/schemas"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateCommentHandler(c *gin.Context) {
	var req schemas.CommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	comment := models.Comment{
		ProgressID:                  req.ProgressID,
		Judul:                       req.Judul,
		Isi:                         req.Isi,
		Nama:                        req.Nama,
		TransparansiProgress:        req.TransparansiProgress,
		KualitasPelaksanaanProgress: req.KualitasPelaksanaanProgress,
		EffisiensiAnggaranProgress:  req.EffisiensiAnggaranProgress,
	}

	if err := repositories.CreateComment(comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Comment created successfully"})
}

func GetAllCommentsHandler(c *gin.Context) {
	comments, err := repositories.GetAllComments()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, comments)
}

func GetCommentsByProgressIDHandler(c *gin.Context) {
	progressID, err := strconv.Atoi(c.Param("progress_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid progress ID"})
		return
	}

	comments, err := repositories.GetCommentsByProgressID(progressID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, comments)
}
