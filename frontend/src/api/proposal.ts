// src/api/proposal.ts
import api from "./api";

export const uploadProposalAndProject = async (formData: FormData) => {
  const res = await api.post("/api/v1/proposals/full", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
