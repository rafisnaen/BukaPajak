import { ProposalCard } from "./ProposalCard";

// Komponen ini menampilkan daftar proposal terbaru milik pengguna.
// WAJIB: Tambahkan 'export' agar bisa diimpor oleh DashboardPage.
export const ProposalHistory = () => {
    // PENTING: Data ini adalah data palsu (mock data) untuk tujuan pengembangan UI.
    // Nantinya, data ini akan diambil secara dinamis dari backend Anda.
    const mockProposals = [
        { id: '1', title: "Pembangunan Jembatan Desa Sukamaju", status: "Funded" as const, amount: 5, submissionDate: "2025-08-15" },
        { id: '2', title: "Perbaikan Jalan Utama Rawa Belong", status: "Approved" as const, amount: 15, submissionDate: "2025-09-01" },
        { id: '3', title: "Renovasi Gedung Sekolah SDN 01", status: "Pending" as const, amount: 8, submissionDate: "2025-09-10" },
        { id: '4', title: "Pengadaan Alat Kesehatan Puskesmas", status: "Rejected" as const, amount: 12, submissionDate: "2025-09-11" },
    ];

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Riwayat Proposal Terbaru</h3>
            {mockProposals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockProposals.map(proposal => (
                        <ProposalCard key={proposal.id} proposal={proposal} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 px-6 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Anda belum mengajukan proposal apapun.</p>
                </div>
            )}
        </div>
    );
};

