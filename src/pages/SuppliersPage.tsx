import { useState, useRef } from "react";
import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Search, X, XCircle, Edit, Plus, ArrowLeft, User, Phone, Mail, Calendar, AlertTriangle, Camera, Upload } from "lucide-react";

interface Supplier {
  id: number;
  name: string;
  mobile: string;
  email: string;
  gender: "Male" | "Female";
  avatar: string;
  createdDate: string;
  active: boolean;
}

const mockSuppliers: Supplier[] = [
  { id: 1, name: "Adeel Equipment Supplier", mobile: "03654545454", email: "adeel@equipment.com", gender: "Male", avatar: "/avatars/avatar-1.jpg", createdDate: "13/12/2023", active: true },
  { id: 2, name: "Ali Khan", mobile: "03331245787", email: "", gender: "Male", avatar: "", createdDate: "15/01/2024", active: true },
  { id: 3, name: "Muhammad Aqeel", mobile: "03454404345", email: "", gender: "Male", avatar: "", createdDate: "20/03/2024", active: true },
  { id: 4, name: "Osama Weight Supplier", mobile: "03228222425", email: "osama@weights.com", gender: "Male", avatar: "", createdDate: "05/06/2024", active: true },
  { id: 5, name: "Uzair Swimming Product Supplier", mobile: "03333333333", email: "", gender: "Male", avatar: "", createdDate: "10/08/2024", active: true },
  { id: 6, name: "Waqas Ali", mobile: "03331121212", email: "waqas@supplier.com", gender: "Male", avatar: "", createdDate: "22/09/2024", active: true },
];

const ITEMS_PER_PAGE = 8;

export default function SuppliersPage() {
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<Supplier | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Edit fields
  const [editName, setEditName] = useState("");
  const [editMobile, setEditMobile] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState<"Male" | "Female">("Male");
  const [editDate, setEditDate] = useState("");

  // Photo handling
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleUploadPhoto = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setAvatarPreview(ev.target?.result as string); toast({ title: "Photo uploaded" }); };
      reader.readAsDataURL(file);
    }
  };
  const handleRemovePhoto = () => { setAvatarPreview(null); toast({ title: "Photo removed" }); };
  const handleCaptureStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      setCameraOpen(true);
      setTimeout(() => { if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); } }, 100);
    } catch { toast({ title: "Unable to access camera", variant: "destructive" }); }
  };
  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) { ctx.drawImage(videoRef.current, 0, 0); setAvatarPreview(canvas.toDataURL("image/png")); toast({ title: "Photo captured" }); }
    }
    stopCamera();
  };
  const stopCamera = () => { streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null; setCameraOpen(false); };

  const filtered = suppliers.filter((s) =>
    s.active && s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const openDetail = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setEditName(supplier.name);
    setEditMobile(supplier.mobile);
    setEditEmail(supplier.email);
    setEditGender(supplier.gender);
    setEditDate(supplier.createdDate);
    setAvatarPreview(supplier.avatar || null);
    setDetailOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedSupplier) return;
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === selectedSupplier.id
          ? { ...s, name: editName, mobile: editMobile, email: editEmail, gender: editGender, createdDate: editDate }
          : s
      )
    );
    toast({ title: "Supplier Updated", description: `${editName} has been updated.` });
    setDetailOpen(false);
  };

  const handleDeactivate = () => {
    if (!selectedSupplier) return;
    setSuppliers((prev) =>
      prev.map((s) => (s.id === selectedSupplier.id ? { ...s, active: false } : s))
    );
    toast({ title: "Supplier Deactivated", description: `${selectedSupplier.name} has been deactivated.`, variant: "destructive" });
    setDetailOpen(false);
  };

  const handleDelete = (supplier: Supplier) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== supplier.id));
    toast({ title: "Supplier Deleted", description: `${supplier.name} has been removed.`, variant: "destructive" });
    setDeleteConfirm(null);
    if (paginated.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <PageContainer title="Suppliers" breadcrumbs={[{ label: "Purchasing", href: "/purchasing" }, { label: "Suppliers" }]}>
      {/* Search */}
      <div className="flex items-center justify-between mb-0 bg-sidebar-accent rounded-t-lg p-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search By Supplier Name"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-8 w-60 h-9 bg-background"
            />
          </div>
          {search && (
            <Button variant="ghost" size="icon" onClick={() => setSearch("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
      </div>

      {/* Table */}
      <div className="rounded-b-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar-accent">
              <TableHead className="font-semibold text-sidebar-accent-foreground">Name</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Image</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Mobile #</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No suppliers found.</TableCell>
              </TableRow>
            ) : (
              paginated.map((supplier) => (
                <TableRow key={supplier.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      {supplier.avatar ? (
                        <AvatarImage src={supplier.avatar} alt={supplier.name} />
                      ) : null}
                      <AvatarFallback className="bg-muted">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{supplier.mobile}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                        onClick={() => setDeleteConfirm(supplier)}
                      >
                        <XCircle className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-foreground hover:bg-accent rounded-full"
                        onClick={() => openDetail(supplier)}
                      >
                        <Edit className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1 py-3 bg-sidebar-accent">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>⏮</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>◀</Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="icon"
              className={`h-8 w-8 rounded-full ${currentPage === page ? "bg-primary text-primary-foreground" : "text-sidebar-accent-foreground"}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>▶</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>⏭</Button>
        </div>
      </div>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Are you sure you want to Delete?
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              <X className="h-4 w-4 mr-1" /> No
            </Button>
            <Button onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
              ✓ Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Supplier Detail / Edit Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
          </DialogHeader>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap bg-sidebar-accent p-3 rounded-lg">
            <Button variant="outline" size="sm" onClick={() => setDetailOpen(false)} className="bg-background">
              <ArrowLeft className="h-4 w-4 mr-1" /> Go Back
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleUpdate}>
              Update
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDeactivate}>
              Deactivate
            </Button>
          </div>

          {/* Profile picture section */}
          <div className="flex items-start gap-8 mt-4">
            <Avatar className="h-40 w-40">
              {selectedSupplier?.avatar ? (
                <AvatarImage src={selectedSupplier.avatar} alt={selectedSupplier.name} />
              ) : null}
              <AvatarFallback className="bg-muted text-4xl">
                <User className="h-20 w-20 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-sidebar-accent p-3 rounded-lg flex items-center justify-between">
                <span className="font-semibold text-sidebar-accent-foreground">Profile Picture</span>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">📷 Capture Photo</Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">⬆ Upload Photo</Button>
                  <Button size="sm" variant="destructive">✕ Remove Photo</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Details */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Supplier Details</h3>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Input value={editMobile} onChange={(e) => setEditMobile(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="Email" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Created Date</h3>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input value={editDate} onChange={(e) => setEditDate(e.target.value)} />
              </div>
              <h3 className="font-semibold">Gender</h3>
              <RadioGroup value={editGender} onValueChange={(v) => setEditGender(v as "Male" | "Female")} className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
