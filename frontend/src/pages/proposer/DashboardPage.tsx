import { useState, useEffect } from "react";
import { ProposerHeader } from "@/components/proposer/ProposerHeader";
import { NewProposalCTA } from "@/components/proposer/NewProposalCTA";
import { ProposerSummary } from "@/components/proposer/ProposerSummary";
import { ProposalHistory } from "@/components/proposer/ProposalHistory";
import { ConnectWalletModal } from "@/components/proposer/ConnectWalletModal";
import Footer from "@/components/Footer";

const ProposerDashboardPage = () => {
    const [isWalletModalOpen, setWalletModalOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    useEffect(() => {
        const walletFromDB = null; // Simulasi belum ada wallet
        if (!walletFromDB) {
        setWalletModalOpen(true);
        } else {
        setWalletAddress(walletFromDB);
        }
    }, []);

    const handleWalletConnected = (address: string) => {
        setWalletAddress(address);
        setWalletModalOpen(false);
        console.log("Wallet terhubung:", address);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
        <ProposerHeader walletAddress={walletAddress} />
        
        <main className="container mx-auto px-4 py-8 space-y-8 flex-grow">
            <NewProposalCTA />
            <ProposerSummary />
            <ProposalHistory />
        </main>

        <Footer />

        <ConnectWalletModal
            isOpen={isWalletModalOpen}
            onClose={() => setWalletModalOpen(false)}
            onWalletConnected={handleWalletConnected}
        />
        </div>
    );
};

export default ProposerDashboardPage;
