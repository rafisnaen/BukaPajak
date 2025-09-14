package handlers

import (
	"backend/repositories"
	"math/big"
	"net/http"
	"strconv"

	"github.com/ethereum/go-ethereum/common"
	"github.com/gin-gonic/gin"
)

func SubmitProposalHandler(c *gin.Context) {
	var req struct {
		DocHash     string `json:"doc_hash" binding:"required"`
		Amount      int64  `json:"amount" binding:"required"`
		ProjectType uint8  `json:"project_type" binding:"required"`
		Description string `json:"description" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request: " + err.Error()})
		return
	}

	txHash, err := repositories.SubmitProposal(req.DocHash, big.NewInt(req.Amount), req.ProjectType, req.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to submit proposal: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Proposal submitted successfully",
		"tx_hash":      txHash,
		"doc_hash":     req.DocHash,
		"amount_wei":   req.Amount,
		"project_type": req.ProjectType,
	})
}

func GetContractBalanceHandler(c *gin.Context) {
	balance, err := repositories.GetContractBalance()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get balance: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"balance_wei": balance.String(),
		"balance_eth": new(big.Float).Quo(new(big.Float).SetInt(balance), big.NewFloat(1e18)).String(),
	})
}

func GetAvailableFundsHandler(c *gin.Context) {
	funds, err := repositories.GetAvailableFunds()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get available funds: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"available_funds_wei": funds.String(),
		"available_funds_eth": new(big.Float).Quo(new(big.Float).SetInt(funds), big.NewFloat(1e18)).String(),
	})
}

func GetProposalHandler(c *gin.Context) {
	proposalID := c.Param("id")

	id := new(big.Int)
	_, success := id.SetString(proposalID, 10)
	if !success {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid proposal ID"})
		return
	}

	proposal, err := repositories.GetProposal(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get proposal: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"proposal": proposal,
	})
}

func ApproveProposalHandler(c *gin.Context) {
	proposalID := c.Param("id")

	id := new(big.Int)
	_, success := id.SetString(proposalID, 10)
	if !success {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid proposal ID"})
		return
	}

	txHash, err := repositories.ApproveProposal(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to approve proposal: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Proposal approved successfully",
		"tx_hash":     txHash,
		"proposal_id": proposalID,
	})
}

func RejectProposalHandler(c *gin.Context) {
	proposalID := c.Param("id")

	id := new(big.Int)
	_, success := id.SetString(proposalID, 10)
	if !success {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid proposal ID"})
		return
	}

	var req struct {
		Reason string `json:"reason" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request: " + err.Error()})
		return
	}

	txHash, err := repositories.RejectProposal(id, req.Reason)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to reject proposal: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Proposal rejected",
		"tx_hash":     txHash,
		"proposal_id": proposalID,
		"reason":      req.Reason,
	})
}

func ReleaseFundsHandler(c *gin.Context) {
	var req struct {
		ProposalID string `json:"proposal_id" binding:"required"`
		ToAddress  string `json:"to_address" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request: " + err.Error()})
		return
	}

	id := new(big.Int)
	_, success := id.SetString(req.ProposalID, 10)
	if !success {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid proposal ID"})
		return
	}

	if !common.IsHexAddress(req.ToAddress) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid Ethereum address"})
		return
	}

	toAddress := common.HexToAddress(req.ToAddress)

	txHash, err := repositories.ReleaseFunds(id, toAddress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to release funds: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Funds released successfully",
		"tx_hash":     txHash,
		"proposal_id": req.ProposalID,
		"to_address":  req.ToAddress,
	})
}

func GetPendingProposalsHandler(c *gin.Context) {
	proposals, err := repositories.GetPendingProposals()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get pending proposals: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"pending_proposals": proposals,
		"count":             len(proposals),
	})
}

func GetProposalsByStatusHandler(c *gin.Context) {
	statusStr := c.Param("status")
	status, err := strconv.ParseUint(statusStr, 10, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid status parameter"})
		return
	}

	proposals, err := repositories.GetProposalsByStatus(uint8(status))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get proposals: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"proposals": proposals,
		"count":     len(proposals),
		"status":    status,
	})
}

func GetUserProposalsHandler(c *gin.Context) {
	address := c.Param("address")

	if !common.IsHexAddress(address) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid Ethereum address"})
		return
	}

	userAddress := common.HexToAddress(address)

	proposals, err := repositories.GetUserProposals(userAddress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get user proposals: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"proposals": proposals,
		"count":     len(proposals),
		"user":      address,
	})
}

func DepositHandler(c *gin.Context) {
	var req struct {
		Amount int64 `json:"amount" binding:"required"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request: " + err.Error()})
		return
	}

	txHash, err := repositories.Deposit(big.NewInt(req.Amount))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to deposit: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Funds deposited successfully",
		"tx_hash":    txHash,
		"amount_wei": req.Amount,
		"amount_eth": new(big.Float).Quo(new(big.Float).SetInt(big.NewInt(req.Amount)), big.NewFloat(1e18)).String(),
	})
}
