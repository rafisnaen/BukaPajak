// api/region.ts
import { ApiProvince, Province } from '@/types/type';
const API_BASE_URL = "http://localhost:8080";

// Fungsi untuk transformasi data dari API ke format frontend
const transformApiDataToProvince = (apiData: ApiProvince): Province => ({
  id: apiData.id,
  name: apiData.nama_region || "Tanpa Nama",
  receivedFunds: apiData.dana_diterima || 0,
  usedFunds: apiData.dana_dipakai || 0,
  remainingFunds: apiData.sisa_dana || 0,
  cityName: apiData.kota || "Tidak Diketahui",
  totalProjects: apiData.total_proyek || 0,
  completedProjects: apiData.selesai || 0,
  ongoingProjects: apiData.berlangsung || 0,
  population: apiData.jumlah_penduduk || 0
});

export const getRegions = async (): Promise<Province[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/region`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch regions: ${res.status} ${res.statusText}`);
    }
    
    const apiData: ApiProvince[] = await res.json();
    console.log("Raw API data:", apiData);
    
    // Transformasi data dari API ke format frontend
    return apiData.map(transformApiDataToProvince);
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
};