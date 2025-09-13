import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Building, Briefcase } from "lucide-react";

interface ProvinceCardProps {
  name: string;
  receivedFunds: number;
  usedFunds: number;
  remainingFunds: number;
  cities: number;
  ongoingProjects: number;
  completedProjects: number;
  population: string;
}

const ProvinceCard = ({
  name,
  receivedFunds,
  usedFunds,
  remainingFunds,
  cities,
  ongoingProjects,
  completedProjects,
  population
}: ProvinceCardProps) => {
  const totalProjects = ongoingProjects + completedProjects;
  const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
  
  const formatCurrency = (amount: number) => {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">{name}</CardTitle>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{population}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Financial Overview */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Dana Diterima</span>
            <span className="font-semibold text-primary">{formatCurrency(receivedFunds)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Dana Terpakai</span>
            <span className="font-semibold text-secondary">{formatCurrency(usedFunds)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Sisa Dana</span>
            <span className="font-semibold text-success">{formatCurrency(remainingFunds)}</span>
          </div>
        </div>

        {/* Regional Info */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{cities}</p>
              <p className="text-xs text-muted-foreground">Kota/Kab</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{totalProjects}</p>
              <p className="text-xs text-muted-foreground">Total Proyek</p>
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress Proyek</span>
            <span className="text-sm font-medium text-foreground">{completionRate.toFixed(1)}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Selesai: {completedProjects}</span>
            <span>Berlangsung: {ongoingProjects}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProvinceCard;