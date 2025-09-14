import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Proposal } from "@/types/proposal";
import { Calendar, DollarSign, FileText } from "lucide-react";

interface ProposalCardProps {
  proposal: Proposal;
  onClick?: () => void;
}

const statusConfig = {
  pending: { variant: "secondary" as const, label: "Menunggu", className: "bg-pending text-pending-foreground" },
  approved: { variant: "default" as const, label: "Disetujui", className: "bg-success text-success-foreground" },
  rejected: { variant: "destructive" as const, label: "Ditolak", className: "bg-destructive text-destructive-foreground" },
};

const categoryLabels = {
  infrastruktur: "Infrastruktur",
  pendidikan: "Pendidikan", 
  kesehatan: "Kesehatan",
  pertahanan: "Pertahanan",
};

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  const statusInfo = statusConfig[proposal.status];

  return (
    <Card 
      className="bg-gradient-card border-0 shadow-card hover:shadow-glow hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <Badge className={statusInfo.className}>
              {statusInfo.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-2">
            {proposal.projectName}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">{proposal.ethAmount} ETH</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Diajukan: {new Date(proposal.submittedDate).toLocaleDateString('id-ID')}</span>
            </div>
          </div>
        </div>

        {proposal.imageUrl && (
          <div className="rounded-md overflow-hidden">
            <img 
              src={proposal.imageUrl} 
              alt={`Preview ${proposal.projectName}`} 
              className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        )}

        <div className="pt-2 border-t">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {categoryLabels[proposal.category]}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}