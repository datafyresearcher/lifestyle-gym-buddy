import PageContainer from "@/components/PageContainer";
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { User, Phone, Lock, Eye, EyeOff, Camera, Upload, X, Copy, Fingerprint, Plus } from "lucide-react";
import { toast } from "sonner";
import adminAvatar from "@/assets/admin-avatar.png";

// Mock petty cash data
const mockPettyCash = [
  { txNo: "T-12024-2040", amountAdded: 15000, prevBalance: 5000, newBalance: 20000, addedOn: "13/02/2024" },
  { txNo: "T-12024-1958", amountAdded: 5000, prevBalance: 0, newBalance: 5000, addedOn: "13/02/2024" },
  { txNo: "T-32025-133", amountAdded: 1000000, prevBalance: 0, newBalance: 1000000, addedOn: "11/04/2025" },
  { txNo: "T-112025-138", amountAdded: 1000000, prevBalance: 768880, newBalance: 1768880, addedOn: "27/11/2025" },
  { txNo: "T-02026-1816", amountAdded: 2000, prevBalance: 1755280, newBalance: 1757280, addedOn: "27/01/2026" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("details");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  // User Details form
  const [name, setName] = useState("Admin");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("admin");
  const [emailDomain] = useState("lifestylereset.app");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("+923354355243");
  const [countryCode, setCountryCode] = useState("+92");
  const [pettyCashLimit, setPettyCashLimit] = useState("0");
  const [memberLimit, setMemberLimit] = useState("30");

  // Card Details
  const [cardNumber, setCardNumber] = useState("40258170064742325");
  const [role, setRole] = useState("Admin");
  const [branch, setBranch] = useState("Lifestyle Reset");

  // Leave dialog
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");

  // Attendance Slots dialog
  const [slotOpen, setSlotOpen] = useState(false);

  const handleUploadPhoto = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string);
        toast.success("Profile photo updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    toast.success("Profile photo removed");
  };

  const handleCaptureStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      setCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch {
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        setAvatarPreview(dataUrl);
        toast.success("Photo captured successfully");
      }
    }
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
  };

  const handleUpdate = () => toast.success("Profile updated successfully");

  const handleAddLeave = () => {
    if (!leaveReason || !leaveFrom || !leaveTo) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Leave added successfully");
    setLeaveOpen(false);
    setLeaveReason("");
    setLeaveFrom("");
    setLeaveTo("");
  };

  const currentBalance = mockPettyCash[mockPettyCash.length - 1]?.newBalance || 0;

  return (
    <PageContainer title="Admin" breadcrumbs={[{ label: "User Management" }, { label: "All Users" }, { label: "Admin" }]}>
      {/* Top Action Bar */}
      <div className="bg-sidebar text-sidebar-foreground rounded-lg p-3 flex items-center gap-3 mb-4">
        <Button variant="ghost" className="text-sidebar-foreground hover:bg-sidebar-accent" onClick={() => window.history.back()}>
          ← Go Back
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleUpdate}>
          💾 Update
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          💰 Add Petty Cash
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-0">
          {["User Details", "Petty Cash", "Attendance Slots", "Leave Management", "User Authentication"].map((tab) => {
            const val = tab.toLowerCase().replace(/\s/g, "-");
            return (
              <TabsTrigger
                key={val}
                value={val === "user-details" ? "details" : val}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none px-4 py-2.5 text-sm"
              >
                {tab}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* User Details Tab */}
        <TabsContent value="details" className="mt-6">
          <div className="bg-card border border-border rounded-lg p-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <img
                src={avatarPreview || adminAvatar}
                alt="Admin"
                className="w-36 h-44 object-cover rounded"
              />
              <div className="flex items-center gap-3 flex-wrap bg-sidebar text-sidebar-foreground rounded-lg px-6 py-3">
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

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
              {/* Left Column */}
              <div className="space-y-5">
                <div>
                  <Label className="text-sm font-bold">User Code: 25001</Label>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-destructive text-xs">*</span>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label className="font-medium text-sm">Gender</Label>
                  <div className="flex items-center gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="profile-gender" value="Male" checked={gender === "Male"} onChange={() => setGender("Male")} className="accent-primary" />
                      <span className="text-sm">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="profile-gender" value="Female" checked={gender === "Female"} onChange={() => setGender("Female")} className="accent-primary" />
                      <span className="text-sm">Female</span>
                    </label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-destructive text-xs">*</span>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="w-32" />
                    <span className="text-sm text-muted-foreground">@ {emailDomain}</span>
                    <button onClick={() => { navigator.clipboard.writeText(`${email}@${emailDomain}`); toast.success("Email copied"); }}>
                      <Copy className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-destructive text-xs">*</span>
                    <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(password); toast.success("Password copied"); }}>
                      <Copy className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+92">Pak (+92)</SelectItem>
                        <SelectItem value="+1">US (+1)</SelectItem>
                        <SelectItem value="+44">UK (+44)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">💰</span>
                    <Input value={pettyCashLimit} onChange={(e) => setPettyCashLimit(e.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">👤</span>
                    <Input value={memberLimit} onChange={(e) => setMemberLimit(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Right Column - Card Details */}
              <div className="space-y-5">
                <Label className="text-sm font-bold">Card Details</Label>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Trainer">Trainer</SelectItem>
                        <SelectItem value="Receptionist">Receptionist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">🏢</span>
                    <Select value={branch} onValueChange={setBranch}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lifestyle Reset">Lifestyle Reset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Petty Cash Tab */}
        <TabsContent value="petty-cash" className="mt-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Current Balance: <span className="text-primary">{currentBalance.toLocaleString()}</span></h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Transaction No</th>
                    <th>Amount Added</th>
                    <th>Previous Petty Cash Balance</th>
                    <th>New Petty Cash Balance</th>
                    <th>Added on</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPettyCash.map((tx) => (
                    <tr key={tx.txNo}>
                      <td>{tx.txNo}</td>
                      <td>{tx.amountAdded.toLocaleString()}</td>
                      <td>{tx.prevBalance.toLocaleString()}</td>
                      <td className="text-green-600 font-medium">{tx.newBalance.toLocaleString()}</td>
                      <td>{tx.addedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Attendance Slots Tab */}
        <TabsContent value="attendance-slots" className="mt-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Attendance Slots</h3>
              <Button variant="destructive" size="sm" onClick={() => setSlotOpen(true)}>
                <Plus className="w-3 h-3 mr-1" /> Add Slots
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Day Off</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center text-muted-foreground py-6">No attendance slots found</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pagination-bar mt-4">
              <button className="text-xs">|&lt;</button>
              <button className="text-xs">&lt;</button>
              <button className="text-xs">&gt;</button>
              <button className="text-xs">&gt;|</button>
            </div>
          </div>
        </TabsContent>

        {/* Leave Management Tab */}
        <TabsContent value="leave-management" className="mt-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Add Leaves</h3>
              <Button variant="destructive" size="sm" onClick={() => setLeaveOpen(true)}>
                <Plus className="w-3 h-3 mr-1" /> Add Leaves
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Leave Reason</th>
                    <th>Leave From</th>
                    <th>Leave To</th>
                    <th>Entered By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center text-muted-foreground py-6">No leaves found</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pagination-bar mt-4">
              <button className="text-xs">|&lt;</button>
              <button className="text-xs">&lt;</button>
              <button className="text-xs">&gt;</button>
              <button className="text-xs">&gt;|</button>
            </div>
          </div>
        </TabsContent>

        {/* User Authentication Tab */}
        <TabsContent value="user-authentication" className="mt-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-6">User Authentication</h3>
            <div className="inline-block border border-border rounded-lg p-6 bg-muted/20">
              <h4 className="text-center font-bold text-lg mb-4">BioMetric</h4>
              <div className="flex justify-center mb-4">
                <Fingerprint className="w-16 h-16 text-destructive" />
              </div>
              <p className="text-center font-bold">
                <span className="text-destructive">✕</span> Not Registered
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Leave Dialog */}
      <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Leaves</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-medium">Leave Reason</Label>
              <Input placeholder="Enter Leave Reason" className="mt-1" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} />
            </div>
            <div>
              <Label className="font-medium">From</Label>
              <Input type="date" className="mt-1" value={leaveFrom} onChange={(e) => setLeaveFrom(e.target.value)} placeholder="Select From Date" />
            </div>
            <div>
              <Label className="font-medium">To</Label>
              <Input type="date" className="mt-1" value={leaveTo} onChange={(e) => setLeaveTo(e.target.value)} placeholder="Select To Date" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Entered By</Label>
              <span className="text-sm text-muted-foreground">Admin</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddLeave} className="bg-green-600 hover:bg-green-700 text-white">
              💾 Add Leaves
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Slot Dialog */}
      <Dialog open={slotOpen} onOpenChange={setSlotOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Attendance Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-medium">Title</Label>
              <Input placeholder="Slot Title" className="mt-1" />
            </div>
            <div>
              <Label className="font-medium">From</Label>
              <Input type="time" className="mt-1" />
            </div>
            <div>
              <Label className="font-medium">To</Label>
              <Input type="time" className="mt-1" />
            </div>
            <div>
              <Label className="font-medium">Day Off</Label>
              <Input placeholder="e.g. Sunday" className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => { toast.success("Slot added"); setSlotOpen(false); }} className="bg-green-600 hover:bg-green-700 text-white">
              💾 Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Camera Capture Dialog */}
      <Dialog open={cameraOpen} onOpenChange={(open) => { if (!open) stopCamera(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Capture Photo</DialogTitle>
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
    </PageContainer>
  );
}
