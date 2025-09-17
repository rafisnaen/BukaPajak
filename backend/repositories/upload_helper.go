// backend/repositories/upload_helper.go
package repositories

import (
	"backend/configs"
	"fmt"
	"mime/multipart"
	"time"
)

func UploadFileToSupabase(file *multipart.FileHeader) (string, error) {
	if !configs.IsStorageEnabled() {
		return "", fmt.Errorf("Supabase storage is not enabled")
	}

	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	// nama file unik supaya tidak bentrok
	path := fmt.Sprintf("projects/%d_%s", time.Now().Unix(), file.Filename)

	// ✅ Upload ke bucket "proposals"
	_, err = configs.Storage.UploadFile("proposals", path, src)
	if err != nil {
		return "", fmt.Errorf("failed to upload to Supabase: %w", err)
	}

	// ✅ Ambil public URL
	publicResp := configs.Storage.GetPublicUrl("proposals", path)

	// `publicResp` adalah struct → ambil field URL
	return publicResp.SignedURL, nil
}
