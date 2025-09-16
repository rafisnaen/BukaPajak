package models

import "time"

type Proposal struct {
	ID             int       `json:"id"`
	FileURL        string    `json:"file_url"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
	StatusProposal string    `json:"status_proposal"`
	UserID         int       `json:"user_id"`
}
