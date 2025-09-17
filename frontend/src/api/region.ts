import api from "./api";

export interface Region {
  id: number;
  nama_region: string;
  created_at?: string;
  updated_at?: string;
}

export interface RegionsResponse {
  data?: Region[];
  regions?: Region[];
  // Beberapa API mungkin mengembalikan format yang berbeda
}

export const getAllRegions = async (): Promise<Region[]> => {
  try {
    const response = await api.get('/api/v1/regions');
    
    console.log("Regions API Response:", response.data); // ✅ Debugging
    
    // Handle berbagai format response
    if (Array.isArray(response.data)) {
      return response.data; // Format: [region1, region2, ...]
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // Format: { data: [region1, region2, ...] }
    } else if (response.data && Array.isArray(response.data.regions)) {
      return response.data.regions; // Format: { regions: [region1, region2, ...] }
    } else {
      console.warn("Unexpected regions response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
};

export const createRegion = async (name: string): Promise<Region> => {
  const response = await api.post('/api/v1/regions', { name });
  return response.data;
};