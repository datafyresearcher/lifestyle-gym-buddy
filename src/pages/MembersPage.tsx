import PageContainer from "@/components/PageContainer";
import MemberDetailDialog from "@/components/MemberDetailDialog";
import AddNewMemberDialog from "@/components/AddNewMemberDialog";
import { useState } from "react";
import { XCircle, Edit, Camera, User, Settings, Phone, Plus, List, LayoutGrid, CreditCard, Snowflake, RefreshCw, MessageCircle, X, CheckCircle, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const mockMembers = [
  // Page 1
  { id: 122, name: "Ahmed", phone: "+923325685258", email: "ahmed@mail.com", cardNo: "C-122", dueDate: "08th Apr", membership: "Monthly", avatar: "/avatars/avatar-1.jpg" },
  { id: 121, name: "Uzair Ali", phone: "+923437033333", email: "uzair@mail.com", cardNo: "C-121", dueDate: "03rd Apr", membership: "Family", avatar: "/avatars/avatar-8.jpg" },
  { id: 120, name: "Hifsa Ali", phone: "+923325682852", email: "hifsa@mail.com", cardNo: "C-120", dueDate: "03rd Apr", membership: "Monthly", avatar: "/avatars/avatar-2.jpg" },
  { id: 118, name: "Aman", phone: "+923335852554", email: "aman@mail.com", cardNo: "C-118", dueDate: "25th Apr", membership: "VIP", avatar: "/avatars/avatar-3.jpg" },
  { id: 117, name: "Ahmed", phone: "+923355748558", email: "ahmed2@mail.com", cardNo: "C-117", dueDate: "25th Mar", membership: "Monthly", avatar: "/avatars/avatar-5.jpg" },
  { id: 116, name: "Ayesha", phone: "+923458547552", email: "ayesha@mail.com", cardNo: "C-116", dueDate: "20th Mar", membership: "Group", avatar: "/avatars/avatar-4.jpg" },
  { id: 115, name: "Hussain Khan", phone: "+923325685258", email: "hussain@mail.com", cardNo: "C-115", dueDate: "15th Mar", membership: "Yearly", avatar: "/avatars/avatar-7.jpg" },
  { id: 114, name: "Hamza", phone: "+923437033333", email: "hamza@mail.com", cardNo: "C-114", dueDate: "10th Mar", membership: "Monthly", avatar: "/avatars/avatar-6.jpg" },
  // Page 2
  { id: 81, name: "Masood Ali", phone: "+923335585885", email: "masood@mail.com", cardNo: "C-81", dueDate: "12th Jan", membership: "Monthly", avatar: "/avatars/avatar-9.jpg" },
  { id: 80, name: "Mubbashir", phone: "+923164440333", email: "mubbashir@mail.com", cardNo: "C-80", dueDate: "11th Feb", membership: "Monthly", avatar: "/avatars/avatar-10.jpg" },
  { id: 79, name: "Moazzam", phone: "+923119877778", email: "moazzam@mail.com", cardNo: "C-79", dueDate: "10th Feb", membership: "VIP", avatar: "/avatars/avatar-11.jpg" },
  { id: 78, name: "Aftab", phone: "+923216549873", email: "aftab@mail.com", cardNo: "C-78", dueDate: "10th Jan", membership: "Monthly", avatar: "/avatars/avatar-12.jpg" },
  { id: 77, name: "Wasim", phone: "+923358548555", email: "wasim@mail.com", cardNo: "C-77", dueDate: "09th Jan", membership: "Monthly", avatar: "/avatars/avatar-13.jpg" },
  { id: 76, name: "Adeel", phone: "+923333585545", email: "adeel@mail.com", cardNo: "C-76", dueDate: "09th Jan", membership: "Monthly", avatar: "/avatars/avatar-14.jpg" },
  { id: 75, name: "Asad", phone: "+923335558578", email: "asad@mail.com", cardNo: "C-75", dueDate: "09th Feb", membership: "Family", avatar: "/avatars/avatar-15.jpg" },
  { id: 74, name: "Hamza", phone: "+923458677677", email: "hamza2@mail.com", cardNo: "C-74", dueDate: "09th Jan", membership: "Monthly", avatar: "/avatars/avatar-16.jpg" },
];

const ITEMS_PER_PAGE = 8;

type ConfirmAction = { type: "deactivate" | "freeze" | "sync"; member: typeof mockMembers[0] } | null;

export default function MembersPage() {
  const [view, setView] = useState<"card" | "list">("card");
  const [searchName, setSearchName] = useState("");
  const [searchMembership, setSearchMembership] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchCard, setSearchCard] = useState("");
  const [selectedMember, setSelectedMember] = useState<typeof mockMembers[0] | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [addNewOpen, setAddNewOpen] = useState(false);

  const filtered = mockMembers.filter((m) => {
    if (searchName && !m.name.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (searchMembership && !m.membership.toLowerCase().includes(searchMembership.toLowerCase())) return false;
    if (searchMobile && !m.phone.includes(searchMobile)) return false;
    if (searchEmail && !m.email.toLowerCase().includes(searchEmail.toLowerCase())) return false;
    if (searchCard && !m.cardNo.toLowerCase().includes(searchCard.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedMembers = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const clearSearch = () => {
    setSearchName("");
    setSearchMembership("");
    setSearchMobile("");
    setSearchEmail("");
    setSearchCard("");
  };

  const handleWhatsApp = (member: typeof mockMembers[0]) => {
    const rawPhone = member.phone.replace(/[^0-9]/g, "");
    const phone = rawPhone.startsWith("0") ? "92" + rawPhone.slice(1) : rawPhone;
    const message = `*Upcoming Payment Reminder*\n\n*Hi ${member.name}*, This is a friendly reminder that your *membership fee* is due soon. To avoid any service interruptions, we recommend completing the payment in advance.\n\nYou may pay online or visit the reception.\n\nThank you!\n*Lifestyle Reset*`;
    window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    const { type, member } = confirmAction;
    if (type === "deactivate") toast({ title: "Member Deactivated", description: `${member.name} has been deactivated.` });
    else if (type === "freeze") toast({ title: "Member Frozen", description: `${member.name} membership has been frozen.` });
    else if (type === "sync") toast({ title: "Synced", description: `${member.name} data has been synced.` });
    setConfirmAction(null);
  };

  const actionButtons = (member: typeof mockMembers[0]) => (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center gap-2 justify-center">
        <Tooltip><TooltipTrigger asChild>
          <button className="action-btn action-btn-danger" onClick={() => setConfirmAction({ type: "deactivate", member })}><XCircle className="w-3 h-3" /></button>
        </TooltipTrigger><TooltipContent>Deactivate Member</TooltipContent></Tooltip>

        <Tooltip><TooltipTrigger asChild>
          <button className="action-btn action-btn-primary" onClick={() => setSelectedMember(member)}><Edit className="w-3 h-3" /></button>
        </TooltipTrigger><TooltipContent>Edit Member</TooltipContent></Tooltip>

        <Tooltip><TooltipTrigger asChild>
          <button className="action-btn action-btn-info" onClick={() => setSelectedMember(member)}><CreditCard className="w-3 h-3" /></button>
        </TooltipTrigger><TooltipContent>Add Member Fee</TooltipContent></Tooltip>

        <Tooltip><TooltipTrigger asChild>
          <button className="action-btn" style={{ background: "hsl(40, 95%, 50%)", color: "white" }} onClick={() => setConfirmAction({ type: "freeze", member })}><Snowflake className="w-3 h-3" /></button>
        </TooltipTrigger><TooltipContent>Freeze Member</TooltipContent></Tooltip>

        <Tooltip><TooltipTrigger asChild>
          <button className="action-btn" style={{ background: "hsl(0, 0%, 75%)", color: "white" }} onClick={() => setConfirmAction({ type: "sync", member })}><RefreshCw className="w-3 h-3" /></button>
        </TooltipTrigger><TooltipContent>Sync Again</TooltipContent></Tooltip>

        <Tooltip><TooltipTrigger asChild>
          <button className="action-btn action-btn-success" onClick={() => handleWhatsApp(member)}><MessageCircle className="w-3 h-3" /></button>
        </TooltipTrigger><TooltipContent>Send WhatsApp Message</TooltipContent></Tooltip>
      </div>
    </TooltipProvider>
  );

  return (
    <PageContainer title="Members" breadcrumbs={[{ label: "Member Management" }, { label: "All Members" }]}>
      {/* Search Bar */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
          <input placeholder="Search By Name" className="search-input" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <input placeholder="Search By Membership" className="search-input" value={searchMembership} onChange={(e) => setSearchMembership(e.target.value)} />
          <input placeholder="Search By Mobile" className="search-input" value={searchMobile} onChange={(e) => setSearchMobile(e.target.value)} />
          <input placeholder="Search By Email" className="search-input" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
          <input placeholder="Search By Card Number" className="search-input" value={searchCard} onChange={(e) => setSearchCard(e.target.value)} />
          <Select>
            <SelectTrigger><SelectValue placeholder="Package Type: All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={clearSearch} className="bg-sidebar text-sidebar-accent-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
              <XCircle className="w-3 h-3" /> Clear Search
            </button>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2" onClick={() => setAddNewOpen(true)}>
              <Plus className="w-3 h-3" /> Add New (F2)
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setView("list")} className={`p-2 rounded ${view === "list" ? "bg-sidebar text-sidebar-accent-foreground" : "bg-muted"}`}>
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => setView("card")} className={`p-2 rounded ${view === "card" ? "bg-sidebar text-sidebar-accent-foreground" : "bg-muted"}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-bar mb-4">
        <button className="text-xs" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>|&lt;</button>
        <button className="text-xs" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>&lt;</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentPage === page ? "bg-primary text-primary-foreground" : ""}`}
          >
            {page}
          </button>
        ))}
        <button className="text-xs" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>&gt;</button>
        <button className="text-xs" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>&gt;|</button>
      </div>

      {/* Card View */}
      {view === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-card-header">
                <div className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-bold">1M</span>
                  <span className="font-medium">{member.name}-{member.id}</span>
                </div>
                <button className="bg-destructive text-destructive-foreground p-1 rounded">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div className="p-4">
                <div className="w-full flex items-center justify-center mb-3 py-2">
                  <img src={member.avatar} alt={member.name} className="w-32 h-40 object-cover rounded" />
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">{member.phone}</span>
                  <span>Due Dy: <strong>{member.dueDate}</strong></span>
                </div>
                {actionButtons(member)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Membership</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td className="flex items-center gap-2">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                    {member.name}
                  </td>
                  <td>{member.phone}</td>
                  <td>{member.membership}</td>
                  <td>{member.dueDate}</td>
                  <td>{actionButtons(member)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MemberDetailDialog
        member={selectedMember}
        open={selectedMember !== null}
        onOpenChange={(open) => { if (!open) setSelectedMember(null); }}
      />

      <AddNewMemberDialog
        open={addNewOpen}
        onOpenChange={setAddNewOpen}
        onMemberAdded={() => toast({ title: "Success", description: "New member has been registered." })}
      />

      {/* Confirmation Dialog */}
      <Dialog open={confirmAction !== null} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogDescription>Please confirm this action.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 py-4">
            <AlertTriangle className="w-6 h-6 text-[hsl(var(--warning))]" />
            <span>
              Are you sure you want to {confirmAction?.type === "deactivate" ? "DeActivate" : confirmAction?.type === "freeze" ? "Freeze" : "Sync"} member <strong>{confirmAction?.member.name}</strong>?
            </span>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmAction(null)}>
              <X className="w-4 h-4 mr-1" /> No
            </Button>
            <Button onClick={handleConfirm} className="bg-sidebar text-sidebar-foreground">
              <CheckCircle className="w-4 h-4 mr-1" /> Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
