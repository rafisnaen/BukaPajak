import { AuditorLayout } from "@/components/auditor/AuditorLayout";
import { ReviewHistoryTable } from "@/pages/auditor/ReviewHistoryTable";

const AuditorHistoryPage = () => {
    return (
        <AuditorLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Riwayat Review Proposal</h1>
                <p className="text-gray-600 mb-6">
                    Berikut adalah daftar proposal yang telah Anda setujui atau tolak.
                </p>
                <ReviewHistoryTable />
            </div>
        </AuditorLayout>
    );
};

export default AuditorHistoryPage;