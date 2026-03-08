import PageContainer from "@/components/PageContainer";
import { User, XCircle, Edit, List, LayoutGrid } from "lucide-react";
import { useState } from "react";

const mockMembers = [
  { id: 122, name: "Ahmed", phone: "+923325685258", dueDate: "08th" },
  { id: 118, name: "Aman", phone: "+923335852554", dueDate: "25th" },
  { id: 117, name: "Ahmed", phone: "+923355748558", dueDate: "25th" },
  { id: 116, name: "Ayesha", phone: "+923458547552", dueDate: "20th" },
  { id: 111, name: "Ahsan", phone: "+923325685258", dueDate: "15th" },
  { id: 110, name: "Ali", phone: "+923437033333", dueDate: "10th" },
  { id: 106, name: "Ali Khan", phone: "+923325682852", dueDate: "05th" },
  { id: 104, name: "Ahmed", phone: "+923335852554", dueDate: "01st" },
];

export default function AttendancePage() {
  const [view, setView] = useState<"card" | "list">("card");

  return (
    <PageContainer title="Members Attendance" breadcrumbs={[{ label: "Member Attendance Management" }, { label: "All Members" }]}>
      {/* Search */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <input placeholder="Search By Name" className="search-input" />
          <input placeholder="Search By Membership ID" className="search-input" />
          <input placeholder="Search By Mobile" className="search-input" />
          <input placeholder="Search By Email" className="search-input" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-sidebar text-sidebar-accent-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
            <Edit className="w-3 h-3" /> Clear Search
          </button>
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

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMembers.map((member) => (
          <div key={member.id} className="member-card">
            <div className="member-card-header justify-center">
              <span className="font-medium">{member.name}-{member.id}</span>
            </div>
            <div className="p-4">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-3">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span>Due Date <strong>{member.dueDate}</strong></span>
                <span className="text-muted-foreground text-xs">{member.phone}</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <button className="action-btn action-btn-danger"><XCircle className="w-3 h-3" /></button>
                <button className="action-btn action-btn-primary"><Edit className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
