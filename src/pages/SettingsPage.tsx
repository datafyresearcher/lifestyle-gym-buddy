import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Users, Building2, Building, Settings, Shield, Lock, ClipboardCheck, Plus, Pencil, Trash2, Search, Camera, Upload, X, User, Phone, Eye, EyeOff, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// ─── Add User Dialog ───
function AddUserDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "", gender: "Male", username: "", password: "", confirmPassword: "",
    mobile: "", salary: "", cardNumber: "", role: "", branch: "Main Branch",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const userCode = "25112";

  const updateForm = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));

  const handleUploadPhoto = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setAvatarPreview(ev.target?.result as string); toast.success("Photo uploaded"); };
      reader.readAsDataURL(file);
    }
  };
  const handleRemovePhoto = () => { setAvatarPreview(null); toast.success("Photo removed"); };

  const handleCaptureStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      setCameraOpen(true);
      setTimeout(() => { if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); } }, 100);
    } catch { toast.error("Unable to access camera. Please check permissions."); }
  };
  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) { ctx.drawImage(videoRef.current, 0, 0); setAvatarPreview(canvas.toDataURL("image/png")); toast.success("Photo captured"); }
    }
    stopCamera();
  };
  const stopCamera = () => { streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null; setCameraOpen(false); };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please Enter Your Name To Proceed.";
    if (!form.mobile.trim()) errs.mobile = "Please enter the mobile number.";
    if (!form.role) errs.role = "Please Select A Valid Role.";
    if (!form.password) errs.password = "Password is required.";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    toast.success(`User ${form.name} created successfully`);
    onOpenChange(false);
  };

  const handleClose = () => { stopCamera(); onOpenChange(false); };

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new system user</DialogDescription>
          </DialogHeader>

          {/* Top bar */}
          <div className="flex items-center gap-2 bg-sidebar text-sidebar-foreground rounded-lg px-4 py-2">
            <Button size="sm" variant="outline" className="bg-sidebar-accent text-sidebar-accent-foreground" onClick={handleClose}>
              <ArrowLeft className="w-3 h-3 mr-1" /> Go Back
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <Plus className="w-3 h-3 mr-1" /> New (F2)
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSave}>
              <Save className="w-3 h-3 mr-1" /> Save
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details">
            <TabsList className="bg-muted">
              <TabsTrigger value="details">User Details</TabsTrigger>
              <TabsTrigger value="auth">User Authentication</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-4">
              {/* Profile Picture Section */}
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-40 h-44 rounded border border-border bg-muted/20 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-28 h-28 rounded-full border-4 border-foreground flex items-center justify-center">
                      <User className="w-14 h-14 text-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-wrap bg-sidebar text-sidebar-foreground rounded-lg px-6 py-3 flex-1">
                  <span className="font-medium text-sm">Profile Picture</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleCaptureStart}>
                    <Camera className="w-3 h-3 mr-1" /> Capture Photo
                  </Button>
                  <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleUploadPhoto}>
                    <Upload className="w-3 h-3 mr-1" /> Upload Photo
                  </Button>
                  <Button size="sm" variant="destructive" onClick={handleRemovePhoto}>
                    <X className="w-3 h-3 mr-1" /> Remove Photo
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <p className="font-semibold text-sm text-foreground">User Code: {userCode}</p>
                  <div>
                    <Label className="font-medium">Name <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <Input value={form.name} onChange={e => updateForm("name", e.target.value)} placeholder="Name" className={errors.name ? "border-destructive" : ""} />
                    </div>
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label className="font-medium">Gender</Label>
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="user-gender" value="Male" checked={form.gender === "Male"} onChange={() => updateForm("gender", "Male")} className="accent-primary" />
                        <span className="text-sm">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="user-gender" value="Female" checked={form.gender === "Female"} onChange={() => updateForm("gender", "Female")} className="accent-primary" />
                        <span className="text-sm">Female</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Username <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <Input value={form.username} onChange={e => updateForm("username", e.target.value)} placeholder="Username" className="flex-1" />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">@ lifestylereset.com</span>
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Password <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-2 mt-1 relative">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <Input type={showPassword ? "text" : "password"} value={form.password} onChange={e => updateForm("password", e.target.value)} placeholder="Password" className={errors.password ? "border-destructive pr-10" : "pr-10"} />
                      <button type="button" className="absolute right-3 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <Label className="font-medium">Confirm Password <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-2 mt-1 relative">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <Input type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={e => updateForm("confirmPassword", e.target.value)} placeholder="Confirm Password" className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"} />
                      <button type="button" className="absolute right-3 text-muted-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <div>
                    <Label className="font-medium">Mobile</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Select defaultValue="+92">
                        <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+92">Pak (+92)</SelectItem>
                          <SelectItem value="+1">US (+1)</SelectItem>
                          <SelectItem value="+44">UK (+44)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input value={form.mobile} onChange={e => updateForm("mobile", e.target.value)} placeholder="Mobile" className={errors.mobile ? "border-destructive" : ""} />
                    </div>
                    {errors.mobile && <p className="text-destructive text-xs mt-1">{errors.mobile}</p>}
                  </div>
                  <div>
                    <Label className="font-medium">Salary</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-muted-foreground text-sm">💰</span>
                      <Input value={form.salary} onChange={e => updateForm("salary", e.target.value)} placeholder="Salary" />
                    </div>
                  </div>
                </div>

                {/* Right Column - Card Details */}
                <div className="space-y-4">
                  <p className="font-semibold text-sm text-foreground">Card Details</p>
                  <div>
                    <Label className="font-medium">Card Number</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <Input value={form.cardNumber} onChange={e => updateForm("cardNumber", e.target.value)} placeholder="Card Number" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Select Role <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <Select value={form.role} onValueChange={v => updateForm("role", v)}>
                        <SelectTrigger className={errors.role ? "border-destructive" : ""}><SelectValue placeholder="Select Role" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Trainer">Trainer</SelectItem>
                          <SelectItem value="Operator">Operator</SelectItem>
                          <SelectItem value="Receptionist">Receptionist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.role && <p className="text-destructive text-xs mt-1">{errors.role}</p>}
                  </div>
                  <div>
                    <Label className="font-medium">Branch</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <Select value={form.branch} onValueChange={v => updateForm("branch", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Main Branch">Main Branch</SelectItem>
                          <SelectItem value="North Branch">North Branch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="auth" className="mt-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground">User authentication settings and two-factor authentication options will appear here.</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Require 2FA for this user</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground text-sm">Force Password Reset</p>
                      <p className="text-xs text-muted-foreground">User must change password on next login</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Camera Dialog */}
      <Dialog open={cameraOpen} onOpenChange={(o) => { if (!o) stopCamera(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Capture Photo</DialogTitle>
            <DialogDescription>Position yourself and click Capture</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <video ref={videoRef} className="w-full rounded-lg border border-border" autoPlay muted playsInline />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-3">
              <Button onClick={handleCapturePhoto} className="bg-green-600 hover:bg-green-700 text-white">
                <Camera className="w-4 h-4 mr-1" /> Capture
              </Button>
              <Button variant="outline" onClick={stopCamera}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── User Management ───
function UserManagement() {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const users = [
    { id: 1, name: "Admin", code: "25001", email: "admin@lifestylereset.com", role: "Admin", status: "Active", avatar: "/avatars/avatar-1.jpg" },
    { id: 2, name: "Kashif Khan", code: "25002", email: "trainer@lifestylereset.com", role: "Trainer", status: "Active", avatar: "/avatars/avatar-2.jpg" },
    { id: 3, name: "Operator", code: "25003", email: "operator@lifestylereset.com", role: "Operator", status: "Inactive", avatar: "/avatars/avatar-3.jpg" },
    { id: 4, name: "Asad", code: "25006", email: "admin2@lifestylereset.com", role: "Admin", status: "Active", avatar: "/avatars/avatar-4.jpg" },
    { id: 5, name: "Wasi Ahmed", code: "25068", email: "wasi@lifestylereset.com", role: "Trainer", status: "Inactive", avatar: "/avatars/avatar-5.jpg" },
    { id: 6, name: "Ali Khan", code: "25107", email: "ali@lifestylereset.com", role: "Trainer", status: "Inactive", avatar: "/avatars/avatar-6.jpg" },
  ];
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const filtered = users.filter(u => {
    const matchName = !searchName || u.name.toLowerCase().includes(searchName.toLowerCase());
    const matchEmail = !searchEmail || u.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchStatus = activeTab === "active" ? u.status === "Active" : u.status === "Inactive";
    return matchName && matchEmail && matchStatus;
  });

  return (
    <div className="space-y-4">
      {/* Active / Inactive tabs */}
      <div className="flex items-center gap-4">
        <button onClick={() => setActiveTab("active")} className={`text-sm font-medium pb-1 border-b-2 ${activeTab === "active" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>Active</button>
        <button onClick={() => setActiveTab("inactive")} className={`text-sm font-medium pb-1 border-b-2 ${activeTab === "inactive" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>In-Active</button>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Input placeholder="Search By Name" value={searchName} onChange={e => setSearchName(e.target.value)} className="w-48" />
        <Input placeholder="Search By Email" value={searchEmail} onChange={e => setSearchEmail(e.target.value)} className="w-48" />
        <Button variant="outline" size="sm" onClick={() => { setSearchName(""); setSearchEmail(""); }}>
          <Search className="w-3 h-3 mr-1" /> Clear Search
        </Button>
        <Button size="sm" onClick={() => setAddUserOpen(true)}>
          <Plus className="w-3 h-3 mr-1" /> Add New (F2)
        </Button>
        <div className="ml-auto flex gap-1">
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => setViewMode("list")}>☰</Button>
          <Button variant={viewMode === "card" ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => setViewMode("card")}>◉</Button>
        </div>
      </div>

      {/* Card View */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(u => (
            <Card key={u.id} className="overflow-hidden">
              <div className="bg-sidebar text-sidebar-foreground text-center py-2 text-sm font-medium">
                {u.name}-{u.code}
              </div>
              <CardContent className="flex flex-col items-center py-4 space-y-2">
                <img src={u.avatar} alt={u.name} className="w-20 h-24 object-cover rounded" />
                <p className="font-medium text-sm text-foreground">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
                <p className="text-xs text-muted-foreground">{u.role}</p>
                <div className="flex items-center gap-3 pt-2">
                  <button className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${u.status === "Active" ? "bg-green-500" : "bg-destructive"}`}>
                    {u.status === "Active" ? "●" : "●"}
                  </button>
                  <Button variant="ghost" size="icon" className="h-6 w-6"><Pencil className="w-3 h-3" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(u => (
                  <TableRow key={u.id}>
                    <TableCell><img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" /></TableCell>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{u.code}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                    <TableCell><Badge variant={u.status === "Active" ? "default" : "destructive"}>{u.status}</Badge></TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <AddUserDialog open={addUserOpen} onOpenChange={setAddUserOpen} />
    </div>
  );
}
// ─── Branch Management ───
function BranchManagement() {
  const branches = [
    { id: 1, name: "Demo Gym F11 Markaz", mobile: "+923325478182", email: "demogym@gmail.com", company: "Demo Gym", license: "(6 days remaining)" },
    { id: 2, name: "Raiwind LDA, Lahore", mobile: "+92-304-2451070", email: "raiwind@lifestylereset.com", company: "Lifestyle Reset", license: "Active" },
  ];
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Branches</h3>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-sidebar">
                <TableHead className="text-sidebar-foreground">Branch Name</TableHead>
                <TableHead className="text-sidebar-foreground">Mobile</TableHead>
                <TableHead className="text-sidebar-foreground">Email</TableHead>
                <TableHead className="text-sidebar-foreground">Company Name</TableHead>
                <TableHead className="text-sidebar-foreground">License</TableHead>
                <TableHead className="text-sidebar-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.name}</TableCell>
                  <TableCell>{b.mobile}</TableCell>
                  <TableCell>{b.email}</TableCell>
                  <TableCell>{b.company}</TableCell>
                  <TableCell>{b.license}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 bg-sidebar text-sidebar-foreground rounded py-2">
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">⏮</button>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">◀</button>
        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">▶</button>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">⏭</button>
      </div>
    </div>
  );
}
// ─── Company Management ───
function CompanyManagement() {
  const [searchName, setSearchName] = useState("");
  const companies = [
    { id: 1, name: "Lifestyle Reset Gym", contact: "Admin", mobile: "+92-304-2451070", email: "admin@gmail.com" },
  ];
  const filtered = companies.filter(c => !searchName || c.name.toLowerCase().includes(searchName.toLowerCase()));
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Companies</h3>
      {/* Search bar */}
      <div className="flex items-center gap-2 bg-sidebar text-sidebar-foreground rounded-t-lg px-4 py-2">
        <div className="space-y-0.5">
          <span className="text-xs text-sidebar-foreground/70">Search By Name</span>
          <Input placeholder="Search here!" value={searchName} onChange={e => setSearchName(e.target.value)} className="h-7 w-40 bg-transparent border-b border-sidebar-foreground/30 rounded-none text-sidebar-foreground placeholder:text-sidebar-foreground/50 text-sm px-0 focus-visible:ring-0" />
        </div>
        <Button variant="ghost" size="icon" className="text-sidebar-foreground"><Search className="w-4 h-4" /></Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-sidebar">
                <TableHead className="text-sidebar-foreground">Company Name</TableHead>
                <TableHead className="text-sidebar-foreground">Contact Person</TableHead>
                <TableHead className="text-sidebar-foreground">Mobile</TableHead>
                <TableHead className="text-sidebar-foreground">Email</TableHead>
                <TableHead className="text-sidebar-foreground text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.contact}</TableCell>
                  <TableCell>{c.mobile}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 bg-sidebar text-sidebar-foreground rounded py-2">
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">⏮</button>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">◀</button>
        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">▶</button>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">⏭</button>
      </div>
    </div>
  );
}
// ─── Global Settings ───
function GlobalSettings() {
  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center gap-2 bg-sidebar text-sidebar-foreground rounded-lg px-4 py-2">
        <Button size="sm" variant="outline" className="bg-sidebar-accent text-sidebar-accent-foreground">
          <ArrowLeft className="w-3 h-3 mr-1" /> Back
        </Button>
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
          <Save className="w-3 h-3 mr-1" /> Update
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-semibold">Default Due Date</Label>
              <Input type="date" placeholder="Due Date" />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Gym Starting Date</Label>
              <Input type="date" placeholder="Gym Starting Date" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// ─── Roles Management ───
function RolesManagement() {
  const roles = [
    { id: 1, name: "Admin", users: 1, permissions: "Full Access" },
    { id: 2, name: "Manager", users: 2, permissions: "Members, Reports, Sales" },
    { id: 3, name: "Trainer", users: 5, permissions: "Members, Attendance, Training" },
    { id: 4, name: "Receptionist", users: 3, permissions: "Members, Visitors, Attendance" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Roles</h3>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Role</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Users Assigned</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell><Badge variant="secondary">{r.users}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-sm">{r.permissions}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Permissions Management ───
function PermissionsManagement() {
  const [searchPage, setSearchPage] = useState("");
  const pages = [
    { name: "Member Management", url: "Member Management", type: "/members" },
    { name: "Activity Logs", url: "Activity Logs", type: "/activity-logs" },
    { name: "Visitors Management", url: "Visitors Management", type: "/visitors" },
    { name: "Trainer Management", url: "Trainer Management", type: "/trainers" },
    { name: "Enquiry Management", url: "Enquiry Management", type: "/enquiry" },
    { name: "Attendance", url: "Attendance", type: "/attendance" },
    { name: "Package Builder", url: "Package Builder", type: "/package-Builders" },
    { name: "Upcoming Dues", url: "Reports", type: "/reports" },
    { name: "User Management", url: "Setting", type: "/settings" },
    { name: "Roles Management", url: "Setting", type: "/settings/roles" },
    { name: "Branch Management", url: "Setting", type: "/settings/branches" },
  ];
  const filtered = pages.filter(p => !searchPage || p.name.toLowerCase().includes(searchPage.toLowerCase()));
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Users Role Permissions</h3>
      {/* Search bar */}
      <div className="flex items-center justify-between bg-sidebar text-sidebar-foreground rounded-t-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="space-y-0.5">
            <span className="text-xs text-sidebar-foreground/70">Search By Page Name</span>
            <Input placeholder="Search here!" value={searchPage} onChange={e => setSearchPage(e.target.value)} className="h-7 w-40 bg-transparent border-b border-sidebar-foreground/30 rounded-none text-sidebar-foreground placeholder:text-sidebar-foreground/50 text-sm px-0 focus-visible:ring-0" />
          </div>
          <Button variant="ghost" size="icon" className="text-sidebar-foreground"><Search className="w-4 h-4" /></Button>
        </div>
        <Button variant="ghost" size="icon" className="text-sidebar-foreground"><Users className="w-4 h-4" /></Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-sidebar">
                <TableHead className="text-sidebar-foreground">Page Name</TableHead>
                <TableHead className="text-sidebar-foreground">Page Url</TableHead>
                <TableHead className="text-sidebar-foreground">Page Type</TableHead>
                <TableHead className="text-sidebar-foreground text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p, i) => (
                <TableRow key={i} className={i % 2 === 1 ? "bg-muted/30" : ""}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.url}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" className="text-destructive"><X className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Attendance Management ───
function AttendanceManagement() {
  const [searchId, setSearchId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Employees Attendance</h3>
      {/* Search bar */}
      <div className="flex items-center gap-3 bg-sidebar text-sidebar-foreground rounded-t-lg px-4 py-2">
        <div className="space-y-0.5">
          <span className="text-xs text-sidebar-foreground/70">Search Employee By ID</span>
          <Input placeholder="Search here!" value={searchId} onChange={e => setSearchId(e.target.value)} className="h-7 w-36 bg-transparent border-b border-sidebar-foreground/30 rounded-none text-sidebar-foreground placeholder:text-sidebar-foreground/50 text-sm px-0 focus-visible:ring-0" />
        </div>
        <div className="space-y-0.5">
          <span className="text-xs text-sidebar-foreground/70">Date</span>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-7 w-36 bg-transparent border-b border-sidebar-foreground/30 rounded-none text-sidebar-foreground text-sm px-0 focus-visible:ring-0" />
        </div>
        <Button variant="ghost" size="icon" className="text-sidebar-foreground"><Search className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="text-sidebar-foreground"><X className="w-4 h-4" /></Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-sidebar">
                <TableHead className="text-sidebar-foreground">User No</TableHead>
                <TableHead className="text-sidebar-foreground">Name</TableHead>
                <TableHead className="text-sidebar-foreground">Mobile</TableHead>
                <TableHead className="text-sidebar-foreground">Slot</TableHead>
                <TableHead className="text-sidebar-foreground">CheckIn Time</TableHead>
                <TableHead className="text-sidebar-foreground">Checkout Time</TableHead>
                <TableHead className="text-sidebar-foreground">Attendance Date</TableHead>
                <TableHead className="text-sidebar-foreground text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">No attendance records found</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 bg-sidebar text-sidebar-foreground rounded py-2">
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">⏮</button>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">◀</button>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">▶</button>
        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm">⏭</button>
      </div>
    </div>
  );
}

// ─── Route-based Settings Page ───
const settingsRoutes: Record<string, { label: string; component: React.FC }> = {
  users: { label: "User Management", component: UserManagement },
  branches: { label: "Branch Management", component: BranchManagement },
  company: { label: "Company Management", component: CompanyManagement },
  global: { label: "Global Settings", component: GlobalSettings },
  roles: { label: "Roles Management", component: RolesManagement },
  permissions: { label: "Permissions Management", component: PermissionsManagement },
  attendance: { label: "Attendance Management", component: AttendanceManagement },
};

export default function SettingsPage() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const section = pathParts[2] || "users";
  const route = settingsRoutes[section] || settingsRoutes.users;
  const Component = route.component;

  return (
    <PageContainer title={route.label} breadcrumbs={[{ label: "Settings" }, { label: route.label }]}>
      <Component />
    </PageContainer>
  );
}
