// src/pages/proposer/HistoryPage.tsx
import { useState } from "react";
import { ProposalCard } from "@/components/proposer/ProposalCard";
import { Badge } from "@/components/ui/badge";
import { mockProposals } from "@/data/mockData";
import { Proposal, ProposalStatus } from "@/types/proposal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, FileText, Tag } from "lucide-react";
import { ProposerLayout } from "@/components/proposer/ProposerLayout"; // Import ProposerLayout

const statusFilters = [
  { value: "all", label: "Semua Status", count: mockProposals.length },
  { value: "approved", label: "Disetujui", count: mockProposals.filter(p => p.status === "approved").length },
  { value: "pending", label: "Menunggu", count: mockProposals.filter(p => p.status === "pending").length },
  { value: "rejected", label: "Ditolak", count: mockProposals.filter(p => p.status === "rejected").length },
];

const categoryLabels = {
  infrastruktur: "Infrastruktur",
  pendidikan: "Pendidikan", 
  kesehatan: "Kesehatan",
  pertahanan: "Pertahanan",
};

export default function ProposalHistory() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const filteredProposals = selectedStatus === "all" 
    ? mockProposals 
    : mockProposals.filter(p => p.status === selectedStatus);

  const handleProposalClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  const getStatusBadge = (status: ProposalStatus) => {
    const config = {
      pending: { className: "bg-pending text-pending-foreground", label: "Menunggu" },
      approved: { className: "bg-success text-success-foreground", label: "Disetujui" },
      rejected: { className: "bg-destructive text-destructive-foreground", label: "Ditolak" },
    };
    return config[status];
  };

  return (
    <ProposerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Riwayat Proposal</h1>
          <p className="text-muted-foreground">
            Lihat semua proposal yang telah Anda ajukan beserta statusnya
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-3">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedStatus === filter.value ? "default" : "outline"}
              onClick={() => setSelectedStatus(filter.value)}
              className={`${
                selectedStatus === filter.value 
                  ? "bg-gradient-primary shadow-glow" 
                  : "hover:bg-accent"
              }`}
            >
              {filter.label}
              <Badge variant="secondary" className="ml-2">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Proposals Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onClick={() => handleProposalClick(proposal)}
            />
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Tidak ada proposal ditemukan
            </h3>
            <p className="text-muted-foreground">
              Belum ada proposal dengan status yang dipilih.
            </p>
          </div>
        )}

        {/* Proposal Detail Modal */}
        <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
          <DialogContent className="max-w-2xl bg-gradient-card">
            <DialogHeader>
              <DialogTitle className="text-xl text-foreground">
                Detail Proposal
              </DialogTitle>
            </DialogHeader>
            
            {selectedProposal && (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedProposal.projectName}
                  </h2>
                  <Badge className={getStatusBadge(selectedProposal.status).className}>
                    {getStatusBadge(selectedProposal.status).label}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Jumlah Dana</p>
                      <p className="font-semibold">{selectedProposal.ethAmount} ETH</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tanggal Pengajuan</p>
                      <p className="font-semibold">
                        {new Date(selectedProposal.submittedDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Kategori</p>
                      <p className="font-semibold">
                        {categoryLabels[selectedProposal.category]}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Deskripsi Proyek</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProposal.description}
                  </p>
                </div>

                {selectedProposal.imageUrl && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Gambar Prediksi Proyek
                    </h3>
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={selectedProposal.imageUrl} 
                        alt={`Preview ${selectedProposal.projectName}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProposerLayout>
  );
}