package repositories

import (
	"backend/configs"
	"backend/models"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strconv"
	"strings"
)

var ValidStatus = []string{"belum dimulai", "berlangsung", "selesai"}
var ValidKategori = []string{"infrastruktur", "pendidikan", "kesehatan", "pertahanan"}

// --- Validation Helpers ---
func isValidEnum(value string, validList []string) bool {
	for _, v := range validList {
		if v == value {
			return true
		}
	}
	return false
}

// --- Repository Functions ---
func CreateProyek(ctx context.Context, proyek *models.Proyek) error {
	// --- Normalisasi & validasi status ---
	if proyek.Status != "" {
		proyek.Status = strings.ToLower(proyek.Status)
		if !isValidEnum(proyek.Status, ValidStatus) {
			return fmt.Errorf("invalid status: %s (must be one of %v)", proyek.Status, ValidStatus)
		}
	}

	// --- Normalisasi & validasi kategori ---
	if proyek.Kategori != "" {
		proyek.Kategori = strings.ToLower(proyek.Kategori)
		if !isValidEnum(proyek.Kategori, ValidKategori) {
			return fmt.Errorf("invalid kategori: %s (must be one of %v)", proyek.Kategori, ValidKategori)
		}
	}

	// --- Dereference region_id biar gak kirim pointer ---
	var regionID interface{}
	if proyek.RegionID != nil {
		regionID = *proyek.RegionID
	} else {
		regionID = nil
	}

	// --- Mapping struct -> map ---
	data := map[string]interface{}{
		"judul":      proyek.Judul,
		"deskripsi":  proyek.Deskripsi,
		"budget":     proyek.Budget,
		"gambar_url": proyek.GambarURL,
		"region_id":  regionID,
		"status":     proyek.Status,
		"kategori":   proyek.Kategori,
		"alamat":     proyek.Alamat,
	}

	log.Printf("📝 Inserting proyek: %+v", data)

	var created []models.Proyek
	_, err := configs.Supabase.
		From("proyek").
		Insert(data, true, "", "", ""). // ✅ return representation
		ExecuteTo(&created)

	if err != nil {
		return fmt.Errorf("failed to insert proyek: %w", err)
	}
	if len(created) == 0 {
		return errors.New("insert failed: no proyek returned")
	}

	// update pointer supaya ID ikut keisi
	*proyek = created[0]
	return nil
}

func GetAllProyek(ctx context.Context) ([]models.Proyek, error) {
	var proyekList []models.Proyek

	data, _, err := configs.Supabase.
		From("proyek").
		Select("*", "", false).
		Execute()

	if err != nil {
		return nil, fmt.Errorf("failed to fetch proyek: %w", err)
	}

	if err := json.Unmarshal(data, &proyekList); err != nil {
		return nil, fmt.Errorf("failed to unmarshal proyek: %w", err)
	}

	return proyekList, nil
}

func GetProyekByID(ctx context.Context, id int64) (*models.Proyek, error) {
	var proyek []models.Proyek

	idStr := strconv.FormatInt(id, 10)
	data, _, err := configs.Supabase.
		From("proyek").
		Select("*", "", false).
		Eq("id", idStr).
		Execute()

	if err != nil {
		return nil, fmt.Errorf("failed to fetch proyek by id: %w", err)
	}

	if err := json.Unmarshal(data, &proyek); err != nil {
		return nil, fmt.Errorf("failed to unmarshal proyek: %w", err)
	}

	if len(proyek) == 0 {
		return nil, errors.New("proyek not found")
	}

	return &proyek[0], nil
}
