package models

type Proyek struct {
	ID             int     `json:"id"`
	CreatedAt      string  `json:"created_at"`
	Judul          string  `json:"judul"`
	Deskripsi      string  `json:"deskripsi"`
	ProjectManager string  `json:"project_manager"`
	Budget         float64 `json:"budget"`
	GambarURL      string  `json:"gambar_url"`
	RegionID       *int    `json:"region_id"`
	Status         string  `json:"status"`
	Kategori       string  `json:"kategori"`
}
