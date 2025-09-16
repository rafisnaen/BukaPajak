// src/components/proposer/Sidebar.tsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  LogOut,
  ChevronRight,
} from "lucide-react";
// Impor logo Anda. Pastikan path-nya benar.
import BukaPajakLogo from "@/assets/Group 2.svg";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { href: "/proposer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/proposer/new", label: "Upload Proposal", icon: UploadCloud },
    { href: "/proposer/history", label: "Riwayat Proposal", icon: FileText },
  ];

  const handleLogout = () => {
  // Hapus data yang tersimpan di localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Kalau mau hapus semua (opsional):
  // localStorage.clear();

  // Redirect ke login
  navigate("/login");
};

  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col fixed h-screen">
        <div className="flex items-center space-x-3 p-2">
            <div className="bg-blue-600 rounded-lg h-10 w-10 relative">
                <img 
                src={BukaPajakLogo} 
                alt="BukaPajak Logo" 
                className="absolute h-10 w-10" 
                style={{ top: "4px", left: "9px" }}
                />
            </div>
            <span className="font-bold text-xl">
                BukaPajak <span className="font-light text-yellow-400">Proposer</span>
            </span>
        </div>

      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center justify-between p-3 rounded-lg hover:bg-blue-700 transition-colors ${
              location.pathname === item.href ? "bg-blue-900 font-semibold" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </div>
            {location.pathname === item.href && (
              <ChevronRight className="h-5 w-5" />
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="flex w-full items-center p-3 rounded-lg text-blue-200 hover:bg-blue-700 hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};