import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, X, CheckCircle, Phone, Mail, User, MapPin, CreditCard, Calendar, Camera, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { MemberType } from "@/types/member";

interface MemberDetailDialogProps {
  member: MemberType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeactivate?: (id: number) => void;
  onFreeze?: (id: number) => void;
  onMemberUpdated?: (member: MemberType) => void;
}

export default function MemberDetailDialog({ member, open, onOpenChange, onDeactivate, onFreeze, onMemberUpdated }: MemberDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [confirmDialog, setConfirmDialog] = useState<"deactivate" | "freeze" | "sync" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fee form state
  const [feeMonth, setFeeMonth] = useState("March");
  const [feeYear, setFeeYear] = useState("2026");
  const [nextDueDate, setNextDueDate] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("1000");
  const [monthlyDiscount, setMonthlyDiscount] = useState("0");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [feeComment, setFeeComment] = useState("");
  const [showFeeDialog, setShowFeeDialog] = useState(false);

  // Editable form state - initialized from member
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCardNo, setEditCardNo] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editGender, setEditGender] = useState("Male");
  const [editIdType, setEditIdType] = useState("CNIC");
  const [editCnic, setEditCnic] = useState("");
  const [editDob, setEditDob] = useState("");
  const [editBloodGroup, setEditBloodGroup] = useState("");
  const [editHeight, setEditHeight] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editEmergencyName, setEditEmergencyName] = useState("");
  const [editEmergencyPhone, setEditEmergencyPhone] = useState("");
  const [editStreet, setEditStreet] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editCountry, setEditCountry] = useState("Pakistan");
  const [editComment, setEditComment] = useState("");
  const [editJoiningDate, setEditJoiningDate] = useState("");

  // Populate form when member changes
  useEffect(() => {
    if (member) {
      setEditName(member.name || "");
      setEditPhone(member.phone || "");
      setEditEmail(member.email || "");
      setEditCardNo(member.cardNo || "");
      setEditAvatar(member.avatar || "");
      setEditGender(member.gender || "Male");
      setEditIdType(member.idType || "CNIC");
      setEditCnic(member.cnic || "");
      setEditDob(member.dob || "");
      setEditBloodGroup(member.bloodGroup || "");
      setEditHeight(member.height || "");
      setEditWeight(member.weight || "");
      setEditEmergencyName(member.emergencyName || "");
      setEditEmergencyPhone(member.emergencyMobile || "");
      setEditStreet(member.street || "");
      setEditCity(member.city || "");
      setEditCountry(member.country || "Pakistan");
      setEditComment(member.comment || "");
      setEditJoiningDate(member.joiningDate || "");
    }
  }, [member]);

  if (!member) return null;

  const afterDiscount = Number(monthlyFee) - Number(monthlyDiscount);

  const handleWhatsAppMessage = () => {
    const rawPhone = member.phone.replace(/[^0-9]/g, "");
    const phone = rawPhone.startsWith("0") ? "92" + rawPhone.slice(1) : rawPhone.startsWith("92") ? rawPhone : "92" + rawPhone;
    const message = `*Upcoming Payment Reminder*\n\n*Hi ${member.name}*, This is a friendly reminder that your *membership fee for April, 2026* is due soon. To avoid any service interruptions, we recommend completing the payment in advance.\n\nYou may pay online or visit the reception.\n\nThank you!\n*Lifestyle Reset*`;
    const url = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditAvatar(ev.target?.result as string);
        toast({ title: "Photo Updated", description: "Profile photo has been updated." });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setEditAvatar("/placeholder.svg");
    toast({ title: "Photo Removed", description: "Profile photo has been removed." });
  };

  const handleSave = () => {
    if (!editName.trim()) {
      toast({ title: "Error", description: "Name is required.", variant: "destructive" });
      return;
    }
    if (!editPhone.trim()) {
      toast({ title: "Error", description: "Mobile number is required.", variant: "destructive" });
      return;
    }
    const updatedMember: MemberType = {
      ...member,
      name: editName,
      phone: editPhone,
      email: editEmail,
      cardNo: editCardNo,
      avatar: editAvatar,
      gender: editGender,
      idType: editIdType,
      cnic: editCnic,
      dob: editDob,
      bloodGroup: editBloodGroup,
      height: editHeight,
      weight: editWeight,
      emergencyName: editEmergencyName,
      emergencyMobile: editEmergencyPhone,
      street: editStreet,
      city: editCity,
      country: editCountry,
      comment: editComment,
      joiningDate: editJoiningDate,
    };
    onMemberUpdated?.(updatedMember);
  };

  const handleSaveFee = () => {
    toast({ title: "Fee Added", description: `Fee of ${afterDiscount} added for ${member.name}` });
    setShowFeeDialog(false);
  };

  const handleConfirmAction = () => {
    if (confirmDialog === "deactivate") {
      onDeactivate?.(member.id);
      toast({ title: "Member Deactivated", description: `${member.name} has been deactivated.` });
    } else if (confirmDialog === "freeze") {
      onFreeze?.(member.id);
      toast({ title: "Member Frozen", description: `${member.name} membership has been frozen.` });
    } else if (confirmDialog === "sync") {
      toast({ title: "Synced", description: `${member.name} data has been synced.` });
    }
    setConfirmDialog(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Top bar */}
          <div className="flex items-center gap-4 bg-muted p-3 rounded-lg text-sm mb-2">
            <div><span className="text-muted-foreground">Membership Number</span><div className="font-bold">{member.id}</div></div>
            <div><span className="text-muted-foreground">Name</span><div className="font-bold">{editName}</div></div>
            <div><span className="text-muted-foreground">Monthly Due Day</span><div className="font-bold">{member.dueDate}</div></div>
            <div><span className="text-muted-foreground">Days Left</span><div className="font-bold text-primary">Package will expire in 30 days.</div></div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="fee">Fee Details</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="settings">Member Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              {/* Profile photo */}
              <div className="flex gap-6 mb-6">
                <img src={editAvatar || "/placeholder.svg"} alt={editName} className="w-36 h-44 object-cover rounded" />
                <div className="flex items-center gap-2 flex-wrap self-start">
                  <span className="font-medium">Profile Picture</span>
                  <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleUploadPhoto}>
                    <Upload className="w-3 h-3 mr-1" /> Upload Photo
                  </Button>
                  <Button size="sm" variant="destructive" onClick={handleRemovePhoto}>
                    <X className="w-3 h-3 mr-1" /> Remove Photo
                  </Button>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <label className="text-sm font-medium">Name <span className="text-destructive">*</span></label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <Input value={editName} onChange={e => setEditName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Joining Date</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <Input type="date" value={editJoiningDate} onChange={e => setEditJoiningDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-1"><input type="radio" name="edit-gender" checked={editGender === "Male"} onChange={() => setEditGender("Male")} /> Male</label>
                    <label className="flex items-center gap-1"><input type="radio" name="edit-gender" checked={editGender === "Female"} onChange={() => setEditGender("Female")} /> Female</label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Date Of Birth</label>
                  <Input type="date" className="mt-1" value={editDob} onChange={e => setEditDob(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Mobile <span className="text-destructive">*</span></label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input value={editPhone} onChange={e => setEditPhone(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">{editIdType === "CNIC" ? "CNIC" : "Passport"}</label>
                  <div className="flex items-center gap-4 mb-1">
                    <label className="flex items-center gap-1 text-sm"><input type="radio" name="edit-idtype" checked={editIdType === "CNIC"} onChange={() => setEditIdType("CNIC")} /> CNIC</label>
                    <label className="flex items-center gap-1 text-sm"><input type="radio" name="edit-idtype" checked={editIdType === "Passport"} onChange={() => setEditIdType("Passport")} /> Passport</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder={editIdType === "CNIC" ? "CNIC" : "Passport"} value={editCnic} onChange={e => setEditCnic(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Emergency Contact Name</label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Emergency Contact Name" value={editEmergencyName} onChange={e => setEditEmergencyName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Blood Group</label>
                  <Select value={editBloodGroup} onValueChange={setEditBloodGroup}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select Blood Group" /></SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Emergency Contact Mobile</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Emergency Contact Mobile" value={editEmergencyPhone} onChange={e => setEditEmergencyPhone(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Height</label>
                  <Input placeholder="Enter Height" className="mt-1" value={editHeight} onChange={e => setEditHeight(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><Input placeholder="Street" value={editStreet} onChange={e => setEditStreet(e.target.value)} /></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><Input placeholder="City" value={editCity} onChange={e => setEditCity(e.target.value)} /></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><Input value={editCountry} onChange={e => setEditCountry(e.target.value)} /></div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Weight</label>
                  <Input placeholder="Enter Weight" className="mt-1" value={editWeight} onChange={e => setEditWeight(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Package Name <span className="text-destructive">*</span></label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input value={member.membership} readOnly className="bg-muted" />
                    <Button size="sm" className="bg-sidebar text-sidebar-foreground whitespace-nowrap">Change Package</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Card Details</label>
                  <Input value={editCardNo} onChange={e => setEditCardNo(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Comment</label>
                  <Textarea placeholder="Comment" className="mt-1" value={editComment} onChange={e => setEditComment(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button onClick={handleSave}>Save</Button>
              </div>
            </TabsContent>

            <TabsContent value="fee" className="mt-4">
              <div className="text-center text-muted-foreground py-8">
                <p className="mb-4">No fee records found for this member.</p>
                <Button onClick={() => setShowFeeDialog(true)}>Add Fee</Button>
              </div>
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-4">
              <div className="text-center text-muted-foreground py-8">No subscriptions found.</div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <div className="text-center text-muted-foreground py-8">Member settings coming soon.</div>
            </TabsContent>
          </Tabs>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            <Button variant="destructive" onClick={() => setConfirmDialog("deactivate")}>
              <X className="w-4 h-4 mr-1" /> DeActivate Member
            </Button>
            <Button onClick={() => setShowFeeDialog(true)} className="bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))] hover:bg-[hsl(var(--info))]/90">
              <CreditCard className="w-4 h-4 mr-1" /> Add Member Fee
            </Button>
            <Button onClick={() => setConfirmDialog("freeze")} className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] hover:bg-[hsl(var(--warning))]/90">
              Freeze Member
            </Button>
            <Button onClick={() => setConfirmDialog("sync")} variant="secondary">
              Sync Again
            </Button>
            <Button onClick={handleWhatsAppMessage} className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:bg-[hsl(var(--success))]/90">
              <Phone className="w-4 h-4 mr-1" /> Send WhatsApp Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog !== null} onOpenChange={() => setConfirmDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogDescription>Please confirm this action.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 py-4">
            <AlertTriangle className="w-6 h-6 text-[hsl(var(--warning))]" />
            <span>
              Are you sure you want to {confirmDialog === "deactivate" ? "DeActivate" : confirmDialog === "freeze" ? "Freeze" : "Sync"} member?
            </span>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmDialog(null)}>
              <X className="w-4 h-4 mr-1" /> No
            </Button>
            <Button onClick={handleConfirmAction} className="bg-sidebar text-sidebar-foreground">
              <CheckCircle className="w-4 h-4 mr-1" /> Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Fee Dialog */}
      <Dialog open={showFeeDialog} onOpenChange={setShowFeeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Fee</DialogTitle>
            <DialogDescription>Add fee for {member.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div><span className="text-sm font-medium">Package</span><Input value={member.membership} readOnly className="bg-muted mt-1 w-40" /></div>
              <span className="text-sm text-muted-foreground mt-5">No. of Month(s): 1</span>
            </div>
            <div className="text-sm"><strong>Trainer</strong> Not Assigned</div>
            <div className="flex gap-2">
              <Select value={feeMonth} onValueChange={setFeeMonth}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={feeYear} onValueChange={setFeeYear}>
                <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["2025","2026","2027"].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Next Due Date</label>
              <Input type="date" className="mt-1" value={nextDueDate} onChange={e => setNextDueDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Monthly Fee</label>
                <Input className="mt-1" value={monthlyFee} onChange={e => setMonthlyFee(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Monthly Discount</label>
                <Input className="mt-1" value={monthlyDiscount} onChange={e => setMonthlyDiscount(e.target.value)} />
              </div>
            </div>
            <div className="bg-muted p-3 rounded text-sm">
              <strong>After Discount:</strong> {afterDiscount}
            </div>
            <div>
              <label className="text-sm font-medium">Payment Mode</label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Comment</label>
              <Textarea className="mt-1" value={feeComment} onChange={e => setFeeComment(e.target.value)} placeholder="Comment" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowFeeDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveFee}>Save Fee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
