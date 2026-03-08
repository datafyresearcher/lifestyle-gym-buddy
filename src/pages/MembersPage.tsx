import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { Search, XCircle, Edit, Camera, User, Settings, MessageCircle, Phone, Plus, List, LayoutGrid } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockMembers = [
  { id: 122, name: "Ahmed", phone: "+923325685258", email: "ahmed@mail.com", cardNo: "C-122", dueDate: "08th Apr", membership: "Monthly" },
  { id: 121, name: "Uzair Ali", phone: "+923437033333", email: "uzair@mail.com", cardNo: "C-121", dueDate: "03rd Apr", membership: "Family" },
  { id: 120, name: "Hifsa Ali", phone: "+923325682852", email: "hifsa@mail.com", cardNo: "C-120", dueDate: "03rd Apr", membership: "Monthly" },
  { id: 118, name: "Aman", phone: "+923335852554", email: "aman@mail.com", cardNo: "C-118", dueDate: "25th Apr", membership: "VIP" },
  { id: 117, name: "Ahmed", phone: "+923355748558", email: "ahmed2@mail.com", cardNo: "C-117", dueDate: "25th Mar", membership: "Monthly" },
  { id: 116, name: "Ayesha", phone: "+923458547552", email: "ayesha@mail.com", cardNo: "C-116", dueDate: "20th Mar", membership: "Group" },
  { id: 115, name: "Hussain Khan", phone: "+923325685258", email: "hussain@mail.com", cardNo: "C-115", dueDate: "15th Mar", membership: "Yearly" },
  { id: 114, name: "Hamza", phone: "+923437033333", email: "hamza@mail.com", cardNo: "C-114", dueDate: "10th Mar", membership: "Monthly" },
];

export default function MembersPage() {
  const [view, setView] = useState<"card" | "list">("card");
  const [searchName, setSearchName] = useState("");

  const filtered = mockMembers.filter((m) =>
    m.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <PageContainer title="Members" breadcrumbs={[{ label: "Member Management" }, { label: "All Members" }]}>
      {/* Search Bar */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
          <input placeholder="Search By Name" className="search-input" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <input placeholder="Search By Membership" className="search-input" />
          <input placeholder="Search By Mobile" className="search-input" />
          <input placeholder="Search By Email" className="search-input" />
          <input placeholder="Search By Card Number" className="search-input" />
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
            <button className="bg-sidebar text-sidebar-accent-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
              <Edit className="w-3 h-3" /> Clear Search
            </button>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
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
        <button className="text-xs">|&lt;</button>
        <button className="text-xs">&lt;</button>
        <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
        <span className="text-xs">2</span>
        <button className="text-xs">&gt;</button>
        <button className="text-xs">&gt;|</button>
      </div>

      {/* Card View */}
      {view === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-card-header">
                <div className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-bold">1M</span>
                  <span className="font-medium">{member.name}-{member.id}</span>
                </div>
                <button className="bg-primary text-primary-foreground p-1 rounded">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div className="p-4">
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <User className="w-12 h-12 text-muted-foreground" />
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
                  <td>{member.name}</td>
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
