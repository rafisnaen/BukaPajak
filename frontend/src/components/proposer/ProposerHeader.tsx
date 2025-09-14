import { Bell, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

// Header ini sekarang lebih simpel, hanya untuk info user.
export const ProposerHeader = ({ walletAddress }: { walletAddress: string | null }) => {
    
    const formatAddress = (address: string | null) => {
        if (!address) return "Wallet Not Connected";
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    return (
        <header className="bg-white border-b p-4 flex justify-end items-center space-x-4">
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-gray-600" />
            </Button>

            <div className="flex items-center space-x-2 p-2 border rounded-lg">
                <Wallet className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-mono text-gray-700">{formatAddress(walletAddress)}</span>
            </div>
        </header>
    );
};

