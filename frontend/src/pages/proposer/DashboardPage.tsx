import { ProposerLayout } from "@/components/proposer/ProposerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckCircle, Clock, XCircle, FileCheck, Wallet } from "lucide-react";

// Halaman Dashboard baru yang lebih fokus pada data finansial dan ringkasan status.
const ProposerDashboardPage = () => {
    
    // Data ini nantinya akan diambil dari API/backend
    const summaryData = {
        walletBalance: 12.5, // ETH
        totalFunded: 85.0, // ETH
        proposals: {
            total: 11,
            pending: 3,
            approved: 1,
            funded: 5,
            rejected: 2,
        }
    };

    return (
        <ProposerLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
                
                {/* Bagian Finansial */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Dana di Wallet</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summaryData.walletBalance.toFixed(2)} ETH</div>
                            <p className="text-xs text-muted-foreground">Saldo terkini di wallet terhubung</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Dana Berhasil Dicairkan</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summaryData.totalFunded.toFixed(2)} ETH</div>
                            <p className="text-xs text-muted-foreground">Dari semua proposal yang telah didanai</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Ringkasan Status Proposal */}
                <div>
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Ringkasan Proposal Anda</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <StatusCard title="Total" value={summaryData.proposals.total} icon={FileCheck} />
                        <StatusCard title="Pending" value={summaryData.proposals.pending} icon={Clock} />
                        <StatusCard title="Disetujui" value={summaryData.proposals.approved} icon={CheckCircle} color="text-green-500" />
                        <StatusCard title="Didanai" value={summaryData.proposals.funded} icon={DollarSign} color="text-blue-500"/>
                        <StatusCard title="Ditolak" value={summaryData.proposals.rejected} icon={XCircle} color="text-red-500"/>
                    </div>
                </div>
            </div>
        </ProposerLayout>
    );
};

// Komponen kecil untuk kartu status agar tidak repetitif
const StatusCard = ({ title, value, icon: Icon, color = "text-gray-500" } : {title: string, value: number, icon: any, color?: string}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
)

export default ProposerDashboardPage;

