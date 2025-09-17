import api from "./api";

export interface Proposal {
  id: number;
  file_url: string;
  status_proposal: string;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProposalResponse {
  message: string;
  data: Proposal;
}

export const uploadProposal = async (formData: FormData): Promise<CreateProposalResponse> => {
  const response = await api.post('/api/v1/proposals/full', formData, { // Perbaikan endpoint
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const uploadProposal_IPFS = async (formData: FormData): Promise<CreateProposalResponse> => {
  const response = await api.post('/proposal/upload', formData, { // Perbaikan endpoint
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const getProposalsByUser = async (): Promise<Proposal[]> => {
  const response = await api.get('/api/v1/proposals/me'); // Sesuai dengan /proposals/me di backend
  return response.data;
};

export const getAllProposals = async (): Promise<Proposal[]> => {
  const response = await api.get('/api/v1/proposals'); // Sesuai dengan /proposals di backend
  return response.data;
};

export const getProposalById = async (id: number): Promise<Proposal> => {
  const response = await api.get(`/api/v1/proposals/${id}`); // Sesuai dengan /proposals/:id di backend
  return response.data;
};
export const getAllProposalsProjects = async (): Promise<Proposal[]> => {
  const response = await api.get('/api/v1/proposals/projects'); // Sesuai dengan /proposals di backend
  return response.data;
};