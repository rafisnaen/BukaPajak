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

// CreateProposal menyimpan proposal baru ke tabel proposals
func CreateProposal(proposal models.Proposal) error {
	// Data yang akan diinsert (tanpa created_at / updated_at)
	data := map[string]interface{}{
		"file_url":        proposal.FileURL,
		"status_proposal": proposal.StatusProposal,
		"user_id":         proposal.UserID,
		"project_id":      proposal.ProjectID,
	}

	log.Printf("📝 DEBUG Insert Proposal Data: %+v", data)

	var created []models.Proposal

	// Execute() return (data []byte, count int, err error)
	resp, _, err := configs.Supabase.
		From("proposals").
		Insert(data, true, "", "", ""). // return representation
		Execute()

	if err != nil {
		log.Printf("❌ Supabase Insert Error: %v", err)
		return fmt.Errorf("failed to insert proposal: %w", err)
	}

	// Debug raw response dari Supabase
	log.Printf("📦 Supabase Raw Response: %s", string(resp))

	// Unmarshal JSON ke struct Proposal
	if err := json.Unmarshal(resp, &created); err != nil {
		log.Printf("❌ JSON Unmarshal Error: %v", err)
		return fmt.Errorf("failed to unmarshal proposal response: %w", err)
	}

	if len(created) == 0 {
		return errors.New("insert failed: no proposal returned")
	}

	// Update proposal dengan data dari DB
	proposal = created[0]

	log.Printf("✅ Proposal berhasil dibuat: %+v", proposal)
	return nil
}

// ✅ Get proposals by user_id
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

// ✅ Get all proposals
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

// ✅ Get proposal by ID
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
