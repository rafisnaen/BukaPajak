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
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Data ini nantinya akan diambil dari API/backend
const mockReviewedProposals = [
    { id: '1', title: 'Pembangunan Jembatan Desa Sukamaju', status: 'Approved', reviewDate: '14/09/2025', proposer: 'Dinas PU DKI Jakarta' },
    { id: '4', title: 'Pengadaan Alat Kesehatan Puskesmas', status: 'Rejected', reviewDate: '13/09/2025', proposer: 'Dinkes Tangsel' },
    { id: '6', title: 'Renovasi Stadion Mini', status: 'Approved', reviewDate: '12/09/2025', proposer: 'Dispora Jakbar' },
];

export const ReviewHistoryTable = () => {
    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID Proposal</TableHead>
                        <TableHead>Nama Proyek</TableHead>
                        <TableHead>Pengusul</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tgl. Review</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockReviewedProposals.map((proposal) => (
                        <TableRow key={proposal.id}>
                            <TableCell className="font-medium">#{proposal.id}</TableCell>
                            <TableCell>{proposal.title}</TableCell>
                            <TableCell className="text-muted-foreground">{proposal.proposer}</TableCell>
                            <TableCell>
                                <Badge variant={proposal.status === 'Approved' ? 'default' : 'destructive'}>
                                    {proposal.status === 'Approved' ? 'Disetujui' : 'Ditolak'}
                                </Badge>
                            </TableCell>
                            <TableCell>{proposal.reviewDate}</TableCell>
                            <TableCell className="text-right">
                                <Link to={`/auditor/history/${proposal.id}`}>
                                    <Button variant="outline" size="sm">
                                        Lihat
                                        <Eye className="ml-2 h-4 w-4" />
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