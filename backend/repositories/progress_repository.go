// repositories/progress_repository.go
package repositories

import (
	"backend/configs"
	"backend/models"
	"fmt"
	"strconv"
)

type ProgressRepository struct{}

func NewProgressRepository() *ProgressRepository {
	return &ProgressRepository{}
}

// Create Progress
func (r *ProgressRepository) CreateProgress(progress models.ProgressProyek) error {
	_, _, err := configs.Supabase.
		From("progress_proyek").
		Insert([]map[string]interface{}{
			{
				"proyek_id":       progress.ProyekID,
				"title":           progress.Title,
				"gambar":          progress.Gambar,
				"deskripsi":       progress.Deskripsi,
				"perjelasan":      progress.Penjelasan,
				"project_manager": progress.ProjectManager,
				"anggaran":        progress.Anggaran,
				"status":          progress.Status,
			},
		}, false, "", "representation", "").Execute()

	if err != nil {
		return fmt.Errorf("failed to insert progress: %w", err)
	}
	return nil
}

// Get All Progress
func (r *ProgressRepository) GetAllProgress() ([]models.ProgressProyek, error) {
	var progresses []models.ProgressProyek
	_, err := configs.Supabase.
		From("progress_proyek").
		Select("*", "", false).
		ExecuteTo(&progresses)

	if err != nil {
		return nil, fmt.Errorf("failed to fetch progresses: %w", err)
	}
	return progresses, nil
}

// Get Progress By Project ID
func (r *ProgressRepository) GetProgressByProjectID(proyekID int) ([]models.ProgressProyek, error) {
	var progresses []models.ProgressProyek
	_, err := configs.Supabase.
		From("progress_proyek").
		Select("*", "", false).
		Eq("proyek_id", strconv.Itoa(proyekID)).
		ExecuteTo(&progresses)

	if err != nil {
		return nil, fmt.Errorf("failed to fetch progress by project ID: %w", err)
	}
	return progresses, nil
}
