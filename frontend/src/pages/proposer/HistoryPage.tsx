import { ProposerLayout } from "@/components/proposer/ProposerLayout";
import { ProposalCard, ProposalProps } from "@/components/proposer/ProposalCard";

// Halaman ini sekarang khusus untuk menampilkan daftar riwayat proposal.
const HistoryPage = () => {

    // Data ini nantinya akan diambil dari API/backend
    const mockProposals: ProposalProps[] = [
        { id: '1', title: 'Pembangunan Jembatan Desa Sukamaju', status: 'Funded', amount: 5, submissionDate: '15/8/2025' },
        { id: '2', title: 'Perbaikan Jalan Utama Rawa Belong', status: 'Approved', amount: 15, submissionDate: '1/9/2025' },
        { id: '3', title: 'Renovasi Gedung Sekolah SDN 01', status: 'Pending', amount: 8, submissionDate: '2/9/2025' },
        { id: '4', title: 'Pengadaan Alat Kesehatan Puskesmas', status: 'Rejected', amount: 12, submissionDate: '10/9/2025' },
        // ...tambahkan data lain jika perlu
    ];

    return (
        <ProposerLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Riwayat Proposal</h1>
                
                {mockProposals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockProposals.map((proposal) => (
                            <ProposalCard key={proposal.id} proposal={proposal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border">
                        <h3 className="text-lg font-medium text-gray-800">Tidak Ada Riwayat</h3>
                        <p className="text-gray-500 mt-2">Anda belum mengajukan proposal apapun.</p>
                    </div>
                )}
            </div>
        </ProposerLayout>
    );
};

export default HistoryPage;
