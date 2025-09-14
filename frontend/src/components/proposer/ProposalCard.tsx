import { FileText, Calendar, CircleDollarSign } from 'lucide-react';

// Mendefinisikan tipe data untuk sebuah proposal.
// Ini membantu TypeScript memastikan data kita selalu benar.
type Proposal = {
    id: string;
    title: string;
    status: 'Funded' | 'Approved' | 'Pending' | 'Rejected';
    amount: number;
    submissionDate: string;
};

// Mendefinisikan tipe untuk props yang diterima komponen ini.
interface ProposalCardProps {
    proposal: Proposal;
}

// Map untuk mengubah status menjadi teks dan warna yang mudah dibaca.
const statusStyles = {
    Funded: { badge: "bg-green-100 text-green-800", text: "Didanai" },
    Approved: { badge: "bg-blue-100 text-blue-800", text: "Disetujui" },
    Pending: { badge: "bg-yellow-100 text-yellow-800", text: "Menunggu" },
    Rejected: { badge: "bg-red-100 text-red-800", text: "Ditolak" },
};

// WAJIB: Tambahkan 'export' di sini agar bisa diimpor oleh ProposalHistory.
export const ProposalCard = ({ proposal }: ProposalCardProps) => {
    const style = statusStyles[proposal.status];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3">
                <FileText className="w-8 h-8 text-blue-500" />
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${style.badge}`}>
                    {style.text}
                </span>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 h-16">{proposal.title}</h4>
            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                    <CircleDollarSign className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{proposal.amount} ETH</span>
                </div>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Diajukan: {new Date(proposal.submissionDate).toLocaleDateString("id-ID")}</span>
                </div>
            </div>
        </div>
    );
};

