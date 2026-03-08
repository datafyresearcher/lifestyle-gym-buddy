import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { Search, XCircle, Printer, Download, MessageCircle } from "lucide-react";
import * as XLSX from "xlsx";

const mockDues = [
  { id: 93, name: "Zara", phone: "+923546677754", package: "Monthly", fees: 5000, dueDate: "08/03/2026", avatar: "/avatars/avatar-1.jpg" },
  { id: 96, name: "adeel", phone: "+923458557485", package: "Monthly", fees: 5000, dueDate: "08/03/2026", avatar: "/avatars/avatar-2.jpg" },
  { id: 97, name: "Tayyab", phone: "+923354855525", package: "Monthly", fees: 5000, dueDate: "08/03/2026", avatar: "/avatars/avatar-3.jpg" },
  { id: 104, name: "Ahmed", phone: "+923433443233", package: "Monthly", fees: 5000, dueDate: "09/03/2026", avatar: "/avatars/avatar-4.jpg" },
  { id: 105, name: "Saud Ali", phone: "+923343975754", package: "Monthly", fees: 5000, dueDate: "10/03/2026", avatar: "/avatars/avatar-5.jpg" },
  { id: 106, name: "Ali Khan", phone: "+923324545577", package: "Monthly", fees: 5000, dueDate: "13/03/2026", avatar: "/avatars/avatar-6.jpg" },
  { id: 108, name: "Hussain", phone: "+923325685258", package: "Yearly", fees: 50000, dueDate: "15/03/2026", avatar: "/avatars/avatar-7.jpg" },
  { id: 110, name: "Hamza", phone: "+923437033333", package: "Monthly", fees: 5000, dueDate: "15/03/2026", avatar: "/avatars/avatar-8.jpg" },
];

export default function UpcomingDuesPage() {
  const [search, setSearch] = useState("");
  const [duesUpto, setDuesUpto] = useState("2026-03-15");

  const filtered = mockDues.filter((m) => {
    if (search && !m.id.toString().includes(search) && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (duesUpto) {
      const [d, mo, y] = m.dueDate.split("/");
      const memberDate = new Date(`${y}-${mo}-${d}`);
      const uptoDate = new Date(duesUpto);
      if (memberDate > uptoDate) return false;
    }
    return true;
  });

  const totalFees = filtered.reduce((sum, m) => sum + m.fees, 0);

  const exportToExcel = () => {
    const data = filtered.map((m) => ({
      "Membership No": m.id,
      Name: m.name,
      Mobile: m.phone,
      Package: m.package,
      "Monthly Fees": m.fees,
      "Due Date": m.dueDate,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Upcoming Dues");
    XLSX.writeFile(wb, "upcoming_dues.xlsx");
  };

  const clearSearch = () => {
    setSearch("");
    setDuesUpto("2026-03-15");
  };

  return (
    <PageContainer title="Upcoming Dues" breadcrumbs={[{ label: "Upcoming Dues" }]}>
      {/* Search Bar */}
      <div className="bg-sidebar text-sidebar-foreground rounded-t-lg p-3 flex items-center gap-3 flex-wrap">
        <div>
          <label className="text-xs text-sidebar-foreground/70 block">Search by Membership</label>
          <input
            placeholder="Search here!"
            className="search-input bg-sidebar border-sidebar-border text-sidebar-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-sidebar-foreground/70 block">Dues Upto</label>
          <input
            type="date"
            className="search-input bg-sidebar border-sidebar-border text-sidebar-foreground"
            value={duesUpto}
            onChange={(e) => setDuesUpto(e.target.value)}
          />
        </div>
        <button className="mt-4 p-2 hover:text-primary">
          <Search className="w-5 h-5" />
        </button>
        <button onClick={clearSearch} className="mt-4 p-2 hover:text-destructive">
          <XCircle className="w-5 h-5" />
        </button>
        <div className="ml-auto flex gap-2 mt-4">
          <button onClick={() => window.print()} className="p-2 hover:text-primary">
            <Printer className="w-5 h-5" />
          </button>
          <button onClick={exportToExcel} className="p-2 hover:text-primary">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-b-lg overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Membership No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Package</th>
              <th>Monthly Fees</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>
                  <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td>{m.name}</td>
                <td>{m.phone}</td>
                <td>{m.package}</td>
                <td>{m.fees.toLocaleString()}</td>
                <td>{m.dueDate}</td>
                <td>
                  <button className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end border-t border-border">
          <div className="w-80">
            <div className="text-center font-bold py-2 border-b border-border">Summary</div>
            <div className="flex justify-between px-4 py-2 border-b border-border">
              <span>Total Count</span>
              <span>{filtered.length}</span>
            </div>
            <div className="flex justify-between px-4 py-2">
              <span>Total Fees</span>
              <span>{totalFees.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
