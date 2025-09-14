import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface FundReleaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    proposal: {
        id: string;
        title: string;
        amount: number;
    };
}

export const FundReleaseModal = ({ isOpen, onClose, proposal }: FundReleaseModalProps) => {
    const [recipientAddress, setRecipientAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleReleaseFunds = () => {
        // Validasi alamat Ethereum sederhana
        if (!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress)) {
            alert("Harap masukkan alamat wallet Ethereum yang valid.");
            return;
        }
        
        setIsLoading(true);
        console.log(`Mencairkan ${proposal.amount} ETH untuk proposal #${proposal.id} ke alamat: ${recipientAddress}`);
        
        // TODO: Panggil API backend untuk memicu transaksi 'releaseFunds'
        // Pemicuan MetaMask akan terjadi di sini
        
        // Simulasi
        setTimeout(() => {
            alert("Dana berhasil dicairkan! (Simulasi)");
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
                        <Label htmlFor="recipient-address" className="font-semibold">
                            Alamat Wallet Penerima (Kontraktor)
                        </Label>
                        <Input 
                            id="recipient-address"
                            placeholder="0x..."
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                        />
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
