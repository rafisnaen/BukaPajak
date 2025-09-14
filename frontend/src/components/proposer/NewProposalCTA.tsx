import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const NewProposalCTA = () => (
    <div className="p-8 bg-gradient-to-r from-gov-primary to-blue-800 text-white rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div>
        <h2 className="text-3xl font-bold">Siap Mengajukan Proposal Baru?</h2>
        <p className="text-blue-100 mt-2">
            Mulai proses pengajuan dana untuk proyek pembangunan daerah Anda.
        </p>
        </div>
        {/* Tombol ini akan mengarahkan pengguna ke halaman formulir baru */}
        <Link to="/proposer/new"> {/* Rute ini perlu ditambahkan di App.tsx */}
        <Button
            size="lg"
            className="mt-4 md:mt-0 bg-gov-accent hover:bg-yellow-500 text-gov-primary font-bold transition-transform transform hover:scale-105"
        >
            <PlusCircle className="mr-2 h-5 w-5" />
            Buat Proposal Baru
        </Button>
        </Link>
    </div>
);

