package repositories

import (
	"backend/configs"
	"backend/models"
	"fmt"
)

func CreateComment(comment models.Comment) error {
	data := map[string]interface{}{
		"progress_id": comment.ProgressID,
		"judul":       comment.Judul,
		"isi":         comment.Isi,
		"nama":        comment.Nama,
	}

	var inserted []models.Comment
	_, err := configs.Supabase.
		From("comment_progress").
		Insert(data, false, "", "representation", "").
		ExecuteTo(&inserted)

	return err
}

func GetAllComments() ([]models.Comment, error) {
	var comments []models.Comment
	_, err := configs.Supabase.
		From("comment_progress").
		Select("*", "", false).
		ExecuteTo(&comments)

	return comments, err
}

func GetCommentsByProgressID(progressID int) ([]models.Comment, error) {
	var comments []models.Comment
	_, err := configs.Supabase.
		From("comment_progress").
		Select("*", "", false).
		Eq("progress_id", fmt.Sprintf("%d", progressID)).
		ExecuteTo(&comments)

	return comments, err
}

// GetCommentByID - jika diperlukan
func GetCommentByID(id uint) (models.Comment, error) {
	var comment models.Comment
	_, err := configs.Supabase.
		From("comment_progress").
		Select("*", "", false).
		Eq("id", fmt.Sprintf("%d", id)).
		Single().
		ExecuteTo(&comment)

	return comment, err
}

// GetCommentsCountByProgressID - untuk mendapatkan jumlah komentar
func GetCommentsCountByProgressID(progressID int) (int, error) {
	var count []struct {
		Count int `json:"count"`
	}

	_, err := configs.Supabase.
		From("comment_progress").
		Select("count", "", false).
		Eq("progress_id", fmt.Sprintf("%d", progressID)).
		ExecuteTo(&count)

	if err != nil {
		return 0, err
	}

	if len(count) > 0 {
		return count[0].Count, nil
	}

	return 0, nil
}
