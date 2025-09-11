package configs

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	supa "github.com/nedpals/supabase-go"
)

func ConnectSupaBase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	supabaseUrl := os.Getenv("SUPABASEURL")
	supabaseKey := os.Getenv("SUPABASEKEY")
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)

	ctx := context.Background()
	user, err := supabase.Auth.SignIn(ctx, supa.UserCredentials{
		Email:    os.Getenv("USER_EMAIL"),
		Password: os.Getenv("USER_PASSWORD"),
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(user)
}
