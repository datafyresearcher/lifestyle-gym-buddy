import { Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageContainerProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

export default function PageContainer({ title, breadcrumbs, children }: PageContainerProps) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="px-6 py-2 border-b border-border bg-card flex items-center gap-1 text-sm">
        <Link to="/" className="breadcrumb-link">
          <Home className="w-4 h-4" />
        </Link>
        {breadcrumbs.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            {item.href ? (
              <Link to={item.href} className="breadcrumb-link">{item.label}</Link>
            ) : (
              <span className="text-muted-foreground text-sm">{item.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Page Content */}
      <div className="p-6">
        <h1 className="text-2xl font-heading font-bold mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
