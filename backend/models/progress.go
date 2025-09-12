// models/progress.go
package models

type ProgressProyek struct {
	ID             int    `json:"id"`
	ProyekID       int    `json:"proyek_id"`
	Title          string `json:"title"`
	Gambar         string `json:"gambar"`
	Deskripsi      string `json:"deskripsi"`
	Penjelasan     string `json:"perjelasan"`
	ProjectManager string `json:"project_manager"`
	Anggaran       string `json:"anggaran"`
	Status         string `json:"status"`
	CreatedAt      string `json:"created_at"`
	UpdatedAt      string `json:"updated_at"`
}
