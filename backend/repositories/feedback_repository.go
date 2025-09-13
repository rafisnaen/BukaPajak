package repositories

import (
	"backend/configs"
	"backend/models"
)

func CreateFeedback(feedback models.Feedback) error {
	data := map[string]interface{}{
		"nama":   feedback.Nama,
		"lokasi": feedback.Lokasi,
		"subjek": feedback.Subjek,
		"pesan":  feedback.Pesan,
	}
	var inserted []models.Feedback
	_, err := configs.Supabase.
		From("feedback").
		Insert(data, false, "", "representation", "").
		ExecuteTo(&inserted)

	return err
}

func GetAllFeedbacks() ([]models.Feedback, error) {
	var feedback []models.Feedback
	_, err := configs.Supabase.
		From("feedback").
		Select("*", "", false).
		ExecuteTo(&feedback)

	return feedback, err
}
