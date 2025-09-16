package schemas

type ProjectRequest struct {
	Judul     string  `form:"judul" binding:"required"`
	Deskripsi string  `form:"deskripsi" binding:"required"`
	Budget    float64 `form:"budget" binding:"required"`
	RegionID  int     `form:"region_id" binding:"required"`
	Status    string  `form:"status"`
	Kategori  string  `form:"kategori"`
}
