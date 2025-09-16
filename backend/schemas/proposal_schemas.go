package schemas

import "mime/multipart"

// Upload request
type UploadProposalRequest struct {
	UserID int                   `form:"user_id" binding:"required"`
	File   *multipart.FileHeader `form:"file" binding:"required"`
}

// Response
type ProposalResponse struct {
	ID             int    `json:"id"`
	FileURL        string `json:"file_url"`
	StatusProposal string `json:"status_proposal"`
}
