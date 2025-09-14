// src/pages/proposer/DashboardPage.tsx
import { StatsCard } from "@/components/proposer/StatsCard";
import { ProposalCard } from "@/components/proposer/ProposalCard";
import { mockProposals, mockProposalSummary, mockWalletStats } from "@/data/mockData";
import { Wallet, DollarSign, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { ProposerLayout } from "@/components/proposer/ProposerLayout";

export default function Dashboard() {
  const recentProposals = mockProposals
    .filter(p => p.status !== "pending")
    .slice(0, 3);

  return (
    <ProposerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang di sistem transparansi proposal Web3
          </p>
        </div>

        {/* Wallet Stats */}
        <div className="grid gap-6 md:grid-cols-2">
          <StatsCard
            title="Total Dana di Wallet"
            value={`${mockWalletStats.totalBalance} ETH`}
            description="Saldo terkini di wallet terhubung"
            icon={Wallet}
          />
          <StatsCard
            title="Total Dana Berhasil Dicairkan"
            value={`${mockWalletStats.totalDisbursed} ETH`}
            description="Dari semua proposal yang telah didanai"
            icon={DollarSign}
          />
        </div>

        {/* Proposal Summary */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Ringkasan Proposal Anda
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <StatsCard
              title="Total"
              value={mockProposalSummary.total}
              description="Semua proposal"
              icon={FileText}
            />
            <StatsCard
              title="Pending"
              value={mockProposalSummary.pending}
              description="Menunggu review"
              icon={Clock}
            />
            <StatsCard
              title="Disetujui"
              value={mockProposalSummary.approved}
              description="Telah diapprove"
              icon={CheckCircle}
              className="border-l-4 border-l-success"
            />
            <StatsCard
              title="Didanai"
              value={mockProposalSummary.approved}
              description="Sudah cair"
              icon={DollarSign}
              className="border-l-4 border-l-primary"
            />
            <StatsCard
              title="Ditolak"
              value={mockProposalSummary.rejected}
              description="Tidak disetujui"
              icon={XCircle}
              className="border-l-4 border-l-destructive"
            />
          </div>
        </div>

        {/* Recent Proposals */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Proposal Terbaru
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onClick={() => console.log("Clicked proposal:", proposal.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </ProposerLayout>
  );
}