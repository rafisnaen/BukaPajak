package repositories

import (
	"backend/configs"
	"backend/models"
	"encoding/json"
)

func CreateUser(user models.UserPemerintah) error {
	// Only send fields Supabase expects (exclude ID, CreatedAt)
	insertData := map[string]interface{}{
		"email":    user.Email,
		"password": user.Password,
	}

	// Use "representation" so Supabase returns inserted row
	data, _, err := configs.Supabase.
		From("user_pemerintah").
		Insert(insertData, false, "", "representation", "").
		Execute()

	if err != nil {
		return err
	}

	// Optional: unmarshal back if you want the inserted user
	var users []models.UserPemerintah
	if err := json.Unmarshal(data, &users); err != nil {
		return err
	}

	return nil
}

func GetUserByEmail(email string) ([]models.UserPemerintah, error) {
	var users []models.UserPemerintah

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
