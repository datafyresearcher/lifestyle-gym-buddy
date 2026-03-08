import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { XCircle, Edit, List, LayoutGrid, Search, Eraser, CheckCircle, RefreshCw, Phone, MessageSquare } from "lucide-react";
import MemberDetailDialog from "@/components/MemberDetailDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const mockInactiveMembers = [
  { id: 110, name: "Farhan", phone: "+923001234567", email: "farhan@mail.com", cardNo: "C-110", expiredDate: "01st Feb", membership: "Monthly", avatar: "/avatars/avatar-1.jpg" },
  { id: 108, name: "Saima", phone: "+923119876543", email: "saima@mail.com", cardNo: "C-108", expiredDate: "15th Jan", membership: "Yearly", avatar: "/avatars/avatar-2.jpg" },
  { id: 105, name: "Bilal Khan", phone: "+923215556677", email: "bilal@mail.com", cardNo: "C-105", expiredDate: "20th Dec", membership: "Monthly", avatar: "/avatars/avatar-3.jpg" },
  { id: 103, name: "Zara", phone: "+923331112233", email: "zara@mail.com", cardNo: "C-103", expiredDate: "10th Dec", membership: "Family", avatar: "/avatars/avatar-4.jpg" },
  { id: 101, name: "Kamran", phone: "+923451239876", email: "kamran@mail.com", cardNo: "C-101", expiredDate: "05th Nov", membership: "VIP", avatar: "/avatars/avatar-7.jpg" },
];

