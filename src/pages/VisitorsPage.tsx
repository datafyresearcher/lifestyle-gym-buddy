import PageContainer from "@/components/PageContainer";
import { Edit, Download, Search, X, UserPlus } from "lucide-react";

const mockVisitors = [
  { name: "Ali", mobile: "+923325658545", email: "---", date: "Saturday, March 7, 2026", time: "5:08 PM", totalFees: 400, discount: 0, tax: 0, paid: 400 },
  { name: "Kashif Ali", mobile: "+923358585471", email: "---", date: "Tuesday, March 3, 2026", time: "10:21 AM", totalFees: 400, discount: 0, tax: 0, paid: 400 },
  { name: "Azeem Ali", mobile: "+923455855544", email: "---", date: "Tuesday, February 24, 2026", time: "1:00 PM", totalFees: 400, discount: 0, tax: 0, paid: 400 },
  { name: "Adeela", mobile: "+923085485453", email: "---", date: "Tuesday, February 24, 2026", time: "10:23 AM", totalFees: 2000, discount: 0, tax: 0, paid: 2000 },
  { name: "Ahmed Ali", mobile: "+923358185585", email: "---", date: "Wednesday, February 18, 2026", time: "4:32 PM", totalFees: 400, discount: 20, tax: 0, paid: 380 },
  { name: "Sadia Iqbal", mobile: "+923337854112", email: "---", date: "Wednesday, February 18, 2026", time: "12:00 AM", totalFees: 400, discount: 0, tax: 0, paid: 400 },
  { name: "Ahmed", mobile: "+923358545878", email: "---", date: "Tuesday, February 17, 2026", time: "5:29 PM", totalFees: 400, discount: 0, tax: 0, paid: 400 },
  { name: "Sana", mobile: "+923356587444", email: "---", date: "Wednesday, January 28, 2026", time: "12:00 AM", totalFees: 400, discount: 0, tax: 0, paid: 400 },
];

export default function VisitorsPage() {
  return (
    <PageContainer title="Visitors" breadcrumbs={[{ label: "Visitor Management" }, { label: "All Visitors" }]}>
      {/* Search */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-0">
          <div>
            <label className="text-xs text-muted-foreground block">Search By Name</label>
            <input className="search-input w-40" placeholder="Search here!" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">Search By Mobile</label>
            <input className="search-input w-40" placeholder="Search here!" />
          </div>
          <button className="mt-4"><X className="w-4 h-4 text-muted-foreground" /></button>
          <button className="mt-4"><UserPlus className="w-4 h-4 text-muted-foreground" /></button>
          <div className="flex-1" />
          <button className="mt-4"><Download className="w-4 h-4 text-muted-foreground" /></button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Total Fees</th>
              <th>Discount</th>
              <th>Tax</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockVisitors.map((v, i) => (
              <tr key={i}>
                <td>{v.name}</td>
                <td>{v.mobile}</td>
                <td>{v.email}</td>
                <td>{v.date}</td>
                <td>{v.time}</td>
                <td>{v.totalFees.toLocaleString()}</td>
                <td>{v.discount}</td>
                <td>{v.tax}</td>
                <td>{v.paid.toLocaleString()}</td>
                <td>
                  <button className="action-btn action-btn-primary">
                    <Edit className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
