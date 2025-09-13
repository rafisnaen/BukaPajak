package repositories

import (
	"backend/configs"
	"backend/models"
	"fmt"
)

func CreateComment(comment models.Comment) error {
	data := map[string]interface{}{
		"progress_id":                   comment.ProgressID,
		"judul":                         comment.Judul,
		"isi":                           comment.Isi,
		"nama":                          comment.Nama,
		"Transparansi_Progress":         comment.TransparansiProgress,
		"Kualitas_Pelaksanaan_Progress": comment.KualitasPelaksanaanProgress,
		"effisiensi_anggaran_progress":  comment.EffisiensiAnggaranProgress,
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
