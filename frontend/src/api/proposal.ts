import api from "./api";

export interface Proposal {
  id: number;
  cid?: string;
  created_at: string;
  file_url: string;
  gateway_url?: string;
  project_id: number;
  status: string;
  updated_at: string;
  user_id?: number;
  project_name?: string;
  region?: string;
  budget?: number;
  kategori?: string;
  alamat?: string;
  pengusul?: string;
  status_proposal?: string; // Tambahan untuk API /proposals/:id/projects
}

export interface ProposalResponse {
  message: string;
  data: Proposal;
}

export interface ProposalsResponse {
  message: string;
  data: Proposal[];
}

export interface CreateProposalResponse {
  message: string;
  data: Proposal;
}

export const uploadProposal = async (formData: FormData): Promise<CreateProposalResponse> => {
  const response = await api.post('/api/v1/proposals/full', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const uploadProposal_IPFS = async (formData: FormData): Promise<CreateProposalResponse> => {
  const response = await api.post('/proposal/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getProposalsByUser = async (): Promise<Proposal[]> => {
  const response = await api.get('/api/v1/proposals/me');
  return response.data;
};

export const getAllProposalsProjects = async (): Promise<Proposal[]> => {
  const response = await api.get('/api/v1/proposals/projects');
  return response.data;
};

export const getProposalById = async (id: number): Promise<Proposal> => {
  const response = await api.get<ProposalResponse>(`/api/v1/proposals/${id}`);
  return response.data.data;
};

export const getProposalFromIPFS = async (id: number): Promise<any> => {
  const response = await api.get(`/proposal/${id}`);
  return response.data;
};

export const getAllProposals = async (): Promise<Proposal[]> => {
  const response = await api.get<ProposalsResponse>('/api/v1/proposals');
  return response.data.data;
};

// Perbaikan untuk menggunakan API yang benar sesuai dengan backend
export const getProposalWithDetails = async (id: number): Promise<Proposal> => {
  try {
    // Menggunakan endpoint yang sesuai dengan backend: GET("/proposals/:id/projects", handlers.GetProposalWithDetailByIDHandler)
    const response = await api.get(`/api/v1/proposals/${id}/projects`);
    
    // Berdasarkan response yang Anda berikan, data langsung ada di response tanpa wrapper .data
    // Jadi kita perlu menyesuaikan struktur response
    const proposalData = response.data;
    
    // Normalisasi data untuk konsistensi dengan interface Proposal
    const normalizedData: Proposal = {
      id: proposalData.id,
      cid: proposalData.cid || '',
      created_at: proposalData.created_at,
      file_url: proposalData.file_url,
      gateway_url: proposalData.gateway_url || '',
      project_id: proposalData.project_id,
      status: proposalData.status_proposal || proposalData.status || 'menunggu',
      updated_at: proposalData.updated_at,
      user_id: proposalData.user_id,
      project_name: proposalData.project_name,
      region: proposalData.region,
      budget: proposalData.budget,
      kategori: proposalData.kategori,
      alamat: proposalData.alamat,
      pengusul: proposalData.pengusul || proposalData.region, // Fallback ke region jika pengusul kosong
    };
    
    return normalizedData;
  } catch (error: any) {
    console.error('Error fetching proposal with details:', error);
    
    // Jika API /proposals/:id/projects gagal, coba fallback ke API lain
    try {
      console.log('Trying fallback API...');
      const fallbackResponse = await getProposalFromIPFS(id);
      
      if (fallbackResponse.data) {
        const fallbackData = fallbackResponse.data;
        return {
          id: fallbackData.id,
          cid: fallbackData.cid || '',
          created_at: fallbackData.created_at,
          file_url: fallbackData.file_url,
          gateway_url: fallbackData.gateway_url || '',
          project_id: fallbackData.project_id,
          status: fallbackData.status || 'menunggu',
          updated_at: fallbackData.updated_at,
          user_id: fallbackData.user_id,
        };
      }
    } catch (fallbackError) {
      console.error('Fallback API also failed:', fallbackError);
    }
    
    throw error;
  }
};