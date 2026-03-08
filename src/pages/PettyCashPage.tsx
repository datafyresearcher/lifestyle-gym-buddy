import PageContainer from "@/components/PageContainer";
import { XCircle, Download, Plus, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const expenses = [
  { amount: 5000, type: "Rent", date: "07/03/2026", details: "Rent", image: "", createdOn: "07/03/2026", comment: "" },
  { amount: 5000, type: "Salary", date: "03/03/2026", details: "Employee Name: Abdullah Ahmed", image: "", createdOn: "03/03/2026", comment: "" },
];

export default function PettyCashPage() {
  return (
    <PageContainer title="" breadcrumbs={[{ label: "Petty Cash" }]}>
      {/* Top Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="bg-success text-success-foreground px-4 py-2 rounded font-heading text-xl font-bold">
          1,707,080
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
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
        <button><Download className="w-4 h-4 text-muted-foreground" /></button>
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
                <td className="text-info font-medium">{e.amount.toLocaleString()}</td>
                <td>{e.type}</td>
                <td>{e.date}</td>
                <td>{e.details}</td>
                <td>{e.image || ""}</td>
                <td>{e.createdOn}</td>
                <td>{e.comment}</td>
                <td>
                  <button className="action-btn action-btn-danger"><XCircle className="w-3 h-3" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
