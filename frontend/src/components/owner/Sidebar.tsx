import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    LogOut,
    ChevronRight,
    ShieldCheck,
    ShieldAlert,
    } from "lucide-react";
    import BukaPajakLogo from "@/assets/Group 2.svg"

    export const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { href: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/owner/roles", label: "Manajemen Peran", icon: ShieldCheck },
        // Tambahkan link lain jika perlu
    ];

    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3 p-2">
                <img src={BukaPajakLogo} alt="BukaPajak Logo" className="h-8 w-8" />
                <span className="font-bold text-xl">BukaPajak <span className="font-light text-red-400">Owner</span></span>
            </div>
        </div>

        <nav className="flex-grow p-4 space-y-2">
            {navItems.map((item) => (
            <Link
                key={item.href}
                to={item.href}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-slate-700 transition-colors ${
                location.pathname === item.href ? "bg-slate-900 font-semibold" : ""
                }`}
            >
                <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </div>
                {location.pathname === item.href && <ChevronRight className="h-5 w-5" />}
            </Link>
            ))}
        </nav>

        <div className="p-4 space-y-4 border-t border-slate-700">
            <button
                className="flex w-full items-center p-3 rounded-lg text-yellow-300 hover:bg-yellow-900/50 transition-colors"
            >
                <ShieldAlert className="mr-3 h-5 w-5" />
                <span>Emergency Withdraw</span>
            </button>
            <button
                className="flex w-full items-center p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
                <LogOut className="mr-3 h-5 w-5" />
                <span>Logout</span>
            </button>
        </div>
        </aside>
    );
};
