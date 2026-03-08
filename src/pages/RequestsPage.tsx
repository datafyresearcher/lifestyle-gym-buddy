import { useState, useRef } from "react";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, X, XCircle, Edit, AlertTriangle, User } from "lucide-react";

interface Request {
  id: string;
  requestNo: string;
  name: string;
  mobile: string;
  cnic: string;
  requestType: "Visitor" | "Registration";
  requestDate: string;
  requestStatus: "Pending" | "Approved" | "Rejected";
  email: string;
  visitorType: string;
  requireTrainer: boolean;
  visitorFee: number;
  visitorDiscount: number;
  totalFees: number;
  paymentMode: string;
  gender: "Male" | "Female";
}

const sampleRequests: Request[] = [
  { id: "1", requestNo: "RQ-12915", name: "Kainat Arshad", mobile: "3085773548", cnic: "", requestType: "Visitor", requestDate: "Feb 19, 2026, 9:43:59 PM", requestStatus: "Pending", email: "", visitorType: "Default", requireTrainer: false, visitorFee: 1000, visitorDiscount: 0, totalFees: 1000, paymentMode: "Cash - Reception", gender: "Female" },
  { id: "2", requestNo: "RQ-12914", name: "Ali Hassan", mobile: "3354557585", cnic: "", requestType: "Registration", requestDate: "Mar 3, 2026, 1:21:02 PM", requestStatus: "Pending", email: "", visitorType: "Default", requireTrainer: false, visitorFee: 1000, visitorDiscount: 0, totalFees: 1000, paymentMode: "Cash - Reception", gender: "Male" },
  { id: "3", requestNo: "RQ-12913", name: "Amna Ishfaq", mobile: "3085245255", cnic: "", requestType: "Registration", requestDate: "Mar 3, 2026, 1:20:14 PM", requestStatus: "Pending", email: "", visitorType: "Default", requireTrainer: false, visitorFee: 1000, visitorDiscount: 0, totalFees: 1000, paymentMode: "Cash - Reception", gender: "Female" },
  { id: "4", requestNo: "RQ-12912", name: "Saim Ali", mobile: "3335858547", cnic: "", requestType: "Visitor", requestDate: "Feb 19, 2026, 9:43:59 PM", requestStatus: "Pending", email: "", visitorType: "Default", requireTrainer: false, visitorFee: 1000, visitorDiscount: 0, totalFees: 1000, paymentMode: "Cash - Reception", gender: "Male" },
  { id: "5", requestNo: "RQ-12911", name: "Ahmed Hassan", mobile: "3325682852", cnic: "", requestType: "Registration", requestDate: "Mar 3, 2026, 12:49:09 PM", requestStatus: "Pending", email: "", visitorType: "Default", requireTrainer: false, visitorFee: 1000, visitorDiscount: 0, totalFees: 1000, paymentMode: "Cash - Reception", gender: "Male" },
  { id: "6", requestNo: "RQ-11324", name: "Ahmed Hassan", mobile: "3325682852", cnic: "", requestType: "Registration", requestDate: "Dec 4, 2025, 12:39:05 PM", requestStatus: "Approved", email: "", visitorType: "Default", requireTrainer: false, visitorFee: 1000, visitorDiscount: 0, totalFees: 1000, paymentMode: "Cash - Reception", gender: "Male" },
  { id: "7", requestNo: "RQ-11129", name: "Asad Ullah Khan", mobile: "+923336325984", cnic: "", requestType: "Visitor", requestDate: "Nov 20, 2025, 9:25:10 PM", requestStatus: "Approved", email: "", visitorType: "Default", requireTrainer: false, visitorFee: 1000, visitorDiscount: 0, totalFees: 1000, paymentMode: "Cash - Reception", gender: "Male" },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(sampleRequests);
  const [searchName, setSearchName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<Request | null>(null);
  const [invoiceRequest, setInvoiceRequest] = useState<Request | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const filtered = requests.filter((r) => {
    if (searchName && !r.name.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (filterStatus !== "All" && r.requestStatus !== filterStatus) return false;
    if (filterType !== "All" && r.requestType !== filterType) return false;
    return true;
  });

  const handleRejectClick = (req: Request) => {
    setRejectTarget(req);
    setRejectDialogOpen(true);
  };

  const confirmReject = () => {
    if (!rejectTarget) return;
    setRequests((prev) => prev.map((r) => r.id === rejectTarget.id ? { ...r, requestStatus: "Rejected" } : r));
    if (selectedRequest?.id === rejectTarget.id) {
      setSelectedRequest({ ...selectedRequest, requestStatus: "Rejected" });
    }
    setRejectDialogOpen(false);
    setRejectTarget(null);
  };

  const handleApprove = (req: Request) => {
    setRequests((prev) => prev.map((r) => r.id === req.id ? { ...r, requestStatus: "Approved" } : r));
    if (selectedRequest?.id === req.id) {
      setSelectedRequest({ ...req, requestStatus: "Approved" });
    }
    setInvoiceRequest(req);
  };

  const handleUpdate = () => {
    if (!selectedRequest) return;
    setRequests((prev) => prev.map((r) => r.id === selectedRequest.id ? selectedRequest : r));
    setEditMode(false);
  };

  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  // Detail/Edit View
  if (selectedRequest) {
    return (
      <PageContainer title="" breadcrumbs={[{ label: "Requests Management" }, { label: selectedRequest.requestType === "Visitor" ? "Visitor Details" : "Registration Details" }]}>
        <div className="mb-4">
          <Button variant="outline" size="sm" onClick={() => { setSelectedRequest(null); setEditMode(false); }}>
            ← Back to Requests
          </Button>
        </div>

        <h2 className="text-xl font-heading font-bold mb-6">
          {selectedRequest.requestType === "Visitor" ? "Visitor Details" : "Registration Details"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label className="font-bold">Request ID</Label>
              <Input value={selectedRequest.requestNo} readOnly className="mt-1 bg-muted/30" />
            </div>
            <div>
              <Label className="font-bold">Name <span className="text-destructive">*</span></Label>
              <Input value={selectedRequest.name} readOnly={!editMode} onChange={(e) => setSelectedRequest({ ...selectedRequest, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label className="font-bold">Mobile <span className="text-destructive">*</span></Label>
              <div className="flex gap-2 mt-1">
                <Select defaultValue="pk">
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="pk">Pak (+92)</SelectItem></SelectContent>
                </Select>
                <Input value={selectedRequest.mobile} readOnly={!editMode} onChange={(e) => setSelectedRequest({ ...selectedRequest, mobile: e.target.value })} />
              </div>
            </div>
            <div>
              <Label className="font-bold">Email <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Input value={selectedRequest.email} readOnly={!editMode} onChange={(e) => setSelectedRequest({ ...selectedRequest, email: e.target.value })} placeholder="Email" className="mt-1" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label className="font-bold">Request Type</Label>
              <Input value={selectedRequest.requestType} readOnly className="mt-1 bg-muted/30" />
            </div>
            <div>
              <Label className="font-bold">Visitor Type</Label>
              <Select value={selectedRequest.visitorType} disabled={!editMode} onValueChange={(v) => setSelectedRequest({ ...selectedRequest, visitorType: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Default">Default</SelectItem></SelectContent>
              </Select>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">Does this Day Pass require a trainer?</span>
                <Checkbox checked={selectedRequest.requireTrainer} disabled={!editMode} onCheckedChange={(v) => setSelectedRequest({ ...selectedRequest, requireTrainer: !!v })} />
                <span className="text-sm">Trainer</span>
              </div>
            </div>
            <div>
              <Label className="font-bold">Visitor Fee <span className="text-destructive">*</span></Label>
              <Input type="number" value={selectedRequest.visitorFee} readOnly={!editMode} onChange={(e) => {
                const fee = Number(e.target.value);
                setSelectedRequest({ ...selectedRequest, visitorFee: fee, totalFees: fee - selectedRequest.visitorDiscount });
              }} className="mt-1" />
            </div>
            <div>
              <Label className="font-bold">Visitor Discount</Label>
              <Input type="number" value={selectedRequest.visitorDiscount} readOnly={!editMode} onChange={(e) => {
                const disc = Number(e.target.value);
                setSelectedRequest({ ...selectedRequest, visitorDiscount: disc, totalFees: selectedRequest.visitorFee - disc });
              }} className="mt-1" />
            </div>
            <div>
              <Label className="font-bold">Total Fees</Label>
              <Input value={selectedRequest.totalFees} readOnly className="mt-1 bg-muted/30" />
            </div>
            <div>
              <Label className="font-bold">Mode Of Payment</Label>
              <Select value={selectedRequest.paymentMode} disabled={!editMode} onValueChange={(v) => setSelectedRequest({ ...selectedRequest, paymentMode: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash - Reception">Cash - Reception</SelectItem>
                  <SelectItem value="Online Transfer">Online Transfer</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-bold">Gender</Label>
              <RadioGroup value={selectedRequest.gender} disabled={!editMode} onValueChange={(v) => setSelectedRequest({ ...selectedRequest, gender: v as "Male" | "Female" })} className="flex gap-6 mt-1">
                <div className="flex items-center gap-2"><RadioGroupItem value="Male" id="male" /><Label htmlFor="male">Male</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="Female" id="female" /><Label htmlFor="female">Female</Label></div>
              </RadioGroup>
            </div>
            <div>
              <Label className="font-bold">Request Status</Label>
              <p className="mt-1 text-sm">● {selectedRequest.requestStatus}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <Button variant="destructive" size="sm" onClick={() => handleRejectClick(selectedRequest)}>
            <X className="w-3 h-3 mr-1" /> Reject
          </Button>
          <Button size="sm" className="bg-[hsl(var(--info))] hover:bg-[hsl(var(--info))]/90 text-white" onClick={editMode ? handleUpdate : () => setEditMode(true)}>
            {editMode ? "💾 Save" : "💾 Update"}
          </Button>
          {selectedRequest.requestStatus === "Pending" && (
            <Button size="sm" className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 text-white" onClick={() => handleApprove(selectedRequest)}>
              + Approve
            </Button>
          )}
        </div>

        {/* Reject Confirmation */}
        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader><DialogTitle className="font-heading">Confirmation</DialogTitle></DialogHeader>
            <div className="flex items-center gap-2 py-4">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span>Are you sure you want to reject request ?</span>
            </div>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setRejectDialogOpen(false)}><X className="w-3 h-3 mr-1" /> No</Button>
              <Button className="bg-[hsl(var(--sidebar-background))] text-white hover:opacity-90" onClick={confirmReject}>✓ Yes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Invoice Dialog */}
        <Dialog open={!!invoiceRequest} onOpenChange={() => setInvoiceRequest(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle className="font-heading">Invoice</DialogTitle></DialogHeader>
            <div ref={invoiceRef} className="border border-border rounded p-6 text-center space-y-4">
              <div>
                <h2 className="text-2xl font-heading font-bold">Lifestyle Reset</h2>
                <p className="text-sm text-muted-foreground">+92 304-2451070</p>
              </div>
              <div className="border border-border rounded overflow-hidden">
                <div className="grid grid-cols-2 border-b border-border">
                  <div className="p-2 font-bold text-sm border-r border-border">Invoice No</div>
                  <div className="p-2 font-bold text-sm">Created Date</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="p-2 text-sm border-r border-border">Inv#-{invoiceRequest?.name}-{today.getFullYear()}-{today.getMonth() + 1}-1</div>
                  <div className="p-2 text-sm">{dateStr}</div>
                </div>
              </div>
              <div className="border border-border rounded overflow-hidden">
                <div className="bg-muted p-2 font-bold text-sm text-center">Day Pass</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[hsl(var(--sidebar-background))] text-white">
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2">Fees</th>
                      <th className="p-2">Pay</th>
                      <th className="p-2">Status</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-2">{invoiceRequest?.name}</td>
                      <td className="p-2 text-center">{invoiceRequest?.visitorFee}</td>
                      <td className="p-2 text-center">0</td>
                      <td className="p-2 text-center">{invoiceRequest?.totalFees}</td>
                      <td className="p-2 text-xs">Visiting Fee - Paid</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="p-2 font-bold text-center">Total</td>
                      <td colSpan={2} className="p-2 font-bold text-center">{invoiceRequest?.totalFees}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="text-sm font-bold">Software Provided By Datafy Associates +92 304-2451070</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInvoiceRequest(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageContainer>
    );
  }

  // List View
  return (
    <PageContainer title="Requests Management" breadcrumbs={[{ label: "Requests Management" }]}>
      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div>
          <label className="text-xs text-muted-foreground">Search Request By Name</label>
          <Input placeholder="Search here!" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="w-40 h-9 text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Status</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Request Type</label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Visitor">Visitor</SelectItem>
              <SelectItem value="Registration">Registration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="icon" variant="outline" className="h-9 w-9"><Search className="w-4 h-4" /></Button>
        <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => { setSearchName(""); setFilterStatus("All"); setFilterType("All"); }}><X className="w-4 h-4" /></Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Request No</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>CNIC / Passport</th>
              <th>Request Type</th>
              <th>Request Date</th>
              <th>Request Status</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req) => (
              <tr key={req.id}>
                <td>{req.requestNo}</td>
                <td>{req.name}</td>
                <td>{req.mobile}</td>
                <td>{req.cnic || "—"}</td>
                <td>{req.requestType}</td>
                <td>{req.requestDate}</td>
                <td>{req.requestStatus}</td>
                <td>
                  <div className="w-10 h-10 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleRejectClick(req)} className="action-btn action-btn-danger" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => setSelectedRequest(req)} className="action-btn action-btn-info" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 0 && (
          <div className="pagination-bar mt-0 text-sm">
            <span>⏮</span> <span>◀</span> <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> <span>▶</span> <span>⏭</span>
          </div>
        )}
      </div>

      {/* Reject Confirmation Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle className="font-heading">Confirmation</DialogTitle></DialogHeader>
          <div className="flex items-center gap-2 py-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span>Are you sure you want to reject request ?</span>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}><X className="w-3 h-3 mr-1" /> No</Button>
            <Button className="bg-[hsl(var(--sidebar-background))] text-white hover:opacity-90" onClick={confirmReject}>✓ Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
