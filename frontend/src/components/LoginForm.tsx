import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Wallet, CheckCircle, XCircle, LogOut, UserCog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login, logout } from "@/api/auth";
import { getNonce, verifyWallet } from "@/api/wallet";
import Logo from "@/assets/Group 2.svg";
import { useNavigate, useSearchParams } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface User {
  email: string;
  walletAddress?: string;
  role?: string;
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // SELALU redirect ke /proposer/dashboard setelah login berhasil
  const redirectPath = '/proposer/dashboard';

  // Cek status login saat komponen mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserData(user);
        setIsWalletConnected(!!user.walletAddress);
        setEmail(user.email);
        
        // Jika sudah login DAN wallet terhubung, redirect langsung ke dashboard pengusul
        if (user.walletAddress) {
          navigate(redirectPath);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      
      setUserData(response.user);
      setEmail(response.user.email);
      
      if (response.user.walletAddress) {
        setIsWalletConnected(true);
        toast({
          title: "Login Berhasil",
          description: "Selamat datang di dashboard pengusul",
        });
        // SELALU redirect ke /proposer/dashboard
        navigate(redirectPath);
      } else {
        setIsWalletConnected(false);
        toast({
          title: "Login Berhasil",
          description: "Silakan hubungkan wallet MetaMask Anda untuk mengakses dashboard pengusul",
        });
      }
    } catch (err: any) {
      toast({
        title: "Login gagal",
        description: err.response?.data?.message || "Terjadi kesalahan, coba lagi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    try {
      if (!window.ethereum) {
        toast({
          title: "MetaMask tidak ditemukan",
          description: "Silakan install MetaMask terlebih dahulu",
          variant: "destructive",
        });
        return;
      }

      if (!email) {
        toast({
          title: "Email diperlukan",
          description: "Silakan masukkan email terlebih dahulu",
          variant: "destructive",
        });
        return;
      }

      // 1. Minta akun dari MetaMask
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      const address = accounts[0];

      // 2. Request nonce dari backend
      const nonceRes = await getNonce(email);
      const nonce = nonceRes.nonce;

      // 3. Pesan yang harus ditandatangani
      const message = `Login BukaPajak: ${nonce}`;
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
      });

      // 4. Kirim ke backend untuk verifikasi
      const verifyRes = await verifyWallet(email, address, signature);

      // 5. Simpan token dan update user data
      if (verifyRes.token) {
        localStorage.setItem("token", verifyRes.token);
        
        // Update user data dengan wallet address
        const updatedUser = { ...userData, walletAddress: address };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        setUserData(updatedUser);
        setIsWalletConnected(true);
        
        toast({
          title: "Wallet terhubung",
          description: "Anda berhasil login dengan Web3 Wallet",
        });
        
        // SELALU redirect ke /proposer/dashboard
        navigate(redirectPath);
      }
    } catch (err: any) {
      console.error("Wallet connection error:", err);
      toast({
        title: "Gagal menghubungkan wallet",
        description: err.response?.data?.error || err.message || "Coba lagi",
        variant: "destructive",
      });
    }
  };

  const handleAccessDashboard = () => {
    if (isWalletConnected) {
      // SELALU redirect ke /proposer/dashboard
      navigate(redirectPath);
    } else {
      toast({
        title: "Wallet belum terhubung",
        description: "Silakan hubungkan wallet MetaMask terlebih dahulu",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    setUserData(null);
    setIsWalletConnected(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-strong border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-start">
              <img src={Logo} alt="BukaPajak Logo" className="h-8" />
              <span className="font-bold text-xl text-primary">BukaPajak</span>
            </div>
          </div>
          
          {/* SELALU tampilkan info dashboard pengusul */}
          <div className="flex items-center justify-center bg-blue-100 text-blue-800 p-2 rounded-lg mb-2">
            <UserCog className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Dashboard Pengusul</span>
          </div>
          
          <CardTitle className="text-2xl font-bold text-foreground">
            {userData ? "Lengkapi Akses" : "Masuk ke Dashboard Pengusul"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {userData 
              ? "Hubungkan wallet untuk mengakses dashboard pengusul" 
              : "Akses dashboard pengusul untuk mengelola proposal dana"
            }
          </CardDescription>
          
          {/* Status Wallet */}
          {userData && (
            <div className={`flex items-center justify-center mt-4 p-2 rounded-lg ${
              isWalletConnected ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}>
              {isWalletConnected ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              <span className="text-sm">
                {isWalletConnected ? "Wallet terhubung" : "Wallet belum terhubung"}
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Form Login Email + Password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Pengusul</Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email pengusul"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!!userData}
              />
            </div>

            {!userData && (
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi pengusul"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {!userData ? (
              <Button type="submit" disabled={isLoading} className="mt-6 w-full">
                {isLoading ? "Memproses..." : "Masuk sebagai Pengusul"}
              </Button>
            ) : (
              <Button 
                onClick={handleAccessDashboard}
                disabled={!isWalletConnected}
                className="mt-6 w-full"
              >
                {isWalletConnected 
                  ? "Akses Dashboard Pengusul" 
                  : "Hubungkan Wallet Terlebih Dahulu"
                }
              </Button>
            )}
          </form>

          {!userData && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Dan</span>
                </div>
              </div>

              {/* Tombol Connect Wallet (hanya untuk login awal) */}
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleWalletConnect} 
                className="w-full h-11"
                disabled={!email}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Login dengan Dompet Web3
              </Button>
            </>
          )}

          {/* Tombol Connect Wallet untuk user yang sudah login tapi belum connect wallet */}
          {userData && !isWalletConnected && (
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleWalletConnect} 
              className="w-full h-11"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Hubungkan Dompet Web3
            </Button>
          )}

          {/* Informasi Dashboard Pengusul */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 text-center">
              <strong>Dashboard Khusus Pengusul</strong>
              <br />
              Akses penuh untuk mengajukan dan mengelola proposal dana
            </p>
          </div>

          {/* Tombol Logout jika sudah login */}
          {userData && (
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};