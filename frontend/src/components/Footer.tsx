import { Building2, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/Group 7.svg";


const Footer = () => {
  return (
    <footer id="about" className="bg-primary text-primary-foreground rounded-t-3xl rounded-b-3xl m-6">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10">
                <img 
                  src={Logo} 
                  alt="BukaPajak Logo" 
                  className="w-9 h-9 object-contain ml-1" 
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">BukaPajak</h3>
                <p className="text-primary-foreground/80">Transparency Platform</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Platform transparansi distribusi dana pemerintah Indonesia menggunakan teknologi blockchain 
              untuk memastikan akuntabilitas dan akurasi yang tinggi.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-white/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-white/10">
                <Github className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-white/10">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-white/10">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/dashboard" className="text-primary-foreground/80 hover:text-accent transition-smooth">Dashboard</a></li>
              <li><a href="#regional" className="text-primary-foreground/80 hover:text-accent transition-smooth">Regional</a></li>
              <li><a href="#transparency" className="text-primary-foreground/80 hover:text-accent transition-smooth">Transparansi</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">API Documentation</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Blockchain Explorer</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Support Center</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-primary-foreground/60 text-sm">
            © 2025  BukaPajak. Semua hak dilindungi undang-undang.
          </p>
          <p className="text-primary-foreground/60 text-sm mt-4 md:mt-0">
            Powered by Blockchain Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;