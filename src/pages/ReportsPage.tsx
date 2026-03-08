import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Printer, Download, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

interface ReportConfig {
  title: string;
  breadcrumb: string;
  columns: { key: string; label: string }[];
  data: Record<string, string | number>[];
  filters?: string[];
  extraFilters?: string[];
  emptyMessage?: string;
}

const reportConfigs: Record<string, ReportConfig> = {
  defaulter: {
    title: "Defaulter Report",
    breadcrumb: "Defaulter Report",
    columns: [
      { key: "membershipNo", label: "Membership No" },
      { key: "photo", label: "Photo" },
      { key: "name", label: "Name" },
      { key: "mobile", label: "Mobile" },
      { key: "dueMonth", label: "Due Month" },
      { key: "fee", label: "Fee" },
      { key: "date", label: "Date" },
      { key: "action", label: "Action" },
    ],
    data: [],
    emptyMessage: "No Defaulters Found.",
  },
  "new-member": {
    title: "New Member Report",
    breadcrumb: "New Member Report",
    columns: [
      { key: "membershipNo", label: "Membership No#" },
      { key: "image", label: "Image" },
      { key: "name", label: "Name" },
      { key: "mobile", label: "Mobile" },
      { key: "package", label: "Package" },
      { key: "registeredBy", label: "Registered By" },
      { key: "date", label: "Date" },
    ],
    data: [
      { membershipNo: 122, image: "/avatars/avatar-1.jpg", name: "ahmed", mobile: "+923325685258", package: "Monthly Package", registeredBy: "Admin", date: "Mar 7, 2026, 5:00:44 PM" },
      { membershipNo: 121, image: "/avatars/avatar-6.jpg", name: "Uzair ali", mobile: "+923437033333", package: "Monthly", registeredBy: "Admin", date: "Mar 3, 2026, 10:42:32 AM" },
      { membershipNo: 120, image: "/avatars/avatar-7.jpg", name: "Hifsa Ali", mobile: "+923325682852", package: "Monthly Package", registeredBy: "Admin", date: "Mar 3, 2026, 10:13:06 AM" },
    ],
    filters: ["package"],
  },
  sales: {
    title: "Sales Report",
    breadcrumb: "Sales",
    columns: [
      { key: "membershipNo", label: "Membership No" },
      { key: "photo", label: "Photo" },
      { key: "name", label: "Name" },
      { key: "packageName", label: "Package Name" },
      { key: "registrationFees", label: "Registration Fees" },
      { key: "monthFees", label: "Month Fees" },
      { key: "trainerFees", label: "Trainer Fees" },
      { key: "totalFees", label: "Total Fees" },
      { key: "discount", label: "Discount" },
      { key: "tax", label: "Tax" },
      { key: "totalCollectedFee", label: "Total Collected Fee" },
      { key: "comments", label: "Comments" },
      { key: "date", label: "Date" },
      { key: "mode", label: "Mode" },
      { key: "enteredBy", label: "Entered By" },
    ],
    data: [
      { membershipNo: "0000", photo: "", name: "Kainat Arshad", packageName: "Visitor/Day Pass", registrationFees: 0, monthFees: 1000, trainerFees: 0, totalFees: 1000, discount: 0, tax: 0, totalCollectedFee: 1000, comments: "", date: "Mar 8, 2026, 10:49:02 PM", mode: "Cash-Reception", enteredBy: "Admin" },
      { membershipNo: "0000", photo: "", name: "Ali", packageName: "Visitor/Day Pass", registrationFees: 0, monthFees: 400, trainerFees: 0, totalFees: 400, discount: 0, tax: 0, totalCollectedFee: 400, comments: "", date: "Mar 7, 2026, 5:08:44 PM", mode: "Cash-Reception", enteredBy: "Admin" },
      { membershipNo: 122, photo: "/avatars/avatar-1.jpg", name: "ahmed", packageName: "Monthly", registrationFees: 4000, monthFees: 5000, trainerFees: 0, totalFees: 9000, discount: 100, tax: 0, totalCollectedFee: 8900, comments: "", date: "Mar 7, 2026, 4:59:53 PM", mode: "Cash-Reception", enteredBy: "Admin" },
      { membershipNo: "0000", photo: "", name: "Walk in Customer", packageName: "POS Sales", registrationFees: 0, monthFees: 150, trainerFees: 0, totalFees: 150, discount: 0, tax: 0, totalCollectedFee: 150, comments: "", date: "Mar 6, 2026, 3:45:50 PM", mode: "Cash-Reception", enteredBy: "Admin" },
      { membershipNo: "0000", photo: "", name: "Walk in Customer", packageName: "POS Sales", registrationFees: 0, monthFees: 3520, trainerFees: 0, totalFees: 3520, discount: 0, tax: 66, totalCollectedFee: 3586, comments: "", date: "Mar 5, 2026, 5:38:56 PM", mode: "Cash-Reception", enteredBy: "Admin" },
      { membershipNo: "0000", photo: "", name: "Walk in Customer", packageName: "POS Sales", registrationFees: 0, monthFees: 100, trainerFees: 0, totalFees: 100, discount: 50, tax: 5, totalCollectedFee: 55, comments: "", date: "Mar 3, 2026, 10:53:53 AM", mode: "Cash-Reception", enteredBy: "Admin" },
    ],
    filters: ["packageName"],
    extraFilters: ["enteredBy", "mode"],
  },
  billing: {
    title: "Billing Report",
    breadcrumb: "Billing",
    columns: [
      { key: "receiptNo", label: "Receipt #" },
      { key: "date", label: "Date" },
      { key: "memberName", label: "Member Name" },
      { key: "package", label: "Package" },
      { key: "amount", label: "Amount" },
      { key: "paymentMode", label: "Payment Mode" },
      { key: "status", label: "Status" },
    ],
    data: [
      { receiptNo: "RCP-001", date: "01/03/26", memberName: "Zain Malik", package: "Premium", amount: 8000, paymentMode: "Cash", status: "Paid" },
      { receiptNo: "RCP-002", date: "02/03/26", memberName: "Ali Raza", package: "Standard", amount: 5000, paymentMode: "Bank Transfer", status: "Paid" },
      { receiptNo: "RCP-003", date: "03/03/26", memberName: "Sara Ahmed", package: "Basic", amount: 3000, paymentMode: "Cash", status: "Paid" },
      { receiptNo: "RCP-004", date: "04/03/26", memberName: "Faisal Raza", package: "Premium", amount: 8000, paymentMode: "Card", status: "Pending" },
    ],
  },
  "daily-closing": {
    title: "Daily Closing Report",
    breadcrumb: "Daily Closing",
    columns: [
      { key: "date", label: "Date" },
      { key: "totalSales", label: "Total Sales" },
      { key: "totalCollection", label: "Total Collection" },
      { key: "cashInHand", label: "Cash In Hand" },
      { key: "bankDeposit", label: "Bank Deposit" },
      { key: "expense", label: "Expenses" },
      { key: "netCash", label: "Net Cash" },
    ],
    data: [
      { date: "01/03/26", totalSales: 25000, totalCollection: 23000, cashInHand: 15000, bankDeposit: 8000, expense: 2500, netCash: 12500 },
      { date: "02/03/26", totalSales: 18000, totalCollection: 18000, cashInHand: 12000, bankDeposit: 6000, expense: 1800, netCash: 10200 },
      { date: "03/03/26", totalSales: 32000, totalCollection: 30000, cashInHand: 20000, bankDeposit: 10000, expense: 3000, netCash: 17000 },
      { date: "04/03/26", totalSales: 15000, totalCollection: 15000, cashInHand: 10000, bankDeposit: 5000, expense: 1500, netCash: 8500 },
      { date: "05/03/26", totalSales: 28000, totalCollection: 26000, cashInHand: 18000, bankDeposit: 8000, expense: 2000, netCash: 16000 },
    ],
  },
  "pos-sales": {
    title: "POS Sales Report",
    breadcrumb: "POS Sales Report",
    columns: [
      { key: "invoice", label: "Invoice #" },
      { key: "date", label: "Date" },
      { key: "product", label: "Product" },
      { key: "qty", label: "Quantity" },
      { key: "unitPrice", label: "Unit Price" },
      { key: "total", label: "Total" },
      { key: "soldBy", label: "Sold By" },
    ],
    data: [
      { invoice: "POS-001", date: "01/03/26", product: "Water Bottle", qty: 5, unitPrice: 150, total: 750, soldBy: "Admin" },
      { invoice: "POS-002", date: "02/03/26", product: "Red Bull", qty: 10, unitPrice: 300, total: 3000, soldBy: "Admin" },
      { invoice: "POS-003", date: "03/03/26", product: "Protein Bar", qty: 8, unitPrice: 120, total: 960, soldBy: "Receptionist" },
      { invoice: "POS-004", date: "04/03/26", product: "Whey Protein", qty: 2, unitPrice: 3500, total: 7000, soldBy: "Admin" },
      { invoice: "POS-005", date: "05/03/26", product: "Gym Gloves", qty: 3, unitPrice: 500, total: 1500, soldBy: "Receptionist" },
    ],
  },
  "purchase-history": {
    title: "Purchase History Report",
    breadcrumb: "Purchase History",
    columns: [
      { key: "poNumber", label: "PO Number" },
      { key: "date", label: "Date" },
      { key: "supplier", label: "Supplier" },
      { key: "items", label: "Items" },
      { key: "total", label: "Total Amount" },
      { key: "status", label: "Status" },
    ],
    data: [
      { poNumber: "PO-2026-001", date: "01/03/26", supplier: "Nutrition Hub", items: 5, total: 45000, status: "Received" },
      { poNumber: "PO-2026-002", date: "03/03/26", supplier: "FitGear Co", items: 3, total: 22000, status: "Received" },
      { poNumber: "PO-2026-003", date: "05/03/26", supplier: "BevCo", items: 10, total: 15000, status: "Pending" },
      { poNumber: "PO-2026-004", date: "06/03/26", supplier: "Supplement World", items: 2, total: 35000, status: "In Transit" },
    ],
  },
  "members-attendance": {
    title: "Members Attendance Report",
    breadcrumb: "Members Attendance",
    columns: [
      { key: "memberId", label: "Member ID" },
      { key: "name", label: "Name" },
      { key: "package", label: "Package" },
      { key: "totalDays", label: "Total Days" },
      { key: "present", label: "Present" },
      { key: "absent", label: "Absent" },
      { key: "percentage", label: "Attendance %" },
    ],
    data: [
      { memberId: "M-1001", name: "Ahmed Khan", package: "Premium", totalDays: 26, present: 22, absent: 4, percentage: "85%" },
      { memberId: "M-1005", name: "Bilal Shah", package: "Standard", totalDays: 26, present: 18, absent: 8, percentage: "69%" },
      { memberId: "M-1012", name: "Usman Ali", package: "Basic", totalDays: 26, present: 24, absent: 2, percentage: "92%" },
      { memberId: "M-1018", name: "Sara Ahmed", package: "Premium", totalDays: 26, present: 20, absent: 6, percentage: "77%" },
      { memberId: "M-1025", name: "Hamza Tariq", package: "Standard", totalDays: 26, present: 15, absent: 11, percentage: "58%" },
    ],
    filters: ["package"],
  },
  "trainers-attendance": {
    title: "Trainers Attendance Report",
    breadcrumb: "Trainers Attendance",
    columns: [
      { key: "trainerId", label: "Trainer ID" },
      { key: "name", label: "Name" },
      { key: "specialization", label: "Specialization" },
      { key: "totalDays", label: "Total Days" },
      { key: "present", label: "Present" },
      { key: "absent", label: "Absent" },
      { key: "percentage", label: "Attendance %" },
    ],
    data: [
      { trainerId: "T-001", name: "Kamran Fitness", specialization: "Weight Training", totalDays: 26, present: 25, absent: 1, percentage: "96%" },
      { trainerId: "T-002", name: "Ali Coach", specialization: "Cardio", totalDays: 26, present: 23, absent: 3, percentage: "88%" },
      { trainerId: "T-003", name: "Fatima PT", specialization: "Yoga", totalDays: 26, present: 24, absent: 2, percentage: "92%" },
    ],
  },
  "check-in": {
    title: "Check-In Report",
    breadcrumb: "Check-In Report",
    columns: [
      { key: "date", label: "Date" },
      { key: "memberId", label: "Member ID" },
      { key: "name", label: "Name" },
      { key: "checkIn", label: "Check-In Time" },
      { key: "checkOut", label: "Check-Out Time" },
      { key: "duration", label: "Duration" },
    ],
    data: [
      { date: "08/03/26", memberId: "M-1001", name: "Ahmed Khan", checkIn: "06:30 AM", checkOut: "08:15 AM", duration: "1h 45m" },
      { date: "08/03/26", memberId: "M-1012", name: "Usman Ali", checkIn: "07:00 AM", checkOut: "08:30 AM", duration: "1h 30m" },
      { date: "08/03/26", memberId: "M-1018", name: "Sara Ahmed", checkIn: "09:00 AM", checkOut: "10:30 AM", duration: "1h 30m" },
      { date: "08/03/26", memberId: "M-1005", name: "Bilal Shah", checkIn: "05:00 PM", checkOut: "06:45 PM", duration: "1h 45m" },
      { date: "08/03/26", memberId: "M-1025", name: "Hamza Tariq", checkIn: "06:00 PM", checkOut: "07:30 PM", duration: "1h 30m" },
    ],
  },
  "employees-attendance": {
    title: "Employees Attendance Report",
    breadcrumb: "Employees Attendance",
    columns: [
      { key: "empId", label: "Employee ID" },
      { key: "name", label: "Name" },
      { key: "department", label: "Department" },
      { key: "totalDays", label: "Total Days" },
      { key: "present", label: "Present" },
      { key: "absent", label: "Absent" },
      { key: "late", label: "Late" },
      { key: "percentage", label: "Attendance %" },
    ],
    data: [
      { empId: "E-001", name: "Admin", department: "Management", totalDays: 26, present: 26, absent: 0, late: 0, percentage: "100%" },
      { empId: "E-002", name: "Receptionist A", department: "Front Desk", totalDays: 26, present: 24, absent: 2, late: 3, percentage: "92%" },
      { empId: "E-003", name: "Cleaner B", department: "Maintenance", totalDays: 26, present: 22, absent: 4, late: 1, percentage: "85%" },
    ],
  },
  subscriptions: {
    title: "Subscriptions Report",
    breadcrumb: "Subscriptions Report",
    columns: [
      { key: "memberId", label: "Member ID" },
      { key: "name", label: "Name" },
      { key: "package", label: "Package" },
      { key: "startDate", label: "Start Date" },
      { key: "endDate", label: "End Date" },
      { key: "status", label: "Status" },
      { key: "amount", label: "Amount" },
    ],
    data: [
      { memberId: "M-1001", name: "Ahmed Khan", package: "Premium", startDate: "01/01/26", endDate: "01/04/26", status: "Active", amount: 24000 },
      { memberId: "M-1005", name: "Bilal Shah", package: "Standard", startDate: "15/01/26", endDate: "15/04/26", status: "Active", amount: 15000 },
      { memberId: "M-1012", name: "Usman Ali", package: "Basic", startDate: "01/02/26", endDate: "01/05/26", status: "Active", amount: 9000 },
      { memberId: "M-1018", name: "Faisal Raza", package: "Premium", startDate: "01/12/25", endDate: "01/03/26", status: "Expired", amount: 24000 },
      { memberId: "M-1025", name: "Hamza Tariq", package: "Standard", startDate: "10/02/26", endDate: "10/05/26", status: "Active", amount: 15000 },
    ],
    filters: ["package"],
  },
  "training-session": {
    title: "Training Session Report",
    breadcrumb: "Training Session Report",
    columns: [
      { key: "sessionId", label: "Session ID" },
      { key: "trainer", label: "Trainer" },
      { key: "member", label: "Member" },
      { key: "service", label: "Service" },
      { key: "date", label: "Date" },
      { key: "time", label: "Time" },
      { key: "status", label: "Status" },
    ],
    data: [
      { sessionId: "TS-001", trainer: "Kamran Fitness", member: "Ahmed Khan", service: "Personal Training", date: "08/03/26", time: "07:00 AM", status: "Completed" },
      { sessionId: "TS-002", trainer: "Ali Coach", member: "Bilal Shah", service: "Cardio Training", date: "08/03/26", time: "09:00 AM", status: "Completed" },
      { sessionId: "TS-003", trainer: "Fatima PT", member: "Sara Ahmed", service: "Yoga", date: "08/03/26", time: "10:00 AM", status: "Scheduled" },
      { sessionId: "TS-004", trainer: "Kamran Fitness", member: "Usman Ali", service: "Personal Training", date: "08/03/26", time: "05:00 PM", status: "Cancelled" },
    ],
  },
  member: {
    title: "Member Report",
    breadcrumb: "Member Report",
    columns: [
      { key: "memberId", label: "Member ID" },
      { key: "name", label: "Name" },
      { key: "mobile", label: "Mobile" },
      { key: "email", label: "Email" },
      { key: "package", label: "Package" },
      { key: "joinDate", label: "Join Date" },
      { key: "expiryDate", label: "Expiry Date" },
      { key: "status", label: "Status" },
    ],
    data: [
      { memberId: "M-1001", name: "Ahmed Khan", mobile: "0300-1234567", email: "ahmed@mail.com", package: "Premium", joinDate: "01/01/26", expiryDate: "01/04/26", status: "Active" },
      { memberId: "M-1005", name: "Bilal Shah", mobile: "0312-9876543", email: "bilal@mail.com", package: "Standard", joinDate: "15/01/26", expiryDate: "15/04/26", status: "Active" },
      { memberId: "M-1012", name: "Usman Ali", mobile: "0321-5556677", email: "usman@mail.com", package: "Basic", joinDate: "01/02/26", expiryDate: "01/05/26", status: "Active" },
      { memberId: "M-1018", name: "Faisal Raza", mobile: "0333-4445566", email: "faisal@mail.com", package: "Premium", joinDate: "01/12/25", expiryDate: "01/03/26", status: "Expired" },
      { memberId: "M-1025", name: "Hamza Tariq", mobile: "0345-7788990", email: "hamza@mail.com", package: "Standard", joinDate: "10/02/26", expiryDate: "10/05/26", status: "Active" },
      { memberId: "M-1030", name: "Zain Malik", mobile: "0300-1112233", email: "zain@mail.com", package: "Premium", joinDate: "01/03/26", expiryDate: "01/06/26", status: "Active" },
    ],
    filters: ["package"],
  },
};

