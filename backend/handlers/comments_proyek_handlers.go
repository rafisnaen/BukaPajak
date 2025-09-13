package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/schemas"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateCommentHandler_Proyek(c *gin.Context) {
	var req schemas.CommentRequest_Proyek
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	comment := models.Comment_Proyek{
		ProyekID:                     req.ProyekID,
		Judul:                        req.Judul,
		Isi:                          req.Isi,
		Nama:                         req.Nama,
		TransparansiProyek:           req.TransparansiProyek,
		KualitasPelaksanaanProyek:    req.KualitasPelaksanaanProyek,
		ManfaatUntukMasyarakatProyek: req.ManfaatUntukMasyarakatProyek,
		InovasiProyek:                req.InovasiProyek,
		EfisiensiAnggaranProyek:      req.EfisiensiAnggaranProyek,
		Rating:                       req.Rating,
	}

	if err := repositories.CreateComment_Proyek(comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Comment created successfully"})
}

func GetAllCommentsHandler_Proyek(c *gin.Context) {
	comments, err := repositories.GetAllComments_Proyek()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, comments)
}

func GetCommentsByProyekIDHandler_Proyek(c *gin.Context) {
	proyekID, err := strconv.Atoi(c.Param("proyek_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid proyek ID"})
		return
	}

	comments, err := repositories.GetCommentsByProyekID_Proyek(proyekID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, comments)
}
