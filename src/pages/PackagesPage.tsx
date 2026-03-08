import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { XCircle, Edit, Download, CheckCircle, X, AlertTriangle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Package {
  id: number;
  name: string;
  type: string;
  months: number;
  members: number;
  regFee: number;
  pkgFee: number;
  sequenceNo: number;
  logo: string;
  color: string;
  description: string;
  duration: string;
  ageFrom: string;
  ageTo: string;
  feeCollection: string;
  active: boolean;
}

const initialPackages: Package[] = [
  { id: 1, name: "Monthly", type: "Month Wise Package", months: 1, members: 1, regFee: 4000, pkgFee: 5000, sequenceNo: 1, logo: "Muscle", color: "#9da32c", description: "Package for One month. Befitted for those who want to do gym on monthly basis", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 2, name: "Family Package", type: "Person Wise Package", months: 1, members: 2, regFee: 7000, pkgFee: 6000, sequenceNo: 2, logo: "Gym", color: "#3b82f6", description: "Family package for 2 members", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 4, name: "Group Package", type: "Person Wise Package", months: 1, members: 2, regFee: 10000, pkgFee: 8500, sequenceNo: 3, logo: "Gym Builder", color: "#ef4444", description: "Group package", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 5, name: "Monthly Package", type: "Month Wise Package", months: 1, members: 1, regFee: 5000, pkgFee: 6000, sequenceNo: 4, logo: "Muscle", color: "#22c55e", description: "Monthly package", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 6, name: "Monthly Package", type: "Month Wise Package", months: 1, members: 1, regFee: 1000, pkgFee: 2000, sequenceNo: 5, logo: "Gym", color: "#f59e0b", description: "Basic monthly", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 7, name: "Yearly Package Elite", type: "Month Wise Package", months: 12, members: 1, regFee: 10000, pkgFee: 150000, sequenceNo: 6, logo: "Muscle", color: "#8b5cf6", description: "Elite yearly package", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 8, name: "VIP Package", type: "Month Wise Package", months: 2, members: 1, regFee: 1000, pkgFee: 5000, sequenceNo: 7, logo: "Gym Builder", color: "#06b6d4", description: "VIP package", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 9, name: "Group", type: "Person Wise Package", months: 1, members: 4, regFee: 2500, pkgFee: 5000, sequenceNo: 8, logo: "Gym", color: "#ec4899", description: "Group package for 4", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 10, name: "Monthly Premium", type: "Month Wise Package", months: 1, members: 1, regFee: 3000, pkgFee: 2000, sequenceNo: 9, logo: "Muscle", color: "#14b8a6", description: "Premium monthly", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
  { id: 11, name: "Friends Pkg", type: "Person Wise Package", months: 3, members: 4, regFee: 2500, pkgFee: 5000, sequenceNo: 10, logo: "Gym Builder", color: "#f97316", description: "Friends package", duration: "Months", ageFrom: "", ageTo: "", feeCollection: "One Person can pay fee of whole package.", active: true },
];

const LOGOS = ["Muscle", "Gym", "Gym Builder"];

function PackageEditView({ pkg, onBack, onSave }: { pkg: Package; onBack: () => void; onSave: (p: Package) => void }) {
  const [form, setForm] = useState<Package>({ ...pkg });

  const update = (key: keyof Package, value: string | number) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Go Back
        </Button>
        <Button size="sm" className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 text-white" onClick={() => onSave(form)}>
          💾 Update
        </Button>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 mb-6">
          <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm">Details</TabsTrigger>
          <TabsTrigger value="access" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <h3 className="font-heading font-bold text-lg mb-6">Package Builder Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {/* Left */}
            <div className="space-y-5">
              <div>
                <Label className="font-bold">Package Name</Label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="font-bold text-primary">Package Type</Label>
                <Input value={form.type} readOnly className="mt-1 bg-muted/30" />
              </div>
              <div>
                <Label className="font-bold text-primary">Logo</Label>
                <div className="mt-1 border border-input rounded-md p-3 max-h-40 overflow-y-auto space-y-3">
                  {LOGOS.map((logo) => (
                    <button
                      key={logo}
                      onClick={() => update("logo", logo)}
                      className={`flex items-center gap-3 w-full text-left text-sm p-1 rounded ${form.logo === logo ? "bg-primary/10 font-semibold" : ""}`}
                    >
                      <span className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs">🏋️</span>
                      {logo}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Selected: {form.logo.toLowerCase()}</p>
              </div>
              <div>
                <Label className="font-bold text-primary">Package Color</Label>
                <div className="flex items-center gap-3 mt-1">
                  <input type="color" value={form.color} onChange={(e) => update("color", e.target.value)} className="w-24 h-20 border-0 cursor-pointer" />
                  <span className="text-sm text-muted-foreground">Package Color: {form.color}</span>
                </div>
              </div>
              <div>
                <Label className="font-bold text-primary">Description</Label>
                <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-1" rows={3} />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5">
              <div>
                <Label className="font-bold">Sequence No: <span className="text-destructive">*</span></Label>
                <Input type="number" value={form.sequenceNo} onChange={(e) => update("sequenceNo", Number(e.target.value))} className="mt-1" />
              </div>
              <div>
                <Label className="font-bold text-primary">No Of Members</Label>
                <Input type="number" value={form.members} onChange={(e) => update("members", Number(e.target.value))} className="mt-1" />
              </div>
              <div>
                <Label className="font-bold">Registration Fee</Label>
                <Input type="number" value={form.regFee} onChange={(e) => update("regFee", Number(e.target.value))} className="mt-1" />
              </div>
              <div>
                <Label className="font-bold">Package Fee</Label>
                <Input type="number" value={form.pkgFee} onChange={(e) => update("pkgFee", Number(e.target.value))} className="mt-1" />
              </div>
              <div>
                <Label className="font-bold text-primary">Package Duration</Label>
                <Select value={form.duration} onValueChange={(v) => update("duration", v)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Months">Months</SelectItem>
                    <SelectItem value="Days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-bold text-primary">No Of Month</Label>
                <Input type="number" value={form.months} onChange={(e) => update("months", Number(e.target.value))} className="mt-1" />
              </div>
              <div>
                <Label className="font-bold">Age Group</Label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">From</span>
                  <Input placeholder="Age From" value={form.ageFrom} onChange={(e) => update("ageFrom", e.target.value)} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground ml-2">To</span>
                  <Input placeholder="Age To" value={form.ageTo} onChange={(e) => update("ageTo", e.target.value)} />
                </div>
              </div>
              <div>
                <Label className="font-bold">Fee collection Settings</Label>
                <div className="mt-2 inline-block border border-border rounded px-4 py-2 text-sm">
                  {form.feeCollection}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="access">
          <div className="border border-border rounded-lg min-h-[300px] p-6">
            <p className="text-muted-foreground text-center py-20">Access Control settings will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Package | null>(null);

  const activePackages = packages.filter((p) => p.active);
  const inactivePackages = packages.filter((p) => !p.active);

  const filteredActive = activePackages.filter((p) =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredInactive = inactivePackages.filter((p) =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (pkg: Package) => {
    setDeleteTarget(pkg);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleSave = (updated: Package) => {
    setPackages((prev) => prev.map((p) => p.id === updated.id ? updated : p));
    setEditingPkg(null);
  };

  if (editingPkg) {
    return (
      <PageContainer title="" breadcrumbs={[{ label: "All Packages" }, { label: editingPkg.name }]}>
        <PackageEditView pkg={editingPkg} onBack={() => setEditingPkg(null)} onSave={handleSave} />
      </PageContainer>
    );
  }

  const renderTable = (pkgs: Package[]) => (
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
          {pkgs.map((pkg) => (
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
                  <button className="action-btn action-btn-danger" onClick={() => handleDelete(pkg)} title="Delete"><XCircle className="w-3 h-3" /></button>
                  <button className="action-btn action-btn-primary" onClick={() => setEditingPkg(pkg)} title="Edit"><Edit className="w-3 h-3" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pkgs.length === 0 && <p className="text-center text-muted-foreground py-8">No packages found.</p>}
      {pkgs.length > 0 && (
        <div className="pagination-bar mt-0 text-sm">
          <span>⏮</span> <span>◀</span> <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> <span>▶</span> <span>⏭</span>
        </div>
      )}
    </div>
  );

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

        <div className="bg-card border border-border rounded-lg p-4 mb-4 flex items-center gap-3">
          <div>
            <label className="text-xs text-muted-foreground block">Search Package By Name</label>
            <input className="search-input w-60" placeholder="Search here!" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex-1" />
          <button><Download className="w-4 h-4 text-muted-foreground" /></button>
        </div>

        <TabsContent value="active">{renderTable(filteredActive)}</TabsContent>
        <TabsContent value="inactive">{renderTable(filteredInactive)}</TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle className="font-heading">Confirmation</DialogTitle></DialogHeader>
          <div className="flex items-center gap-2 py-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Are you sure you want to Delete the Package ?</span>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}><X className="w-3 h-3 mr-1" /> No</Button>
            <Button className="bg-[hsl(var(--sidebar-background))] text-white hover:opacity-90" onClick={confirmDelete}>✓ Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
