// src/components/Header.tsx
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Logo from "@/assets/Group 7.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md border-b border-border/50 shadow-card">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex justify-start">
            <a href="/" className="flex items-center space-x-3" onClick={handleLinkClick}>
              <img src={Logo} alt="BukaPajak Logo" className="w-10 h-10" />
              <div>
                <h1 className="text-lg font-bold text-foreground">BukaPajak</h1>
                <p className="text-xs text-muted-foreground">Transparency Platform</p>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-foreground hover:text-primary transition-smooth">
              Dashboard
            </a>
            <a href="/regional" className="text-foreground hover:text-primary transition-smooth">
              Regional
            </a>
            <a href="#transparency" className="text-foreground hover:text-primary transition-smooth">
              Transparansi
            </a>
            <a href="/#about" className="text-foreground hover:text-primary transition-smooth">
              Tentang
            </a>
          </nav>

          <div className="flex-1 flex justify-end">
            <div className="flex items-center space-x-2">
              <Button asChild size="sm" variant="outline" className="hidden sm:flex">
                <a href="/login">Masuk</a>
              </Button>
              <Button asChild size="sm" className="hidden sm:flex">
                <a href="/register">Daftar</a>
              </Button>

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
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <a href="/dashboard" onClick={handleLinkClick} className="text-foreground hover:text-primary transition-smooth">
                Dashboard
              </a>
              <a href="/regional" onClick={handleLinkClick} className="text-foreground hover:text-primary transition-smooth">
                Regional
              </a>
              <a href="#transparency" onClick={handleLinkClick} className="text-foreground hover:text-primary transition-smooth">
                Transparansi
              </a>
              <a href="/#about" onClick={handleLinkClick} className="text-foreground hover:text-primary transition-smooth">
                Tentang
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button asChild size="sm" variant="outline" className="w-full justify-start">
                  <a href="/login">Masuk</a>
                </Button>
                <Button asChild size="sm" className="w-full justify-start">
                  <a href="/register">Daftar</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;