package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/schemas"
	"backend/utils"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var req schemas.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Load keys from env
	proposerKey := os.Getenv("USER_SECRET_KEY_PROPOSER")
	auditorKey := os.Getenv("USER_SECRET_KEY_AUDITOR")
	ownerKey := os.Getenv("USER_SECRET_KEY_OWNER")

	// Validate secret key
	if req.SecretKey != proposerKey && req.SecretKey != auditorKey && req.SecretKey != ownerKey {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid secret key"})
		return
	}

	// Hash password
	hash, _ := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)

	user := models.UserPemerintah{
		Email:    req.Email,
		Password: string(hash),
	}

	if err := repositories.CreateUser(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Register success"})
}

func Login(c *gin.Context) {
	var req schemas.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	users, err := repositories.GetUserByEmail(req.Email)
	if err != nil || len(users) == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	user := users[0]
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		return
	}

	// In Login
	token, err := utils.GenerateJWT(fmt.Sprintf("%d", user.ID), user.Email) // cast int to string
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
