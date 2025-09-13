package schemas

type CommentRequest struct {
	ProgressID                  int    `json:"progress_id" binding:"required"`
	Judul                       string `json:"judul" binding:"required"`
	Isi                         string `json:"isi" binding:"required"`
	Nama                        string `json:"nama" binding:"required"`
	TransparansiProgress        string `json:"Transparansi_Progress" binding:"required"`
	KualitasPelaksanaanProgress string `json:"Kualitas_Pelaksanaan_Progress" binding:"required"`
	EffisiensiAnggaranProgress  string `json:"effisiensi_anggaran_progress" binding:"required"`
}
