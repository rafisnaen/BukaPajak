import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import api from "@/api/api";
// Interface untuk data proposal sesuai dengan struktur API
interface Proposal {
  id: number;
  file_url: string;
  created_at: string;
  updated_at: string;
  status_proposal: string;
  user_id: number;
  project_id: number;
  project_name: string;
  region: string;
  budget: number;
  kategori: string;
  alamat: string;
  pengusul: string;
}

export const ProposalReviewTable = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data proposal
  const getAllProposals = async (): Promise<Proposal[]> => {
    const response = await api.get('/api/v1/proposals/projects');
    return response.data;
  };

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const proposalsData = await getAllProposals();
        setProposals(proposalsData);
        
        console.log("Proposals loaded:", proposalsData);
        
      } catch (error: any) {
        console.error("Error fetching proposals:", error);
        const errorMessage = error.response?.data?.error || 
                            error.response?.data?.message || 
                            error.message || 
                            "Gagal memuat data proposal";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-8 flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Memuat data proposal...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-8">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
        <p className="text-muted-foreground">Tidak ada proposal yang perlu direview</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Proposal</TableHead>
            <TableHead>Nama Proyek</TableHead>
            <TableHead>Pengusul</TableHead>
            <TableHead className="text-right">Jumlah (Eth)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tgl. Pengajuan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">#{proposal.id}</TableCell>
              <TableCell>
                {proposal.project_name || "N/A"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {proposal.region || "Unknown"}
              </TableCell>
              <TableCell className="text-right">
                {proposal.budget ? `Rp ${proposal.budget.toLocaleString('id-ID')}` : "N/A"}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    proposal.status_proposal === "disetujui" ? "default" :
                    proposal.status_proposal === "ditolak" ? "destructive" :
                    "secondary"
                  }
                >
                  {proposal.status_proposal}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(proposal.created_at), "dd/MM/yyyy", { locale: id })}
              </TableCell>
              <TableCell>
                <Link to={`/auditor/review/${proposal.id}`}>
                  <Button variant="outline" size="sm">
                    Review
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};