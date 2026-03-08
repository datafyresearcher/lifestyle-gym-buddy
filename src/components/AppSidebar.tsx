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
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
      { title: "Sales Report", url: "/reports/sales" },
      { title: "Members Report", url: "/reports/members" },
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
      { title: "All Sales", url: "/sales/all" },
      { title: "New Sale", url: "/sales/new" },
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
            <Avatar className="w-16 h-16 mb-2">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xl font-bold">
                A
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1 text-sidebar-foreground text-sm">
              <span>Admin</span>
              <ChevronDown className="w-3 h-3" />
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
