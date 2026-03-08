import PageContainer from "@/components/PageContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const topStats = [
  { label: "Total Sales", value: "53,600", className: "stat-card-dark" },
  { label: "New Members Registered", value: "3", className: "stat-card-success" },
  { label: "Total Active Customers", value: "78", className: "stat-card-info" },
  { label: "Defaulters", value: "44", className: "stat-card-danger" },
  { label: "Active Members This Month", value: "34", className: "stat-card-warning" },
  { label: "Total Visitors", value: "2", className: "stat-card-purple" },
  { label: "Total Inquiry", value: "3", className: "stat-card-teal" },
];

const comparisonStats = [
  { label: "Churn Rate", value: "0.00%", change: "0.00%", changeType: "down" as const, vsLast: "No Data" },
  { label: "Sales", value: "53.6k Rs", change: "0.2M", changeType: "down" as const, vsLast: "0.3M" },
  { label: "Active Members", value: "34", change: "3", changeType: "down" as const, vsLast: "37" },
  { label: "New Members", value: "3", change: "15", changeType: "down" as const, vsLast: "18" },
  { label: "Day Pass", value: "2", change: "3", changeType: "down" as const, vsLast: "5" },
];

const monthlyData = [
  { month: "Apr", "2026": 0, "2025": 0 },
  { month: "May", "2026": 0, "2025": 0 },
  { month: "Jun", "2026": 0, "2025": 0 },
  { month: "Jul", "2026": 0, "2025": 100000 },
  { month: "Aug", "2026": 0, "2025": 200000 },
  { month: "Sep", "2026": 0, "2025": 500000 },
  { month: "Oct", "2026": 0, "2025": 800000 },
  { month: "Nov", "2026": 0, "2025": 1200000 },
  { month: "Dec", "2026": 0, "2025": 1500000 },
  { month: "Jan", "2026": 2000000, "2025": 1800000 },
  { month: "Feb", "2026": 2500000, "2025": 2000000 },
  { month: "Mar", "2026": 53600, "2025": 2200000 },
];

const pieData = [
  { name: "Monthly", value: 28300, color: "hsl(145, 65%, 42%)" },
  { name: "Family", value: 10400, color: "hsl(205, 85%, 50%)" },
  { name: "VIP", value: 8500, color: "hsl(25, 95%, 53%)" },
  { name: "Yearly", value: 6400, color: "hsl(280, 65%, 50%)" },
];

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard" breadcrumbs={[{ label: "Dashboard" }, { label: "Dashboard" }]}>
      {/* Month/Year Selector */}
      <div className="flex justify-end gap-3 mb-6">
        <div>
          <span className="text-sm text-muted-foreground mr-2">Select Month</span>
          <Select defaultValue="march">
            <SelectTrigger className="w-32 inline-flex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <span className="text-sm text-muted-foreground mr-2">Select Year</span>
          <Select defaultValue="2026">
            <SelectTrigger className="w-24 inline-flex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {topStats.map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.className}`}>
            <p className="text-xs opacity-80 mb-1">{stat.label}</p>
            <p className="text-2xl font-heading font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Comparison Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {comparisonStats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-heading font-bold mb-3">{stat.value}</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                {stat.changeType === "down" ? (
                  <TrendingDown className="w-3 h-3 text-destructive" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-success" />
                )}
                <span className="text-destructive">{stat.change}</span>
                <span className="text-muted-foreground">Change</span>
              </div>
              <div className="text-muted-foreground">
                {stat.vsLast} <span className="text-[10px]">VS last Month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4">
          <h3 className="font-heading font-bold mb-4">Monthly Sales 2024-25</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="2026" name="2026 Sales" fill="hsl(205, 85%, 50%)" />
              <Bar dataKey="2025" name="2025 Sales" fill="hsl(145, 65%, 42%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="font-heading font-bold mb-4">Package Wise Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${(value / 1000).toFixed(1)}K`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 py-6 border-t border-border text-center text-sm text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">Powered by Lifestyle Reset</p>
        <p>
          <a href="https://wa.me/923042451070" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            📱 +92-304-2451070
          </a>
        </p>
        <p>
          <a href="mailto:researcher@datafyassociates.com" className="hover:text-primary">
            ✉️ researcher@datafyassociates.com
          </a>
        </p>
      </div>
    </PageContainer>
  );
}
