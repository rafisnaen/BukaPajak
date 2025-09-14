import { Bell, Wallet } from "lucide-react";

interface AuditorHeaderProps {
    auditorName: string;
    walletAddress: string;
}

export const AuditorHeader = ({ auditorName, walletAddress }: AuditorHeaderProps) => {
    
    const formatAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    return (
        <header className="bg-white border-b p-4 flex justify-between items-center">
             <div>
                <p className="text-sm text-muted-foreground">Login sebagai Auditor,</p>
                <p className="font-semibold text-foreground">{auditorName}</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 p-2 border rounded-lg">
                    <Wallet className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-mono text-gray-700">{formatAddress(walletAddress)}</span>
                </div>
                <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
            </div>
        </header>
    );
};
