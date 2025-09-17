// schemas/project.go
package schemas

type ProjectRequest struct {
	Judul     string  `form:"judul" binding:"required"`
	Deskripsi string  `form:"deskripsi"`
	Budget    float64 `form:"budget" binding:"required"`
	Kategori  string  `form:"kategori" binding:"required"`
	Alamat    string  `form:"alamat" binding:"required"`
	RegionID  int64   `form:"region_id" binding:"required"`
	Status    string  `form:"status"` // ✅ tambahkan ini
}
