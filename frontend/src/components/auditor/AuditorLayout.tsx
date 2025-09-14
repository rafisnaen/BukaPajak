import { Sidebar } from "./Sidebar";
import { AuditorHeader } from "./AuditorHeader";
import { ReactNode } from "react";

interface AuditorLayoutProps {
    children: ReactNode;
    }

    export const AuditorLayout = ({ children }: AuditorLayoutProps) => {
    // TODO: Ambil data user dari state management
    const auditorData = {
        name: "Budi (BPK)",
        walletAddress: "0xAuditorWallet...",
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <AuditorHeader auditorName={auditorData.name} walletAddress={auditorData.walletAddress} />
            <main className="p-6 lg:p-8 flex-grow">
            {children}
            </main>
        </div>
        </div>
    );
};
