package models

import "time"

type Proposal struct {
	ID             int64     `json:"id"`
	FileURL        string    `json:"file_url"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
	StatusProposal string    `json:"status_proposal"`
	UserID         int64     `json:"user_id"`
	ProjectID      int64     `json:"project_id"` // ✅ tambahkan relasi ke proyek
}
