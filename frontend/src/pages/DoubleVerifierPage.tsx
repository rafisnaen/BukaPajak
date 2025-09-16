// src/pages/DoubleVerifierPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Logo from "@/assets/Group 2.svg";
import { ShieldCheck } from "lucide-react";
import "./DoubleVerifierPage.css"; // Impor file CSS

const DoubleVerifierPage = () => {
  const [role, setRole] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!role || !secretKey) {
      toast.error("Harap pilih peran dan masukkan Kode Khusus Role.");
      setIsLoading(false);
      return;
    }

    console.log(`Verifying role: ${role} with key: ${secretKey}`);

    setTimeout(() => {
      if (secretKey) {
        toast.success("Verifikasi berhasil! Mengarahkan ke dashboard...");
        switch (role) {
          case "owner":
            navigate("/owner/dashboard");
            break;
          case "auditor":
            navigate("/auditor/dashboard");
            break;
          case "proposer":
            navigate("/proposer/dashboard");
            break;
          default:
            navigate("/login");
        }
      } else {
        toast.error("Verifikasi Gagal", {
          description: "Kode Khusus Role yang Anda masukkan tidak valid.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="double-verifier-page">
      <div className="background-gradient"></div>
       {/* Floating Elements */}
       <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-accent animate-float opacity-60" />
      <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-white/30 animate-float animation-delay-1000 opacity-40" />
      <div className="absolute bottom-32 left-1/4 w-3 h-3 rounded-full bg-secondary animate-pulse-glow opacity-50" />
      <Card className="w-full max-w-md shadow-lg relative z-10 bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-4">
                <div className="flex items-center justify-start">
                <img src={Logo} alt="BukaPajak Logo" className="h-8" />
                <span className="font-bold text-xl text-primary">BukaPajak</span>
                </div>
            </div>
          <div className="flex items-center justify-center bg-blue-100 text-blue-800 p-2 rounded-lg mb-2">
            <ShieldCheck className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Verifikasi Peran Ganda</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Pilih Peran Anda
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Pilih peran Anda dan masukkan kode khusus untuk melanjutkan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerification} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role-select">Peran Pengguna</Label>
              <Select onValueChange={setRole} required>
                <SelectTrigger id="role-select">
                  <SelectValue placeholder="Pilih peran Anda..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="proposer">Proposer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret-key">Kode Khusus Role</Label>
              <Input
                id="secret-key"
                type="text"
                placeholder="Masukkan Public Secret Key Anda"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !role || !secretKey}
            >
              {isLoading ? "Memverifikasi..." : "Arahkan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoubleVerifierPage;