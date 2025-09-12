import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, TrendingUp, Globe } from "lucide-react";
import heroImage from "@/assets/hero-bg.svg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Shield className="w-4 h-4 mr-2 text-accent" />
            <span className="text-white font-medium">Transparansi Digital Indonesia</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Distribusi Dana
            <span className="text-accent block">Transparansi Web3</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Platform blockchain untuk transparansi dan akurasi distribusi dana pajak 
            pembangunan daerah di seluruh Indonesia
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-white text-primary shadow-elevated hover:bg-white/10 backdrop-blur-sm">
              Lihat Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-primary shadow-elevated hover:bg-white/10 backdrop-blur-sm"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto -mt-8">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mx-auto mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">38 Provinsi</h3>
              <p className="text-white/80">Terhubung dalam sistem</p>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">99.9%</h3>
              <p className="text-white/80">Akurasi distribusi dana</p>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mx-auto mb-4">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Real-time</h3>
              <p className="text-white/80">Transparansi blockchain</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-accent animate-float opacity-60" />
      <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-white/30 animate-float animation-delay-1000 opacity-40" />
      <div className="absolute bottom-32 left-1/4 w-3 h-3 rounded-full bg-secondary animate-pulse-glow opacity-50" />
    </section>
  );
};

export default HeroSection;