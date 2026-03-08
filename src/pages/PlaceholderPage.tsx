import PageContainer from "@/components/PageContainer";

interface PlaceholderPageProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PlaceholderPage({ title, breadcrumbs }: PlaceholderPageProps) {
  return (
    <PageContainer title={title} breadcrumbs={breadcrumbs}>
      <div className="flex items-center justify-center h-64 bg-card border border-border rounded-lg">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">This section is coming soon.</p>
          <p className="text-sm text-muted-foreground mt-1">Feature under development.</p>
        </div>
      </div>
    </PageContainer>
  );
}
