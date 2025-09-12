package schemas

type CommentRequest struct {
	ProgressID int    `json:"progress_id" binding:"required"`
	Judul      string `json:"judul" binding:"required"`
	Isi        string `json:"isi" binding:"required"`
	Nama       string `json:"nama" binding:"required"`
}
