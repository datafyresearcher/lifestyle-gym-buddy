import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Power, MessageCircle, Mail } from "lucide-react";

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
          <footer className="bg-muted border-t border-border py-6 px-4 text-center text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Powered By Lifestyle Reset</p>
            <p>
              <a href="https://wa.me/923042451070" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[hsl(var(--success))] hover:opacity-80">
                <MessageCircle className="w-4 h-4" /> +92-304-2451070
              </a>
            </p>
            <p>
              <a href="mailto:researcher@datafyassociates.com" className="inline-flex items-center gap-1 hover:text-primary">
                <Mail className="w-4 h-4" /> researcher@datafyassociates.com
              </a>
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
