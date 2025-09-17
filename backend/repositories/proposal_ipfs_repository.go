package repositories

import (
	"backend/configs"
	"backend/models"
	"encoding/json"
	"errors"
	"fmt"
	"log"
)

// ✅ Insert proposal dan langsung return row dari Supabase
func CreateProposal_IPFS(proposal models.Proposal) (models.Proposal, error) {
	data := map[string]interface{}{
		"file_url":        proposal.FileURL,
		"status_proposal": proposal.StatusProposal,
		"user_id":         proposal.UserID,
		"project_id":      proposal.ProjectID,
	}

	log.Printf("📝 DEBUG Insert Proposal Data: %+v", data)

	var created []models.Proposal

	resp, _, err := configs.Supabase.
		From("proposals").
		Insert(data, true, "", "", ""). // return inserted row
		Execute()
	if err != nil {
		log.Printf("❌ Supabase Insert Error: %v", err)
		return models.Proposal{}, fmt.Errorf("failed to insert proposal: %w", err)
	}

	log.Printf("📦 Supabase Raw Response: %s", string(resp))

	if err := json.Unmarshal(resp, &created); err != nil {
		return models.Proposal{}, fmt.Errorf("failed to unmarshal proposal response: %w", err)
	}

	if len(created) == 0 {
		return models.Proposal{}, errors.New("insert failed: no proposal returned")
	}

	log.Printf("✅ Proposal berhasil dibuat: %+v", created[0])
	return created[0], nil
}

// ✅ Get proposals by user_id
func GetProposalsByUser_IPFS(userID int64) ([]models.Proposal, error) {
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

// ✅ Get all proposals
func GetAllProposals_IPFS() ([]models.Proposal, error) {
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

// ✅ Get proposal by ID
func GetProposalByID_IPFS(id int64) (models.Proposal, error) {
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

// ✅ Update status proposal
func UpdateProposalStatus(id int64, status string) (models.Proposal, error) {
	data := map[string]interface{}{
		"status_proposal": status,
	}

	var updated []models.Proposal
	resp, _, err := configs.Supabase.
		From("proposals").
		Update(data, "", "").
		Eq("id", fmt.Sprintf("%d", id)).
		Execute()
	if err != nil {
		return models.Proposal{}, fmt.Errorf("failed to update proposal status: %w", err)
	}

	if err := json.Unmarshal(resp, &updated); err != nil {
		return models.Proposal{}, err
	}

	if len(updated) == 0 {
		return models.Proposal{}, errors.New("update failed: no proposal returned")
	}

	return updated[0], nil
}
