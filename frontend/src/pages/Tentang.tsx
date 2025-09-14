import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Shield, Zap, Users, Globe, Navigation } from "lucide-react";

const Tentang = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Tentang BukaPajak</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Platform transparansi distribusi dana pajak pembangunan daerah berbasis teknologi blockchain 
            untuk mewujudkan akuntabilitas dan transparansi pengelolaan keuangan negara.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">Transparansi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Semua transaksi keuangan tercatat secara transparan dan dapat diakses publik
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg">Real-time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Data keuangan dan progress proyek diperbarui secara real-time
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">Partisipatif</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Masyarakat dapat memberikan feedback dan rating terhadap proyek pembangunan
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg">Nasional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Meliputi seluruh Indonesia dari tingkat provinsi hingga kecamatan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Visi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi platform transparansi keuangan negara terdepan yang mendorong 
                akuntabilitas pengelolaan dana publik dan partisipasi aktif masyarakat 
                dalam pengawasan pembangunan daerah di seluruh Indonesia.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Memberikan akses transparansi data keuangan publik secara real-time
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Mendorong partisipasi masyarakat dalam pengawasan pembangunan
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Meningkatkan akuntabilitas pengelolaan keuangan negara
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Mendukung good governance melalui teknologi blockchain
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technology */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl text-primary text-center">Teknologi Yang Digunakan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-4">🔗</div>
                <h3 className="text-lg font-semibold text-primary mb-2">Blockchain</h3>
                <p className="text-sm text-muted-foreground">
                  Teknologi blockchain memastikan keamanan dan transparansi setiap transaksi keuangan
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-primary mb-2">Real-time Data</h3>
                <p className="text-sm text-muted-foreground">
                  Sistem real-time yang memungkinkan monitoring dana dan proyek secara langsung
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-lg font-semibold text-primary mb-2">Keamanan Data</h3>
                <p className="text-sm text-muted-foreground">
                  Enkripsi tingkat tinggi dan sistem keamanan berlapis untuk melindungi data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tentang;