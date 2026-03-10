import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, X, User, Phone, Mail, CreditCard, MapPin, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

interface PackageOption {
  id: number;
  name: string;
  color: string;
  pkgFee: number;
  regFee: number;
  months: number;
  description: string;
  ageFrom: string;
  ageTo: string;
  members: number;
}

const packages: PackageOption[] = [
  { id: 1, name: "Monthly", color: "#9da32c", pkgFee: 5000, regFee: 4000, months: 1, description: "Package for One month. Befitted for those who want to do gym on monthly basis.", ageFrom: "", ageTo: "", members: 1 },
  { id: 2, name: "Family Package", color: "#a8e6cf", pkgFee: 6000, regFee: 7000, months: 1, description: "Package for Families.", ageFrom: "", ageTo: "", members: 2 },
  { id: 3, name: "Group Package", color: "#ef4444", pkgFee: 8500, regFee: 10000, months: 1, description: "Package for two persons.", ageFrom: "", ageTo: "", members: 2 },
  { id: 4, name: "Monthly Package", color: "#6b8e6b", pkgFee: 6000, regFee: 5000, months: 1, description: "", ageFrom: "", ageTo: "", members: 1 },
  { id: 5, name: "Monthly Package", color: "#d4918e", pkgFee: 2000, regFee: 1000, months: 1, description: "", ageFrom: "", ageTo: "", members: 1 },
  { id: 6, name: "Yearly Package Elite", color: "#7c8a99", pkgFee: 150000, regFee: 10000, months: 12, description: "", ageFrom: "", ageTo: "", members: 1 },
  { id: 7, name: "VIP Package", color: "#4a90d9", pkgFee: 5000, regFee: 1000, months: 2, description: "", ageFrom: "", ageTo: "", members: 1 },
  { id: 8, name: "Group", color: "#2dd4bf", pkgFee: 5000, regFee: 2500, months: 1, description: "", ageFrom: "", ageTo: "", members: 4 },
  { id: 9, name: "Monthly Premium", color: "#ef4444", pkgFee: 2000, regFee: 3000, months: 1, description: "For Age Group Between 18 & 40", ageFrom: "18", ageTo: "40", members: 1 },
  { id: 10, name: "Friends Pkg", color: "#f500ff", pkgFee: 5000, regFee: 2500, months: 3, description: "For Age Group Between 18 & 80", ageFrom: "18", ageTo: "80", members: 4 },
  { id: 11, name: "Starter Package", color: "#7c8a99", pkgFee: 2000, regFee: 2000, months: 1, description: "", ageFrom: "", ageTo: "", members: 1 },
  { id: 12, name: "Monthly Package One", color: "#ef4444", pkgFee: 10000, regFee: 1000, months: 2, description: "", ageFrom: "", ageTo: "", members: 1 },
];

export interface NewMemberData {
  name: string;
  mobile: string;
  email: string;
  membership: string;
  membershipNo: string;
  avatar: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMemberAdded?: (member: NewMemberData) => void;
}

