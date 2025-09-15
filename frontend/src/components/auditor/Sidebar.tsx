import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    LogOut,
    ChevronRight,
    History, // Impor ikon History
    } from "lucide-react";
    import BukaPajakLogo from "@/assets/Group 2.svg"
    import { logout } from "@/api/auth";

    export const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { href: "/auditor/dashboard", label: "Antrian Review", icon: LayoutDashboard },
        { href: "/auditor/history", label: "Riwayat Review", icon: History }, // Tambahkan item baru
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3 p-2">
                <img src={BukaPajakLogo} alt="BukaPajak Logo" className="h-8 w-8" />
                <span className="font-bold text-xl">BukaPajak <span className="font-light text-yellow-400">Auditor</span></span>
            </div>
        </div>

        <nav className="flex-grow p-4 space-y-2">
            {navItems.map((item) => (
            <Link
                key={item.href}
                to={item.href}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                location.pathname.startsWith(item.href) ? "bg-gray-900 font-semibold" : ""
                }`}
            >
                <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </div>
                {location.pathname.startsWith(item.href) && <ChevronRight className="h-5 w-5" />}
            </Link>
            ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
            <button
                onClick={logout}
                className="flex w-full items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
                <LogOut className="mr-3 h-5 w-5" />
                <span>Logout</span>
            </button>
        </div>
        </aside>
    );
};