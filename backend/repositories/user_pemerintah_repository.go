package repositories

import (
	"backend/configs"
	"backend/models"
	"encoding/json"
	"fmt"
)

func CreateUser(user models.UserPemerintah) error {
	insertData := map[string]interface{}{
		"email":    user.Email,
		"password": user.Password,
	}

	// API lama → Insert(data, upsert, onConflict, returning, count)
	data, _, err := configs.Supabase.
		From("user_pemerintah").
		Insert(insertData, false, "", "representation", "").
		Execute()
	if err != nil {
		return err
	}

	var users []models.UserPemerintah
	if err := json.Unmarshal(data, &users); err != nil {
		return err
	}
	return nil
}

func GetUserByEmail(email string) ([]models.UserPemerintah, error) {
	var users []models.UserPemerintah

	// API lama → Select(columns, head, count)
	data, _, err := configs.Supabase.
		From("user_pemerintah").
		Select("*", "", false).
		Eq("email", email).
		Execute()
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}

	return users, nil
}

// ---------------------- UPDATE ----------------------
func SetWalletNonce(email string, nonce string) error {
	update := map[string]interface{}{
		"wallet_nonce": nonce,
	}

	// API lama → Update(data, returning, count)
	_, _, err := configs.Supabase.
		From("user_pemerintah").
		Update(update, "", "").
		Eq("email", email).
		Execute()

	return err
}

func GetWalletNonce(email string) (string, error) {
	var users []models.UserPemerintah

	data, _, err := configs.Supabase.
		From("user_pemerintah").
		Select("wallet_nonce", "", false).
		Eq("email", email).
		Execute()
	if err != nil {
		return "", err
	}

	if err := json.Unmarshal(data, &users); err != nil {
		return "", err
	}

	if len(users) == 0 {
		return "", fmt.Errorf("user not found")
	}

	return users[0].WalletNonce, nil
}

func SaveWalletAddress(email, address string) error {
	update := map[string]interface{}{
		"wallet_address": address,
		"wallet_nonce":   "", // reset nonce
	}

	_, _, err := configs.Supabase.
		From("user_pemerintah").
		Update(update, "", "").
		Eq("email", email).
		Execute()

	return err
}
