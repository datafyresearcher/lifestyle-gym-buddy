import PageContainer from "@/components/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { XCircle, Edit, Download, Search, CheckCircle, X } from "lucide-react";

const activePackages = [
  { id: 1, name: "Monthly", type: "Month Wise Package", months: 1, members: 1, regFee: 4000, pkgFee: 5000 },
  { id: 2, name: "Family Package", type: "Person Wise Package", months: 1, members: 2, regFee: 7000, pkgFee: 6000 },
  { id: 4, name: "Group Package", type: "Person Wise Package", months: 1, members: 2, regFee: 10000, pkgFee: 8500 },
  { id: 5, name: "Monthly Package", type: "Month Wise Package", months: 1, members: 1, regFee: 5000, pkgFee: 6000 },
  { id: 6, name: "Monthly Package", type: "Month Wise Package", months: 1, members: 1, regFee: 1000, pkgFee: 2000 },
  { id: 7, name: "Yearly Package Elite", type: "Month Wise Package", months: 12, members: 1, regFee: 10000, pkgFee: 150000 },
  { id: 8, name: "VIP Package", type: "Month Wise Package", months: 2, members: 1, regFee: 1000, pkgFee: 5000 },
  { id: 9, name: "Group", type: "Person Wise Package", months: 1, members: 4, regFee: 2500, pkgFee: 5000 },
  { id: 10, name: "Monthly Premium", type: "Month Wise Package", months: 1, members: 1, regFee: 3000, pkgFee: 2000 },
  { id: 11, name: "Friends Pkg", type: "Person Wise Package", months: 3, members: 4, regFee: 2500, pkgFee: 5000 },
];

export default function PackagesPage() {
  return (
    <PageContainer title="Package Builder" breadcrumbs={[{ label: "All Packages" }]}>
      <Tabs defaultValue="active">
        <TabsList className="mb-4 bg-transparent border-b border-border rounded-none h-auto p-0">
          <TabsTrigger value="active" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 gap-2">
            <CheckCircle className="w-4 h-4" /> Active Packages
          </TabsTrigger>
          <TabsTrigger value="inactive" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 gap-2">
            <X className="w-4 h-4" /> InActive Packages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="bg-card border border-border rounded-lg p-4 mb-4 flex items-center gap-3">
            <div>
              <label className="text-xs text-muted-foreground block">Search Package By Name</label>
              <input className="search-input w-60" placeholder="Search here!" />
            </div>
            <div className="flex-1" />
            <button><Download className="w-4 h-4 text-muted-foreground" /></button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Serial #</th>
                  <th>Package Name</th>
                  <th>Package Type</th>
                  <th>No Of Month</th>
                  <th>No Of Members</th>
                  <th>Registration Fee</th>
                  <th>Package Fee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activePackages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>{pkg.id}</td>
                    <td>{pkg.name}</td>
                    <td>{pkg.type}</td>
                    <td>{pkg.months}</td>
                    <td>{pkg.members}</td>
                    <td>{pkg.regFee.toLocaleString()}</td>
                    <td>{pkg.pkgFee.toLocaleString()}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="action-btn action-btn-danger"><XCircle className="w-3 h-3" /></button>
                        <button className="action-btn action-btn-primary"><Edit className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="inactive">
          <p className="text-muted-foreground">No inactive packages found.</p>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
