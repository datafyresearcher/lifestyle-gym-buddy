import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";

const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

export default function AnalyticsPage() {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-GB").replace(/\//g, "/"));

  return (
    <PageContainer title="Desktop Online Status" breadcrumbs={[{ label: "Permissions Management" }, { label: "All Users Permissions" }]}>
      <h2 className="text-xl font-bold text-foreground mb-2">Desktop Online Status Component Works!</h2>
      <p className="text-sm text-foreground mb-1">{date}</p>
      <Button size="sm" className="mb-4">Submit</Button>

      <div className="space-y-0">
        {hours.map((hour) => (
          <div key={hour} className="flex items-center border-b border-border">
            <span className="text-destructive text-sm font-medium w-12 py-3 shrink-0">{hour}</span>
            <div className="flex-1 h-8 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