const ITEMS_PER_PAGE = 10;

interface ReportViewProps {
  reportKey: string;
}

function ReportView({ reportKey }: ReportViewProps) {
  const config = reportConfigs[reportKey];
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("2026-03-01");
  const [toDate, setToDate] = useState("2026-03-31");
  const [filterValue, setFilterValue] = useState("all");
  const [extraFilter1, setExtraFilter1] = useState("all");
  const [extraFilter2, setExtraFilter2] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  if (!config) return <div className="p-8 text-center text-muted-foreground">Report not found.</div>;

  const extraFilterOptions1 = config.extraFilters?.[0]
    ? [...new Set(config.data.map((r) => String(r[config.extraFilters![0]])))]
    : [];
  const extraFilterOptions2 = config.extraFilters?.[1]
    ? [...new Set(config.data.map((r) => String(r[config.extraFilters![1]])))]
    : [];

  const filtered = config.data.filter((row) => {
    const matchSearch = Object.values(row).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    );
    const matchFilter =
      filterValue === "all" ||
      !config.filters?.length ||
      String(row[config.filters[0]]) === filterValue;
    const matchExtra1 =
      extraFilter1 === "all" ||
      !config.extraFilters?.[0] ||
      String(row[config.extraFilters[0]]) === extraFilter1;
    const matchExtra2 =
      extraFilter2 === "all" ||
      !config.extraFilters?.[1] ||
      String(row[config.extraFilters[1]]) === extraFilter2;
    return matchSearch && matchFilter && matchExtra1 && matchExtra2;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const filterOptions = config.filters?.length
    ? [...new Set(config.data.map((r) => String(r[config.filters![0]])))]
    : [];

  const handleExport = () => {
    const exportData = filtered.map((row) => {
      const obj: Record<string, string | number> = {};
      config.columns.forEach((col) => {
        if (col.key !== "photo" && col.key !== "image" && col.key !== "action" && col.key !== "comments") {
          obj[col.label] = row[col.key];
        }
      });
      return obj;
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, config.title);
    XLSX.writeFile(wb, `${config.title.replace(/\s+/g, "_")}.xlsx`);
    toast({ title: "Exported", description: `${config.title} exported to Excel.` });
  };

  const isImageCol = (key: string) => key === "photo" || key === "image";
  const isActionCol = (key: string) => key === "action";
  const isCommentsCol = (key: string) => key === "comments";

  const searchLabel = reportKey === "defaulter"
    ? "Search By Membership / Name"
    : reportKey === "new-member"
    ? "Search By Membership ID"
    : reportKey === "sales"
    ? "Search by Membership ID"
    : "Search";

  return (
    <div>
      {/* Filters */}
      <div className="bg-sidebar-accent rounded-t-lg p-3 flex items-center gap-3 flex-wrap">
        <div>
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">{searchLabel}</span>
          <Input placeholder="Search here!" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-44 h-9 bg-background" />
        </div>
        {extraFilterOptions1.length > 0 && (
          <div>
            <span className="text-xs text-sidebar-accent-foreground block mb-0.5 capitalize">{config.extraFilters![0].replace(/([A-Z])/g, " $1").trim()}</span>
            <Select value={extraFilter1} onValueChange={(v) => { setExtraFilter1(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-36 h-9 bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {extraFilterOptions1.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {filterOptions.length > 0 && (
          <div>
            <span className="text-xs text-sidebar-accent-foreground block mb-0.5">Select {config.filters![0].replace(/([A-Z])/g, " $1").trim()}</span>
            <Select value={filterValue} onValueChange={(v) => { setFilterValue(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-36 h-9 bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {extraFilterOptions2.length > 0 && (
          <div>
            <span className="text-xs text-sidebar-accent-foreground block mb-0.5 capitalize">Mode Of Payment</span>
            <Select value={extraFilter2} onValueChange={(v) => { setExtraFilter2(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-36 h-9 bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {extraFilterOptions2.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div>
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">From</span>
          <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-40 h-9 bg-background" />
        </div>
        <div>
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">To</span>
          <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-40 h-9 bg-background" />
        </div>
        <div className="flex items-end gap-1 mt-4">
          <Button variant="ghost" size="icon"><Search className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
          <Button variant="ghost" size="icon" onClick={() => { setSearch(""); setFilterValue("all"); }}><X className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
        </div>
        <div className="ml-auto flex items-end gap-1 mt-4">
          <Button variant="ghost" size="icon"><Printer className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
          <Button variant="ghost" size="icon" onClick={handleExport}><Download className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar-accent">
              {config.columns.map((col) => (
                <TableHead key={col.key} className="font-semibold text-sidebar-accent-foreground">{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={config.columns.length} className="text-center py-8 text-muted-foreground">
                  {config.emptyMessage || "No records found."}
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-muted/50">
                  {config.columns.map((col) => (
                    <TableCell key={col.key}>
                      {isImageCol(col.key) ? (
                        String(row[col.key]) ? (
                          <Avatar className="h-14 w-14 rounded-full">
                            <AvatarImage src={String(row[col.key])} className="object-cover" />
                            <AvatarFallback className="bg-muted text-muted-foreground">{String(row.name || "").charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar className="h-14 w-14 rounded-full">
                            <AvatarFallback className="bg-muted text-muted-foreground">{String(row.name || "").charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )
                      ) : isActionCol(col.key) ? (
                        <Button variant="outline" size="sm" className="text-xs">View</Button>
                      ) : isCommentsCol(col.key) ? (
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                      ) : col.key === "status" ? (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          row[col.key] === "Active" || row[col.key] === "Completed" || row[col.key] === "Paid" || row[col.key] === "Received"
                            ? "bg-green-100 text-green-700"
                            : row[col.key] === "Pending" || row[col.key] === "Scheduled" || row[col.key] === "In Transit"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {String(row[col.key])}
                        </span>
                      ) : typeof row[col.key] === "number" ? (
                        <span className="font-medium">{Number(row[col.key]).toLocaleString()}</span>
                      ) : (
                        String(row[col.key])
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Summary */}
        <div className="flex border-t border-border">
          <div className="flex-1" />
          <div className="border-l border-border">
            <div className="px-4 py-2 font-semibold text-center border-b border-border">Summary</div>
            <div className="flex justify-between px-4 py-2 gap-8">
              <span className="text-sm">Total Count</span>
              <span className="font-semibold">{filtered.length}</span>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1 py-3 bg-sidebar-accent">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>⏮</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>◀</Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button key={page} variant={currentPage === page ? "default" : "ghost"} size="icon"
              className={`h-8 w-8 rounded-full ${currentPage === page ? "bg-primary text-primary-foreground" : "text-sidebar-accent-foreground"}`}
              onClick={() => setCurrentPage(page)}>{page}</Button>
          ))}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>▶</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>⏭</Button>
        </div>
      </div>
    </div>
  );
}

const reportRoutes: { key: string; path: string }[] = [
  { key: "defaulter", path: "defaulter" },
  { key: "new-member", path: "new-member" },
  { key: "sales", path: "sales" },
  { key: "billing", path: "billing" },
  { key: "daily-closing", path: "daily-closing" },
  { key: "pos-sales", path: "pos-sales" },
  { key: "purchase-history", path: "purchase-history" },
  { key: "members-attendance", path: "members-attendance" },
  { key: "trainers-attendance", path: "trainers-attendance" },
  { key: "check-in", path: "check-in" },
  { key: "employees-attendance", path: "employees-attendance" },
  { key: "subscriptions", path: "subscriptions" },
  { key: "training-session", path: "training-session" },
  { key: "member", path: "member" },
];

export default function ReportsPage() {
  const path = window.location.pathname;
  const segment = path.split("/reports/")[1] || "defaulter";
  const reportKey = reportRoutes.find((r) => r.path === segment)?.key || "defaulter";
  const config = reportConfigs[reportKey];

  return (
    <PageContainer title={config?.title || "Reports"} breadcrumbs={[{ label: "Reports", href: "/reports" }, { label: config?.breadcrumb || "Report" }]}>
      <ReportView reportKey={reportKey} />
    </PageContainer>
  );
}
