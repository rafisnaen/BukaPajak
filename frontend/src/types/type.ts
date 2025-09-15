// types/index.ts
export interface Register {
  email: string;
  password: string;
  secret_key: string; 
}

export interface Login {
  email: string;
  password: string;
}

export interface Feedback {
  id?: number;
  nama: string;
  lokasi: string;
  subjek: string;
  pesan: string;
}

export interface FeedbackResponse {
  message?: string;
  error?: string;
}

// Interface untuk data dari API backend
export interface ApiProvince {
  id: number;
  nama_region: string;
  dana_diterima: number;
  dana_dipakai: number;
  sisa_dana: number;
  kota: string;
  total_proyek: number;
  selesai: number;
  berlangsung: number;
  jumlah_penduduk: number;
  created_at: string;
  updated_at: string;
}

// Interface untuk frontend (setelah transformasi)
export interface Province {
  id: number;
  name: string;
  receivedFunds: number;
  usedFunds: number;
  remainingFunds: number;
  cityName: string; // Nama kota (dari API)
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  population: number;
}

export interface ProvinceCardProps {
  id: number;
  name: string;
  receivedFunds: number;
  usedFunds: number;
  remainingFunds: number;
  cityName: string;
  ongoingProjects: number;
  completedProjects: number;
  population: number;
}