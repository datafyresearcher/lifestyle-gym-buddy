import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, Edit, X, UserPlus, Printer, Download, Save } from "lucide-react";
import * as XLSX from "xlsx";
import { useEnquiries } from "@/context/EnquiriesContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function EnquiriesPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { enquiries, removeEnquiry, updateEnquiry } = useEnquiries();
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  // Edit state
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", mobile: "", email: "", status: "" });

  // Delete confirm state
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const filtered = enquiries.map((e, i) => ({ ...e, _idx: i })).filter((e) => {
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

  const openEdit = (idx: number) => {
    const e = enquiries[idx];
    setEditForm({ name: e.name, mobile: e.mobile, email: e.email, status: e.status });
    setEditIndex(idx);
  };

  const handleEditSave = () => {
    if (editIndex === null) return;
    const original = enquiries[editIndex];
    updateEnquiry(editIndex, { ...original, ...editForm });
    setEditIndex(null);
    toast({ title: "Enquiry updated" });
  };

  const handleDelete = () => {
    if (deleteIndex === null) return;
    removeEnquiry(deleteIndex);
    setDeleteIndex(null);
    toast({ title: "Enquiry deleted" });
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
            ) : filtered.map((e) => (
              <tr key={e._idx}>
                <td>{e.name}</td>
                <td>{e.mobile}</td>
                <td>{e.enquiryDate}</td>
                <td>{e.status}</td>
                <td>{e.email}</td>
                <td>
                  <div className="flex gap-1">
                    <button className="action-btn action-btn-danger" onClick={() => setDeleteIndex(e._idx)}><XCircle className="w-3 h-3" /></button>
                    <button className="action-btn action-btn-primary" onClick={() => openEdit(e._idx)}><Edit className="w-3 h-3" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editIndex !== null} onOpenChange={() => setEditIndex(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Enquiry</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Name</label>
              <input className="search-input w-full" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Mobile</label>
              <input className="search-input w-full" value={editForm.mobile} onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Email</label>
              <input className="search-input w-full" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Status</label>
              <input className="search-input w-full" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setEditIndex(null)} className="bg-muted text-muted-foreground px-4 py-2 rounded text-sm">Cancel</button>
            <button onClick={handleEditSave} className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm flex items-center gap-2">
              <Save className="w-3 h-3" /> Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteIndex !== null} onOpenChange={() => setDeleteIndex(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Enquiry</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">Are you sure you want to delete this enquiry? This action cannot be undone.</p>
          <DialogFooter>
            <button onClick={() => setDeleteIndex(null)} className="bg-muted text-muted-foreground px-4 py-2 rounded text-sm">Cancel</button>
            <button onClick={handleDelete} className="bg-destructive text-destructive-foreground px-4 py-2 rounded text-sm">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
