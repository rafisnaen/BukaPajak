package handlers

import (
	"backend/repositories"
	"math/big"
	"net/http"

	"github.com/ethereum/go-ethereum/common"
	"github.com/gin-gonic/gin"
)

func TransferHandler(c *gin.Context) {
	var req struct {
		ToAddress string `json:"to_address" binding:"required"`
		AmountWei string `json:"amount_wei" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request: " + err.Error()})
		return
	}

	if !common.IsHexAddress(req.ToAddress) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid Ethereum address"})
		return
	}

	amount := new(big.Int)
	_, ok := amount.SetString(req.AmountWei, 10)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid amount"})
		return
	}

	txHash, err := repositories.TransferETH(req.ToAddress, amount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to transfer: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Transfer successful",
		"tx_hash":    txHash,
		"to_address": req.ToAddress,
		"amount_wei": req.AmountWei,
		"amount_eth": new(big.Float).Quo(new(big.Float).SetInt(amount), big.NewFloat(1e18)).String(),
	})
}
