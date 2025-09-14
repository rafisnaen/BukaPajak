package models

import "time"

type Region struct {
	ID             int64     `json:"id"`
	NamaRegion     string    `json:"nama_region"`
	DanaDiterima   float64   `json:"dana_diterima"`
	DanaDipakai    float64   `json:"dana_dipakai"`
	SisaDana       float64   `json:"sisa_dana"`
	Kota           string    `json:"kota"`
	TotalProyek    int       `json:"total_proyek"`
	Selesai        int       `json:"selesai"`
	Berlangsung    int       `json:"berlangsung"`
	JumlahPenduduk int       `json:"jumlah_penduduk"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}
