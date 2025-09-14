// src/components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  walletAddress?: string;
}

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyAccess = async () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      
      // Cek jika token dan user data tidak ada
      if (!token || !userStr) {
        toast({
          title: "Akses Ditolak",
          description: "Silakan login terlebih dahulu",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      try {
        const user: User = JSON.parse(userStr);
        
        // Cek apakah wallet sudah terhubung
        if (!user.walletAddress) {
          toast({
            title: "Wallet Belum Terhubung",
            description: "Silakan hubungkan wallet MetaMask terlebih dahulu",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

       

        setIsVerified(true);
      } catch (error) {
        console.error("Error verifying access:", error);
        // Bersihkan storage dan redirect ke login jika ada error
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast({
          title: "Sesi Kadaluarsa",
          description: "Silakan login kembali",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    verifyAccess();
  }, [navigate, toast]);

  // Tampilkan loading spinner selama verifikasi
  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};