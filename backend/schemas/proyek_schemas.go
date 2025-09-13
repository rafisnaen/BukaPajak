package schemas

type ProjectRequest struct {
	Judul          string `json:"judul" form:"judul" binding:"required"`
	Deskripsi      string `json:"deskripsi" form:"deskripsi" binding:"required"`
	ProjectManager string `json:"project_manager" form:"project_manager" binding:"required"`
	Budget         string `json:"budget" form:"budget" binding:"required"`
}
