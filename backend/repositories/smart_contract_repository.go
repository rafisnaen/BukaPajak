package repositories

import (
	"context"
	"fmt"
	"math/big"
	"os"

	"backend/configs"
	"backend/contracts"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

func getAuth(client *ethclient.Client) (*bind.TransactOpts, error) {
	privateKeyHex := os.Getenv("PRIVATE_KEY")
	if privateKeyHex == "" {
		return nil, fmt.Errorf("PRIVATE_KEY environment variable not set")
	}

	privateKey, err := crypto.HexToECDSA(privateKeyHex)
	if err != nil {
		return nil, fmt.Errorf("failed to parse private key: %v", err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(11155111)) // ChainID Sepolia
	if err != nil {
		return nil, fmt.Errorf("failed to create transactor: %v", err)
	}
	return auth, nil
}

func GetContractInstance() (*contracts.Contracts, *ethclient.Client, *bind.TransactOpts, error) {
	client, err := configs.ConnectEth()
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to connect to Ethereum: %v", err)
	}

	auth, err := getAuth(client)
	if err != nil {
		client.Close()
		return nil, nil, nil, fmt.Errorf("failed to get auth: %v", err)
	}

	contractAddress := os.Getenv("CONTRACT_ADDRESS")
	if contractAddress == "" {
		client.Close()
		return nil, nil, nil, fmt.Errorf("CONTRACT_ADDRESS environment variable not set")
	}

	address := common.HexToAddress(contractAddress)
	instance, err := contracts.NewContracts(address, client)
	if err != nil {
		client.Close()
		return nil, nil, nil, fmt.Errorf("failed to load contract: %v", err)
	}

	return instance, client, auth, nil
}

// SubmitProposal submits a new funding proposal
func SubmitProposal(ipfsHash string, amount *big.Int, projectType uint8, description string) (string, error) {
	instance, client, auth, err := GetContractInstance()
	if err != nil {
		return "", err
	}
	defer client.Close()

	tx, err := instance.SubmitProposal(auth, ipfsHash, amount, projectType, description)
	if err != nil {
		return "", fmt.Errorf("failed to submit proposal: %v", err)
	}
	return tx.Hash().Hex(), nil
}

// GetContractBalance returns the ETH balance of the contract
func GetContractBalance() (*big.Int, error) {
	_, client, _, err := GetContractInstance()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	contractAddress := os.Getenv("CONTRACT_ADDRESS")
	if contractAddress == "" {
		return nil, fmt.Errorf("CONTRACT_ADDRESS environment variable not set")
	}

	address := common.HexToAddress(contractAddress)
	balance, err := client.BalanceAt(context.Background(), address, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to get contract balance: %v", err)
	}
	return balance, nil
}

// GetAvailableFunds returns the available funds from the contract
func GetAvailableFunds() (*big.Int, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	funds, err := instance.GetAvailableFunds(opts)
	if err != nil {
		return nil, fmt.Errorf("failed to get available funds: %v", err)
	}
	return funds, nil
}

// GetProposal returns a proposal by ID
func GetProposal(id *big.Int) (contracts.TaxFundProposal, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return contracts.TaxFundProposal{}, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	proposal, err := instance.GetProposal(opts, id)
	if err != nil {
		return contracts.TaxFundProposal{}, fmt.Errorf("failed to get proposal: %v", err)
	}
	return proposal, nil
}

// ApproveProposal approves a proposal
func ApproveProposal(id *big.Int) (string, error) {
	instance, client, auth, err := GetContractInstance()
	if err != nil {
		return "", err
	}
	defer client.Close()

	tx, err := instance.ApproveProposal(auth, id)
	if err != nil {
		return "", fmt.Errorf("failed to approve proposal: %v", err)
	}
	return tx.Hash().Hex(), nil
}

// RejectProposal rejects a proposal with a reason
func RejectProposal(id *big.Int, reason string) (string, error) {
	instance, client, auth, err := GetContractInstance()
	if err != nil {
		return "", err
	}
	defer client.Close()

	tx, err := instance.RejectProposal(auth, id, reason)
	if err != nil {
		return "", fmt.Errorf("failed to reject proposal: %v", err)
	}
	return tx.Hash().Hex(), nil
}

// ReleaseFunds releases funds for an approved proposal
func ReleaseFunds(id *big.Int, to common.Address) (string, error) {
	instance, client, auth, err := GetContractInstance()
	if err != nil {
		return "", err
	}
	defer client.Close()

	tx, err := instance.ReleaseFunds(auth, id, to)
	if err != nil {
		return "", fmt.Errorf("failed to release funds: %v", err)
	}
	return tx.Hash().Hex(), nil
}

// GetPendingProposals returns all pending proposal IDs
func GetPendingProposals() ([]*big.Int, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	proposals, err := instance.GetPendingProposals(opts)
	if err != nil {
		return nil, fmt.Errorf("failed to get pending proposals: %v", err)
	}
	return proposals, nil
}

// GetProposalsByStatus returns proposals by status
func GetProposalsByStatus(status uint8) ([]*big.Int, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	proposals, err := instance.GetProposalsByStatus(opts, status)
	if err != nil {
		return nil, fmt.Errorf("failed to get proposals by status: %v", err)
	}
	return proposals, nil
}

// GetUserProposals returns proposals submitted by a specific user
func GetUserProposals(user common.Address) ([]*big.Int, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	proposals, err := instance.GetUserProposals(opts, user)
	if err != nil {
		return nil, fmt.Errorf("failed to get user proposals: %v", err)
	}
	return proposals, nil
}

// VerifyAI verifies a proposal with AI result
func VerifyAI(id *big.Int, result bool) (string, error) {
	instance, client, auth, err := GetContractInstance()
	if err != nil {
		return "", err
	}
	defer client.Close()

	tx, err := instance.VerifyAI(auth, id, result)
	if err != nil {
		return "", fmt.Errorf("failed to verify with AI: %v", err)
	}
	return tx.Hash().Hex(), nil
}

// Deposit funds into the contract
func Deposit(amount *big.Int) (string, error) {
	instance, client, auth, err := GetContractInstance()
	if err != nil {
		return "", err
	}
	defer client.Close()

	auth.Value = amount
	tx, err := instance.Deposit(auth)
	if err != nil {
		return "", fmt.Errorf("failed to deposit funds: %v", err)
	}
	return tx.Hash().Hex(), nil
}

// GetProposalCount returns the total number of proposals
func GetProposalCount() (*big.Int, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	count, err := instance.ProposalCount(opts)
	if err != nil {
		return nil, fmt.Errorf("failed to get proposal count: %v", err)
	}
	return count, nil
}

// GetProposalDetails returns basic details of a proposal (using available fields)
func GetProposalDetails(id *big.Int) (struct {
	Proposer  common.Address
	Amount    *big.Int
	Status    uint8
	CreatedAt *big.Int
}, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return struct {
			Proposer  common.Address
			Amount    *big.Int
			Status    uint8
			CreatedAt *big.Int
		}{}, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	proposal, err := instance.GetProposal(opts, id)
	if err != nil {
		return struct {
			Proposer  common.Address
			Amount    *big.Int
			Status    uint8
			CreatedAt *big.Int
		}{}, fmt.Errorf("failed to get proposal details: %v", err)
	}

	// Use the actual fields available in your contract
	// You'll need to check what fields are available in contracts.TaxFundProposal
	return struct {
		Proposer  common.Address
		Amount    *big.Int
		Status    uint8
		CreatedAt *big.Int
	}{
		Proposer:  proposal.Proposer,
		Amount:    proposal.Amount,
		Status:    proposal.Status,
		CreatedAt: proposal.CreatedAt,
	}, nil
}

// GetProposalStatus returns the status of a proposal by reading the proposal first
func GetProposalStatus(id *big.Int) (uint8, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return 0, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	proposal, err := instance.GetProposal(opts, id)
	if err != nil {
		return 0, fmt.Errorf("failed to get proposal status: %v", err)
	}
	return proposal.Status, nil
}

// GetProposalBasicInfo returns basic info for a proposal
func GetProposalBasicInfo(id *big.Int) (map[string]interface{}, error) {
	instance, client, _, err := GetContractInstance()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	opts := &bind.CallOpts{}
	proposal, err := instance.GetProposal(opts, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get proposal: %v", err)
	}

	// Create a generic map to avoid struct field issues
	info := map[string]interface{}{
		"proposer":  proposal.Proposer.Hex(),
		"amount":    proposal.Amount.String(),
		"status":    proposal.Status,
		"createdAt": proposal.CreatedAt.String(),
	}

	// Add any additional fields that might exist in your contract
	// You can inspect the proposal object to see what fields are available
	return info, nil
}
