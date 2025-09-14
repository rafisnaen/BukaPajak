package models

type UserPemerintah struct {
	ID        int    `json:"id"`
	CreatedAt string `json:"created_at"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}
