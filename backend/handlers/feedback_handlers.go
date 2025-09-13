package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/schemas"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateFeedback(c *gin.Context) {
	var req schemas.FeedbackRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	feedback := models.Feedback{
		Nama:   req.Nama,
		Lokasi: req.Lokasi,
		Subjek: req.Subjek,
		Pesan:  req.Pesan,
	}
	if err := repositories.CreateFeedback(feedback); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Send email to Gmail
	emailBody := "You got new feedback:\n\n" +
		"Nama: " + feedback.Nama + "\n" +
		"Lokasi: " + feedback.Lokasi + "\n" +
		"Subjek: " + feedback.Subjek + "\n" +
		"Pesan: " + feedback.Pesan

	if err := utils.SendEmail("bryanthanaya1@gmail.com", "New Feedback Received", emailBody); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Feedback created and email sent successfully"})
}
func GetAllFeedbacks(c *gin.Context) {
	comments, err := repositories.GetAllFeedbacks()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, comments)
}
