package schemas

type CommentRequest_Proyek struct {
	ProyekID int    `json:"proyek_id" binding:"required"`
	Judul    string `json:"judul" binding:"required"`
	Isi      string `json:"isi" binding:"required"`
	Nama     string `json:"nama" binding:"required"`
}
