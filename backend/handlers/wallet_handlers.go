package handlers

import (
	"backend/repositories"
	"backend/schemas"
	"backend/utils"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"net/http"
	"strings"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gin-gonic/gin"
)

// Generate nonce (dipanggil sebelum sign di frontend)
func GenerateNonce(c *gin.Context) {
	email := c.Query("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email required"})
		return
	}

	// buat random nonce
	nonceBytes := make([]byte, 16)
	_, _ = rand.Read(nonceBytes)
	nonce := hex.EncodeToString(nonceBytes)

	// simpan ke database
	if err := repositories.SetWalletNonce(email, nonce); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, schemas.NonceResponse{Nonce: nonce})
}

func VerifyWallet(c *gin.Context) {
	var req schemas.VerifyWalletRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ambil nonce dari DB
	nonce, err := repositories.GetWalletNonce(req.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nonce not found"})
		return
	}

	// pesan yang harus ditandatangani
	message := []byte(fmt.Sprintf("Login BukaPajak: %s", nonce))
	msgHash := crypto.Keccak256Hash(
		[]byte(fmt.Sprintf("\x19Ethereum Signed Message:\n%d%s", len(message), message)),
	)

	// parse signature - FIXED: Remove the empty declaration
	sig, err := hex.DecodeString(req.Signature[2:]) // hapus "0x"
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid signature"})
		return
	}
	if sig[64] != 27 && sig[64] != 28 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid V value"})
		return
	}
	sig[64] -= 27

	pubKey, err := crypto.SigToPub(msgHash.Bytes(), sig)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to recover pubkey"})
		return
	}
	recoveredAddr := crypto.PubkeyToAddress(*pubKey).Hex()

	// cek apakah sama dengan address yang dikirim - FIXED: Use strings.EqualFold
	if !strings.EqualFold(recoveredAddr, req.Address) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "address mismatch"})
		return
	}

	// simpan wallet ke user
	if err := repositories.SaveWalletAddress(req.Email, recoveredAddr); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// GENERATE JWT TOKEN using your existing utility
	token, err := utils.GenerateJWT(req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	// Return the token to frontend - THIS IS WHAT YOUR FRONTEND EXPECTS
	c.JSON(http.StatusOK, gin.H{
		"token":   token, // Frontend expects this field
		"message": "Wallet connected successfully",
	})
}
