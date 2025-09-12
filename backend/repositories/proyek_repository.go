// repositories/project_repository.go
package repositories

import (
	"backend/configs"
	"backend/models"
	"fmt"
	"strconv"
)

type ProjectRepository struct{}

func NewProjectRepository() *ProjectRepository {
	return &ProjectRepository{}
}

// Create Project
func (r *ProjectRepository) CreateProject(project models.Proyek) error {
	_, _, err := configs.Supabase.
		From("proyek").
		Insert([]map[string]interface{}{
			{
				"judul":           project.Judul,
				"deskripsi":       project.Deskripsi,
				"budget":          project.Budget, // ✅ budget ikut disimpan
				"project_manager": project.ProjectManager,
				"gambar_url":      project.Gambar, // ✅ pakai nama kolom yang benar
			},
		}, false, "", "representation", "").Execute()

	if err != nil {
		return fmt.Errorf("failed to insert project: %w", err)
	}
	return nil
}

// Get All Projects
func (r *ProjectRepository) GetAllProjects() ([]models.Proyek, error) {
	var projects []models.Proyek
	_, err := configs.Supabase.From("proyek").
		Select("*", "", false).
		ExecuteTo(&projects)

	if err != nil {
		return nil, fmt.Errorf("failed to fetch projects: %w", err)
	}
	return projects, nil
}

// Get Project By ID
func (r *ProjectRepository) GetProjectByID(id int) (*models.Proyek, error) {
	var projects []models.Proyek
	_, err := configs.Supabase.From("proyek").
		Select("*", "", false).
		Eq("id", strconv.Itoa(id)).
		ExecuteTo(&projects)

	if err != nil {
		return nil, fmt.Errorf("failed to fetch project: %w", err)
	}
	if len(projects) == 0 {
		return nil, fmt.Errorf("project not found")
	}

	return &projects[0], nil
}
