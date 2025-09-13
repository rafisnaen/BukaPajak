package schemas

type CommentRequest_Proyek struct {
	ProyekID                     int    `json:"proyek_id" binding:"required"`
	Judul                        string `json:"judul" binding:"required"`
	Isi                          string `json:"isi" binding:"required"`
	Nama                         string `json:"nama" binding:"required"`
	TransparansiProyek           string `json:"Transparansi_Proyek" binding:"required"`
	KualitasPelaksanaanProyek    string `json:"Kualitas_Pelaksanaan_Proyek" binding:"required"`
	ManfaatUntukMasyarakatProyek string `json:"Manfaat_Untuk_Masyarakat_Proyek" binding:"required"`
	InovasiProyek                string `json:"Innovasi_Proyek" binding:"required"`
	EfisiensiAnggaranProyek      string `json:"Effisiensi_Anggaran_Proyek" binding:"required"`
	Rating                       int    `json:"rating" binding:"required"`
}
