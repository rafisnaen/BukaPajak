package models

type Comment struct {
	ID                          int    `json:"id"`
	ProgressID                  int    `json:"progress_id"`
	CreatedAt                   string `json:"created_at"`
	Judul                       string `json:"judul"`
	Isi                         string `json:"isi"`
	Nama                        string `json:"nama"`
	UpdatedAt                   string `json:"updated_at"`
	TransparansiProgress        string `json:"Transparansi_Progress"`
	KualitasPelaksanaanProgress string `json:"Kualitas_Pelaksanaan_Progress"`
	EffisiensiAnggaranProgress  string `json:"effisiensi_anggaran_progress"`
}
