package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/services"
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
)

// POST /proposal/upload
func UploadProposalHandler_Pinata(c *gin.Context) {
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	userID, _ := strconv.ParseInt(fmt.Sprint(userIDRaw), 10, 64)

	projectIDStr := c.PostForm("project_id")
	projectID, err := strconv.ParseInt(projectIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project_id"})
		return
	}

	proposalFile, err := c.FormFile("proposal")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Proposal file is required"})
		return
	}

	if filepath.Ext(proposalFile.Filename) != ".pdf" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Proposal must be PDF"})
		return
	}

	file, err := proposalFile.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}

	// Optional metadata to pin along with the file
	metadata := map[string]string{
		"user_id":    strconv.FormatInt(userID, 10),
		"project_id": strconv.FormatInt(projectID, 10),
		"filename":   proposalFile.Filename,
	}

	// Upload ke Pinata
	ipfsURL, err := services.UploadFileToPinata(file, proposalFile.Filename, metadata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Gagal upload ke Pinata",
			"details": err.Error(),
		})
		return
	}

	// Simpan record ke DB (supabase)
	proposal := models.Proposal{
		FileURL:        ipfsURL,
		StatusProposal: "menunggu", // atau sesuai yang kamu inginkan
		UserID:         userID,
		ProjectID:      projectID,
	}

	created, err := repositories.CreateProposal_IPFS(proposal)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Gagal menyimpan proposal",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Proposal berhasil diupload",
		"data":    created,
	})
}
