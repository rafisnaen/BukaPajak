package configs

import (
	"fmt"
	"log"
	"os"

	"github.com/ethereum/go-ethereum/ethclient"
)

func ConnectEth() (*ethclient.Client, error) {
	rpcURL := os.Getenv("SEPOLIA_RPC")
	if rpcURL == "" {
		return nil, fmt.Errorf("SEPOLIA_RPC environment variable not set")
	}

	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to Ethereum client: %v", err)
	}

	log.Printf("✅ Connected to Ethereum node at: %s", rpcURL)
	return client, nil
}
