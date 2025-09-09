import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, FileCheck, Users, Zap } from "lucide-react";

const TransparencyMetrics = () => {
  const metrics = [
    {
      title: "Transparansi Score",
      value: 98.5,
      unit: "%",
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Tingkat keterbukaan informasi"
    },
    {
      title: "Verifikasi Blockchain",
      value: 99.9,
      unit: "%",
      icon: FileCheck,
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Data terverifikasi blockchain"
    },
    {
      title: "Partisipasi Publik",
      value: 12.8,
      unit: "K",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "User aktif monitoring"
    },
    {
      title: "Real-time Updates",
      value: 24,
      unit: "/7",
      icon: Zap,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Update data otomatis"
    }
  ];

  const recentActivities = [
    {
      action: "Dana dialokasikan",
      region: "Jawa Tengah",
      amount: "Rp 2.5 Miliar",
      time: "5 menit lalu",
      status: "verified"
    },
    {
      action: "Proyek diselesaikan",
      region: "Bali",
      amount: "Rp 1.8 Miliar",
      time: "12 menit lalu",
      status: "verified"
    },
    {
      action: "Verifikasi blockchain",
      region: "Sumatera Selatan",
      amount: "Rp 3.2 Miliar",
      time: "18 menit lalu",
      status: "verified"
    },
    {
      action: "Laporan progress",
      region: "Papua",
      amount: "Rp 4.1 Miliar",
      time: "25 menit lalu",
      status: "verified"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Eye className="w-4 h-4 mr-2" />
            Metrik Transparansi
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Transparansi Real-Time
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pantau setiap transaksi dan distribusi dana dengan teknologi blockchain yang terverifikasi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Metrics Grid */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Key Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={index} className="bg-gradient-card shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-full ${metric.bgColor}`}>
                          <IconComponent className={`w-6 h-6 ${metric.color}`} />
                        </div>
                        <Badge variant="outline" className="text-xs">Live</Badge>
                      </div>
                      <div className="mb-2">
                        <h4 className="text-3xl font-bold text-foreground">
                          {metric.value}
                          <span className="text-lg text-muted-foreground ml-1">
                            {metric.unit}
                          </span>
                        </h4>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {metric.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {metric.description}
                      </p>
                      <Progress 
                        value={typeof metric.value === 'number' && metric.unit === '%' ? metric.value : 75} 
                        className="mt-3 h-1.5" 
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Aktivitas Terbaru</h3>
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-3" />
                  Live Transaction Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">{activity.action}</h4>
                        <Badge 
                          variant={activity.status === 'verified' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {activity.status === 'verified' ? 'Verified' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.region} • {activity.amount}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FileCheck className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencyMetrics;