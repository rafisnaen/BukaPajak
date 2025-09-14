import { FileText, Clock, CheckCircle, DollarSign, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// WAJIB: Tambahkan 'export' di sini agar tipe ini bisa digunakan di file lain (seperti HistoryPage).
export type ProposalProps = {
    id: string;
    title: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Funded';
    amount: number;
    submissionDate: string;
    };

    // Objek untuk konfigurasi tampilan status
    const statusConfig = {
        Pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Menunggu" },
        Approved: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Disetujui" },
        Rejected: { icon: XCircle, color: "bg-red-100 text-red-800", label: "Ditolak" },
        Funded: { icon: DollarSign, color: "bg-blue-100 text-blue-800", label: "Didanai" },
    };

    // WAJIB: Pastikan komponen ini juga diekspor.
    export const ProposalCard = ({ proposal }: { proposal: ProposalProps }) => {
    const { title, status, amount, submissionDate } = proposal;
    const currentStatus = statusConfig[status];

    return (
        <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
            <div className="flex justify-between items-start">
                <FileText className="w-8 h-8 text-gray-400" />
                <Badge className={`${currentStatus.color}`}>{currentStatus.label}</Badge>
            </div>
            <CardTitle className="pt-4 text-lg font-semibold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
            <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                <span>{amount} ETH</span>
            </div>
            <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span>Diajukan: {submissionDate}</span>
            </div>
        </CardContent>
        </Card>
    );
};

