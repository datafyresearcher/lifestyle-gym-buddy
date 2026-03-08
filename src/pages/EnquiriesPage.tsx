import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, Edit, X, UserPlus, Printer, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { useEnquiries } from "@/context/EnquiriesContext";

export default function EnquiriesPage() {
  const navigate = useNavigate();
  const { enquiries, removeEnquiry } = useEnquiries();
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  const filtered = enquiries.filter((e) => {
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
          <button className="mt-4" onClick={() => navigate("/enquiries/add")}><UserPlus className="w-4 h-4 text-muted-foreground" /></button>
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
                    <button className="action-btn action-btn-danger" onClick={() => removeEnquiry(i)}><XCircle className="w-3 h-3" /></button>
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
