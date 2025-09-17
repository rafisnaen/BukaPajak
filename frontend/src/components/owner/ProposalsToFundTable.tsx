// src/components/owner/ProposalsToFundTable.tsx
import React, { useState, useEffect } from "react";
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

interface ProposalToFund {
    id: string;
    title: string;
    amount: number;
    approvedDate: string;
    auditor: string;
    recipientAddress: string;
}

// Mock data sebagai fallback jika API gagal
const mockProposalsToFund: ProposalToFund[] = [
    { 
        id: '2', 
        title: 'Perbaikan Jalan Utama Rawa Belong', 
        amount: 15, 
        approvedDate: '5/9/2025', 
        auditor: 'Budi (BPK)', 
        recipientAddress: '0x3B921248c937D100d566Cf78d115eb9612bc7d14' 
    },
    { 
        id: '7', 
        title: 'Beasiswa Pendidikan Dokter', 
        amount: 50, 
        approvedDate: '13/9/2025', 
        auditor: 'Budi (BPK)', 
        recipientAddress: '0x3B921248c937D100d566Cf78d115eb9612bc7d14' 
    },
];

export const ProposalsToFundTable: React.FC = () => {
    const [proposals, setProposals] = useState<ProposalToFund[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<ProposalToFund | null>(null);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Simulasi delay loading
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Coba import API function secara dinamis
                try {
                    const { getAllProposalsProjects_Acc} = await import("@/api/proposal");
                    const data = await getAllProposalsProjects_Acc();
                    
                    if (!Array.isArray(data) || data.length === 0) {
                        console.log('No data from API, using mock data');
                        setProposals(mockProposalsToFund);
                        return;
                    }
                    
                    const transformedData: ProposalToFund[] = data.map((proposal: any) => ({
                        id: proposal.id?.toString() || Math.random().toString(),
                        title: proposal.project_name || 'Nama Proyek Tidak Tersedia',
                        amount: typeof proposal.budget === 'number' ? proposal.budget : 0,
                        approvedDate: proposal.updated_at 
                            ? new Date(proposal.updated_at).toLocaleDateString('id-ID')
                            : new Date().toLocaleDateString('id-ID'),
                        auditor: proposal.region || 'Tidak Diketahui',
                        recipientAddress: '0x3B921248c937D100d566Cf78d115eb9612bc7d14',
                    }));
                    
                    setProposals(transformedData);
                } catch (apiError) {
                    console.log('API error, using mock data:', apiError);
                    setProposals(mockProposalsToFund);
                }
            } catch (err: any) {
                console.error('Error fetching proposals:', err);
                setError('Gagal memuat data proposal, menampilkan data contoh');
                setProposals(mockProposalsToFund);
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, []);

    const handleOpenModal = (proposal: ProposalToFund) => {
        setSelectedProposal(proposal);
        setModalOpen(true);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600">Memuat data proposal...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg border shadow-sm">
                {error && (
                    <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
                        <div className="text-sm text-yellow-700">{error}</div>
                    </div>
                )}
                
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
                        {proposals.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                    Tidak ada proposal yang disetujui untuk didanai
                                </TableCell>
                            </TableRow>
                        ) : (
                            proposals.map((proposal) => (
                                <TableRow key={proposal.id}>
                                    <TableCell className="font-medium">#{proposal.id}</TableCell>
                                    <TableCell>{proposal.title}</TableCell>
                                    <TableCell className="text-muted-foreground">{proposal.auditor}</TableCell>
                                    <TableCell className="text-right font-semibold">
                                        {proposal.amount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>{proposal.approvedDate}</TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            onClick={() => handleOpenModal(proposal)} 
                                            size="sm" 
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Cairkan Dana
                                            <Send className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
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