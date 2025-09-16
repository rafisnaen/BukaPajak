// components/ui/province-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Building, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProvinceCardProps {
  id: number;
  name: string;
  receivedFunds: number;
  usedFunds: number;
  remainingFunds: number;
  cityName: string; // Diubah dari cities (number) ke cityName (string)
  ongoingProjects: number;
  completedProjects: number;
  population: number;
}

const ProvinceCard = ({
  id,
  name,
  receivedFunds,
  usedFunds,
  remainingFunds,
  cityName,
  ongoingProjects,
  completedProjects,
  population
}: ProvinceCardProps) => {
  const navigate = useNavigate();
  const totalProjects = (ongoingProjects ?? 0) + (completedProjects ?? 0);
  const completionRate =
    totalProjects > 0 ? ((completedProjects ?? 0) / totalProjects) * 100 : 0;

  const formatCurrency = (amount: number) => {
    if (!amount || isNaN(amount)) return "Rp 0";
    return `Rp ${(amount / 1_000_000).toFixed(1)}Jt`; // Diubah ke Juta agar lebih realistis
  };

  const handleClick = () => {
    navigate(`/transparansi/${id}`);
  };

  return (
    <Card
      className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-border hover:border-primary/30 cursor-pointer hover:shadow-primary/20"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {name || "Tanpa Nama"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Financial Overview */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Dana Diterima</span>
            <span className="font-semibold text-primary">
              {formatCurrency(receivedFunds)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Dana Terpakai</span>
            <span className="font-semibold text-secondary">
              {formatCurrency(usedFunds)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Sisa Dana</span>
            <span className="font-semibold text-success">
              {formatCurrency(remainingFunds)}
            </span>
          </div>
        </div>

        {/* Regional Info */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{cityName || "Tidak Diketahui"}</p>
              <p className="text-xs text-muted-foreground">Kota</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{totalProjects ?? 0}</p>
              <p className="text-xs text-muted-foreground">Total Proyek</p>
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress Proyek</span>
            <span className="text-sm font-medium text-foreground">
              {completionRate.toFixed(1)}%
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Selesai: {completedProjects ?? 0}</span>
            <span>Berlangsung: {ongoingProjects ?? 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProvinceCard;