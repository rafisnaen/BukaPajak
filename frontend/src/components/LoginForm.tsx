import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Wallet, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di platform transparansi Web3",
      });
    }, 1500);
  };

  const handleWalletConnect = () => {
    toast({
      title: "Connecting Wallet",
      description: "Menghubungkan ke dompet Web3 Anda...",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-strong border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <span className="font-bold text-xl text-primary">BukaPajak</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Masuk ke Platform
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Akses sistem transparansi distribusi dana Web3
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email atau ID Pengguna
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="masukkan@email.anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-input border-border focus:border-primary transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Kata Sandi
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-input border-border focus:border-primary transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                <span>Ingat saya</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Lupa kata sandi?
              </a>
            </div>

            <Button 
              type="submit" 
              variant="default" 
              size="lg" 
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Atau</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={handleWalletConnect}
            className="w-full h-11 border-border hover:bg-accent/50"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Hubungkan Dompet Web3
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <span>Belum memiliki akun? </span>
            <a href="#" className="text-primary hover:underline font-medium">
              Daftar sekarang
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};