import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, Edit, X, UserPlus, Printer, Download } from "lucide-react";
import * as XLSX from "xlsx";

const mockEnquiries = [
  { name: "Ali khan", mobile: "+923335855855", enquiryDate: "Mar 7, 2026, 5:10:19 PM", status: "Contacted", email: "---" },
  { name: "Shehzad Khan", mobile: "3354545892", enquiryDate: "Mar 3, 2026, 1:26:22 PM", status: "Contacted", email: "---" },
  { name: "Hussain", mobile: "3354626237", enquiryDate: "Mar 3, 2026, 1:05:26 PM", status: "Contacted", email: "---" },
  { name: "Alii", mobile: "+923558558555", enquiryDate: "Feb 17, 2026, 5:30:19 PM", status: "Contacted", email: "---" },
  { name: "adeel", mobile: "+923333333333", enquiryDate: "Jan 8, 2026, 5:55:44 PM", status: "Contacted", email: "---" },
  { name: "shahana", mobile: "+92553637377", enquiryDate: "Jan 8, 2026, 2:16:58 PM", status: "Contacted", email: "---" },
  { name: "sana", mobile: "+92243566879", enquiryDate: "Dec 11, 2025, 5:25:37 PM", status: "Contacted", email: "---" },
  { name: "ahsan", mobile: "+92788888888", enquiryDate: "Dec 9, 2025, 11:13:59 AM", status: "Contacted", email: "---" },
  { name: "Ali Hamza", mobile: "+923432521212", enquiryDate: "Jul 25, 2025, 4:33:54 PM", status: "Contacted", email: "ali_hamza@gmail.com" },
  { name: "Sana Khan", mobile: "03437068981", enquiryDate: "Jul 25, 2025, 4:33:31 PM", status: "Contacted", email: "sanakhan@gmail.com" },
  { name: "Palwasha Khan", mobile: "+923338745216", enquiryDate: "Jul 16, 2025, 11:25:27 AM", status: "Contacted", email: "palwasha@gmail.com" },
];

export default function EnquiriesPage() {
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  const filtered = mockEnquiries.filter((e) => {
    if (searchName && !e.name.toLowerCase().includes(searchName.toLowerCase())) return false;
    if (searchMobile && !e.mobile.includes(searchMobile)) return false;
    return true;
  });

  const clearSearch = () => { setSearchName(""); setSearchMobile(""); };

  const exportToExcel = () => {
    const data = filtered.map((e) => ({
      Name: e.name, Mobile: e.mobile, "Enquiry Date": e.enquiryDate, Status: e.status, Email: e.email,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
    XLSX.writeFile(wb, "enquiries.xlsx");
  };

  return (
    <PageContainer title="Enquiries" breadcrumbs={[{ label: "Enquire Management" }, { label: "All Enquiries" }]}>
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <div>
            <label className="text-xs text-muted-foreground block">Search Member By Name</label>
            <input className="search-input w-40" placeholder="Search here!" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">Search Member By Mobile</label>
            <input className="search-input w-40" placeholder="Search here!" value={searchMobile} onChange={(e) => setSearchMobile(e.target.value)} />
          </div>
          <button className="mt-4" onClick={clearSearch}><X className="w-4 h-4 text-muted-foreground" /></button>
          <div className="flex-1" />
          <button className="mt-4"><UserPlus className="w-4 h-4 text-muted-foreground" /></button>
          <button className="mt-4"><Printer className="w-4 h-4 text-muted-foreground" /></button>
          <button className="mt-4" onClick={exportToExcel}><Download className="w-4 h-4 text-muted-foreground" /></button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Enquiry Date</th>
              <th>Status</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-muted-foreground py-4">No results found</td></tr>
            ) : filtered.map((e, i) => (
              <tr key={i}>
                <td>{e.name}</td>
                <td>{e.mobile}</td>
                <td>{e.enquiryDate}</td>
                <td>{e.status}</td>
                <td>{e.email}</td>
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
    </PageContainer>
  );
}
