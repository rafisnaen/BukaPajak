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
	// 🔑 Ambil userID dari context (middleware auth)
	userIDRaw, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	userID, _ := strconv.ParseInt(fmt.Sprint(userIDRaw), 10, 64)

	// 📌 Ambil project_id dari form
	projectIDStr := c.PostForm("project_id")
	projectID, err := strconv.ParseInt(projectIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project_id"})
		return
	}

	// 📂 Ambil file proposal
	proposalFile, err := c.FormFile("proposal")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Proposal file is required"})
		return
	}

	// ✅ Validasi hanya PDF
	if filepath.Ext(proposalFile.Filename) != ".pdf" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Proposal must be PDF"})
		return
	}

	// 🔓 Buka file
	file, err := proposalFile.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
		return
	}
	defer file.Close()

	// 📦 Metadata untuk disimpan di Pinata
	metadata := map[string]string{
		"user_id":    strconv.FormatInt(userID, 10),
		"project_id": strconv.FormatInt(projectID, 10),
		"filename":   proposalFile.Filename,
	}

	// 🚀 Upload ke Pinata (akan return gateway URL)
	ipfsURL, err := services.UploadFileToPinata(file, proposalFile.Filename, metadata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Gagal upload ke Pinata",
			"details": err.Error(),
		})
		return
	}

	// 📝 Simpan ke DB lewat repository
	proposal := models.Proposal{
		FileURL:        ipfsURL,
		StatusProposal: "menunggu",
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

	// ✅ Response sukses
	c.JSON(http.StatusOK, gin.H{
		"message": "Proposal berhasil diupload",
		"data": gin.H{
			"id":          created.ID,
			"file_url":    created.FileURL,
			"cid":         created.CID,
			"gateway_url": created.GatewayURL,
			"status":      created.StatusProposal,
			"user_id":     created.UserID,
			"project_id":  created.ProjectID,
			"created_at":  created.CreatedAt,
			"updated_at":  created.UpdatedAt,
		},
	})
}