export default function AddNewMemberDialog({ open, onOpenChange, onMemberAdded }: Props) {
  const [step, setStep] = useState<"packages" | "form">("packages");
  const [selectedPkg, setSelectedPkg] = useState<PackageOption | null>(null);
  const [searchPkg, setSearchPkg] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  // Form state
  const [form, setForm] = useState({
    membershipNo: "", name: "", gender: "Male", mobile: "", email: "",
    bloodGroup: "", height: "", weight: "", joiningDate: new Date().toISOString().split("T")[0],
    dob: "", idType: "CNIC", cnic: "", emergencyName: "", emergencyMobile: "",
    street: "", city: "", country: "Pakistan", comment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateForm = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const filteredPkgs = packages.filter((p) =>
    !searchPkg || p.name.toLowerCase().includes(searchPkg.toLowerCase())
  );

  const handleSelectPackage = (pkg: PackageOption) => {
    setSelectedPkg(pkg);
    setStep("form");
  };

  const handleUploadPhoto = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string);
        toast.success("Photo uploaded");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    toast.success("Photo removed");
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
        setAvatarPreview(canvas.toDataURL("image/png"));
        toast.success("Photo captured");
      }
    }
    stopCamera();
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOpen(false);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.mobile.trim()) errs.mobile = "Please enter your mobile number.";
    else if (!/^\+?\d{10,15}$/.test(form.mobile.replace(/\s/g, ""))) errs.mobile = "Phone number is not valid.";
    if (!form.membershipNo.trim()) errs.membershipNo = "Membership number is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceed = () => {
    if (!validate()) return;
    onMemberAdded?.({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      membership: selectedPkg?.name || "Monthly",
      membershipNo: form.membershipNo,
      avatar: avatarPreview,
    });
    toast.success(`Member ${form.name} registered with ${selectedPkg?.name} package`);
    handleClose();
  };

  const handleClose = () => {
    setStep("packages");
    setSelectedPkg(null);
    setAvatarPreview(null);
    setSearchPkg("");
    setForm({
      membershipNo: "", name: "", gender: "Male", mobile: "", email: "",
      bloodGroup: "", height: "", weight: "", joiningDate: new Date().toISOString().split("T")[0],
      dob: "", idType: "CNIC", cnic: "", emergencyName: "", emergencyMobile: "",
      street: "", city: "", country: "Pakistan", comment: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {step === "packages" ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Package</DialogTitle>
                <DialogDescription>Choose a membership package for the new member</DialogDescription>
              </DialogHeader>

              <div className="mb-4">
                <input
                  className="search-input w-full"
                  placeholder="Search by Package Name"
                  value={searchPkg}
                  onChange={(e) => setSearchPkg(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPkgs.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="rounded-lg overflow-hidden border border-border"
                    style={{ backgroundColor: pkg.color + "30" }}
                  >
                    <div className="bg-sidebar text-sidebar-foreground px-3 py-2 text-sm font-medium text-center">
                      {pkg.name} ({pkg.id})
                    </div>
                    <div className="p-4 text-center space-y-1">
                      <div className="text-2xl mx-auto mb-2">🏋️</div>
                      <p className="font-bold text-sm">RS {pkg.pkgFee.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">RECURES FOR {pkg.months} MONTH</p>
                      <p className="text-xs text-muted-foreground">(Admission Fee Rs{pkg.regFee.toLocaleString()} PKR)</p>
                      {pkg.description && (
                        <p className="text-xs text-muted-foreground">{pkg.description}</p>
                      )}
                    </div>
                    <button
                      className="w-full bg-sidebar text-sidebar-foreground py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                      onClick={() => handleSelectPackage(pkg)}
                    >
                      Next
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>New Member Registration — {selectedPkg?.name}</DialogTitle>
                <DialogDescription>Fill in the member details below</DialogDescription>
              </DialogHeader>

              {/* Profile Picture */}
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                <div className="w-36 h-44 rounded border border-border bg-muted/20 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full border-4 border-foreground mx-auto mb-1 flex items-center justify-center">
                        <User className="w-12 h-12 text-foreground" />
                      </div>
                    </div>
                  )}
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {/* Left */}
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium">Membership Number <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-muted-foreground">🏷️</span>
                      <Input value={form.membershipNo} onChange={(e) => updateForm("membershipNo", e.target.value)} placeholder="123" className={errors.membershipNo ? "border-destructive" : ""} />
                    </div>
                    {errors.membershipNo && <p className="text-destructive text-xs mt-1">{errors.membershipNo}</p>}
                  </div>
                  <div>
                    <Label className="font-medium">Name <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <Input value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Name *" className={errors.name ? "border-destructive" : ""} />
                    </div>
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label className="font-medium">Gender</Label>
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="new-member-gender" value="Male" checked={form.gender === "Male"} onChange={() => updateForm("gender", "Male")} className="accent-primary" />
                        <span className="text-sm">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="new-member-gender" value="Female" checked={form.gender === "Female"} onChange={() => updateForm("gender", "Female")} className="accent-primary" />
                        <span className="text-sm">Female</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Mobile <span className="text-destructive">*</span></Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Select defaultValue="+92">
                        <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+92">Pak (+92)</SelectItem>
                          <SelectItem value="+1">US (+1)</SelectItem>
                          <SelectItem value="+44">UK (+44)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input value={form.mobile} onChange={(e) => updateForm("mobile", e.target.value)} placeholder="Mobile *" className={errors.mobile ? "border-destructive" : ""} />
                    </div>
                    {errors.mobile && <p className="text-destructive text-xs mt-1">{errors.mobile}</p>}
                  </div>
                  <div>
                    <Label className="font-medium">Email</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <Input value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="Email" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Blood Group</Label>
                    <Select value={form.bloodGroup} onValueChange={(v) => updateForm("bloodGroup", v)}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select Blood Group" /></SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-medium">Height</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-muted-foreground text-sm">📏</span>
                      <Input value={form.height} onChange={(e) => updateForm("height", e.target.value)} placeholder="Enter Height" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Weight</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-muted-foreground text-sm">⚖️</span>
                      <Input value={form.weight} onChange={(e) => updateForm("weight", e.target.value)} placeholder="Enter Weight" />
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium">Joining Date</Label>
                    <Input type="date" className="mt-1" value={form.joiningDate} onChange={(e) => updateForm("joiningDate", e.target.value)} />
                  </div>
                  <div>
                    <Label className="font-medium">Date Of Birth</Label>
                    <Input type="date" className="mt-1" value={form.dob} onChange={(e) => updateForm("dob", e.target.value)} placeholder="Date Of Birth" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <label className="flex items-center gap-1 text-sm">
                        <input type="radio" checked={form.idType === "CNIC"} onChange={() => updateForm("idType", "CNIC")} /> CNIC
                      </label>
                      <label className="flex items-center gap-1 text-sm">
                        <input type="radio" checked={form.idType === "Passport"} onChange={() => updateForm("idType", "Passport")} /> Passport
                      </label>
                    </div>
                    <Label className="font-medium">{form.idType}</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <Input value={form.cnic} onChange={(e) => updateForm("cnic", e.target.value)} placeholder={form.idType} />
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Emergency Contact Name</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <Input value={form.emergencyName} onChange={(e) => updateForm("emergencyName", e.target.value)} placeholder="Emergency Contact Name" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Emergency Contact Mobile</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Select defaultValue="+92">
                        <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+92">Pak (+92)</SelectItem>
                          <SelectItem value="+1">US (+1)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input value={form.emergencyMobile} onChange={(e) => updateForm("emergencyMobile", e.target.value)} placeholder="Mobile *" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Address</Label>
                    <div className="space-y-2 mt-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <Input value={form.street} onChange={(e) => updateForm("street", e.target.value)} placeholder="Street" />
                        <Input value={form.city} onChange={(e) => updateForm("city", e.target.value)} placeholder="City" />
                        <Input value={form.country} onChange={(e) => updateForm("country", e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="font-medium">Comment</Label>
                    <Textarea value={form.comment} onChange={(e) => updateForm("comment", e.target.value)} placeholder="Enter Your Comments Here" className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">Press Shift + Enter To Go To Next Line.</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-3 mt-6">
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("packages")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Packages
                  </Button>
                  <Button onClick={handleProceed} className="bg-sidebar text-sidebar-foreground hover:opacity-90 px-8">
                    Proceed
                  </Button>
                </div>
                <button onClick={handleProceed} className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded text-sm font-medium flex items-center justify-center gap-2">
                  ▶ Register
                </button>
              </div>
            </>
          )}
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
