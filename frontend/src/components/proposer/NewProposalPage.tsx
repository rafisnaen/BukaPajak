import { ProposerHeader } from "@/components/proposer/ProposerHeader";
import { NewProposalForm } from "@/components/proposer/NewProposalForm";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Ini adalah halaman "wadah" untuk formulir.
const NewProposalPage = () => {
    const currentUser = {
        name: "Rafi (Dinas PU)",
        walletAddress: "0x3B92...bc7d14",
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
        <ProposerHeader walletAddress={currentUser.walletAddress} />
        
        <main className="container mx-auto px-4 py-8 flex-grow">
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
                
                {/* Komponen Form */}
                <NewProposalForm />
            </div>
        </main>

        <Footer />
        </div>
    );
};

export default NewProposalPage;
