package configs

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	storage_go "github.com/supabase-community/storage-go"
	supa "github.com/supabase-community/supabase-go"
)

var Supabase *supa.Client
var Storage *storage_go.Client
var SupabaseRef string
var StorageEnabled bool = false

func ConnectSupaBase() error {
	err := godotenv.Load()
	if err != nil {
		log.Printf("⚠️ Warning: Error loading .env file: %v", err)
	}

	url := os.Getenv("SUPABASEURL")
	// 👇 PERUBAHAN UTAMA ADA DI SINI. MENGGUNAKAN KUNCI SERVICE ROLE.
	key := os.Getenv("SUPABASE_SERVICE_KEY")
	serviceKey := os.Getenv("SUPABASE_SERVICE_KEY")

	log.Printf("🔧 Config values - URL: %s, Service Key present: %t",
		url, key != "")

	if url == "" || key == "" {
		return fmt.Errorf("SUPABASEURL or SUPABASE_SERVICE_KEY environment variables not set")
	}

	// ... sisa kode di fungsi ini tidak perlu diubah ...
	if strings.HasPrefix(url, "https://") && strings.Contains(url, ".supabase.co") {
		start := len("https://")
		end := strings.Index(url, ".supabase.co")
		if end > start {
			SupabaseRef = url[start:end]
			log.Printf("🔧 Extracted SupabaseRef: %s", SupabaseRef)
		}
	}

	client, err := supa.NewClient(url, key, nil)
	if err != nil {
		return fmt.Errorf("failed to connect to Supabase DB client: %v", err)
	}
	Supabase = client
	log.Printf("✅ Supabase database client connected with service role permissions")

	if serviceKey != "" {
		log.Printf("🔧 Initializing storage client with service key...")
		storageURL := fmt.Sprintf("https://%s.supabase.co/storage/v1", SupabaseRef)
		storageClient := storage_go.NewClient(storageURL, serviceKey, nil)
		Storage = storageClient
		if err := testStorageConnection(); err != nil {
			log.Printf("❌ Storage connection failed: %v", err)
			StorageEnabled = false
		} else {
			log.Printf("✅ Storage client connected successfully")
			StorageEnabled = true
			if err := ensureProposalsBucket(); err != nil {
				log.Printf("⚠️ Failed to ensure proposals bucket: %v", err)
			}
		}
	} else {
		log.Printf("❌ SUPABASE_SERVICE_KEY not set - file upload features disabled")
		StorageEnabled = false
	}
	log.Printf("✅ Connected to Supabase database successfully (ref=%s)", SupabaseRef)
	log.Printf("🔧 Storage enabled: %t", StorageEnabled)
	return nil
}

// ... sisa file
func testStorageConnection() error {
	log.Printf("🔧 Testing storage connection...")
	buckets, err := Storage.ListBuckets()
	if err != nil {
		return fmt.Errorf("cannot list buckets: %v", err)
	}
	log.Printf("✅ Found %d buckets", len(buckets))
	return nil
}

func ensureProposalsBucket() error {
	log.Printf("🔧 Ensuring proposals bucket exists...")
	buckets, err := Storage.ListBuckets()
	if err != nil {
		return fmt.Errorf("cannot list buckets: %v", err)
	}

	// Cek apakah bucket proposals sudah ada
	for _, bucket := range buckets {
		if bucket.Name == "proposals" {
			log.Printf("✅ 'proposals' bucket exists")
			return nil
		}
	}

	// Buat bucket jika belum ada
	log.Printf("⏳ Creating 'proposals' bucket...")
	_, err = Storage.CreateBucket("proposals", storage_go.BucketOptions{})
	if err != nil {
		if strings.Contains(strings.ToLower(err.Error()), "already exists") {
			log.Printf("✅ 'proposals' bucket already exists")
			return nil
		}
		return fmt.Errorf("failed to create proposals bucket: %v", err)
	}

	log.Printf("✅ Created 'proposals' bucket successfully")
	return nil
}

// IsStorageEnabled returns whether storage features are available
func IsStorageEnabled() bool {
	return StorageEnabled && Storage != nil
}
