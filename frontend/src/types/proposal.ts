export type ProposalStatus = 'pending' | 'approved' | 'rejected';

export type ProposalCategory = 'infrastruktur' | 'pendidikan' | 'kesehatan' | 'pertahanan';

export interface Proposal {
  id: string;
  projectName: string;
  ethAmount: number;
  category: ProposalCategory;
  description: string;
  status: ProposalStatus;
  submittedDate: string;
  documentUrl?: string;
  imageUrl?: string;
}

export interface WalletStats {
  totalBalance: number;
  totalDisbursed: number;
}

export interface ProposalSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}