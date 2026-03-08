import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { XCircle, Download, Plus, Calendar, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

interface Expense {
  amount: number;
  type: string;
  date: string;
  details: string;
  image: string;
  createdOn: string;
  comment: string;
  paymentMode: string;
}

const initialExpenses: Expense[] = [
  { amount: 5000, type: "Rent", date: "07/03/2026", details: "Rent", image: "", createdOn: "07/03/2026", comment: "", paymentMode: "Cash - Reception" },
  { amount: 5000, type: "Salary", date: "03/03/2026", details: "Employee Name: Abdullah Ahmed", image: "", createdOn: "03/03/2026", comment: "", paymentMode: "Cash - Reception" },
];

const expenseTypes = ["Rent", "Salary", "Utilities", "Maintenance", "Supplies", "Equipment", "Marketing", "Other"];
const paymentModes = ["Cash - Reception", "Bank Transfer", "Online Payment", "Cheque"];

export default function PettyCashPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ paymentMode: "Cash - Reception", amount: "0", date: "", type: "", comment: "", details: "" });
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const { toast } = useToast();

  const totalCash = expenses.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!form.amount || Number(form.amount) <= 0 || !form.date || !form.type) {
      toast({ title: "Validation Error", description: "Please fill Amount, Date and Expense Type", variant: "destructive" });
      return;
    }
    const today = new Date();
    const createdOn = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    const [y, m, d] = form.date.split("-");
    const dateFormatted = `${d}/${m}/${y}`;
    setExpenses([...expenses, {
      amount: Number(form.amount),
      type: form.type,
      date: dateFormatted,
      details: form.details,
      image: "",
      createdOn,
      comment: form.comment,
      paymentMode: form.paymentMode,
    }]);
    setForm({ paymentMode: "Cash - Reception", amount: "0", date: "", type: "", comment: "", details: "" });
    setShowAdd(false);
    toast({ title: "Expense Added", description: "Petty cash expense added successfully." });
  };

  const handleDelete = (idx: number) => {
    setExpenses(expenses.filter((_, i) => i !== idx));
    setDeleteIdx(null);
    toast({ title: "Deleted", description: "Expense removed." });
  };

  const exportToExcel = () => {
    const data = expenses.map((e) => ({ Amount: e.amount, "Expense Type": e.type, Date: e.date, Details: e.details, "Created On": e.createdOn, Comment: e.comment, "Payment Mode": e.paymentMode }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Petty Cash");
    XLSX.writeFile(wb, "petty_cash.xlsx");
  };

  return (
    <PageContainer title="" breadcrumbs={[{ label: "Petty Cash" }]}>
      {/* Top Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="bg-green-600 text-white px-4 py-2 rounded font-heading text-xl font-bold">
          {totalCash.toLocaleString()}
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
          <Plus className="w-3 h-3" /> Add Expense
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">From</span>
          <div className="flex items-center border border-border rounded px-3 py-1.5 bg-card">
            <span className="text-sm">01/03/2026</span>
            <Calendar className="w-4 h-4 ml-2 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">To</span>
          <div className="flex items-center border border-border rounded px-3 py-1.5 bg-card">
            <span className="text-sm">31/03/2026</span>
            <Calendar className="w-4 h-4 ml-2 text-muted-foreground" />
          </div>
        </div>
        <div>
          <span className="text-sm text-muted-foreground mr-2">Select User</span>
          <Select defaultValue="admin">
            <SelectTrigger className="w-40 inline-flex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin (Admin)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1" />
        <button onClick={exportToExcel}><Download className="w-4 h-4 text-muted-foreground" /></button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Expense Type</th>
              <th>Date</th>
              <th>Details</th>
              <th>Image</th>
              <th>Created On</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, i) => (
              <tr key={i}>
                <td className="text-blue-500 font-medium">{e.amount.toLocaleString()}</td>
                <td>{e.type}</td>
                <td>{e.date}</td>
                <td>{e.details}</td>
                <td>{e.image || ""}</td>
                <td>{e.createdOn}</td>
                <td>{e.comment}</td>
                <td>
                  <button onClick={() => setDeleteIdx(i)} className="action-btn action-btn-danger"><XCircle className="w-3 h-3" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Petty Expense</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Payment Mode</label>
              <select
                className="w-full border border-border rounded px-3 py-2 bg-card text-foreground"
                value={form.paymentMode}
                onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}
              >
                {paymentModes.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Amount</label>
              <input
                type="number"
                className="w-full border border-border rounded px-3 py-2 bg-card text-foreground"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Date</label>
              <input
                type="date"
                className="w-full border border-border rounded px-3 py-2 bg-card text-foreground"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Expense Type</label>
              <select
                className="w-full border border-border rounded px-3 py-2 bg-card text-foreground"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="">Select</option>
                {expenseTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Details</label>
              <input
                type="text"
                className="w-full border border-border rounded px-3 py-2 bg-card text-foreground"
                placeholder="e.g. Employee Name: John"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
              />
            </div>
            <button className="w-full bg-sidebar text-sidebar-foreground py-2 rounded flex items-center justify-center gap-2 text-sm">
              <Upload className="w-4 h-4" /> Upload Photo
            </button>
            <div>
              <label className="text-sm text-destructive font-medium">Comment</label>
              <textarea
                className="w-full border border-border rounded px-3 py-2 bg-card text-foreground min-h-[80px]"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
            </div>
            <button onClick={handleAdd} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium">
              Add Expense
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteIdx !== null} onOpenChange={() => setDeleteIdx(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete this expense?</p>
          <div className="flex gap-2 justify-end mt-4">
            <button onClick={() => setDeleteIdx(null)} className="px-4 py-2 rounded border border-border text-sm">Cancel</button>
            <button onClick={() => deleteIdx !== null && handleDelete(deleteIdx)} className="px-4 py-2 rounded bg-destructive text-destructive-foreground text-sm">Delete</button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
