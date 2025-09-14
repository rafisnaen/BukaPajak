import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Building, Briefcase, DollarSign } from "lucide-react";
import { useState } from "react";
import ProjectCard from "./project-card";
import { City, District } from "@/data/detailed-provinces";

interface AdministrativeLevelProps {
  title: string;
  data: City | District;
  level: 'city' | 'district';
  isExpanded?: boolean;
}

const AdministrativeLevel = ({ title, data, level, isExpanded = false }: AdministrativeLevelProps) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const formatCurrency = (amount: number) => {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  };

  const totalProjects = data.ongoingProjects + data.completedProjects;
  const completionRate = totalProjects > 0 ? (data.completedProjects / totalProjects) * 100 : 0;
  const usageRate = data.receivedFunds > 0 ? (data.usedFunds / data.receivedFunds) * 100 : 0;

  const isCity = level === 'city' && 'type' in data;
  const cityType = isCity ? (data as City).type : undefined;

  return (
    <Card className="border-border hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/20">
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              {title}
            </CardTitle>
            {cityType && (
              <Badge variant="outline" className="capitalize">
                {cityType}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-primary-foreground">
              {totalProjects} Proyek
            </Badge>
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-6 pt-0">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dana Diterima</p>
                  <p className="text-lg font-bold text-primary">{formatCurrency(data.receivedFunds)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dana Terpakai</p>
                  <p className="text-lg font-bold text-secondary">{formatCurrency(data.usedFunds)}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sisa Dana</p>
                  <p className="text-lg font-bold text-success">{formatCurrency(data.remainingFunds)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Penggunaan Dana</span>
                <span className="text-sm font-medium text-foreground">{usageRate.toFixed(1)}%</span>
              </div>
              <Progress value={usageRate} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Progress Proyek</span>
                <span className="text-sm font-medium text-foreground">{completionRate.toFixed(1)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Selesai: {data.completedProjects}</span>
                <span>Berlangsung: {data.ongoingProjects}</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Proyek-proyek</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Sub-districts for cities */}
          {level === 'city' && 'districts' in data && data.districts.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Kecamatan</h4>
              <div className="space-y-4">
                {data.districts.map((district) => (
                  <AdministrativeLevel
                    key={district.id}
                    title={district.name}
                    data={district}
                    level="district"
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default AdministrativeLevel;