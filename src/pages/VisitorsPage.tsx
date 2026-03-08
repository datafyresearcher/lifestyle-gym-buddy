import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { Edit, Download, X, UserPlus, Eye, CalendarIcon, Mail, Phone, User } from "lucide-react";
import * as XLSX from "xlsx";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface Visitor {
  name: string;
  mobile: string;
  email: string;
  date: string;
  time: string;
  totalFees: number;
  discount: number;
  tax: number;
  paid: number;
  gender?: string;
  dayPass?: string;
  visitorType?: string;
  requiresTrainer?: boolean;
}

const mockVisitors: Visitor[] = [
  { name: "Ali", mobile: "+923325658545", email: "---", date: "Saturday, March 7, 2026", time: "5:08 PM", totalFees: 400, discount: 0, tax: 0, paid: 400, gender: "Male", dayPass: "Default" },
  { name: "Kashif Ali", mobile: "+923358585471", email: "---", date: "Tuesday, March 3, 2026", time: "10:21 AM", totalFees: 400, discount: 0, tax: 0, paid: 400, gender: "Male", dayPass: "Default" },
  { name: "Azeem Ali", mobile: "+923455855544", email: "---", date: "Tuesday, February 24, 2026", time: "1:00 PM", totalFees: 400, discount: 0, tax: 0, paid: 400, gender: "Male", dayPass: "Default" },
  { name: "Adeela", mobile: "+923085485453", email: "---", date: "Tuesday, February 24, 2026", time: "10:23 AM", totalFees: 2000, discount: 0, tax: 0, paid: 2000, gender: "Female", dayPass: "Three Days Pass" },
  { name: "Ahmed Ali", mobile: "+923358185585", email: "---", date: "Wednesday, February 18, 2026", time: "4:32 PM", totalFees: 400, discount: 20, tax: 0, paid: 380, gender: "Male", dayPass: "Default" },
  { name: "Sadia Iqbal", mobile: "+923337854112", email: "---", date: "Wednesday, February 18, 2026", time: "12:00 AM", totalFees: 400, discount: 0, tax: 0, paid: 400, gender: "Female", dayPass: "Default" },
  { name: "Ahmed", mobile: "+923358545878", email: "---", date: "Tuesday, February 17, 2026", time: "5:29 PM", totalFees: 400, discount: 0, tax: 0, paid: 400, gender: "Male", dayPass: "Default" },
  { name: "Sana", mobile: "+923356587444", email: "---", date: "Wednesday, January 28, 2026", time: "12:00 AM", totalFees: 400, discount: 0, tax: 0, paid: 400, gender: "Female", dayPass: "Default" },
];

const dayPassOptions = ["Default", "Three Days Pass", "Weekly Pass"];
const paymentModes = ["Cash - Reception", "Online Payment", "Card Payment"];

function getTodayString() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  // View/Edit dialog
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [editForm, setEditForm] = useState({ name: "", mobile: "", email: "", gender: "Male", dayPass: "Default" });
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  // Add New dialog
  const [addOpen, setAddOpen] = useState(false);
  const [newForm, setNewForm] = useState({
    name: "", mobile: "", email: "", gender: "Male", dayPass: "Default",
    fee: "400", discount: "0", requiresTrainer: false, visitorType: "Default",
  });
  const [newErrors, setNewErrors] = useState<Record<string, string>>({});

  // Add Fee dialog
  const [feeOpen, setFeeOpen] = useState(false);
  const [feeForm, setFeeForm] = useState({
    visitorType: "Default", paymentMode: "Cash - Reception",
    fee: "400", discount: "0", requiresTrainer: false,
  });

  const filtered = visitors.filter((v) => {
    if (searchName && !v.name.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (searchMobile && !v.mobile.includes(searchMobile)) return false;
    return true;
  });

  const clearSearch = () => { setSearchName(""); setSearchMobile(""); };

  const exportToExcel = () => {
    const data = filtered.map((v) => ({
      Name: v.name, Mobile: v.mobile, Email: v.email, Date: v.date, Time: v.time,
      "Total Fees": v.totalFees, Discount: v.discount, Tax: v.tax, Paid: v.paid,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");
    XLSX.writeFile(wb, "visitors.xlsx");
  };

  // View/Edit handlers
  const openViewDialog = (v: Visitor) => {
    setSelectedVisitor(v);
    setEditForm({ name: v.name, mobile: v.mobile, email: v.email, gender: v.gender || "Male", dayPass: v.dayPass || "Default" });
    setViewOpen(true);
  };

  const handleUpdate = () => {
    setConfirmUpdate(true);
  };

  const confirmUpdateVisitor = () => {
    if (selectedVisitor) {
      setVisitors((prev) =>
        prev.map((v) =>
          v === selectedVisitor
            ? { ...v, name: editForm.name, mobile: editForm.mobile, email: editForm.email, gender: editForm.gender, dayPass: editForm.dayPass }
            : v
        )
      );
      toast.success("Visitor updated successfully");
    }
    setConfirmUpdate(false);
    setViewOpen(false);
  };

  // Add Fee handler
  const openAddFee = () => {
    setFeeForm({ visitorType: "Default", paymentMode: "Cash - Reception", fee: "400", discount: "0", requiresTrainer: false });
    setFeeOpen(true);
  };

  const saveFee = () => {
    toast.success("Fee added successfully");
    setFeeOpen(false);
  };

  // Add New handlers
  const openAddNew = () => {
    setNewForm({ name: "", mobile: "", email: "", gender: "Male", dayPass: "Default", fee: "400", discount: "0", requiresTrainer: false, visitorType: "Default" });
    setNewErrors({});
    setAddOpen(true);
  };

  const validateNewForm = () => {
    const errors: Record<string, string> = {};
    if (!newForm.name.trim()) errors.name = "Please enter your name.";
    if (!newForm.mobile.trim()) errors.mobile = "Please enter your mobile number.";
    else if (!/^\+?\d{10,15}$/.test(newForm.mobile.replace(/\s/g, ""))) errors.mobile = "Phone number is not valid.";
    setNewErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveNewVisitor = () => {
    if (!validateNewForm()) return;
    const now = new Date();
    const fee = parseFloat(newForm.fee) || 0;
    const disc = parseFloat(newForm.discount) || 0;
    const newVisitor: Visitor = {
      name: newForm.name.trim(),
      mobile: newForm.mobile.trim(),
      email: newForm.email.trim() || "---",
      date: now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      time: now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      totalFees: fee,
      discount: disc,
      tax: 0,
      paid: fee - disc,
      gender: newForm.gender,
      dayPass: newForm.dayPass,
      visitorType: newForm.visitorType,
      requiresTrainer: newForm.requiresTrainer,
    };
    setVisitors((prev) => [newVisitor, ...prev]);
    toast.success("Visitor added successfully");
    setAddOpen(false);
  };

  const feeAfterDiscount = (parseFloat(newForm.fee) || 0) - (parseFloat(newForm.discount) || 0);
  const payFeeAfterDiscount = (parseFloat(feeForm.fee) || 0) - (parseFloat(feeForm.discount) || 0);

  return (
    <PageContainer title="Visitors" breadcrumbs={[{ label: "Visitor Management" }, { label: "All Visitors" }]}>
      {/* Search */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-0">
          <div>
            <label className="text-xs text-muted-foreground block">Search By Name</label>
            <input className="search-input w-40" placeholder="Search here!" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">Search By Mobile</label>
            <input className="search-input w-40" placeholder="Search here!" value={searchMobile} onChange={(e) => setSearchMobile(e.target.value)} />
          </div>
          <button className="mt-4" onClick={clearSearch}><X className="w-4 h-4 text-muted-foreground" /></button>
          <button className="mt-4" onClick={openAddNew} title="Add New Visitor"><UserPlus className="w-4 h-4 text-muted-foreground" /></button>
          <div className="flex-1" />
          <button className="mt-4" onClick={exportToExcel}><Download className="w-4 h-4 text-muted-foreground" /></button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th><th>Mobile</th><th>Email</th><th>Date</th><th>Time</th>
              <th>Total Fees</th><th>Discount</th><th>Tax</th><th>Paid</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10} className="text-center text-muted-foreground py-4">No results found</td></tr>
            ) : filtered.map((v, i) => (
              <tr key={i}>
                <td>{v.name}</td>
                <td>{v.mobile}</td>
                <td>{v.email}</td>
                <td>{v.date}</td>
                <td>{v.time}</td>
                <td>{v.totalFees.toLocaleString()}</td>
                <td>{v.discount}</td>
                <td>{v.tax}</td>
                <td>{v.paid.toLocaleString()}</td>
                <td>
                  <button className="action-btn action-btn-primary" onClick={() => openViewDialog(v)} title="View Visitor Detail">
                    <Eye className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View / Edit Visitor Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Visitor Details (Add New Day Pass / Walk In)</DialogTitle>
            <DialogDescription>View and edit visitor information</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="fee">Fee Details</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Date & Name & Gender */}
                <div className="space-y-4">
                  <div>
                    <Label className="font-bold text-sm">Date Of Visiting</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <Input value={selectedVisitor?.date || ""} readOnly className="bg-muted/30" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Visitor Name*" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-bold text-sm">Gender</Label>
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="edit-gender" value="Male" checked={editForm.gender === "Male"} onChange={() => setEditForm({ ...editForm, gender: "Male" })} className="accent-primary" />
                        <span className="text-sm">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="edit-gender" value="Female" checked={editForm.gender === "Female"} onChange={() => setEditForm({ ...editForm, gender: "Female" })} className="accent-primary" />
                        <span className="text-sm">Female</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right: Contact & Day Pass */}
                <div className="space-y-4">
                  <Label className="font-bold text-sm">Contact Details</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input value={editForm.email === "---" ? "" : editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Select defaultValue="+92">
                      <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+92">Pak (+92)</SelectItem>
                        <SelectItem value="+1">US (+1)</SelectItem>
                        <SelectItem value="+44">UK (+44)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input value={editForm.mobile} onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })} placeholder="Mobile" />
                  </div>
                  <div>
                    <Label className="font-bold text-sm">Day Pass</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <Select value={editForm.dayPass} onValueChange={(val) => setEditForm({ ...editForm, dayPass: val })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {dayPassOptions.map((dp) => <SelectItem key={dp} value={dp}>{dp}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fee" className="mt-4">
              <div className="bg-muted/20 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <span className="text-muted-foreground">Total Fees:</span><span className="font-medium">{selectedVisitor?.totalFees.toLocaleString()}</span>
                  <span className="text-muted-foreground">Discount:</span><span className="font-medium">{selectedVisitor?.discount}</span>
                  <span className="text-muted-foreground">Tax:</span><span className="font-medium">{selectedVisitor?.tax}</span>
                  <span className="text-muted-foreground">Paid:</span><span className="font-medium">{selectedVisitor?.paid.toLocaleString()}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setViewOpen(false)}>← Go Back</Button>
            <Button onClick={openAddNew} className="bg-blue-600 hover:bg-blue-700 text-white">+ Add New (F2)</Button>
            <Button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 text-white">Update</Button>
            <Button onClick={openAddFee} className="bg-green-600 hover:bg-green-700 text-white">+ Add Fee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Update Dialog */}
      <AlertDialog open={confirmUpdate} onOpenChange={setConfirmUpdate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription className="flex items-center gap-2">
              <span className="text-warning text-lg">⚠</span> Are you sure you want to update Visitor?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>✕ No</AlertDialogCancel>
            <AlertDialogAction onClick={confirmUpdateVisitor}>✓ Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pay Fund / Add Fee Dialog */}
      <Dialog open={feeOpen} onOpenChange={setFeeOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pay Fund</DialogTitle>
            <DialogDescription>Add a fee for this visitor</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Date</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">{getTodayString()}</span>
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Visitor Type</Label>
              <Select value={feeForm.visitorType} onValueChange={(val) => setFeeForm({ ...feeForm, visitorType: val })}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Default">Default</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={feeForm.requiresTrainer} onCheckedChange={(c) => setFeeForm({ ...feeForm, requiresTrainer: !!c })} />
              <Label>Trainer</Label>
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Mode Of Payment</Label>
              <Select value={feeForm.paymentMode} onValueChange={(val) => setFeeForm({ ...feeForm, paymentMode: val })}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {paymentModes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Fee</Label>
              <Input type="number" value={feeForm.fee} onChange={(e) => setFeeForm({ ...feeForm, fee: e.target.value })} className="w-48 text-right" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Discount</Label>
              <Input type="number" value={feeForm.discount} onChange={(e) => setFeeForm({ ...feeForm, discount: e.target.value })} className="w-48 text-right" />
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <Label className="font-medium">Fee After Discount</Label>
              <span className="font-bold">{payFeeAfterDiscount}</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveFee} className="bg-green-600 hover:bg-green-700 text-white">💾 Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Visitor Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Visitor Details (Add New Day Pass / Walk In)</DialogTitle>
            <DialogDescription>Add a new visitor to the system</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left */}
            <div className="space-y-4">
              <div>
                <Label className="font-bold text-sm">Date Of Visiting</Label>
                <div className="flex items-center gap-2 mt-1">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <Input value={getTodayString()} readOnly className="bg-muted/30" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <Input value={newForm.name} onChange={(e) => setNewForm({ ...newForm, name: e.target.value })} placeholder="Visitor Name*" className={newErrors.name ? "border-destructive" : ""} />
                </div>
                {newErrors.name && <p className="text-destructive text-xs mt-1 ml-6">{newErrors.name}</p>}
              </div>
              <div>
                <Label className="font-bold text-sm">Gender</Label>
                <div className="flex items-center gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="new-gender" value="Male" checked={newForm.gender === "Male"} onChange={() => setNewForm({ ...newForm, gender: "Male" })} className="accent-primary" />
                    <span className="text-sm">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="new-gender" value="Female" checked={newForm.gender === "Female"} onChange={() => setNewForm({ ...newForm, gender: "Female" })} className="accent-primary" />
                    <span className="text-sm">Female</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <Label className="font-bold text-sm">Contact Details</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input value={newForm.email} onChange={(e) => setNewForm({ ...newForm, email: e.target.value })} placeholder="Email" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <Select defaultValue="+92">
                    <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+92">Pak (+92)</SelectItem>
                      <SelectItem value="+1">US (+1)</SelectItem>
                      <SelectItem value="+44">UK (+44)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input value={newForm.mobile} onChange={(e) => setNewForm({ ...newForm, mobile: e.target.value })} placeholder="Mobile" className={newErrors.mobile ? "border-destructive" : ""} />
                </div>
                {newErrors.mobile && <p className="text-destructive text-xs mt-1 ml-6">{newErrors.mobile}</p>}
              </div>

              <div>
                <Label className="font-bold text-sm">Visiting Fee</Label>
                <Select value={newForm.dayPass} onValueChange={(val) => setNewForm({ ...newForm, dayPass: val })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {dayPassOptions.map((dp) => <SelectItem key={dp} value={dp}>{dp}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 mt-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <Input type="number" value={newForm.fee} onChange={(e) => setNewForm({ ...newForm, fee: e.target.value })} />
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span>Does this day pass require a trainer?</span>
                  <Checkbox checked={newForm.requiresTrainer} onCheckedChange={(c) => setNewForm({ ...newForm, requiresTrainer: !!c })} />
                  <span>Trainer</span>
                </div>
              </div>

              <div>
                <Label className="font-bold text-sm">Discount</Label>
                <div className="flex items-center gap-2 mt-1">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <Input type="number" value={newForm.discount} onChange={(e) => setNewForm({ ...newForm, discount: e.target.value })} />
                </div>
              </div>

              <div>
                <Label className="font-bold text-sm">Total Fees</Label>
                <p className="text-lg font-bold mt-1">{feeAfterDiscount}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setAddOpen(false)}>← Go Back</Button>
            <Button onClick={saveNewVisitor} className="bg-green-600 hover:bg-green-700 text-white">💾 Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
