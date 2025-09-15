import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

interface OwnerLayoutProps {
    children: ReactNode;
    }

    export const OwnerLayout = ({ children }: OwnerLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            {/* Header bisa ditambahkan di sini jika perlu */}
            <main className="p-6 lg:p-8 flex-grow">
            {children}
            </main>
        </div>
        </div>
    );
};
