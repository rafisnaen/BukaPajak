package models

type Feedback struct {
	ID     int    `json:"id"`
	Nama   string `json:"nama"`
	Lokasi string `json:"lokasi"`
	Subjek string `json:"subjek"`
	Pesan  string `json:"pesan"`
}
