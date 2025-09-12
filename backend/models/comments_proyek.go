package models

type Comment_Proyek struct {
	ID        int    `json:"id"`
	ProyekID  int    `json:"proyek_id"`
	CreatedAt string `json:"created_at"`
	Judul     string `json:"judul"`
	Isi       string `json:"isi"`
	Nama      string `json:"nama"`
	UpdatedAt string `json:"updated_at"`
}
