package schemas

type CreateRegionRequest struct {
	NamaRegion     string  `json:"nama_region" binding:"required"`
	DanaDiterima   float64 `json:"dana_diterima"`
	DanaDipakai    float64 `json:"dana_dipakai"`
	Kota           string  `json:"kota"`
	TotalProyek    int     `json:"total_proyek"`
	Selesai        int     `json:"selesai"`
	Berlangsung    int     `json:"berlangsung"`
	JumlahPenduduk int     `json:"jumlah_penduduk"`
}
