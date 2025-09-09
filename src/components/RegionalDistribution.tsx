import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, TrendingUp, Clock, Shield } from "lucide-react";

const RegionalDistribution = () => {
  const regions = [
    {
      name: "DKI Jakarta",
      allocation: 2500000000000,
      progress: 85,
      status: "Active",
      projects: 45,
      lastUpdate: "2 jam lalu"
    },
    {
      name: "Jawa Barat",
      allocation: 3200000000000,
      progress: 72,
      status: "Active",
      projects: 67,
      lastUpdate: "1 jam lalu"
    },
    {
      name: "Jawa Tengah",
      allocation: 2800000000000,
      progress: 91,
      status: "Active",
      projects: 52,
      lastUpdate: "30 menit lalu"
    },
    {
      name: "Jawa Timur",
      allocation: 3500000000000,
      progress: 78,
      status: "Active",
      projects: 71,
      lastUpdate: "45 menit lalu"
    },
    {
      name: "Sumatera Utara",
      allocation: 2100000000000,
      progress: 64,
      status: "In Progress",
      projects: 38,
      lastUpdate: "3 jam lalu"
    },
    {
      name: "Sulawesi Selatan",
      allocation: 1800000000000,
      progress: 89,
      status: "Active",
      projects: 29,
      lastUpdate: "1 jam lalu"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Distribusi Regional
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Alokasi Dana Per Provinsi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparansi real-time distribusi dana pembangunan daerah dengan verifikasi blockchain
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {formatCurrency(16900000000000)}
              </h3>
              <p className="text-muted-foreground">Total Alokasi</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">34</h3>
              <p className="text-muted-foreground">Provinsi Aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">302</h3>
              <p className="text-muted-foreground">Total Proyek</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">78%</h3>
              <p className="text-muted-foreground">Progress Rata-rata</p>
            </CardContent>
          </Card>
        </div>

        {/* Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {region.name}
                  </CardTitle>
                  <Badge 
                    variant={region.status === "Active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {region.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Allocation */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Alokasi Dana</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(region.allocation)}
                  </p>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-sm font-medium text-foreground">{region.progress}%</p>
                  </div>
                  <Progress value={region.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Proyek</p>
                    <p className="text-lg font-semibold text-foreground">{region.projects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Update Terakhir</p>
                    <p className="text-sm text-foreground">{region.lastUpdate}</p>
                  </div>
                </div>

                {/* Blockchain Verification */}
                <div className="flex items-center justify-center p-3 bg-primary/5 rounded-lg">
                  <Shield className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm text-primary font-medium">Verified on Blockchain</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionalDistribution;