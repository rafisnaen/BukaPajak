package schemas

type FeedbackRequest struct {
	Nama   string `json:"nama" binding:"required"`
	Lokasi string `json:"lokasi" binding:"required"`
	Subjek string `json:"subjek" binding:"required"`
	Pesan  string `json:"pesan" binding:"required"`
}
