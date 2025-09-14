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
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Data ini nantinya akan diambil dari API/backend, hanya proposal dengan status AI_VERIFIED
const mockProposalsToReview = [
    { id: '2', title: 'Perbaikan Jalan Utama Rawa Belong', amount: 15, submissionDate: '1/9/2025', proposer: 'Dinas PU DKI Jakarta' },
    { id: '5', title: 'Pembangunan RSUD Rujukan Tipe A', amount: 150, submissionDate: '11/9/2025', proposer: 'Dinas Kesehatan Jabar' },
    { id: '8', title: 'Digitalisasi Arsip Nasional', amount: 25, submissionDate: '12/9/2025', proposer: 'Kementerian PANRB' },
];

export const ProposalReviewTable = () => {
    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID Proposal</TableHead>
                        <TableHead>Nama Proyek</TableHead>
                        <TableHead>Pengusul</TableHead>
                        <TableHead className="text-right">Jumlah (ETH)</TableHead>
                        <TableHead>Tgl. Pengajuan</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockProposalsToReview.map((proposal) => (
                        <TableRow key={proposal.id}>
                            <TableCell className="font-medium">#{proposal.id}</TableCell>
                            <TableCell>{proposal.title}</TableCell>
                            <TableCell className="text-muted-foreground">{proposal.proposer}</TableCell>
                            <TableCell className="text-right">{proposal.amount.toFixed(2)}</TableCell>
                            <TableCell>{proposal.submissionDate}</TableCell>
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
