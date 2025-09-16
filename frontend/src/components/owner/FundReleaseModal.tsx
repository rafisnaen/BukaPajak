import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Send, Loader2, Info } from "lucide-react";
import { toast } from "sonner";

interface FundReleaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    proposal: {
        id: string;
        title: string;
        amount: number;
        recipientAddress: string;
    };
}

export const FundReleaseModal = ({ isOpen, onClose, proposal }: FundReleaseModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleReleaseFunds = () => {
        setIsLoading(true);
        console.log(`Mencairkan ${proposal.amount} ETH untuk proposal #${proposal.id} ke alamat: ${proposal.recipientAddress}`);
        
        // TODO: Panggil API backend untuk memicu transaksi 'releaseFunds'
        // Pemicuan MetaMask akan terjadi di sini
        
        // Simulasi
        setTimeout(() => {
            toast.success("Dana Berhasil Dicairkan!", {
              description: `Dana sebesar ${proposal.amount} ETH telah dikirim ke alamat penerima.`,
              duration: 5000,
            });
            setIsLoading(false);
            onClose();
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Konfirmasi Pencairan Dana</DialogTitle>
                    <DialogDescription>
                        Anda akan mencairkan dana untuk proyek: <span className="font-semibold">{proposal.title}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                        <p className="text-sm text-blue-800">Jumlah Dana</p>
                        <p className="text-2xl font-bold text-blue-900">{proposal.amount.toFixed(2)} ETH</p>
                    </div>
                    <div className="space-y-2">
                        <Label className="font-semibold">
                            Alamat Wallet Penerima (Otomatis)
                        </Label>
                        <div className="p-3 bg-slate-100 rounded-md text-center">
                            <code className="text-sm font-mono">{proposal.recipientAddress}</code>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground p-2 bg-slate-50 rounded-md">
                            <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>Alamat ini diambil otomatis dari data proposal yang diajukan untuk menjamin keamanan.</span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Batal</Button>
                    <Button onClick={handleReleaseFunds} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                         {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Send className="mr-2 h-4 w-4" />
                        Cairkan Dana
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};