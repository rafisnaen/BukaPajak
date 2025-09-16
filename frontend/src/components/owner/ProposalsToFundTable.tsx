// src/components/owner/ProposalsToFundTable.tsx

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FundReleaseModal } from "./FundReleaseModal";

// Data ini nantinya akan diambil dari API/backend, hanya proposal dengan status APPROVED
const mockProposalsToFund = [
    { id: '2', title: 'Perbaikan Jalan Utama Rawa Belong', amount: 15, approvedDate: '5/9/2025', auditor: 'Budi (BPK)', recipientAddress: '0x3B921248c937D100d566Cf78d115eb9612bc7d14' },
    { id: '7', title: 'Beasiswa Pendidikan Dokter', amount: 50, approvedDate: '13/9/2025', auditor: 'Budi (BPK)', recipientAddress: '0x8A1fB2c3d4E5F6a7b8C9d0e1f2a3b4c5d6e7f8d9' },
];

export const ProposalsToFundTable = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<any>(null);

    const handleOpenModal = (proposal: any) => {
        setSelectedProposal(proposal);
        setModalOpen(true);
    };

    return (
        <>
            <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nama Proyek</TableHead>
                            <TableHead>Auditor</TableHead>
                            <TableHead className="text-right">Jumlah (ETH)</TableHead>
                            <TableHead>Tgl. Disetujui</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockProposalsToFund.map((proposal) => (
                            <TableRow key={proposal.id}>
                                <TableCell className="font-medium">#{proposal.id}</TableCell>
                                <TableCell>{proposal.title}</TableCell>
                                <TableCell className="text-muted-foreground">{proposal.auditor}</TableCell>
                                <TableCell className="text-right font-semibold">{proposal.amount.toFixed(2)}</TableCell>
                                <TableCell>{proposal.approvedDate}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleOpenModal(proposal)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                                        Cairkan Dana
                                        <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {selectedProposal && (
                <FundReleaseModal 
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    proposal={selectedProposal}
                />
            )}
        </>
    );
};