import { Bell, Wallet, CheckCircle, History } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AuditorHeaderProps {
    auditorName: string;
    walletAddress: string;
}

// Data notifikasi sementara untuk demonstrasi
const mockNotifications = [
  {
    id: 1,
    title: "Proposal Baru",
    description: "Proposal 'Pembangunan Drainase Kelurahan' menunggu review Anda.",
    status: "pending",
    time: "10 menit lalu",
  },
  {
    id: 2,
    title: "Proposal Diperbarui",
    description: "Proposer memperbarui detail anggaran untuk 'Renovasi Sekolah SDN 1'.",
    status: "updated",
    time: "1 jam lalu",
  },
];

export const AuditorHeader = ({ auditorName, walletAddress }: AuditorHeaderProps) => {
    const [hasUnread, setHasUnread] = useState(true);

    const formatAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <header className="bg-white border-b p-4 flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">Login sebagai Auditor,</p>
                <p className="font-semibold text-foreground">{auditorName}</p>
            </div>
            <div className="flex items-center space-x-4">
                {/* Notifikasi Bell */}
                <Popover onOpenChange={() => setHasUnread(false)}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            {hasUnread && (
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                            )}
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
                                    <div
                                        key={notif.id}
                                        className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg"
                                    >
                                        <div
                                            className={`mt-1 p-1.5 rounded-full ${
                                                notif.status === "pending"
                                                    ? "bg-yellow-100"
                                                    : "bg-blue-100"
                                            }`}
                                        >
                                            {notif.status === "pending" ? (
                                                <History className="h-4 w-4 text-yellow-600" />
                                            ) : (
                                                <CheckCircle className="h-4 w-4 text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">{notif.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {notif.description}
                                            </p>
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

                {/* Wallet */}
                <div className="flex items-center space-x-2 p-2 border rounded-lg">
                    <Wallet className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-mono text-gray-700">
                        {formatAddress(walletAddress)}
                    </span>
                </div>
            </div>
        </header>
    );
};
