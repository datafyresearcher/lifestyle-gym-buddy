import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { X, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as XLSX from "xlsx";

const mockLogs = [
  { date: "Sun Mar 08 2026 20:05:38", type: "Login User", by: "Admin", from: "", memberNo: "", subject: "", scope: "Admin", oldValue: "", newValue: "" },
  { date: "Sun Mar 08 2026 18:06:37", type: "Login User", by: "Admin", from: "", memberNo: "", subject: "", scope: "Admin", oldValue: "", newValue: "" },
  { date: "Sun Mar 08 2026 14:59:12", type: "profile", by: "Admin", from: "Add Member", memberNo: "122", subject: "ahmed", scope: "Member", oldValue: "1. profile changed", newValue: "1. profile changed" },
  { date: "Sun Mar 08 2026 14:58:30", type: "Login User", by: "Admin", from: "", memberNo: "", subject: "", scope: "Admin", oldValue: "", newValue: "" },
  { date: "Sun Mar 08 2026 14:57:39", type: "DeFreeze", by: "Admin", from: "Member", memberNo: "122", subject: "ahmed", scope: "Member", oldValue: "True", newValue: "False" },
  { date: "Sun Mar 08 2026 14:56:25", type: "Login User", by: "Admin", from: "", memberNo: "", subject: "", scope: "Admin", oldValue: "", newValue: "" },
  { date: "Sat Mar 07 2026 17:27:41", type: ",", by: "", from: "Add Member", memberNo: "122", subject: "ahmed", scope: "Member", oldValue: "", newValue: "" },
  { date: "Sat Mar 07 2026 17:27:31", type: "Update Package, packageName, dateOfBirth", by: "Admin", from: "Add Member", memberNo: "122", subject: "Monthly Package", scope: "Member", oldValue: "1. Monthly\n2. undefined", newValue: "1. Monthly Package\n2. null" },
  { date: "Sat Mar 07 2026 17:25:33", type: "Petty Cash", by: "Admin", from: "Petty Cash Dialogue", memberNo: "", subject: "Rent", scope: "Petty Cash", oldValue: "", newValue: "5000" },
  { date: "Sat Mar 07 2026 17:10:50", type: "Create Enquiry", by: "Admin", from: "Add Enquiry", memberNo: "", subject: "Ali khan", scope: "Enquiry", oldValue: "", newValue: "" },
  { date: "Sat Mar 07 2026 16:45:20", type: "Add Member", by: "Admin", from: "Add Member", memberNo: "121", subject: "Uzair Ali", scope: "Member", oldValue: "", newValue: "" },
  { date: "Fri Mar 06 2026 12:30:00", type: "Login User", by: "Admin", from: "", memberNo: "", subject: "", scope: "Admin", oldValue: "", newValue: "" },
];

const activityTypes = ["All", "Login User", "profile", "DeFreeze", "Update Package", "Petty Cash", "Create Enquiry", "Add Member"];
const activityByOptions = ["All", "Admin"];

export default function ActivityLogsPage() {
  const [searchMembership, setSearchMembership] = useState("");
  const [activityType, setActivityType] = useState("All");
  const [activityBy, setActivityBy] = useState("All");
  const [fromDate, setFromDate] = useState("2026-03-01");
  const [toDate, setToDate] = useState("2026-03-31");

  const filtered = mockLogs.filter((log) => {
    if (searchMembership && !log.memberNo.includes(searchMembership)) return false;
    if (activityType !== "All" && !log.type.toLowerCase().includes(activityType.toLowerCase())) return false;
    if (activityBy !== "All" && log.by.toLowerCase() !== activityBy.toLowerCase()) return false;
    return true;
  });

  const clearSearch = () => {
    setSearchMembership("");
    setActivityType("All");
    setActivityBy("All");
    setFromDate("2026-03-01");
    setToDate("2026-03-31");
  };

  const exportToExcel = () => {
    const data = filtered.map((l) => ({
      "Activity Date": l.date, "Activity Type": l.type, "Activity By": l.by,
      "Initiated From": l.from, "Membership No": l.memberNo, Subject: l.subject,
      Scope: l.scope, "Old Value": l.oldValue, "New Value": l.newValue,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Activity Logs");
    XLSX.writeFile(wb, "activity-logs.xlsx");
  };

  return (
    <PageContainer title="Activity Logs" breadcrumbs={[{ label: "Activity Logs" }]}>
      {/* Search Bar */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="text-xs text-muted-foreground block">Search By Membership ID</label>
            <input className="search-input w-36" placeholder="Search here!" value={searchMembership} onChange={(e) => setSearchMembership(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">Activity Type</label>
            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                {activityTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">Activity By</label>
            <Select value={activityBy} onValueChange={setActivityBy}>
              <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                {activityByOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">From</label>
            <input type="date" className="search-input w-36" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">To</label>
            <input type="date" className="search-input w-36" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <button onClick={clearSearch}><X className="w-4 h-4 text-muted-foreground" /></button>
          <div className="flex-1" />
          <button onClick={exportToExcel}><Download className="w-4 h-4 text-muted-foreground" /></button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Activity Date</th>
              <th>Activity Type</th>
              <th>Activity By</th>
              <th>Initiated From</th>
              <th>Membership No</th>
              <th>Subject</th>
              <th>Scope</th>
              <th>Old Value</th>
              <th>New Value</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} className="text-center text-muted-foreground py-4">No results found</td></tr>
            ) : filtered.map((log, i) => (
              <tr key={i}>
                <td className="whitespace-nowrap">{log.date}</td>
                <td>{log.type}</td>
                <td>{log.by}</td>
                <td>{log.from}</td>
                <td>{log.memberNo}</td>
                <td>{log.subject}</td>
                <td>{log.scope}</td>
                <td className="whitespace-pre-line">{log.oldValue}</td>
                <td className="whitespace-pre-line">{log.newValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