export default function InactiveMembersPage() {
  const [members, setMembers] = useState(mockInactiveMembers);
  const [view, setView] = useState<"card" | "list">("list");
  const [searchName, setSearchName] = useState("");
  const [searchMembership, setSearchMembership] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchCard, setSearchCard] = useState("");

  // Dialog states
  const [selectedMember, setSelectedMember] = useState<typeof mockInactiveMembers[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activateConfirm, setActivateConfirm] = useState<typeof mockInactiveMembers[0] | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<typeof mockInactiveMembers[0] | null>(null);

  const filtered = members.filter((m) => {
    if (searchName && !m.name.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (searchMembership && !m.membership.toLowerCase().includes(searchMembership.toLowerCase())) return false;
    if (searchMobile && !m.phone.includes(searchMobile)) return false;
    if (searchEmail && !m.email.toLowerCase().includes(searchEmail.toLowerCase())) return false;
    if (searchCard && !m.cardNo.toLowerCase().includes(searchCard.toLowerCase())) return false;
    return true;
  });

  const clearSearch = () => {
    setSearchName("");
    setSearchMembership("");
    setSearchMobile("");
    setSearchEmail("");
    setSearchCard("");
  };

  const handleViewDetail = (member: typeof mockInactiveMembers[0]) => {
    setSelectedMember(member);
    setDetailOpen(true);
  };

  const handleActivate = (member: typeof mockInactiveMembers[0]) => {
    setActivateConfirm(member);
  };

  const confirmActivate = () => {
    if (activateConfirm) {
      setMembers((prev) => prev.filter((m) => m.id !== activateConfirm.id));
      toast.success(`${activateConfirm.name} has been activated successfully`);
    }
    setActivateConfirm(null);
  };

  const handleDelete = (member: typeof mockInactiveMembers[0]) => {
    setDeleteConfirm(member);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setMembers((prev) => prev.filter((m) => m.id !== deleteConfirm.id));
      toast.success(`${deleteConfirm.name} has been removed`);
    }
    setDeleteConfirm(null);
  };

  const handleWhatsApp = (member: typeof mockInactiveMembers[0]) => {
    const rawPhone = member.phone.replace(/[^0-9]/g, "");
    const phone = rawPhone.startsWith("0") ? "92" + rawPhone.slice(1) : rawPhone.startsWith("92") ? rawPhone : "92" + rawPhone;
    const message = `Hi ${member.name}, we noticed your membership has expired. We'd love to have you back at Lifestyle Reset! Visit us to renew your membership.\n\nThank you!\n*Lifestyle Reset*`;
    window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleDeactivateFromDialog = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setDetailOpen(false);
    toast.success("Member removed successfully");
  };

  // Map for MemberDetailDialog compatibility
  const memberForDialog = selectedMember ? {
    ...selectedMember,
    dueDate: selectedMember.expiredDate,
  } : null;

  return (
    <PageContainer title="Inactive Members" breadcrumbs={[{ label: "Member Management" }, { label: "All Members" }]}>
      {/* Search Bar */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
          <input placeholder="Search By Name" className="search-input" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <input placeholder="Search by Membership" className="search-input" value={searchMembership} onChange={(e) => setSearchMembership(e.target.value)} />
          <input placeholder="Search By Mobile" className="search-input" value={searchMobile} onChange={(e) => setSearchMobile(e.target.value)} />
          <input placeholder="Search By Email" className="search-input" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
          <input placeholder="Search by Card Number" className="search-input" value={searchCard} onChange={(e) => setSearchCard(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
              <Search className="w-3 h-3" /> Search
            </button>
            <button onClick={clearSearch} className="bg-sidebar text-sidebar-accent-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
              <Eraser className="w-3 h-3" /> Clear Search
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
        <button className="text-xs">|&lt;</button>
        <button className="text-xs">&lt;</button>
        <button className="text-xs">&gt;</button>
        <button className="text-xs">&gt;|</button>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-4 text-muted-foreground text-sm">
          No results found
        </div>
      ) : view === "list" ? (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Membership</th>
                <th>Expired Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td className="flex items-center gap-2">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                    {member.name}
                  </td>
                  <td>{member.phone}</td>
                  <td>{member.membership}</td>
                  <td>{member.expiredDate}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="action-btn action-btn-primary" onClick={() => handleActivate(member)} title="Activate Member">
                        <CheckCircle className="w-3 h-3" />
                      </button>
                      <button className="action-btn action-btn-primary" onClick={() => handleViewDetail(member)} title="View / Edit Details">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="action-btn action-btn-primary" onClick={() => handleWhatsApp(member)} title="Send WhatsApp Message">
                        <MessageSquare className="w-3 h-3" />
                      </button>
                      <button className="action-btn action-btn-danger" onClick={() => handleDelete(member)} title="Delete Member">
                        <XCircle className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-card-header">
                <div className="flex items-center gap-2">
                  <span className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded font-bold">EXP</span>
                  <span className="font-medium">{member.name}-{member.id}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="w-full flex items-center justify-center mb-3 py-2">
                  <img src={member.avatar} alt={member.name} className="w-32 h-40 object-cover rounded" />
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">{member.phone}</span>
                  <span className="text-destructive">Expired: <strong>{member.expiredDate}</strong></span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <button className="action-btn action-btn-primary" onClick={() => handleActivate(member)} title="Activate Member">
                    <CheckCircle className="w-3 h-3" />
                  </button>
                  <button className="action-btn action-btn-primary" onClick={() => handleViewDetail(member)} title="View / Edit Details">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button className="action-btn action-btn-primary" onClick={() => handleWhatsApp(member)} title="Send WhatsApp Message">
                    <MessageSquare className="w-3 h-3" />
                  </button>
                  <button className="action-btn action-btn-danger" onClick={() => handleDelete(member)} title="Delete Member">
                    <XCircle className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Pagination */}
      <div className="pagination-bar mt-4">
        <button className="text-xs">|&lt;</button>
        <button className="text-xs">&lt;</button>
        <button className="text-xs">&gt;</button>
        <button className="text-xs">&gt;|</button>
      </div>

      {/* Member Detail Dialog */}
      {memberForDialog && (
        <MemberDetailDialog
          member={memberForDialog}
          open={detailOpen}
          onOpenChange={setDetailOpen}
          onDeactivate={handleDeactivateFromDialog}
        />
      )}

      {/* Activate Confirmation */}
      <AlertDialog open={activateConfirm !== null} onOpenChange={() => setActivateConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription className="flex items-center gap-2">
              <span className="text-lg">⚠</span> Are you sure you want to activate <strong>{activateConfirm?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>✕ No</AlertDialogCancel>
            <AlertDialogAction onClick={confirmActivate}>✓ Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription className="flex items-center gap-2">
              <span className="text-lg">⚠</span> Are you sure you want to permanently delete <strong>{deleteConfirm?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>✕ No</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">✓ Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
}
