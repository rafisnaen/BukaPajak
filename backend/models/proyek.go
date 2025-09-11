package models

type Proyek struct {
	ID             int    `json:"id"`
	CreatedAt      string `json:"created_at"`
	Judul          string `json:"judul"`
	Deskripsi      string `json:"deskripsi"`
	ProjectManager string `json:"project_manager"`
	Gambar         string `json:"gambar"`
}
