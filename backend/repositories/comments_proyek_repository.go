package repositories

import (
	"backend/configs"
	"backend/models"
	"fmt"
)

func CreateComment_Proyek(comment models.Comment_Proyek) error {
	data := map[string]interface{}{
		"proyek_id":                       comment.ProyekID,
		"judul":                           comment.Judul,
		"isi":                             comment.Isi,
		"nama":                            comment.Nama,
		"Transparansi_Proyek":             comment.TransparansiProyek,
		"Kualitas_Pelaksanaan_Proyek":     comment.KualitasPelaksanaanProyek,
		"Manfaat_Untuk_Masyarakat_Proyek": comment.ManfaatUntukMasyarakatProyek,
		"Innovasi_Proyek":                 comment.InovasiProyek,
		"Effisiensi_Anggaran_Proyek":      comment.EfisiensiAnggaranProyek,
		"rating":                          comment.Rating,
	}

	var inserted []models.Comment_Proyek
	_, err := configs.Supabase.
		From("comment_proyek").
		Insert(data, false, "", "representation", "").
		ExecuteTo(&inserted)

	return err
}

func GetAllComments_Proyek() ([]models.Comment_Proyek, error) {
	var comments []models.Comment_Proyek
	_, err := configs.Supabase.
		From("comment_proyek").
		Select("*", "", false).
		ExecuteTo(&comments)

	return comments, err
}

func GetCommentsByProyekID_Proyek(proyekID int) ([]models.Comment_Proyek, error) {
	var comments []models.Comment_Proyek
	_, err := configs.Supabase.
		From("comment_proyek").
		Select("*", "", false).
		Eq("proyek_id", fmt.Sprintf("%d", proyekID)).
		ExecuteTo(&comments)

	return comments, err
}
