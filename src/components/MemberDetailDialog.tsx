import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, X, CheckCircle, Phone, Mail, User, MapPin, CreditCard, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Member {
  id: number;
  name: string;
  phone: string;
  email: string;
  cardNo: string;
  dueDate: string;
  membership: string;
  avatar: string;
}

interface MemberDetailDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeactivate?: (id: number) => void;
  onFreeze?: (id: number) => void;
}

export default function MemberDetailDialog({ member, open, onOpenChange, onDeactivate, onFreeze }: MemberDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [confirmDialog, setConfirmDialog] = useState<"deactivate" | "freeze" | "sync" | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
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

  // Detail form state
  const [gender, setGender] = useState("male");
  const [idType, setIdType] = useState("cnic");
  const [cnic, setCnic] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Pakistan");

  if (!member) return null;

  const afterDiscount = Number(monthlyFee) - Number(monthlyDiscount);

  const handleWhatsAppMessage = () => {
    const message = `*Upcoming Payment Reminder*\n\n*Hi ${member.name}*, This is a friendly reminder that your *membership fee for April, 2026* is due soon. To avoid any service interruptions, we recommend completing the payment in advance.\n\nYou may pay online or visit the reception.\n\nThank you!\n*Lifestyle Reset*`;
    const url = `https://api.whatsapp.com/send/?phone=${member.phone.replace(/[^0-9]/g, "")}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
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
            <div><span className="text-muted-foreground">Name</span><div className="font-bold">{member.name}</div></div>
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
                <img src={member.avatar} alt={member.name} className="w-36 h-44 object-cover rounded" />
                <div className="flex items-center gap-2 flex-wrap self-start">
                  <span className="font-medium">Profile Picture</span>
                  <Button size="sm" variant="default" className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]">Upload Photo</Button>
                  <Button size="sm" variant="destructive">Remove Photo</Button>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <label className="text-sm font-medium">Name <span className="text-destructive">*</span></label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <Input defaultValue={member.name} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Joining Date</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <Input type="date" defaultValue="2026-03-07" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-1"><input type="radio" name="gender" checked={gender === "male"} onChange={() => setGender("male")} /> Male</label>
                    <label className="flex items-center gap-1"><input type="radio" name="gender" checked={gender === "female"} onChange={() => setGender("female")} /> Female</label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Date Of Birth</label>
                  <Input type="date" className="mt-1" value={dob} onChange={e => setDob(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Mobile <span className="text-destructive">*</span></label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input defaultValue={member.phone} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">{idType === "cnic" ? "CNIC" : "Passport"}</label>
                  <div className="flex items-center gap-4 mb-1">
                    <label className="flex items-center gap-1 text-sm"><input type="radio" checked={idType === "cnic"} onChange={() => setIdType("cnic")} /> CNIC</label>
                    <label className="flex items-center gap-1 text-sm"><input type="radio" checked={idType === "passport"} onChange={() => setIdType("passport")} /> Passport</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder={idType === "cnic" ? "CNIC" : "Passport"} value={cnic} onChange={e => setCnic(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input defaultValue={member.email} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Emergency Contact Name</label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Emergency Contact Name" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Blood Group</label>
                  <Select value={bloodGroup} onValueChange={setBloodGroup}>
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
                    <Input placeholder="Emergency Contact Mobile" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Height</label>
                  <Input placeholder="Enter Height" className="mt-1" value={height} onChange={e => setHeight(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><Input placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} /></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><Input placeholder="City" value={city} onChange={e => setCity(e.target.value)} /></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><Input value={country} onChange={e => setCountry(e.target.value)} /></div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Weight</label>
                  <Input placeholder="Enter Weight" className="mt-1" value={weight} onChange={e => setWeight(e.target.value)} />
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
                  <Input defaultValue={member.cardNo} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Comment</label>
                  <Textarea placeholder="Comment" className="mt-1" />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button>Save</Button>
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
            <div className="flex items-center gap-4">
              <label className="text-sm text-muted-foreground w-32">Next Due Date</label>
              <Input type="date" value={nextDueDate} onChange={e => setNextDueDate(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-muted-foreground w-32">Monthly Fee</label>
              <Input type="number" value={monthlyFee} onChange={e => setMonthlyFee(e.target.value)} />
              <span className="text-sm">.00</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-muted-foreground w-32">Monthly Discount</label>
              <Input type="number" value={monthlyDiscount} onChange={e => setMonthlyDiscount(e.target.value)} />
              <span className="text-sm">.00</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-muted-foreground w-32 font-medium">After Discount Fee</label>
              <span className="text-sm">{monthlyFee} - {monthlyDiscount} (Discount) = <strong className="text-[hsl(var(--success))]">{afterDiscount}</strong></span>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm text-muted-foreground w-32">Mode Of Payment</label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash - Reception</SelectItem>
                  <SelectItem value="online">Online Transfer</SelectItem>
                  <SelectItem value="card">Card Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Comment</label>
              <Textarea className="mt-1" value={feeComment} onChange={e => setFeeComment(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveFee} className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
