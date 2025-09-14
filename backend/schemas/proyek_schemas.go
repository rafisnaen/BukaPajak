package schemas

type ProjectRequest struct {
	Judul          string  `json:"judul" form:"judul" binding:"required"`
	Deskripsi      string  `json:"deskripsi" form:"deskripsi"`
	ProjectManager string  `json:"project_manager" form:"project_manager" binding:"required"`
	Budget         float64 `json:"budget" form:"budget" binding:"required"`
	RegionID       *int    `json:"region_id" form:"region_id"`
	Status         string  `json:"status" form:"status"`     // optional, default = 'belum dimulai'
	Kategori       string  `json:"kategori" form:"kategori"` // optional
}
