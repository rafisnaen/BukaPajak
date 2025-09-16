// src/components/proposer/ProposerHeader.tsx
import { Bell, Wallet, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Data notifikasi sementara untuk demonstrasi
const mockNotifications = [
  {
    id: 1,
    title: "Proposal Disetujui",
    description: "Proposal Anda 'Perbaikan Jalan Utama Rawa Belong' telah disetujui auditor.",
    status: "approved",
    time: "5 menit lalu",
  },
  {
    id: 2,
    title: "Proposal Ditolak",
    description: "Proposal 'Pengadaan Alat Kesehatan Puskesmas' ditolak karena budget tidak realistis.",
    status: "rejected",
    time: "1 jam lalu",
  },
];

interface ProposerHeaderProps {
    walletAddress: string | null;
    proposerName: string;
}

export const ProposerHeader = ({ walletAddress, proposerName }: ProposerHeaderProps) => {
    const [hasUnread, setHasUnread] = useState(true);
    
    const formatAddress = (address: string | null) => {
        if (!address) return "Wallet Not Connected";
        return `${address.substring(0, 6)}....${address.substring(address.length - 4)}`;
    }

    return (
        <header className="bg-white border-b p-4 flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">Login sebagai Proposer,</p>
                <p className="font-semibold text-foreground">{proposerName}</p>
            </div>

            <div className="flex items-center space-x-4">
                <Popover onOpenChange={() => setHasUnread(false)}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            {hasUnread && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />}
                            <Bell className="h-5 w-5 text-gray-600" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 mr-4" align="end">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">Notifikasi</h4>
                                <Badge variant="secondary">{mockNotifications.length} Baru</Badge>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {mockNotifications.map((notif) => (
                                    <div key={notif.id} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg">
                                        <div className={`mt-1 p-1.5 rounded-full ${notif.status === 'approved' ? 'bg-green-100' : 'bg-red-100'}`}>
                                            {notif.status === 'approved' 
                                                ? <CheckCircle className="h-4 w-4 text-green-600" />
                                                : <XCircle className="h-4 w-4 text-red-600" />
                                            }
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">{notif.title}</p>
                                            <p className="text-xs text-muted-foreground">{notif.description}</p>
                                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                                Lihat semua notifikasi
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>

                <div className="flex items-center space-x-2 p-2 border rounded-lg">
                    <Wallet className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-mono text-gray-700">{formatAddress(walletAddress)}</span>
                </div>
            </div>
        </header>
    );
};