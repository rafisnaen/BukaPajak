package repositories

import (
	"backend/configs"
	"backend/models"
	"encoding/json"
	"fmt"
)

// Insert proposal into DB
func InsertProposal(proposal models.Proposal) (models.Proposal, error) {
	// ✅ hanya insert field penting, jangan kirim id/created_at/updated_at
	insertData := map[string]interface{}{
		"file_url":        proposal.FileURL,
		"status_proposal": proposal.StatusProposal,
		"user_id":         proposal.UserID,
	}

	data, _, err := configs.Supabase.
		From("proposals").
		Insert(insertData, true, "", "", "").
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

// Get proposal by ID
func GetProposalByID(id int64) (models.Proposal, error) {
	data, _, err := configs.Supabase.
		From("proposals").
		Select("*", "", false).
		Eq("id", fmt.Sprintf("%d", id)).
		Single().
		Execute()
	if err != nil {
		return models.Proposal{}, err
	}

	var proposal models.Proposal
	if err := json.Unmarshal(data, &proposal); err != nil {
		return models.Proposal{}, err
	}

	return proposal, nil
}
