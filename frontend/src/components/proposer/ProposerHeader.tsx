import { Bell, LogOut, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProposerHeader = ({ walletAddress }: { walletAddress: string | null }) => {
    
    const displayAddress = walletAddress 
        ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
        : "Not Connected";

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
            {/* Logo bisa diganti sesuai kebutuhan */}
            <p className="font-bold text-xl text-primary">BukaPajak Proposer</p>
            <div>
                <p className="text-sm text-muted-foreground">Selamat Datang,</p>
                <p className="font-semibold text-foreground">Rafi (Dinas PU)</p>
            </div>
            </div>

            <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{displayAddress}</span>
            </div>
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
            </div>
        </div>
        </header>
    );
};
