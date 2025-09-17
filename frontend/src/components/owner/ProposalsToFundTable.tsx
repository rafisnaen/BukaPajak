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
import { Send, Loader2, Copy, Check } from "lucide-react";
import { FundReleaseModal } from "./FundReleaseModal";
import { transferFunds, isValidEthereumAddress, isValidAmount, debugServerConnection } from "@/api/transfer";
import { useToast } from "@/components/ui/use-toast";

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
    const [transferringIds, setTransferringIds] = useState<Set<string>>(new Set());
    const [copiedHash, setCopiedHash] = useState<string | null>(null);
    const { toast } = useToast();

    // Debug function untuk testing
    const handleDebugConnection = async () => {
        console.log('=== MANUAL DEBUG TEST ===');
        await debugServerConnection();
        
        // Test manual fetch
        try {
            const token = localStorage.getItem('token');
            console.log('Manual fetch test with token:', token ? 'Token exists' : 'No token');
            
            // Ganti localhost dengan environment variable atau base URL yang sesuai
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-api-domain.com';
            const testResponse = await fetch(`${API_BASE_URL}/api/transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify({
                    to_address: '0x3B921248c937D100d566Cf78d115eb9612bc7d14',
                    amount_wei: '1000000000000000' // 0.001 ETH
                })
            });
            
            console.log('Manual fetch response status:', testResponse.status);
            const responseText = await testResponse.text();
            console.log('Manual fetch response body:', responseText);
            
        } catch (error) {
            console.error('Manual fetch error:', error);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedHash(text);
            setTimeout(() => setCopiedHash(null), 2000);
            toast({
                title: "Berhasil disalin",
                description: "Transaction hash telah disalin ke clipboard",
            });
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

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

    // Fungsi untuk melakukan transfer dana menggunakan API handler
    const handleTransferFunds = async (proposal: ProposalToFund) => {
        try {
            // Validasi data sebelum transfer
            if (!isValidEthereumAddress(proposal.recipientAddress)) {
                throw new Error('Alamat penerima tidak valid');
            }

            if (!isValidAmount(proposal.amount)) {
                throw new Error('Jumlah transfer tidak valid');
            }

            // Tandai proposal sedang dalam proses transfer
            setTransferringIds(prev => new Set([...prev, proposal.id]));

            console.log('Initiating transfer for proposal:', proposal.id);
            console.log('Recipient:', proposal.recipientAddress);
            console.log('Amount:', proposal.amount, 'ETH');

            // Panggil API transfer menggunakan handler yang terpisah
            const result = await transferFunds(proposal.recipientAddress, proposal.amount);

            // Tampilkan konfirmasi transfer yang berhasil dengan toast
            toast({
                title: "✅ Transfer Berhasil",
                description: (
                    <div className="mt-2">
                        <p><strong>Proyek:</strong> {proposal.title}</p>
                        <p><strong>Jumlah:</strong> {result.amount_eth} ETH</p>
                        <div className="flex items-center mt-2">
                            <strong>Tx Hash:</strong> 
                            <span className="ml-2 font-mono text-sm">{result.tx_hash}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-6 w-6 p-0"
                                onClick={() => copyToClipboard(result.tx_hash)}
                            >
                                {copiedHash === result.tx_hash ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                ),
                duration: 10000,
            });

            // Hapus proposal dari list setelah transfer berhasil
            setProposals(prevProposals => 
                prevProposals.filter(p => p.id !== proposal.id)
            );

            console.log('Transfer completed successfully:', result);

        } catch (error: any) {
            console.error('Transfer failed:', error);
            
            // Tampilkan pesan error dengan toast
            toast({
                title: "❌ Transfer Gagal",
                description: `Proyek: ${proposal.title}\nError: ${error.message}`,
                variant: "destructive",
                duration: 5000,
            });
        } finally {
            // Hapus dari list yang sedang proses
            setTransferringIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(proposal.id);
                return newSet;
            });
        }
    };

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
                
                {/* Debug panel - hapus di production */}
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 text-xs">
                    <button 
                        onClick={handleDebugConnection}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700"
                    >
                        Debug API Connection
                    </button>
                    <span className="ml-3 text-gray-600">
                        Token: {localStorage.getItem('token') ? '✅ Exists' : '❌ Missing'}
                    </span>
                </div>
                
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
                                            onClick={() => handleTransferFunds(proposal)} 
                                            size="sm" 
                                            className="bg-blue-600 hover:bg-blue-700"
                                            disabled={transferringIds.has(proposal.id)}
                                        >
                                            {transferringIds.has(proposal.id) ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    Cairkan Dana
                                                    <Send className="ml-2 h-4 w-4" />
                                                </>
                                            )}
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