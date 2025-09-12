import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
import { RegionalDistribution } from "@/components/dashboard/RegionalDistribution";
import { ProjectDetails } from "@/components/dashboard/ProjectDetails";
import { AuditLog } from "@/components/dashboard/AuditLog";
import { PublicFeedback } from "@/components/dashboard/PublicFeedback";
import HeaderLoggedIn from "@/components/HeaderLoggedIn";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderLoggedIn />
      <div className="container mx-auto px-4 pt-24 pb-8 space-y-8">
        <DashboardHeader />
        
        <BudgetOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegionalDistribution />
          <AuditLog />
        </div>
        
        <ProjectDetails />
        
        <PublicFeedback />
        <Footer />
      </div>
    </div>
  );
};

export default Index;