import PageContainer from "@/components/PageContainer";
import { XCircle, Edit, List, LayoutGrid, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockMembers = [
  { id: 122, name: "ahmed", phone: "+923325685258", dueDate: "08th", avatar: "/avatars/avatar-1.jpg" },
  { id: 118, name: "Aman", phone: "+923335852554", dueDate: "25th", avatar: "/avatars/avatar-3.jpg" },
  { id: 117, name: "ahmed", phone: "+923355748558", dueDate: "25th", avatar: "/avatars/avatar-5.jpg" },
  { id: 116, name: "Ayesha", phone: "+923458547552", dueDate: "20th", avatar: "/avatars/avatar-4.jpg" },
  { id: 111, name: "Ahsan", phone: "+923356544555", dueDate: "20th", avatar: "/avatars/avatar-8.jpg" },
  { id: 110, name: "Ali", phone: "+923358565578", dueDate: "23rd", avatar: "/avatars/avatar-2.jpg" },
  { id: 106, name: "Ali Khan", phone: "+923324545577", dueDate: "13th", avatar: "/avatars/avatar-7.jpg" },
  { id: 104, name: "Ahmed", phone: "+923433443233", dueDate: "09th", avatar: "/avatars/avatar-6.jpg" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function AttendancePage() {
  const [view, setView] = useState<"card" | "list">("card");
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const { toast } = useToast();

  // Deactivate
  const [deactivateId, setDeactivateId] = useState<number | null>(null);
  const [members, setMembers] = useState(mockMembers);

  // Attendance view
  const [selectedMember, setSelectedMember] = useState<typeof mockMembers[0] | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  const filtered = members.filter((m) => {
    if (searchName && !m.name.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (searchId && !m.id.toString().includes(searchId)) return false;
    if (searchMobile && !m.phone.includes(searchMobile)) return false;
    return true;
  });

  const clearSearch = () => { setSearchName(""); setSearchId(""); setSearchMobile(""); setSearchEmail(""); };

  const handleDeactivate = () => {
    if (deactivateId === null) return;
    setMembers((prev) => prev.filter((m) => m.id !== deactivateId));
    setDeactivateId(null);
    toast({ title: "Member deactivated" });
  };

  const calendarDays = getCalendarDays(calYear, calMonth);
  const today = new Date();
  const isToday = (day: number | null) => day !== null && calYear === today.getFullYear() && calMonth === today.getMonth() && day === today.getDate();

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };
  const goToday = () => { setCalMonth(today.getMonth()); setCalYear(today.getFullYear()); };

  // Attendance calendar view
  if (selectedMember) {
    const dueMonth = selectedMember.dueDate;
    return (
      <PageContainer
        title={selectedMember.name}
        breadcrumbs={[{ label: "Member Attendance Management" }, { label: "All Members" }, { label: selectedMember.name }]}
      >
        <div className="bg-sidebar text-sidebar-foreground rounded-lg p-3 mb-6 flex items-center gap-3">
          <button onClick={() => setSelectedMember(null)} className="bg-sidebar-accent text-sidebar-accent-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Go Back
          </button>
        </div>

        <div className="flex gap-6 mb-6">
          <div>
            <label className="text-xs text-muted-foreground block">Membership Number</label>
            <div className="border border-border rounded px-3 py-1 font-bold">{selectedMember.id}</div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">Name</label>
            <div className="border border-border rounded px-3 py-1 font-bold">{selectedMember.name}</div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">Monthly Due Date</label>
            <div className="border border-border rounded px-3 py-1 font-bold">{dueMonth} April</div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-sidebar text-sidebar-foreground px-4 py-2 text-sm font-semibold">Mark Attendance</div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{MONTH_NAMES[calMonth]} {calYear}</h3>
              <div className="flex items-center gap-2">
                <button onClick={goToday} className="bg-sidebar text-sidebar-foreground px-3 py-1 rounded text-sm">today</button>
                <button onClick={prevMonth} className="bg-sidebar text-sidebar-foreground p-1 rounded"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={nextMonth} className="bg-sidebar text-sidebar-foreground p-1 rounded"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 border border-border">
              {DAYS.map((d) => (
                <div key={d} className="border border-border px-2 py-2 text-center text-sm font-semibold bg-muted">{d}</div>
              ))}
              {calendarDays.map((day, i) => (
                <div
                  key={i}
                  className={`border border-border min-h-[80px] p-1 text-right text-sm ${isToday(day) ? "bg-yellow-50" : ""}`}
                >
                  {day && <span className={`${isToday(day) ? "text-primary font-bold" : "text-muted-foreground"}`}>{day}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Members Attendance" breadcrumbs={[{ label: "Member Attendance Management" }, { label: "All Members" }]}>
      {/* Search */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <input placeholder="Search By Name" className="search-input" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <input placeholder="Search By Membership ID" className="search-input" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          <input placeholder="Search By Mobile" className="search-input" value={searchMobile} onChange={(e) => setSearchMobile(e.target.value)} />
          <input placeholder="Search By Email" className="search-input" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button onClick={clearSearch} className="bg-sidebar text-sidebar-accent-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
            <XCircle className="w-3 h-3" /> Clear Search
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
      {view === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-card-header justify-center">
                <span className="font-medium">{member.name}-{member.id}</span>
              </div>
              <div className="p-4">
                <div className="w-28 h-28 mx-auto mb-3">
                  <img src={member.avatar} alt={member.name} className="w-28 h-28 rounded-full object-cover border-2 border-border" />
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span>Due Date <strong>{member.dueDate}</strong></span>
                  <span className="text-muted-foreground text-xs">{member.phone}</span>
                </div>
                <hr className="mb-3 border-border" />
                <div className="flex items-center gap-3 justify-center">
                  <button className="action-btn action-btn-danger" onClick={() => setDeactivateId(member.id)}><XCircle className="w-3 h-3" /></button>
                  <button className="action-btn action-btn-primary" onClick={() => setSelectedMember(member)}><Edit className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Phone</th><th>Due Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td className="flex items-center gap-2">
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                    {m.name}
                  </td>
                  <td>{m.phone}</td>
                  <td>{m.dueDate}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="action-btn action-btn-danger" onClick={() => setDeactivateId(m.id)}><XCircle className="w-3 h-3" /></button>
                      <button className="action-btn action-btn-primary" onClick={() => setSelectedMember(m)}><Edit className="w-3 h-3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Deactivate Confirmation */}
      <Dialog open={deactivateId !== null} onOpenChange={() => setDeactivateId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <p className="text-sm py-2 flex items-center gap-2">⚠️ Are you sure you want to Deactivate Member?</p>
          <DialogFooter>
            <button onClick={() => setDeactivateId(null)} className="bg-sidebar text-sidebar-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
              <XCircle className="w-3 h-3" /> No
            </button>
            <button onClick={handleDeactivate} className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
              ✓ Yes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
