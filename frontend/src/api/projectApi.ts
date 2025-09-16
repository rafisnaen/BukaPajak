// src/services/projectService.ts
import api from "./api";

// src/services/projectService.ts
export interface ApiProject {
  id: number;
  created_at: string;
  judul: string;
  deskripsi: string;
  budget: number;
  gambar_url: string;
  status: string;
  kategori?: string;
  region_id?: number;
}

export interface ApiResponse {
  data: ApiProject[];
}

export const getAllProjects = async (): Promise<ApiProject[]> => {
  try {
    const response = await api.get<ApiResponse>("/admin/projects");
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Gagal mengambil data proyek. Silakan coba lagi nanti.");
  }
};