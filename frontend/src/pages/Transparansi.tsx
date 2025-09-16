import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, DollarSign, TrendingUp, BarChart3, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import AdministrativeLevel from "@/components/ui/administrative-level";
import ProjectCard from "@/components/ui/project-card";
import { getDetailedProvinceById, detailedProvinces } from "@/data/detailed-provinces";
import { provinces } from "@/data/provinces";
import Footer from "@/components/Footer";

const Transparansi = () => {
  const { provinceId } = useParams();

  // Jika tidak ada provinceId, tampilkan semua proyek dari semua provinsi
  if (!provinceId) {
    // Mengumpulkan semua proyek dari semua provinsi
    const allProjects = detailedProvinces.flatMap(p => 
      [
        ...(p.projects || []), 
        ...p.citiesData.flatMap(c => c.projects || []),
        ...p.citiesData.flatMap(c => c.districts.flatMap(d => d.projects || []))
      ]
    );

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold text-foreground">
              Semua Proyek Pembangunan
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Berikut adalah daftar semua proyek pembangunan yang terdaftar di platform kami dari berbagai daerah di seluruh Indonesia.
            </p>
          </div>

          {allProjects.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
          ) : (
             <Card className="text-center py-12">
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Briefcase className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Belum Ada Proyek</h3>
                      <p className="text-muted-foreground">
                        Saat ini belum ada data proyek yang tersedia untuk ditampilkan.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // Get basic province data
  const province = provinces.find(p => p.id === provinceId);

  // Get detailed province data
  const detailedProvince = getDetailedProvinceById(provinceId || "");

  if (!province) {
    return (
      <div className="min-h-screen bg-background">
        <header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Provinsi Tidak Ditemukan</h1>
            <Link to="/regional">
              <Button>Kembali ke Regional</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  };

  const totalProjects = province.ongoingProjects + province.completedProjects;
  const completionRate = totalProjects > 0 ? (province.completedProjects / totalProjects) * 100 : 0;
  const usageRate = province.receivedFunds > 0 ? (province.usedFunds / province.receivedFunds) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/regional">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{province.name}</h1>
            <p className="text-muted-foreground">
              Detail transparansi dana dan proyek pembangunan
            </p>
          </div>
        </div>

        {/* Province Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dana Diterima</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(province.receivedFunds)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dana Terpakai</p>
                  <p className="text-xl font-bold text-secondary">{formatCurrency(province.usedFunds)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sisa Dana</p>
                  <p className="text-xl font-bold text-success">{formatCurrency(province.remainingFunds)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Populasi</p>
                  <p className="text-xl font-bold text-foreground">{province.population}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ringkasan Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Penggunaan Dana</span>
                    <span className="text-sm font-medium text-foreground">{usageRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={usageRate} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Kota/Kabupaten:</span>
                    <Badge variant="outline" className="ml-2">{province.cities}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Proyek:</span>
                    <Badge variant="outline" className="ml-2">{totalProjects}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progress Proyek</span>
                    <span className="text-sm font-medium text-foreground">{completionRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={completionRate} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Selesai:</span>
                    <Badge className="ml-2 bg-success text-success-foreground">{province.completedProjects}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Berlangsung:</span>
                    <Badge className="ml-2 bg-warning text-warning-foreground">{province.ongoingProjects}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provincial Projects */}
        {detailedProvince && detailedProvince.projects && detailedProvince.projects.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Proyek Tingkat Provinsi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {detailedProvince.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cities/Regencies */}
        {detailedProvince && detailedProvince.citiesData && detailedProvince.citiesData.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Kabupaten & Kota
            </h2>
            
            <div className="space-y-4">
              {detailedProvince.citiesData.map((city) => (
                <AdministrativeLevel
                  key={city.id}
                  title={city.name}
                  data={city}
                  level="city"
                />
              ))}
            </div>
          </div>
        )}

        {/* No detailed data message */}
        {(!detailedProvince || (!detailedProvince.citiesData?.length && !detailedProvince.projects?.length)) && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Data Detail Sedang Dikembangkan</h3>
                  <p className="text-muted-foreground">
                    Data detail untuk {province.name} sedang dalam proses pengembangan. 
                    Silakan cek kembali nanti.
                  </p>
                </div>
                <Link to="/regional">
                  <Button variant="outline">
                    Kembali ke Daftar Provinsi
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Transparansi;