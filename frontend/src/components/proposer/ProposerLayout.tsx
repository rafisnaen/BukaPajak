import { Sidebar } from "./Sidebar";
import { ProposerHeader } from "./ProposerHeader";
import { ReactNode } from "react";

// Komponen ini menjadi "bungkus" untuk semua halaman setelah login.
// Ia menampilkan sidebar permanen dan header.
interface ProposerLayoutProps {
    children: ReactNode;
    }

    export const ProposerLayout = ({ children }: ProposerLayoutProps) => {
    // TODO: Ambil data user dari state management (Zustand/Context)
    const walletAddress = "0x3B92...bc7d14"; // Data sementara
    const proposerName = "Dinas PU DKI Jakarta"; // Data nama sementara

    return (
        <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <ProposerHeader walletAddress={walletAddress} proposerName={proposerName} />
            <main className="p-6 lg:p-8 flex-grow">
            {children}
            </main>
        </div>
        </div>
    );
};