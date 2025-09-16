// backend/repositories/proyek_repository.go
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

func (r *ProjectRepository) CreateProject(project models.Proyek) (int64, error) {
	fmt.Printf("DEBUG: Inserting project to database: %+v\n", project)

	insertData := map[string]interface{}{
		"judul":      project.Judul,
		"deskripsi":  project.Deskripsi,
		"budget":     project.Budget,
		"gambar_url": project.GambarURL,
		"status":     project.Status,
		"kategori":   project.Kategori,
		"alamat":     project.Alamat,
		// 👇 TAMBAHKAN BARIS INI
		"user_id": project.UserID,
	}

	if project.RegionID != nil {
		insertData["region_id"] = *project.RegionID
	}

	var inserted []models.Proyek

	count, err := configs.Supabase.
		From("proyek").
		Insert(insertData, false, "", "representation", "").
		ExecuteTo(&inserted)

	if err != nil {
		fmt.Printf("DEBUG: Supabase insert error: %v\n", err)
		return 0, fmt.Errorf("supabase insert failed: %w", err)
	}

	if count == 0 {
		fmt.Printf("DEBUG: No rows were inserted\n")
		return 0, fmt.Errorf("no rows were inserted")
	}

	if len(inserted) == 0 {
		fmt.Printf("DEBUG: No project returned from insert\n")
		return 0, fmt.Errorf("no project returned from insert")
	}

	fmt.Printf("DEBUG: Project inserted successfully with ID: %d\n", inserted[0].ID)
	return inserted[0].ID, nil
}

func (r *ProjectRepository) CheckRegionExists(regionID int64) (bool, error) {
	var regions []models.Region
	_, err := configs.Supabase.
		From("region_data").
		Select("id", "", false).
		Eq("id", strconv.FormatInt(regionID, 10)).
		ExecuteTo(&regions)

	if err != nil {
		return false, err
	}
	return len(regions) > 0, nil
}

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
