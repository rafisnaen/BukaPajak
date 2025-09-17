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
	// Validasi enum
	if proyek.Status != "" && !isValidEnum(proyek.Status, ValidStatus) {
		return fmt.Errorf("invalid status: %s", proyek.Status)
	}
	if proyek.Kategori != "" && !isValidEnum(proyek.Kategori, ValidKategori) {
		return fmt.Errorf("invalid kategori: %s", proyek.Kategori)
	}

	// Insert ke Supabase
	log.Printf("📝 Inserting proyek: %+v", proyek)
	_, _, err := configs.Supabase.
		From("proyek").
		Insert(proyek, false, "", "", "").
		Execute()

	if err != nil {
		return fmt.Errorf("failed to insert proyek: %w", err)
	}
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

	idStr := strconv.FormatInt(id, 10) // ✅ convert int64 -> string
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
