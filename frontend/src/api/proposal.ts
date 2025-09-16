// src/api/proposal.ts
import api from "./api";

// Interface untuk response
interface ProposalResponse {
  success: boolean;
  message: string;
  data: {
    project_id: number;
    project: {
      id: number;
      judul: string;
      kategori: string;
      budget: number;
      status: string;
      gambar_url: string;
    };
    proposal: {
      user_id: number;
      project_id: number;
      file_url: string;
      status_proposal: string;
    };
  };
}

interface ErrorResponse {
  error: string;
  message: string;
  details?: string;
}

// Upload proposal dan project
export const uploadProposalAndProject = async (formData: FormData): Promise<ProposalResponse> => {
  try {
    console.log("API: Sending request to /api/v1/proposals/full");
    
    // Debug log form data
    console.log("API: Form data contents:");
    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(`${pair[0]}: File - ${pair[1].name} (${pair[1].size} bytes)`);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }

    const response = await api.post<ProposalResponse>("/api/v1/proposals/full", formData, {
      headers: { 
        "Content-Type": "multipart/form-data" 
      },
      timeout: 30000, // 30 detik timeout untuk upload file
    });
    
    console.log("API: Response received:", response.data);
    return response.data;
    
  } catch (error: any) {
    console.error("API: Upload error:", error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorData: ErrorResponse = error.response.data;
      console.error("API: Server error:", errorData);
      
      throw new Error(errorData.message || errorData.error || "Terjadi kesalahan pada server");
    } else if (error.request) {
      // Request was made but no response received
      console.error("API: Network error:", error.request);
      throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    } else {
      // Something else happened
      console.error("API: Unknown error:", error.message);
      throw new Error(error.message || "Terjadi kesalahan yang tidak diketahui");
    }
  }
};

// Get all proposals
export const getAllProposals = async () => {
  try {
    const response = await api.get("/api/v1/proposals");
    return response.data;
  } catch (error: any) {
    console.error("API: Get proposals error:", error);
    throw new Error(error.response?.data?.message || "Gagal mengambil data proposal");
  }
};

// Get user proposals
export const getUserProposals = async () => {
  try {
    const response = await api.get("/api/v1/proposals/user");
    return response.data;
  } catch (error: any) {
    console.error("API: Get user proposals error:", error);
    throw new Error(error.response?.data?.message || "Gagal mengambil proposal Anda");
  }
};

// Get proposal by ID
export const getProposalById = async (id: number) => {
  try {
    const response = await api.get(`/api/v1/proposals/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("API: Get proposal by ID error:", error);
    throw new Error(error.response?.data?.message || "Gagal mengambil detail proposal");
  }
};

// Get all regions (untuk dropdown provinsi)
export const getAllRegions = async () => {
  try {
    const response = await api.get("/api/v1/regions");
    return response.data;
  } catch (error: any) {
    console.error("API: Get regions error:", error);
    throw new Error(error.response?.data?.message || "Gagal mengambil data provinsi");
  }
};