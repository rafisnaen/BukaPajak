package models

type Comment_Proyek struct {
	ID                           int    `json:"id"`
	ProyekID                     int    `json:"proyek_id"`
	CreatedAt                    string `json:"created_at"`
	Judul                        string `json:"judul"`
	Isi                          string `json:"isi"`
	Nama                         string `json:"nama"`
	UpdatedAt                    string `json:"updated_at"`
	TransparansiProyek           string `json:"Transparansi_Proyek"`             // enum
	KualitasPelaksanaanProyek    string `json:"Kualitas_Pelaksanaan_Proyek"`     // enum
	ManfaatUntukMasyarakatProyek string `json:"Manfaat_Untuk_Masyarakat_Proyek"` // enum
	InovasiProyek                string `json:"Innovasi_Proyek"`                 // enum
	EfisiensiAnggaranProyek      string `json:"Effisiensi_Anggaran_Proyek"`      // enum
	Rating                       int    `json:"rating"`
}
