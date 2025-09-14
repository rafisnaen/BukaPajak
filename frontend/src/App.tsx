import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Halaman-halaman Publik
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage"; // Ini adalah dashboard publik
import Regional from "./pages/Regional";
import Transparansi from "./pages/Transparansi";
import Tentang from "./pages/Tentang";

// --- Halaman-halaman Baru untuk POV Pengusul ---
import ProposerDashboardPage from "./pages/proposer/DashboardPage";
import NewProposalPage from '@/components/proposer/NewProposalPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* --- Rute Publik --- */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/regional" element={<Regional />} />
          <Route path="/transparansi/:provinceId" element={<Transparansi />} />
          <Route path="/transparansi" element={<Transparansi />} />
          <Route path="/tentang" element={<Tentang />} />

          {/* --- Rute Khusus Pengusul (setelah login) --- */}
          <Route path="/proposer/dashboard" element={<ProposerDashboardPage />} />
          <Route path="/proposer/new" element={<NewProposalPage />} />

          {/* Rute "Catch-all" Not Found harus selalu di paling bawah */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
