// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Regional from "./pages/Regional";
import Transparansi from "./pages/Transparansi";
import Tentang from "./pages/Tentang";

// --- Halaman Pengusul ---
import ProposerDashboardPage from "./pages/proposer/DashboardPage";
import NewProposalPage from "./pages/proposer/NewProposalPage";
import HistoryPage from "./pages/proposer/HistoryPage";

// --- Halaman Auditor ---
import AuditorDashboardPage from "./pages/auditor/DashboardPage";
import AuditorReviewPage from "./pages/auditor/ReviewPage";
import RoleManagementPage from "./pages/auditor/RoleManagementPage";
import AuditorHistoryPage from "./pages/auditor/HistoryPage";
import AuditorHistoryDetailPage from "./pages/auditor/HistoryDetailPage";

// --- Halaman Owner ---
import OwnerDashboardPage from "./pages/owner/DashboardPage";

// ✅ Import ProtectedRoute
import { ProtectedRoute } from "./components/Security/ProtectedRoute";

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

          {/* --- Rute Khusus Pengusul (Protected) --- */}
          <Route
            path="/proposer/dashboard"
            element={
              <ProtectedRoute>
                <ProposerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/proposer/new"
            element={
              <ProtectedRoute>
                <NewProposalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/proposer/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />

          {/* --- Rute Khusus Auditor --- */}
          <Route path="/auditor/dashboard" element={<AuditorDashboardPage />} />
          <Route path="/auditor/review/:proposalId" element={<AuditorReviewPage />} />
          <Route path="/auditor/history" element={<AuditorHistoryPage />} />
          <Route path="/auditor/history/:proposalId" element={<AuditorHistoryDetailPage />} />

          {/* --- Rute Khusus Owner --- */}
          <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
          <Route path="/owner/roles" element={<RoleManagementPage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
