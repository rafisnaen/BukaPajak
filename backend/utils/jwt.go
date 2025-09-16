package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Sekarang userID bertipe int
func GenerateJWT(userID int, email string) (string, error) {
	secret := []byte(os.Getenv("JWT_SECRET"))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID, // simpan sebagai int
		"email":   email,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})

	return token.SignedString(secret)
}
