import { ProposerLayout } from "@/components/proposer/ProposerLayout";
import { NewProposalForm } from "@/components/proposer/NewProposalForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Versi baru dari halaman formulir, sekarang menggunakan ProposerLayout.
const NewProposalPage = () => {
    return (
        <ProposerLayout>
            <div className="max-w-4xl mx-auto">
                {/* Tombol Kembali ke Dashboard */}
                <Link
                    to="/proposer/dashboard"
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dashboard
                </Link>

                {/* Header Halaman */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Buat Pengajuan Proposal Baru</h1>
                    <p className="text-gray-600 mt-2">
                        Isi detail di bawah ini untuk mengajukan proposal pendanaan proyek. 
                        Pastikan semua data sudah benar sebelum dikirim.
                    </p>
                </div>
                
                {/* Komponen Form Inti */}
                <NewProposalForm />
            </div>
        </ProposerLayout>
    );
};

export default NewProposalPage;