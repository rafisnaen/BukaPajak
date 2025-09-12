// src/components/HeaderLoggedIn.tsx

import { Button } from "@/components/ui/button";
import { Building2, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fungsi untuk menutup menu mobile saat link diklik
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md border-b border-border/50 shadow-card">
      <div className="container mx-auto px-6">
        <div className="relative flex items-center justify-between h-16"> {/* [MODIFIED] */}
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3" onClick={handleLinkClick}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">BukaPajak</h1>
              <p className="text-xs text-muted-foreground">Transparency Platform</p>
            </div>
          </a>

          {/* Navigation - Desktop (Biarkan <a> karena ini anchor link) */}
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2"> {/* [MODIFIED] */}
            {/* Tombol Dashboard diubah di sini */}
            <a href="/dashboard" className="text-foreground hover:text-primary transition-smooth">
              Dashboard
            </a>
            <a href="#regional" className="text-foreground hover:text-primary transition-smooth">
              Regional
            </a>
            <a href="#transparency" className="text-foreground hover:text-primary transition-smooth">
              Transparansi
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth">
              Tentang
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <a href="#dashboard" onClick={handleLinkClick} className="text-foreground hover:text-primary transition-smooth">
                Dashboard
              </a>
              <a href="#regional" onClick={handleLinkClick} className="text-foreground hover:text-primary transition-smooth">
                Regional
              </a>
              <a href="#transparency" onClick={handleLinkClick} className="text-foreground hover:text-primary transition-smooth">
                Transparansi
              </a>
              <a href="#about" onClick={handleLinkClick} className="text-foreground hover:text-primary transition-smooth">
                Tentang
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;