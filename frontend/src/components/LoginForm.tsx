// src/components/LoginForm.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Wallet, CheckCircle, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/api/auth";
import { getNonce, verifyWallet } from "@/api/wallet";
import Logo from "@/assets/Group 2.svg";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const redirectPath = '/verify-role';

  // Fungsi untuk memformat alamat wallet
  const formatAddress = (address: string | null) => {
    if (!address) return "";
    // Menampilkan 4 karakter setelah '0x' dan 4 karakter terakhir
    return `${address.substring(0, 6)}....${address.substring(address.length - 4)}`;
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setIsWalletConnected(true);
                }
            } catch (error) {
                console.error("Gagal memeriksa koneksi wallet:", error);
            }
        }
    };
    checkWalletConnection();
  }, []);

  const handleWalletConnect = async () => {
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        toast({
          title: "MetaMask tidak ditemukan",
          description: "Silakan install ekstensi MetaMask terlebih dahulu.",
          variant: "destructive",
        });
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      setWalletAddress(address);
      setIsWalletConnected(true);
      toast({
        title: "Wallet Berhasil Terhubung",
        description: "Silakan lanjutkan dengan mengisi email dan kata sandi Anda.",
      });

    } catch (err: any) {
      console.error("Gagal menghubungkan wallet:", err);
      toast({
        title: "Gagal menghubungkan wallet",
        description: err.message || "Terjadi kesalahan, silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginResponse = await login({ email, password });
      const nonceRes = await getNonce(email);
      const nonce = nonceRes.nonce;
      const message = `Login BukaPajak: ${nonce}`;
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, walletAddress],
      });
      const verifyRes = await verifyWallet(email, walletAddress!, signature);

      if (verifyRes.token) {
        localStorage.setItem("token", verifyRes.token);
      }

      const updatedUser = { ...loginResponse.user, walletAddress: walletAddress };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast({
        title: "Login & Verifikasi Berhasil",
        description: "Anda akan diarahkan untuk memilih peran.",
      });

      navigate(redirectPath);

    } catch (err: any) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      toast({
        title: "Login Gagal",
        description: err.response?.data?.message || "Kombinasi email, password, atau verifikasi wallet tidak sesuai.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <CardTitle className="text-2xl font-bold text-foreground">
            Login Sistem
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Hubungkan wallet Anda, lalu masukkan kredensial untuk masuk.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Wallet Connect Section */}
          <div className="space-y-4">
            <Label className="font-semibold text-center block">Langkah 1: Hubungkan Wallet</Label>
            <Button 
              variant={isWalletConnected ? "secondary" : "default"}
              size="lg" 
              onClick={handleWalletConnect} 
              className="w-full h-11"
              disabled={isLoading || isWalletConnected}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isWalletConnected ? "Wallet Sudah Terhubung" : "Hubungkan Wallet Web3"}
            </Button>
             {isWalletConnected && (
                <div className="flex items-center justify-center p-2 rounded-lg bg-green-100 text-green-800">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <p className="text-sm font-mono">{formatAddress(walletAddress)}</p>
                </div>
            )}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Langkah 2</span>
            </div>
          </div>


          {/* Form Login Email + Password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset disabled={!isWalletConnected || isLoading}>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan kata sandi"
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

                <Button type="submit" className="mt-6 w-full">
                    {isLoading ? "Memproses..." : "Login"}
                    <LogIn className="ml-2 h-4 w-4" />
                </Button>
            </fieldset>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};