import PageContainer from "@/components/PageContainer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function FeesApprovalPage() {
  return (
    <PageContainer title="Fees Approval" breadcrumbs={[{ label: "Fees Approval" }]}>
      <div className="border border-border overflow-hidden rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar-accent">
              <TableHead className="font-semibold text-sidebar-accent-foreground">MemberShip No</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Name</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Fees</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Discount</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Status</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Mode</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Package</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Date</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Collected By</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={10} className="py-8 text-muted-foreground">
                No Feeses to be Approved
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex items-center justify-center gap-1 py-3 bg-sidebar-accent">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled>⏮</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled>◀</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled>▶</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled>⏭</Button>
        </div>
      </div>
    </PageContainer>
  );
}
