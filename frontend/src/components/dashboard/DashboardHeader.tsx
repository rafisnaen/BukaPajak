import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Landmark, Users, FileCheck } from "lucide-react";

const statsData = [
  {
    title: "Total APBN 2024",
    value: "Rp 2.000T",
    change: "+12.5%",
    changeType: "positive",
    icon: Landmark,
    description: "vs tahun lalu"
  },
  {
    title: "Dana Tersalurkan",
    value: "Rp 1.285T",
    change: "64.25%",
    changeType: "neutral",
    icon: TrendingUp,
    description: "dari total APBN"
  },
  {
    title: "Regional Aktif",
    value: "38 Provinsi",
    change: "100%",
    changeType: "positive",
    icon: Users,
    description: "partisipasi penuh"
  },
  {
    title: "Proyek Aktif",
    value: "1,247",
    change: "+156",
    changeType: "positive", 
    icon: FileCheck,
    description: "proyek baru"
  }
];

export const DashboardHeader = () => {
  return (
    <div className="space-y-6 mb-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">Dashboard Transparansi APBN</h1>
        <p className="text-muted-foreground">
          Platform transparansi distribusi Anggaran Pendapatan dan Belanja Negara berbasis blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{stat.title}</h3>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'default' : stat.changeType === 'negative' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};