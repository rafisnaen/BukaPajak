package repositories

import (
	"backend/configs"
	"backend/models"
	"encoding/json"
	"fmt"
	"mime/multipart"
	"time"

	storage_go "github.com/supabase-community/storage-go"
)

// UploadFileToSupabase uploads a PDF to the Supabase "proposals" bucket
func UploadFileToSupabase(file *multipart.FileHeader) (string, error) {
	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	path := fmt.Sprintf("proposals/%d-%s", time.Now().Unix(), file.Filename)

	// must use a string pointer for ContentType
	contentType := "application/pdf"

	_, err = configs.Storage.UploadFile("proposals", path, src, storage_go.FileOptions{
		ContentType: &contentType,
	})
	if err != nil {
		return "", err
	}

	// Build public URL manually
	publicURL := fmt.Sprintf(
		"https://%s.supabase.co/storage/v1/object/public/proposals/%s",
		configs.SupabaseRef,
		path,
	)

	return publicURL, nil
}

// Insert proposal into DB
func InsertProposal(proposal models.Proposal) (models.Proposal, error) {
	data, _, err := configs.Supabase.
		From("proposals").
		Insert(proposal, true, "", "", "").
		Execute()
	if err != nil {
		return models.Proposal{}, err
	}

	var created []models.Proposal
	if err := json.Unmarshal(data, &created); err != nil {
		return models.Proposal{}, err
	}

	if len(created) == 0 {
		return models.Proposal{}, fmt.Errorf("failed to insert proposal")
	}

	return created[0], nil
}

// Get proposals by user_id
func GetProposalsByUser(userID int64) ([]models.Proposal, error) {
	data, _, err := configs.Supabase.
		From("proposals").
		Select("*", "", false).
		Eq("user_id", fmt.Sprintf("%d", userID)).
		Execute()
	if err != nil {
		return nil, err
	}

	var proposals []models.Proposal
	if err := json.Unmarshal(data, &proposals); err != nil {
		return nil, err
	}

	return proposals, nil
}

// Get all proposals
func GetAllProposals() ([]models.Proposal, error) {
	data, _, err := configs.Supabase.
		From("proposals").
		Select("*", "", false).
		Execute()
	if err != nil {
		return nil, err
	}

	var proposals []models.Proposal
	if err := json.Unmarshal(data, &proposals); err != nil {
		return nil, err
	}

	return proposals, nil
}
