package models

import "time"

type Proyek struct {
	ID        int64      `json:"id"`
	CreatedAt *time.Time `json:"created_at,omitempty"`
	Judul     string     `json:"judul"`
	Deskripsi string     `json:"deskripsi,omitempty"`
	Budget    float64    `json:"budget"`
	GambarURL string     `json:"gambar_url,omitempty"`
	RegionID  *int64     `json:"region_id,omitempty"`
	Status    string     `json:"status,omitempty"`
	Kategori  string     `json:"kategori,omitempty"`
	Alamat    string     `json:"alamat,omitempty"`
	// 👇 TAMBAHKAN BARIS INI
	UserID int64 `json:"user_id"`
}
