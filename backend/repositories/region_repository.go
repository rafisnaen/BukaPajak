package repositories

import (
	"backend/configs"
	"backend/models"
)

func CreateRegion(region models.Region) error {
	data := map[string]interface{}{
		"nama_region":     region.NamaRegion,
		"dana_diterima":   region.DanaDiterima,
		"dana_dipakai":    region.DanaDipakai,
		"kota":            region.Kota,
		"total_proyek":    region.TotalProyek,
		"selesai":         region.Selesai,
		"berlangsung":     region.Berlangsung,
		"jumlah_penduduk": region.JumlahPenduduk,
	}
	var inserted []models.Region
	_, err := configs.Supabase.
		From("region_data").
		Insert(data, false, "", "representation", "").
		ExecuteTo(&inserted)

	return err
}

func GetAllRegions() ([]models.Region, error) {
	var region []models.Region
	_, err := configs.Supabase.
		From("region_data").
		Select("*", "", false).
		ExecuteTo(&region)

	return region, err
}
