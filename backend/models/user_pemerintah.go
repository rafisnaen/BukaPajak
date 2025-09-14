package models

type UserPemerintah struct {
	ID            int    `json:"id"`
	CreatedAt     string `json:"created_at"`
	Email         string `json:"email"`
	Password      string `json:"password"`
	Name          string `json:"name"`
	WalletAddress string `json:"wallet_address"` // new
	WalletNonce   string `json:"wallet_nonce"`   // new, store nonce to verify signature
}
