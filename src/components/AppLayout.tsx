import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Power, Mail } from "lucide-react";
import finalLogo from "@/assets/final_logo.png";
import whatsappLogo from "@/assets/whatsapp_logo.png";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="bg-header text-header-foreground flex items-center justify-between px-4 h-14 shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-header-foreground" />
              <h1 className="font-heading text-lg font-bold tracking-tight">Lifestyle Reset</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-medium">
                Quick Access
              </button>
              <button className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button>
                <Power className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-[hsl(var(--sidebar-background))] border-t border-sidebar-border py-8 px-6">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
              {/* Logo & Brand */}
              <div className="flex items-center gap-4">
                <img src={finalLogo} alt="Lifestyle Reset Logo" className="w-20 h-20 object-contain" />
                <div>
                  <p className="font-heading text-xl font-bold text-white tracking-wide">Lifestyle Reset</p>
                  <p className="text-xs text-sidebar-foreground/60 tracking-widest uppercase">Fitness & Wellness</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-24 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* Contact Row */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <a
                  href="https://wa.me/923042451070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sidebar-foreground/80 hover:text-success transition-colors"
                >
                  <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5 object-contain" />
                  +92-304-2451070
                </a>
                <a
                  href="mailto:researcher@datafyassociates.com"
                  className="flex items-center gap-2 text-sidebar-foreground/80 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  researcher@datafyassociates.com
                </a>
              </div>

              {/* Copyright */}
              <p className="text-[11px] text-sidebar-foreground/40 mt-1">
                © {new Date().getFullYear()} Lifestyle Reset. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
