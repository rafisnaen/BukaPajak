package repositories

import (
	"backend/configs"
	"backend/models"
	"encoding/json"
	"errors"
	"fmt"
)

// ✅ Create proposal with better error handling
func CreateProposal(proposal models.Proposal) error {
	fmt.Printf("DEBUG: Inserting proposal to database: %+v\n", proposal)

	insertData := map[string]interface{}{
		"file_url":        proposal.FileURL,
		"status_proposal": proposal.StatusProposal,
		"user_id":         proposal.UserID,
		"project_id":      proposal.ProjectID,
	}

	var inserted []models.Proposal
	count, err := configs.Supabase.
		From("proposals").
		Insert(insertData, false, "", "representation", "").
		ExecuteTo(&inserted)

	if err != nil {
		fmt.Printf("DEBUG: Supabase proposal insert error: %v\n", err)
		return fmt.Errorf("supabase proposal insert failed: %w", err)
	}

	// Check if any rows were inserted instead of checking status
	if count == 0 {
		fmt.Printf("DEBUG: No rows were inserted for proposal\n")
		return fmt.Errorf("no proposal rows were inserted")
	}

	if len(inserted) == 0 {
		fmt.Printf("DEBUG: No proposal returned from insert\n")
		return fmt.Errorf("no proposal returned from insert")
	}

	fmt.Printf("DEBUG: Proposal inserted successfully with ID: %d\n", inserted[0].ID)
	return nil
}

// ✅ Insert proposal (alternative method)
func InsertProposal(proposal models.Proposal) (models.Proposal, error) {
	fmt.Printf("DEBUG: Alternative proposal insert: %+v\n", proposal)

	insertData := map[string]interface{}{
		"file_url":        proposal.FileURL,
		"status_proposal": proposal.StatusProposal,
		"user_id":         proposal.UserID,
		"project_id":      proposal.ProjectID,
	}

	var created []models.Proposal
	count, err := configs.Supabase.
		From("proposals").
		Insert(insertData, false, "", "representation", "").
		ExecuteTo(&created)

	if err != nil {
		fmt.Printf("DEBUG: Alternative proposal insert error: %v\n", err)
		return models.Proposal{}, fmt.Errorf("proposal insert failed: %w", err)
	}

	// Check count instead of status
	if count == 0 {
		return models.Proposal{}, fmt.Errorf("no proposal rows were inserted")
	}

	if len(created) == 0 {
		return models.Proposal{}, fmt.Errorf("no proposal returned from insert")
	}

	fmt.Printf("DEBUG: Alternative proposal inserted successfully: %+v\n", created[0])
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
		Execute()
	if err != nil {
		return models.Proposal{}, err
	}

	var proposals []models.Proposal
	if err := json.Unmarshal(data, &proposals); err != nil {
		return models.Proposal{}, err
	}

	if len(proposals) == 0 {
		return models.Proposal{}, errors.New("proposal not found")
	}

	return proposals[0], nil
}
