import { AuditorLayout } from "@/components/auditor/AuditorLayout";
import { ProposalReviewTable } from "@/components/auditor/ProposalReviewTable";

// Ini adalah halaman utama untuk Auditor setelah login.
const AuditorDashboardPage = () => {
    return (
        <AuditorLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Antrian Review Proposal</h1>
                <p className="text-gray-600 mb-6">
                    Berikut adalah daftar proposal yang telah lolos verifikasi AI dan menunggu persetujuan Anda.
                </p>
                <ProposalReviewTable />
            </div>
        </AuditorLayout>
    );
};

export default AuditorDashboardPage;
