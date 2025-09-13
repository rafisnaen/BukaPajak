import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/api/auth";
import Logo from "@/assets/Group 2.svg";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register({ name, email, password });

      toast({
        title: "Registrasi Berhasil",
        description: "Silakan login dengan akun baru Anda.",
      });

      window.location.href = "/login";
    } catch (err: any) {
      toast({
        title: "Registrasi Gagal",
        description: err.response?.data?.message || "Terjadi kesalahan, coba lagi",
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
          <div className="flex items-center justify-center mb-4">
           <div className="flex items-center justify-start">
              <img src={Logo} alt="BukaPajak Logo" className="h-8" />
              <span className="font-bold text-xl text-primary">BukaPajak</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Daftar Akun
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Buatk Akun untuk akses sistem transparansi distribusi dana Web3
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Nama
              </Label>
              <Input
                id="name"
                value={name}
                placeholder="Masukkan nama lengkap"
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 bg-input border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-input border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Kata Sandi
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-input border-border focus:border-primary transition-colors"
              />
            </div>

            <Button 
              type="submit" 
              variant="default" 
              size="lg" 
              disabled={isLoading}
              className="mt-6 w-full"
            >
              {isLoading ? "Memproses..." : "Daftar"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <span>Sudah punya akun? </span>
            <a href="/login" className="text-primary hover:underline font-medium">
              Masuk sekarang
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};