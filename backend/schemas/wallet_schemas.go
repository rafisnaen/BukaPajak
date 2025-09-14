package schemas

type VerifyWalletRequest struct {
	Email     string `json:"email" binding:"required"`
	Address   string `json:"address" binding:"required"`
	Signature string `json:"signature" binding:"required"`
}
