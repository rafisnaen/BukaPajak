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

// Ambil semua feedback (opsional, kalau backend ada GET)
export async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const res = await api.get<Feedback[]>("/feedback");
    return res.data;
  } catch (error: any) {
    console.error("Gagal fetch feedback:", error);
    return [];
  }
}
