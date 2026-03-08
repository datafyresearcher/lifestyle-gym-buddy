import { Toaster } from "@/components/ui/toaster";
import { EnquiriesProvider } from "@/context/EnquiriesContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import MembersPage from "@/pages/MembersPage";
import VisitorsPage from "@/pages/VisitorsPage";
import PackagesPage from "@/pages/PackagesPage";
import InactiveMembersPage from "@/pages/InactiveMembersPage";
import PettyCashPage from "@/pages/PettyCashPage";
import AttendancePage from "@/pages/AttendancePage";
import ServicesPage from "@/pages/ServicesPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import EnquiriesPage from "@/pages/EnquiriesPage";
import AddEnquiryPage from "@/pages/AddEnquiryPage";
import ActivityLogsPage from "@/pages/ActivityLogsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EnquiriesProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/inactive-members" element={<InactiveMembersPage />} />
            <Route path="/visitors" element={<VisitorsPage />} />
            <Route path="/enquiries" element={<EnquiriesPage />} />
            <Route path="/enquiries/add" element={<AddEnquiryPage />} />
            <Route path="/activity-logs" element={<ActivityLogsPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/upcoming-dues/*" element={<UpcomingDuesPage />} />
            <Route path="/settings/*" element={<PlaceholderPage title="Settings" breadcrumbs={[{ label: "Settings" }]} />} />
            <Route path="/reports/*" element={<PlaceholderPage title="Reports" breadcrumbs={[{ label: "Reports" }]} />} />
            <Route path="/requests" element={<PlaceholderPage title="Requests Management" breadcrumbs={[{ label: "Requests Management" }]} />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/petty-cash" element={<PettyCashPage />} />
            <Route path="/sales/*" element={<PlaceholderPage title="Sales" breadcrumbs={[{ label: "Sales" }]} />} />
            <Route path="/purchasing/*" element={<PlaceholderPage title="Purchasing" breadcrumbs={[{ label: "Purchasing" }]} />} />
            <Route path="/products/*" element={<PlaceholderPage title="Products" breadcrumbs={[{ label: "Products" }]} />} />
            <Route path="/training-sessions" element={<PlaceholderPage title="Training Sessions" breadcrumbs={[{ label: "Training Sessions" }]} />} />
            <Route path="/services/*" element={<ServicesPage />} />
            <Route path="/analytics" element={<PlaceholderPage title="Analytics" breadcrumbs={[{ label: "Analytics" }]} />} />
            <Route path="/fees-approval" element={<PlaceholderPage title="Fees Approval" breadcrumbs={[{ label: "Fees Approval" }]} />} />
            <Route path="/faqs" element={<PlaceholderPage title="FAQs" breadcrumbs={[{ label: "FAQs" }]} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
    </EnquiriesProvider>
  </QueryClientProvider>
);

export default App;
