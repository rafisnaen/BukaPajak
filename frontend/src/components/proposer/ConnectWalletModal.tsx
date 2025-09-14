import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

// Mendefinisikan tipe untuk props
interface ConnectWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onWalletConnected: (address: string) => void;
}

// WAJIB: Tambahkan 'export' di sini agar bisa diimpor oleh DashboardPage.
export const ConnectWalletModal = ({ isOpen, onClose, onWalletConnected }: ConnectWalletModalProps) => {

    const handleConnect = async () => {
        // Cek apakah MetaMask terinstall
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Meminta izin dari pengguna untuk mengakses akun mereka
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const address = accounts[0];
                onWalletConnected(address);
            } catch (error) {
                console.error("Gagal menghubungkan wallet:", error);
                // TODO: Tampilkan notifikasi error ke pengguna (misalnya menggunakan Sonner)
            }
        } else {
            console.error("MetaMask tidak terdeteksi. Mohon install MetaMask.");
            // TODO: Tampilkan instruksi untuk menginstall MetaMask
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Hubungkan Wallet Anda</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        Untuk melanjutkan, Anda perlu menghubungkan wallet digital (seperti MetaMask) 
                        sebagai identitas Anda di platform ini.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-6 flex justify-center">
                    <Button
                        onClick={handleConnect}
                        className="w-full max-w-xs text-lg py-6"
                    >
                        <Wallet className="mr-2 h-6 w-6" />
                        Hubungkan dengan MetaMask
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

