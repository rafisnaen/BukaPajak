import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { LoginForm } from "@/components/LoginForm";
import heroBackground from "@/assets/hero-bg.svg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Login Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground} 
            alt="Government building background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-block">
                <div className="flex items-center space-x-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-accent font-medium text-sm">
                    Transparansi Digital Indonesia
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Distribusi Dana
                <br />
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  Transparansi Web3
                </span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                Platform blockchain untuk transparansi dan akurasi distribusi dana pajak 
                pembangunan daerah di seluruh Indonesia
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <div className="inline-block">
                  <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold text-accent">38</div>
                    <div className="text-sm text-white/80">Provinsi</div>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold text-accent">99.9%</div>
                    <div className="text-sm text-white/80">Akurasi</div>
                  </div>
                </div>
                <div className="inline-block">
                  <div className="text-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold text-accent">Real-time</div>
                    <div className="text-sm text-white/80">Transparansi</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex justify-center lg:justify-end">
              <LoginForm />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Index;