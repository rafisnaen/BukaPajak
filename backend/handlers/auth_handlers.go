package handlers

import (
	"backend/models"
	"backend/repositories"
	"backend/schemas"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var req schemas.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 10)

	user := models.UserPemerintah{
		Email:    req.Email,
		Password: string(hash),
		Name:     req.Name,
	}

	if err := repositories.CreateUser(user); err != nil {
		// Return actual Supabase error for debugging
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

	token, _ := utils.GenerateJWT(user.Email)
	c.JSON(http.StatusOK, gin.H{"token": token})
}
