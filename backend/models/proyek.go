package models

type Proyek struct {
	ID        int64   `json:"id"` // ✅ ubah ke int64
	CreatedAt string  `json:"created_at"`
	Judul     string  `json:"judul"`
	Deskripsi string  `json:"deskripsi"`
	Budget    float64 `json:"budget"`
	GambarURL string  `json:"gambar_url"`
	RegionID  *int    `json:"region_id"`
	Status    string  `json:"status"`
	Kategori  string  `json:"kategori"`
}
