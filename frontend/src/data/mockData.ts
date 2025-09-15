import { Proposal, WalletStats, ProposalSummary } from "@/types/proposal";
import bridgeProjectImage from "@/assets/bridge-project.jpg";
import roadProjectImage from "@/assets/road-project.jpg";
import schoolProjectImage from "@/assets/school-project.jpg";
import healthProjectImage from "@/assets/health-project.jpg";
import securityProjectImage from "@/assets/security-project.jpg";

export const mockWalletStats: WalletStats = {
  totalBalance: 12.50,
  totalDisbursed: 85.00,
};

export const mockProposalSummary: ProposalSummary = {
  total: 11,
  pending: 3,
  approved: 5,
  rejected: 2,
};

export const mockProposals: Proposal[] = [
  {
    id: "1",
    projectName: "Pembangunan Jembatan Desa Sukamaju",
    ethAmount: 5,
    category: "infrastruktur",
    description: "Proyek pembangunan jembatan untuk menghubungkan desa dengan jalan utama, meningkatkan akses transportasi warga.",
    status: "approved",
    submittedDate: "2025-08-15",
    imageUrl: bridgeProjectImage,
  },
  {
    id: "2", 
    projectName: "Perbaikan Jalan Utama Rawa Belong",
    ethAmount: 15,
    category: "infrastruktur",
    description: "Perbaikan dan pengaspalan jalan utama yang mengalami kerusakan parah untuk kelancaran lalu lintas.",
    status: "approved",
    submittedDate: "2025-09-01",
    imageUrl: roadProjectImage,
  },
  {
    id: "3",
    projectName: "Renovasi Gedung Sekolah SDN 01",
    ethAmount: 8,
    category: "pendidikan",
    description: "Renovasi gedung sekolah yang sudah tua untuk menciptakan lingkungan belajar yang lebih baik.",
    status: "pending",
    submittedDate: "2025-09-02",
    imageUrl: schoolProjectImage,
  },
  {
    id: "4",
    projectName: "Pengadaan Alat Kesehatan Puskesmas",
    ethAmount: 12,
    category: "kesehatan",
    description: "Pengadaan alat-alat kesehatan modern untuk meningkatkan kualitas pelayanan kesehatan masyarakat.",
    status: "rejected",
    submittedDate: "2025-09-10",
    imageUrl: healthProjectImage,
  },
  {
    id: "5",
    projectName: "Pembangunan Pos Keamanan Desa",
    ethAmount: 6,
    category: "pertahanan",
    description: "Pembangunan pos keamanan untuk meningkatkan keamanan dan ketertiban di wilayah desa.",
    status: "pending",
    submittedDate: "2025-09-12",
    imageUrl: securityProjectImage,
  },
];