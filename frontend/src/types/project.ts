export interface Project {
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
