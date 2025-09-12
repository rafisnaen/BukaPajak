// schemas/progress_request.go
package schemas

type ProgressRequest struct {
	ProyekID       int    `form:"proyek_id" binding:"required"`
	Title          string `form:"title" binding:"required"`
	Deskripsi      string `form:"deskripsi" binding:"required"`
	Penjelasan     string `form:"penjelasan"`
	ProjectManager string `form:"project_manager"`
	Anggaran       string `form:"anggaran"`
	Status         string `form:"status"` // "selesai" atau "dalam progress"
}
