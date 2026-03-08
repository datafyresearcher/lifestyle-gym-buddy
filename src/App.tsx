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
import SettingsPage from "@/pages/SettingsPage";
import TrainingSessionsPage from "@/pages/TrainingSessionsPage";
import RequestsPage from "@/pages/RequestsPage";
import ProductsPage from "@/pages/ProductsPage";
import SuppliersPage from "@/pages/SuppliersPage";
import PurchaseOrderPage from "@/pages/PurchaseOrderPage";
import PurchaseOrdersPage from "@/pages/PurchaseOrdersPage";
import PointOfSalePage from "@/pages/PointOfSalePage";
import SaleOrdersPage from "@/pages/SaleOrdersPage";
import EnquiriesPage from "@/pages/EnquiriesPage";
import FAQsPage from "@/pages/FAQsPage";
import AddEnquiryPage from "@/pages/AddEnquiryPage";
import ActivityLogsPage from "@/pages/ActivityLogsPage";
import UpcomingDuesPage from "@/pages/UpcomingDuesPage";
import ReportsPage from "@/pages/ReportsPage";
import FeesApprovalPage from "@/pages/FeesApprovalPage";
import ProfilePage from "@/pages/ProfilePage";
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
            <Route path="/reports/*" element={<ReportsPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/petty-cash" element={<PettyCashPage />} />
            <Route path="/sales/pos" element={<PointOfSalePage />} />
            <Route path="/sales/orders" element={<SaleOrdersPage />} />
            <Route path="/sales/*" element={<PlaceholderPage title="Sales" breadcrumbs={[{ label: "Sales" }]} />} />
            <Route path="/purchasing/suppliers" element={<SuppliersPage />} />
            <Route path="/purchasing/order" element={<PurchaseOrderPage />} />
            <Route path="/purchasing/orders" element={<PurchaseOrdersPage />} />
            <Route path="/purchasing/*" element={<PlaceholderPage title="Purchasing" breadcrumbs={[{ label: "Purchasing" }]} />} />
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="/training-sessions" element={<TrainingSessionsPage />} />
            <Route path="/services/*" element={<ServicesPage />} />
            <Route path="/analytics" element={<PlaceholderPage title="Analytics" breadcrumbs={[{ label: "Analytics" }]} />} />
            <Route path="/fees-approval" element={<FeesApprovalPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
    </EnquiriesProvider>
  </QueryClientProvider>
);

export default App;
