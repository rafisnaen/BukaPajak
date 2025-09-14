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

// --- Halaman-halaman untuk POV Pengusul ---
import ProposerDashboardPage from "./pages/proposer/DashboardPage";
import NewProposalPage from "./pages/proposer/NewProposalPage";
import HistoryPage from "./pages/proposer/HistoryPage";

// --- Halaman-halaman untuk POV Auditor ---
import AuditorDashboardPage from "./pages/auditor/DashboardPage";
import AuditorReviewPage from "./pages/auditor/ReviewPage";
import RoleManagementPage from "./pages/auditor/RoleManagementPage";

// --- Halaman-halaman untuk POV Owner ---
import OwnerDashboardPage from "./pages/owner/DashboardPage";


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
          <Route path="/proposer/history" element={<HistoryPage />} />

          {/* --- Rute Khusus Auditor (setelah login) --- */}
          <Route path="/auditor/dashboard" element={<AuditorDashboardPage />} />
          <Route path="/auditor/review/:proposalId" element={<AuditorReviewPage />} />

          {/* --- Rute Khusus Owner (setelah login) --- */}
          <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
          <Route path="/owner/roles" element={<RoleManagementPage />} /> {/* 2. Tambahkan rute untuk Manajemen Peran */}

          {/* Rute "Catch-all" Not Found harus selalu di paling bawah */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

