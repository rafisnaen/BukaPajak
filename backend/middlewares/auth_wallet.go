package middlewares

import (
	"backend/repositories"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthWithWallet() gin.HandlerFunc {
	return func(c *gin.Context) {
		// ambil token dari header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		secret := os.Getenv("JWT_SECRET")

		claims := jwt.MapClaims{}
		_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		email := claims["sub"].(string)

		// cek apakah user sudah punya wallet
		users, err := repositories.GetUserByEmail(email)
		if err != nil || len(users) == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			c.Abort()
			return
		}
		if users[0].WalletAddress == "" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Wallet not connected"})
			c.Abort()
			return
		}

		c.Set("user", users[0])
		c.Next()
	}
}
