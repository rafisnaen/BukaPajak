// src/api/feedback.ts
import api from "./api";
import { Feedback, FeedbackResponse } from "@/types/type";

// Kirim feedback baru
export async function createFeedback(data: Feedback): Promise<FeedbackResponse> {
  try {
    const res = await api.post<FeedbackResponse>("/feedback", data);
    return res.data;
  } catch (error: any) {
    return { error: error.response?.data?.error || "Terjadi kesalahan" };
  }
}

// Ambil semua feedback
export async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const res = await api.get("/feedback"); // Hapus <Feedback[]> sementara untuk inspeksi
    
    // PERBAIKAN: Periksa apakah res.data adalah sebuah array
    // Jika ya, kembalikan data tersebut. Jika tidak, kembalikan array kosong.
    if (Array.isArray(res.data)) {
      return res.data as Feedback[];
    } else {
      console.warn("API /feedback tidak mengembalikan sebuah array:", res.data);
      return [];
    }
  } catch (error: any) {
    console.error("Gagal fetch feedback:", error);
    return []; // Jika API error, kembalikan array kosong
  }
}