package handlers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type VerifyRequest struct {
	Role      string `json:"role" binding:"required"`
	SecretKey string `json:"secret_key" binding:"required"`
}

func VerifySecretKey(c *gin.Context) {
	var req VerifyRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}

	// Ambil secret key dari .env sesuai role
	var expectedKey string
	switch req.Role {
	case "proposer":
		expectedKey = os.Getenv("USER_SECRET_KEY_PROPOSER")
	case "auditor":
		expectedKey = os.Getenv("USER_SECRET_KEY_AUDITOR")
	case "owner":
		expectedKey = os.Getenv("USER_SECRET_KEY_OWNER")
	default:
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Role tidak valid",
		})
		return
	}

	// Validasi key
	if req.SecretKey != expectedKey {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Secret Key tidak valid",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Verifikasi berhasil",
		"role":    req.Role,
	})
}
