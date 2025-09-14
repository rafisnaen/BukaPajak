import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldAlert } from "lucide-react";
import { useState } from "react";

interface EmergencyWithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EmergencyWithdrawModal = ({ isOpen, onClose }: EmergencyWithdrawModalProps) => {
    const [confirmationText, setConfirmationText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const requiredText = "TARIK DANA DARURAT";

    const handleWithdraw = () => {
        setIsLoading(true);
        console.log("MEMULAI PROSES EMERGENCY WITHDRAW!");
        // TODO: Panggil backend -> panggil fungsi emergencyWithdraw()
        // MetaMask akan muncul di sini untuk konfirmasi final.
        
        // Simulasi
        setTimeout(() => {
            alert("Emergency Withdraw Berhasil! (Simulasi)");
            setIsLoading(false);
            onClose();
        }, 3000);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center text-2xl text-red-600">
                        <ShieldAlert className="mr-2 h-8 w-8" />
                        Konfirmasi Penarikan Darurat
                    </AlertDialogTitle>
                    <AlertDialogDescription className="pt-4">
                        Aksi ini akan menarik **SEMUA DANA** yang tersisa di dalam smart contract ke wallet Owner.
                        Ini adalah tindakan drastis dan tidak dapat dibatalkan. Gunakan hanya dalam kondisi darurat mutlak.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4 space-y-2">
                    <Label htmlFor="confirmation-text">Untuk melanjutkan, ketik "<span className="font-bold text-red-700">{requiredText}</span>" di bawah ini.</Label>
                    <Input 
                        id="confirmation-text" 
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                    />
                </div>
                <AlertDialogFooter>
                    <Button variant="ghost" onClick={onClose}>Batal</Button>
                    <Button 
                        variant="destructive" 
                        onClick={handleWithdraw}
                        disabled={confirmationText !== requiredText || isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Saya Mengerti, Lanjutkan Penarikan
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

