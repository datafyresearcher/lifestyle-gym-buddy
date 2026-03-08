import {
  Users,
  UserX,
  Eye,
  MessageSquare,
  Activity,
  ClipboardCheck,
  Calendar,
  Settings,
  BarChart3,
  FileText,
  Package,
  Wallet,
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Box,
  Dumbbell,
  Wrench,
  PieChart,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  User,
  Globe,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logoImg from "@/assets/lifestyle_reset_logo_new.png";
import adminAvatar from "@/assets/admin-avatar.png";

const menuItems = [
  { title: "Members Management", url: "/members", icon: Users },
  { title: "Inactive Members", url: "/inactive-members", icon: UserX },
  { title: "Visitors Management", url: "/visitors", icon: Eye },
  { title: "Enquiry Management", url: "/enquiries", icon: MessageSquare },
  { title: "Activity Logs", url: "/activity-logs", icon: Activity },
  { title: "Attendance", url: "/attendance", icon: ClipboardCheck },
  {
    title: "Upcoming Dues",
    url: "/upcoming-dues",
    icon: Calendar,
    children: [
      { title: "This Week", url: "/upcoming-dues/week" },
      { title: "This Month", url: "/upcoming-dues/month" },
    ],
  },
  {
    title: "Setting",
    url: "/settings",
    icon: Settings,
    children: [
      { title: "General", url: "/settings/general" },
      { title: "Notifications", url: "/settings/notifications" },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
    children: [
      { title: "Defaulter Report", url: "/reports/defaulter" },
      { title: "New Member Report", url: "/reports/new-member" },
      { title: "Sales", url: "/reports/sales" },
      { title: "Billing", url: "/reports/billing" },
      { title: "Daily Closing", url: "/reports/daily-closing" },
      { title: "POS Sales Report", url: "/reports/pos-sales" },
      { title: "Purchase History", url: "/reports/purchase-history" },
      { title: "Members Attendance", url: "/reports/members-attendance" },
      { title: "Trainers Attendance", url: "/reports/trainers-attendance" },
      { title: "Check-In Report", url: "/reports/check-in" },
      { title: "Employees Attendance", url: "/reports/employees-attendance" },
      { title: "Subscriptions Report", url: "/reports/subscriptions" },
      { title: "Training Session Report", url: "/reports/training-session" },
      { title: "Member Report", url: "/reports/member" },
    ],
  },
  { title: "Requests Management", url: "/requests", icon: FileText },
  { title: "Package Builder", url: "/packages", icon: Package },
  { title: "Petty Cash", url: "/petty-cash", icon: Wallet },
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  {
    title: "Sales",
    url: "/sales",
    icon: ShoppingCart,
    children: [
      { title: "Point of Sales", url: "/sales/pos" },
      { title: "Sale Orders", url: "/sales/orders" },
    ],
  },
  {
    title: "Purchasing",
    url: "/purchasing",
    icon: ShoppingBag,
    children: [
      { title: "Suppliers", url: "/purchasing/suppliers" },
      { title: "Purchase Order", url: "/purchasing/order" },
      { title: "Purchase Orders", url: "/purchasing/orders" },
    ],
  },
  {
    title: "Products",
    url: "/products",
    icon: Box,
    children: [
      { title: "All Products", url: "/products/all" },
      { title: "Categories", url: "/products/categories" },
    ],
  },
  { title: "Training Sessions", url: "/training-sessions", icon: Dumbbell },
  {
    title: "Services",
    url: "/services",
    icon: Wrench,
    children: [
      { title: "Services", url: "/services/list" },
    ],
  },
  { title: "Analytics", url: "/analytics", icon: PieChart },
  { title: "Fees Approval", url: "/fees-approval", icon: CheckCircle },
  { title: "FAQs", url: "/faqs", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const isActive = (url: string) => location.pathname === url || location.pathname.startsWith(url + "/");

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        {/* User Profile */}
        {!collapsed && (
          <div className="flex flex-col items-center py-4 border-b border-sidebar-border">
            <div className="flex flex-col items-center mb-3">
              <img src={logoImg} alt="Lifestyle Reset Gym" className="w-24 h-24 object-contain" />
            </div>
            <Avatar className="w-32 h-32 mb-2 border-2 border-sidebar-accent">
              <AvatarImage src={adminAvatar} alt="Admin" className="object-cover" />
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-3xl font-bold">
                A
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <button
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                className="flex items-center gap-1 text-sidebar-foreground text-sm hover:text-sidebar-accent-foreground transition-colors"
              >
                <span>Admin</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${adminMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {adminMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-sidebar border border-sidebar-border rounded-lg shadow-lg z-50 py-1">
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                    <Globe className="w-4 h-4" />
                    <span>English</span>
                    <ChevronDown className="w-3 h-3 ml-auto" />
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.title)}
                        className={`text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                          isActive(item.url) ? "bg-sidebar-primary text-sidebar-primary-foreground" : ""
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{item.title}</span>
                            <ChevronDown
                              className={`w-3 h-3 transition-transform ${openMenus[item.title] ? "rotate-180" : ""}`}
                            />
                          </>
                        )}
                      </SidebarMenuButton>
                      {!collapsed && openMenus[item.title] && (
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <NavLink
                                to={child.url}
                                className="text-sidebar-foreground hover:text-sidebar-accent-foreground text-sm px-4 py-1.5 block"
                                activeClassName="text-sidebar-primary font-medium"
                              >
                                {child.title}
                              </NavLink>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                          isActive(item.url) && item.url !== "/" ? "bg-sidebar-primary text-sidebar-primary-foreground" : ""
                        } ${item.url === "/" && location.pathname === "/" ? "bg-sidebar-primary text-sidebar-primary-foreground" : ""}`}
                        activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
                      >
                        <item.icon className="w-4 h-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
