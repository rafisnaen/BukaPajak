import api from "./api";

export interface Project {
  id: number;
  judul: string;
  deskripsi: string;
  budget: number;
  gambar_url: string;
  region_id: number;
  status: string;
  kategori: string;
  alamat: string;
  user_id?: number;      // opsional karena backend saat ini belum kirim
  created_at: string;
  updated_at?: string;   // opsional juga
}

export interface CreateProjectResponse {
  message: string;
  proyek: Project; // ✅ backend mengirim "proyek"
}

// --- Create Project ---
export const createProject = async (
  formData: FormData
): Promise<CreateProjectResponse> => {
  // pastikan budget berupa number string
  const budgetValue = formData.get("budget");
  if (typeof budgetValue === "string") {
    formData.set("budget", String(parseFloat(budgetValue)));
  }

  // normalisasi status & kategori biar tidak gagal validasi
  if (formData.get("status")) {
    formData.set("status", (formData.get("status") as string).toLowerCase());
  }
  if (formData.get("kategori")) {
    formData.set("kategori", (formData.get("kategori") as string).toLowerCase());
  }

  const response = await api.post("/admin/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// --- Get Projects by User ---
export const getProjectsByUser = async (): Promise<Project[]> => {
  const response = await api.get("/user/projects");
  return response.data;
};

// --- Get All Projects ---
export const getAllProjects = async (): Promise<Project[]> => {
  const response = await api.get("/admin/projects");
  return response.data;
};

// --- Get Project By ID ---
export const getProjectById = async (id: number): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};
