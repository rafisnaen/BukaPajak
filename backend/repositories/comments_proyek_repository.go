package repositories

import (
	"backend/configs"
	"backend/models"
	"fmt"
)

func CreateComment_Proyek(comment models.Comment_Proyek) error {
	data := map[string]interface{}{
		"proyek_id": comment.ProyekID, // Changed from progress_id to proyek_id
		"judul":     comment.Judul,
		"isi":       comment.Isi,
		"nama":      comment.Nama,
	}

	var inserted []models.Comment_Proyek // Changed to correct type
	_, err := configs.Supabase.
		From("comment_proyek").
		Insert(data, false, "", "representation", "").
		ExecuteTo(&inserted)

	return err
}

func GetAllComments_Proyek() ([]models.Comment_Proyek, error) { // Fixed function name
	var comments []models.Comment_Proyek // Changed to correct type
	_, err := configs.Supabase.
		From("comment_proyek").
		Select("*", "", false).
		ExecuteTo(&comments)

	return comments, err
}

func GetCommentsByProyekID_Proyek(proyekID int) ([]models.Comment_Proyek, error) { // Fixed function name and parameter
	var comments []models.Comment_Proyek // Changed to correct type
	_, err := configs.Supabase.
		From("comment_proyek").
		Select("*", "", false).
		Eq("proyek_id", fmt.Sprintf("%d", proyekID)). // Changed from progress_id to proyek_id
		ExecuteTo(&comments)

	return comments, err
}

// GetCommentByID - jika diperlukan
func GetCommentByID_Proyek(id uint) (models.Comment_Proyek, error) { // Fixed function name
	var comment models.Comment_Proyek // Changed to correct type
	_, err := configs.Supabase.
		From("comment_proyek").
		Select("*", "", false).
		Eq("id", fmt.Sprintf("%d", id)).
		Single().
		ExecuteTo(&comment)

	return comment, err
}

// GetCommentsCountByProyekID - untuk mendapatkan jumlah komentar
func GetCommentsCountByProyekID_Proyek(proyekID int) (int, error) { // Fixed function name
	var count []struct {
		Count int `json:"count"`
	}

	_, err := configs.Supabase.
		From("comment_proyek").
		Select("count", "", false).
		Eq("proyek_id", fmt.Sprintf("%d", proyekID)).
		ExecuteTo(&count)

	if err != nil {
		return 0, err
	}

	if len(count) > 0 {
		return count[0].Count, nil
	}

	return 0, nil
}
