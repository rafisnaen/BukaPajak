package configs

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	supa "github.com/supabase-community/supabase-go"
)

var Supabase *supa.Client

func ConnectSupaBase() error {
	err := godotenv.Load()
	if err != nil {
		log.Printf("Warning: Error loading .env file: %v", err)
		// Don't fatal here, just continue - environment variables might be set elsewhere
	}

	url := os.Getenv("SUPABASEURL")
	key := os.Getenv("SUPABASEKEY")

	if url == "" || key == "" {
		return fmt.Errorf("SUPABASEURL or SUPABASEKEY environment variables not set")
	}

	client, err := supa.NewClient(url, key, nil)
	if err != nil {
		return fmt.Errorf("failed to connect to Supabase: %v", err)
	}

	Supabase = client
	log.Printf("✅ Connected to Supabase successfully")
	return nil
}
