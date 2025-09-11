package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	supa "github.com/supabase-community/supabase-go"
)

var Supabase *supa.Client

func ConnectSupaBase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	url := os.Getenv("SUPABASEURL")
	key := os.Getenv("SUPABASEKEY")

	client, err := supa.NewClient(url, key, nil)
	if err != nil {
		log.Fatal("failed to connect supabase: ", err)
	}

	Supabase = client
}
