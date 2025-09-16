// src/api/proposal.ts - Optimized version with better error handling
import api from "./api";

// Interface untuk response yang diperbaiki
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
  message?: string;
  details?: string;
}

interface Region {
  id: number;
  nama_region: string;
  kota: string;
  dana_diterima: number;
  dana_dipakai: number;
  total_proyek: number;
  selesai: number;
  berlangsung: number;
  jumlah_penduduk: number;
}

// Utility function to compress image
const compressImage = (file: File, maxSizeKB: number = 500): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      const maxWidth = 1024;
      const maxHeight = 768;
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        } else {
          reject(new Error('Image compression failed'));
        }
      }, 'image/jpeg', 0.8);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

// Upload proposal dan project dengan optimization
export const uploadProposalAndProject = async (formData: FormData): Promise<ProposalResponse> => {
  try {
    console.log("API: Starting optimized upload process");
    
    // Validasi form data sebelum mengirim
    const requiredFields = ['judul', 'kategori', 'deskripsi', 'budget'];
    const requiredFiles = ['gambar', 'proposal'];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        throw new Error(`Field ${field} wajib diisi`);
      }
    }

    for (const file of requiredFiles) {
      const fileData = formData.get(file);
      if (!fileData || !(fileData instanceof File)) {
        throw new Error(`File ${file} wajib diupload`);
      }
    }

    // Optimize image if too large
    const imageFile = formData.get('gambar') as File;
    const proposalFile = formData.get('proposal') as File;
    
    console.log("Original image size:", imageFile.size, "bytes");
    console.log("Original PDF size:", proposalFile.size, "bytes");
    
    // Compress image if larger than 1MB
    let optimizedImageFile = imageFile;
    if (imageFile.size > 1024 * 1024) {
      console.log("Compressing image...");
      try {
        optimizedImageFile = await compressImage(imageFile, 500);
        console.log("Compressed image size:", optimizedImageFile.size, "bytes");
        formData.set('gambar', optimizedImageFile);
      } catch (error) {
        console.warn("Image compression failed, using original:", error);
      }
    }

    // Check total payload size
    const totalSize = optimizedImageFile.size + proposalFile.size;
    console.log("Total payload size:", totalSize, "bytes", "(" + (totalSize / 1024 / 1024).toFixed(2) + "MB)");
    
    if (totalSize > 15 * 1024 * 1024) { // 15MB limit
      throw new Error("Total ukuran file terlalu besar (max 15MB). Silakan kompres file PDF Anda.");
    }

    console.log("API: Sending request to /api/v1/proposals/full");

    // Upload with optimized settings
    const response = await api.post<ProposalResponse>("/api/v1/proposals/full", formData, {
      headers: { 
        "Content-Type": "multipart/form-data"
      },
      timeout: 120000, // 2 minutes timeout
      maxBodyLength: 20 * 1024 * 1024, // 20MB
      maxContentLength: 20 * 1024 * 1024, // 20MB
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      },
    });
    
    console.log("API: Response received:", response.data);
    
    // Validasi response structure
    if (!response.data || !response.data.data || !response.data.data.project_id) {
      throw new Error("Response tidak valid dari server");
    }
    
    return response.data;
    
  } catch (error: any) {
    console.error("API: Upload error:", error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorData: ErrorResponse = error.response.data;
      console.error("API: Server error:", errorData);
      
      // Specific error messages for common issues
      if (error.response.status === 413) {
        throw new Error("File terlalu besar. Maksimal total 15MB untuk semua file.");
      } else if (error.response.status === 502 || error.response.status === 504) {
        throw new Error("Server timeout. File mungkin terlalu besar atau server overload.");
      } else if (error.response.status === 500) {
        const errorMessage = errorData.details || errorData.error || "Terjadi kesalahan pada server";
        throw new Error(errorMessage);
      }
      
      const errorMessage = errorData.error || errorData.message || "Terjadi kesalahan pada server";
      throw new Error(errorMessage);
      
    } else if (error.request) {
      // Request was made but no response received
      console.error("API: Network error:", error.request);
      
      if (error.code === 'ECONNABORTED') {
        throw new Error("Upload timeout. File terlalu besar atau koneksi lambat. Coba kompres file PDF Anda.");
      } else if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_RESET') {
        throw new Error("Koneksi terputus saat upload. Kemungkinan file terlalu besar atau server restart.");
      }
      
      throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet atau coba lagi nanti.");
      
    } else {
      // Something else happened
      console.error("API: Unknown error:", error.message);
      throw new Error(error.message || "Terjadi kesalahan yang tidak diketahui");
    }
  }
};

// Get all regions dengan error handling yang lebih baik
export const getAllRegions = async (): Promise<Region[]> => {
  try {
    console.log("API: Fetching regions from /api/v1/regions");
    
    const response = await api.get<Region[]>("/api/v1/regions", {
      timeout: 10000, // 10 second timeout for regions
    });
    
    if (!Array.isArray(response.data)) {
      console.error("API: Invalid regions response format:", response.data);
      throw new Error("Format data provinsi tidak valid");
    }
    
    console.log("API: Regions fetched successfully:", response.data.length, "regions");
    return response.data;
    
  } catch (error: any) {
    console.error("API: Get regions error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.error || 
                          error.response.data?.message || 
                          "Gagal mengambil data provinsi";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("Tidak dapat terhubung ke server untuk mengambil data provinsi");
    } else {
      throw new Error(error.message || "Gagal mengambil data provinsi");
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
    throw new Error(error.response?.data?.error || "Gagal mengambil data proposal");
  }
};

// Get user proposals
export const getUserProposals = async () => {
  try {
    const response = await api.get("/api/v1/proposals/user");
    return response.data;
  } catch (error: any) {
    console.error("API: Get user proposals error:", error);
    throw new Error(error.response?.data?.error || "Gagal mengambil proposal Anda");
  }
};

// Get proposal by ID
export const getProposalById = async (id: number) => {
  try {
    const response = await api.get(`/api/v1/proposals/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("API: Get proposal by ID error:", error);
    throw new Error(error.response?.data?.error || "Gagal mengambil detail proposal");
  }
};

// Enhanced file validation with size optimization suggestions
export const validateFile = (file: File, type: 'image' | 'pdf'): string | null => {
  if (type === 'image') {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      return 'File gambar harus berformat JPG atau PNG';
    }
    
    if (file.size > maxSize) {
      return 'Ukuran gambar tidak boleh lebih dari 5MB (gambar akan dikompres otomatis)';
    }
    
  } else if (type === 'pdf') {
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (file.type !== 'application/pdf') {
      return 'File proposal harus berformat PDF';
    }
    
    if (file.size > maxSize) {
      return 'Ukuran file PDF tidak boleh lebih dari 10MB. Silakan kompres PDF Anda terlebih dahulu.';
    }
  }
  
  return null; // File valid
};