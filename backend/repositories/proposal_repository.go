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

func GetAllProposalsWithDetail() ([]models.ProposalWithDetail, error) {
	// Ambil proposals
	dataProposals, _, err := configs.Supabase.
		From("proposals").
		Select("*", "", false).
		Execute()
	if err != nil {
		return nil, fmt.Errorf("failed to fetch proposals: %w", err)
	}
	var proposals []models.Proposal
	if err := json.Unmarshal(dataProposals, &proposals); err != nil {
		return nil, err
	}

	// Ambil proyek
	dataProyek, _, err := configs.Supabase.
		From("proyek").
		Select("*", "", false).
		Execute()
	if err != nil {
		return nil, fmt.Errorf("failed to fetch proyek: %w", err)
	}
	var proyekList []models.Proyek
	if err := json.Unmarshal(dataProyek, &proyekList); err != nil {
		return nil, err
	}
	proyekMap := make(map[int64]models.Proyek)
	for _, p := range proyekList {
		proyekMap[p.ID] = p
	}

	// Ambil region
	dataRegion, _, err := configs.Supabase.
		From("region_data").
		Select("*", "", false).
		Execute()
	if err != nil {
		return nil, fmt.Errorf("failed to fetch region: %w", err)
	}
	var regionList []models.Region
	if err := json.Unmarshal(dataRegion, &regionList); err != nil {
		return nil, err
	}
	regionMap := make(map[int64]string)
	for _, r := range regionList {
		regionMap[r.ID] = r.NamaRegion
	}

	// Gabungkan data
	var result []models.ProposalWithDetail
	for _, proposal := range proposals {
		proyek, ok := proyekMap[proposal.ProjectID]
		if !ok {
			continue
		}

		regionName := ""
		if proyek.RegionID != nil {
			regionName = regionMap[*proyek.RegionID]
		}

		result = append(result, models.ProposalWithDetail{
			Proposal:    proposal,
			ProjectName: proyek.Judul,
			Region:      regionName,
			Budget:      proyek.Budget,
			Kategori:    &proyek.Kategori,
			Alamat:      &proyek.Alamat,
		})
	}

	return result, nil
}

func LogProposalDownload(proposalID, userID int64, gatewayUsed, clientIP string) error {
	data := map[string]interface{}{
		"proposal_id":  proposalID,
		"user_id":      userID,
		"gateway_used": gatewayUsed,
		"client_ip":    clientIP,
	}

	_, _, err := configs.Supabase.
		From("proposal_downloads").
		Insert(data, false, "", "", "").
		Execute()

	return err
}
