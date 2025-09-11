package schemas

type ProjectRequest struct {
	Judul          string `json:"judul" binding:"required"`
	Deskripsi      string `json:"deskripsi" binding:"required"`
	ProjectManager string `json:"project_manager" binding:"required"`
}
