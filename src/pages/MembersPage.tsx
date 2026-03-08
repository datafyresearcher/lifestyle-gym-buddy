import PageContainer from "@/components/PageContainer";
import MemberDetailDialog from "@/components/MemberDetailDialog";
import { useState } from "react";
import { XCircle, Edit, Camera, User, Settings, Phone, Plus, List, LayoutGrid } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockMembers = [
  { id: 122, name: "Ahmed", phone: "+923325685258", email: "ahmed@mail.com", cardNo: "C-122", dueDate: "08th Apr", membership: "Monthly", avatar: "/avatars/avatar-1.jpg" },
  { id: 121, name: "Uzair Ali", phone: "+923437033333", email: "uzair@mail.com", cardNo: "C-121", dueDate: "03rd Apr", membership: "Family", avatar: "/avatars/avatar-8.jpg" },
  { id: 120, name: "Hifsa Ali", phone: "+923325682852", email: "hifsa@mail.com", cardNo: "C-120", dueDate: "03rd Apr", membership: "Monthly", avatar: "/avatars/avatar-2.jpg" },
  { id: 118, name: "Aman", phone: "+923335852554", email: "aman@mail.com", cardNo: "C-118", dueDate: "25th Apr", membership: "VIP", avatar: "/avatars/avatar-3.jpg" },
  { id: 117, name: "Ahmed", phone: "+923355748558", email: "ahmed2@mail.com", cardNo: "C-117", dueDate: "25th Mar", membership: "Monthly", avatar: "/avatars/avatar-5.jpg" },
  { id: 116, name: "Ayesha", phone: "+923458547552", email: "ayesha@mail.com", cardNo: "C-116", dueDate: "20th Mar", membership: "Group", avatar: "/avatars/avatar-4.jpg" },
  { id: 115, name: "Hussain Khan", phone: "+923325685258", email: "hussain@mail.com", cardNo: "C-115", dueDate: "15th Mar", membership: "Yearly", avatar: "/avatars/avatar-7.jpg" },
  { id: 114, name: "Hamza", phone: "+923437033333", email: "hamza@mail.com", cardNo: "C-114", dueDate: "10th Mar", membership: "Monthly", avatar: "/avatars/avatar-6.jpg" },
];

export default function MembersPage() {
  const [view, setView] = useState<"card" | "list">("card");
  const [searchName, setSearchName] = useState("");
  const [searchMembership, setSearchMembership] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchCard, setSearchCard] = useState("");
  const [selectedMember, setSelectedMember] = useState<typeof mockMembers[0] | null>(null);

  const filtered = mockMembers.filter((m) => {
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

  return (
    <PageContainer title="Members" breadcrumbs={[{ label: "Member Management" }, { label: "All Members" }]}>
      {/* Search Bar */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
          <input
            placeholder="Search By Name"
            className="search-input"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            placeholder="Search By Membership"
            className="search-input"
            value={searchMembership}
            onChange={(e) => setSearchMembership(e.target.value)}
          />
          <input
            placeholder="Search By Mobile"
            className="search-input"
            value={searchMobile}
            onChange={(e) => setSearchMobile(e.target.value)}
          />
          <input
            placeholder="Search By Email"
            className="search-input"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <input
            placeholder="Search By Card Number"
            className="search-input"
            value={searchCard}
            onChange={(e) => setSearchCard(e.target.value)}
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Package Type: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={clearSearch}
              className="bg-sidebar text-sidebar-accent-foreground px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <XCircle className="w-3 h-3" /> Clear Search
            </button>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
              <Plus className="w-3 h-3" /> Add New (F2)
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded ${view === "list" ? "bg-sidebar text-sidebar-accent-foreground" : "bg-muted"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("card")}
              className={`p-2 rounded ${view === "card" ? "bg-sidebar text-sidebar-accent-foreground" : "bg-muted"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-bar mb-4">
        <button className="text-xs">|&lt;</button>
        <button className="text-xs">&lt;</button>
        <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
        <span className="text-xs">2</span>
        <button className="text-xs">&gt;</button>
        <button className="text-xs">&gt;|</button>
      </div>

      {/* Card View */}
      {view === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member) => (
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
                {/* Avatar image */}
                <div className="w-full flex items-center justify-center mb-3 py-2">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-40 object-cover rounded"
                  />
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">{member.phone}</span>
                  <span>Due Dy: <strong>{member.dueDate}</strong></span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <button className="action-btn action-btn-danger"><XCircle className="w-3 h-3" /></button>
                  <button className="action-btn action-btn-primary"><Edit className="w-3 h-3" /></button>
                  <button className="action-btn action-btn-info"><Camera className="w-3 h-3" /></button>
                  <button className="action-btn" style={{background: "hsl(280, 65%, 50%)", color: "white"}}><User className="w-3 h-3" /></button>
                  <button className="action-btn action-btn-success"><Settings className="w-3 h-3" /></button>
                  <button className="action-btn" style={{background: "hsl(145, 65%, 42%)", color: "white"}}><Phone className="w-3 h-3" /></button>
                </div>
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
              {filtered.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td className="flex items-center gap-2">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                    {member.name}
                  </td>
                  <td>{member.phone}</td>
                  <td>{member.membership}</td>
                  <td>{member.dueDate}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="action-btn action-btn-danger"><XCircle className="w-3 h-3" /></button>
                      <button className="action-btn action-btn-primary"><Edit className="w-3 h-3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
