package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"time"
)

// PinataResponse maps response from pinFileToIPFS
type PinataResponse struct {
	IpfsHash  string `json:"IpfsHash"`
	PinSize   int64  `json:"PinSize,omitempty"`
	Timestamp string `json:"Timestamp,omitempty"`
}

func UploadFileToPinata(file multipart.File, filename string, metadata map[string]string) (string, error) {
	defer file.Close()

	// Build multipart body
	var buf bytes.Buffer
	writer := multipart.NewWriter(&buf)

	// file field
	part, err := writer.CreateFormFile("file", filename)
	if err != nil {
		return "", fmt.Errorf("create form file failed: %w", err)
	}
	if _, err := io.Copy(part, file); err != nil {
		return "", fmt.Errorf("copy file to form failed: %w", err)
	}

	// Optional: pinataMetadata
	if metadata != nil && len(metadata) > 0 {
		// Create metadata JSON: {"name":"filename","keyvalues":{...}}
		metaObj := map[string]interface{}{
			"name":      filename,
			"keyvalues": metadata,
		}
		metaJSON, _ := json.Marshal(metaObj)
		if err := writer.WriteField("pinataMetadata", string(metaJSON)); err != nil {
			return "", fmt.Errorf("write metadata field failed: %w", err)
		}
	}

	// Optional: pinataOptions (cidVersion recommended)
	options := map[string]interface{}{"cidVersion": 1}
	optionsJSON, _ := json.Marshal(options)
	_ = writer.WriteField("pinataOptions", string(optionsJSON))

	if err := writer.Close(); err != nil {
		return "", fmt.Errorf("close writer failed: %w", err)
	}

	// Prepare request
	req, err := http.NewRequest("POST", "https://api.pinata.cloud/pinning/pinFileToIPFS", &buf)
	if err != nil {
		return "", fmt.Errorf("create request failed: %w", err)
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())

	// Auth: prefer JWT if provided, else use api key + secret
	jwt := os.Getenv("PINATA_JWT")
	if jwt != "" {
		req.Header.Set("Authorization", "Bearer "+jwt)
	} else {
		apiKey := os.Getenv("PINATA_API_KEY")
		apiSecret := os.Getenv("PINATA_API_SECRET")
		if apiKey == "" || apiSecret == "" {
			return "", fmt.Errorf("pinata credentials not set in env")
		}
		req.Header.Set("pinata_api_key", apiKey)
		req.Header.Set("pinata_secret_api_key", apiSecret)
	}

	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("request to pinata failed: %w", err)
	}
	defer resp.Body.Close()

	bodyBytes, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return "", fmt.Errorf("pinata returned status %d: %s", resp.StatusCode, string(bodyBytes))
	}

	var pr PinataResponse
	if err := json.Unmarshal(bodyBytes, &pr); err != nil {
		return "", fmt.Errorf("failed to parse pinata response: %w (body: %s)", err, string(bodyBytes))
	}

	if pr.IpfsHash == "" {
		return "", fmt.Errorf("pinata response missing IpfsHash: %s", string(bodyBytes))
	}

	// Build gateway URL (bisa ganti ke ipfs.io juga)
	url := fmt.Sprintf("https://gateway.pinata.cloud/ipfs/%s", pr.IpfsHash)
	return url, nil
}
