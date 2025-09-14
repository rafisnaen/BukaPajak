import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { ProposalsToFundTable } from "@/components/owner/ProposalsToFundTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Landmark } from "lucide-react";

// Halaman utama untuk Owner setelah login.
const OwnerDashboardPage = () => {
    
    // Data ini nantinya akan diambil langsung dari smart contract
    const contractStats = {
        contractBalance: 250.75, // ETH
        totalFunded: 85.0, // ETH
    };

    return (
        <OwnerLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Owner Dashboard</h1>

                {/* Statistik Utama Kontrak */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Saldo Kontrak</CardTitle>
                            <Landmark className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{contractStats.contractBalance.toFixed(2)} ETH</div>
                            <p className="text-xs text-muted-foreground">Dana yang tersedia untuk dialokasikan</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Dana Telah Dicairkan</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{contractStats.totalFunded.toFixed(2)} ETH</div>
                            <p className="text-xs text-muted-foreground">Akumulasi dari semua proyek yang didanai</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabel Proposal Siap Cair */}
                <div>
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Proposal Siap Dicairkan</h2>
                    <ProposalsToFundTable />
                </div>
            </div>
        </OwnerLayout>
    );
};

export default OwnerDashboardPage;
