import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, X, XCircle, Edit, Plus, Printer, AlertTriangle, ArrowLeft } from "lucide-react";

interface SaleItem {
  code: string;
  item: string;
  quantity: number;
  unitPrice: number;
  salesTax: number;
  subTotal: number;
}

interface SaleOrder {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  subTotal: number;
  discount: number;
  totalTax: number;
  grandTotal: number;
  cashPaid: number;
  remainingBalance: number;
  cashReturned: number;
  category: string;
  paymentMode: string;
  soldTo: string;
  items: SaleItem[];
}

const mockOrders: SaleOrder[] = [
  {
    id: 1, invoiceNumber: "Inv#-SO-2026-3-3", invoiceDate: "6/3/26, 3:45 PM", subTotal: 150, discount: 0, totalTax: 0, grandTotal: 150,
    cashPaid: 1000, remainingBalance: 0, cashReturned: 850, category: "Drinks", paymentMode: "Cash - Reception", soldTo: "Walk in Customer",
    items: [{ code: "5927", item: "Water Bottles", quantity: 1, unitPrice: 150, salesTax: 0, subTotal: 150 }],
  },
  {
    id: 2, invoiceNumber: "Inv#-SO-2026-3-2", invoiceDate: "5/3/26, 5:38 PM", subTotal: 3520, discount: 0, totalTax: 66, grandTotal: 3586,
    cashPaid: 0, remainingBalance: 3586, cashReturned: 0, category: "Drinks", paymentMode: "Cash - Reception", soldTo: "Walk in Customer",
    items: [
      { code: "9930", item: "Red Bull", quantity: 10, unitPrice: 300, salesTax: 0, subTotal: 3000 },
      { code: "4089", item: "Protein Bar", quantity: 4, unitPrice: 120, salesTax: 5, subTotal: 504 },
    ],
  },
  {
    id: 3, invoiceNumber: "Inv#-SO-2026-3-1", invoiceDate: "3/3/26, 10:53 AM", subTotal: 100, discount: 50, totalTax: 5, grandTotal: 55,
    cashPaid: 0, remainingBalance: 55, cashReturned: 0, category: "Drinks", paymentMode: "Cash - Reception", soldTo: "Walk in Customer",
    items: [{ code: "4331", item: "Apple Juice", quantity: 2, unitPrice: 50, salesTax: 0, subTotal: 100 }],
  },
  {
    id: 4, invoiceNumber: "Inv#-SO-2026-2-5", invoiceDate: "28/2/26, 2:10 PM", subTotal: 500, discount: 0, totalTax: 25, grandTotal: 525,
    cashPaid: 525, remainingBalance: 0, cashReturned: 0, category: "Accessories", paymentMode: "Cash - Reception", soldTo: "Member - Ahmed",
    items: [{ code: "7501", item: "Gym Gloves", quantity: 1, unitPrice: 500, salesTax: 5, subTotal: 525 }],
  },
  {
    id: 5, invoiceNumber: "Inv#-SO-2026-2-4", invoiceDate: "25/2/26, 11:00 AM", subTotal: 3500, discount: 0, totalTax: 350, grandTotal: 3850,
    cashPaid: 3850, remainingBalance: 0, cashReturned: 0, category: "Supplements", paymentMode: "Bank Transfer", soldTo: "Member - Bilal",
    items: [{ code: "6210", item: "Whey Protein", quantity: 1, unitPrice: 3500, salesTax: 10, subTotal: 3850 }],
  },
  {
    id: 6, invoiceNumber: "Inv#-SO-2026-2-3", invoiceDate: "20/2/26, 4:30 PM", subTotal: 560, discount: 10, totalTax: 0, grandTotal: 550,
    cashPaid: 600, remainingBalance: 0, cashReturned: 50, category: "Drinks", paymentMode: "Cash - Reception", soldTo: "Walk in Customer",
    items: [
      { code: "5707", item: "Coke", quantity: 5, unitPrice: 60, salesTax: 0, subTotal: 300 },
      { code: "3832", item: "Water", quantity: 3, unitPrice: 20, salesTax: 0, subTotal: 60 },
      { code: "4331", item: "Apple Juice", quantity: 4, unitPrice: 50, salesTax: 0, subTotal: 200 },
    ],
  },
];

const ITEMS_PER_PAGE = 10;

export default function SaleOrdersPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<SaleOrder[]>(mockOrders);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("2026-03-01");
  const [toDate, setToDate] = useState("2026-03-31");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<SaleOrder | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SaleOrder | null>(null);

  // Edit state
  const [editDiscount, setEditDiscount] = useState(0);
  const [editPaymentMode, setEditPaymentMode] = useState("");
  const [editPaymentReceived, setEditPaymentReceived] = useState(0);
  const [editSoldTo, setEditSoldTo] = useState("");

  const filtered = orders.filter((o) => {
    const matchSearch = o.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || o.category === category;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalCount = filtered.length;
  const totalSales = filtered.reduce((s, o) => s + o.grandTotal, 0);

  const openDetail = (order: SaleOrder) => {
    setSelectedOrder(order);
    setEditDiscount(order.discount);
    setEditPaymentMode(order.paymentMode);
    setEditPaymentReceived(order.cashPaid);
    setEditSoldTo(order.soldTo);
    setDetailOpen(true);
  };

  const handleDelete = (order: SaleOrder) => {
    setOrders((prev) => prev.filter((o) => o.id !== order.id));
    toast({ title: "Order Deleted", description: `${order.invoiceNumber} has been removed.`, variant: "destructive" });
    setDeleteConfirm(null);
  };

  const handleCheckout = () => {
    if (!selectedOrder) return;
    const subT = selectedOrder.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
    const taxT = selectedOrder.items.reduce((s, i) => s + (i.quantity * i.unitPrice * i.salesTax) / 100, 0);
    const total = subT - editDiscount;
    const grand = total + taxT;
    const returned = editPaymentReceived > grand ? editPaymentReceived - grand : 0;
    const remaining = editPaymentReceived >= grand ? 0 : grand - editPaymentReceived;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, discount: editDiscount, paymentMode: editPaymentMode, cashPaid: editPaymentReceived, soldTo: editSoldTo, grandTotal: grand, remainingBalance: remaining, cashReturned: returned, subTotal: subT, totalTax: taxT }
          : o
      )
    );
    toast({ title: "Order Updated", description: `${selectedOrder.invoiceNumber} updated.` });
    setDetailOpen(false);
  };

  const handleSuspend = () => {
    toast({ title: "Order Suspended", description: "This sale order has been suspended." });
  };

  return (
    <PageContainer title="Sale Orders" breadcrumbs={[{ label: "Sales", href: "/sales" }, { label: "Sale Orders" }]}>
      {/* Search & Filters */}
      <div className="bg-sidebar-accent rounded-t-lg p-3 flex items-center gap-3 flex-wrap">
        <div>
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">Search By Invoice Number</span>
          <Input placeholder="Search here!" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-44 h-9 bg-background" />
        </div>
        <div>
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">From</span>
          <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-40 h-9 bg-background" />
        </div>
        <div>
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">To</span>
          <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-40 h-9 bg-background" />
        </div>
        <div>
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">Select Category</span>
          <Select value={category} onValueChange={(v) => { setCategory(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-36 h-9 bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Drinks">Drinks</SelectItem>
              <SelectItem value="Supplements">Supplements</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-1 mt-4">
          <Button variant="ghost" size="icon"><Search className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
          <Button variant="ghost" size="icon" onClick={() => { setSearch(""); setCategory("all"); }}><X className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
        </div>
        <div className="ml-auto flex items-end gap-1 mt-4">
          <Button variant="ghost" size="icon"><Plus className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
          <Button variant="ghost" size="icon"><Printer className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar-accent">
              <TableHead className="font-semibold text-sidebar-accent-foreground">Invoice Number</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Invoice Date</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Sub Total</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Discount</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Total Tax</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Grand Total</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Cash Paid</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Remaining Balance</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Cash Returned</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Category</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow><TableCell colSpan={11} className="text-center py-8 text-muted-foreground">No sale orders found.</TableCell></TableRow>
            ) : (
              paginated.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">{order.invoiceNumber}</TableCell>
                  <TableCell className="text-sm">{order.invoiceDate}</TableCell>
                  <TableCell>{order.subTotal.toLocaleString()}</TableCell>
                  <TableCell>{order.discount}</TableCell>
                  <TableCell>{order.totalTax}</TableCell>
                  <TableCell className="font-semibold">{order.grandTotal.toLocaleString()}</TableCell>
                  <TableCell>{order.cashPaid.toLocaleString()}</TableCell>
                  <TableCell>{order.remainingBalance.toLocaleString()}</TableCell>
                  <TableCell>{order.cashReturned}</TableCell>
                  <TableCell>{order.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full" onClick={() => setDeleteConfirm(order)}>
                        <XCircle className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground hover:bg-accent rounded-full" onClick={() => openDetail(order)}>
                        <Edit className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
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
            <div className="flex justify-between px-4 py-2 border-b border-border gap-8">
              <span className="text-sm">Total Count</span><span className="font-semibold">{totalCount}</span>
            </div>
            <div className="flex justify-between px-4 py-2 gap-8">
              <span className="text-sm">Total Sales</span><span className="font-semibold">{totalSales.toLocaleString()}</span>
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

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Confirmation</DialogTitle></DialogHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Are you sure you want to delete this order?
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}><X className="h-4 w-4 mr-1" /> No</Button>
            <Button onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>✓ Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Sale Order — {selectedOrder?.invoiceNumber}</DialogTitle></DialogHeader>

          {/* Top bar */}
          <div className="flex items-center justify-between bg-sidebar-accent p-3 rounded-lg">
            <Button variant="ghost" size="icon" onClick={() => setDetailOpen(false)}>
              <ArrowLeft className="h-5 w-5 text-sidebar-accent-foreground" />
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <Printer className="h-4 w-4 mr-1" /> Print
            </Button>
          </div>

          {/* Items table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-sidebar-accent">
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Action</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Code</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Item</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Quantity</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Unit Price</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Sales Tax</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Sub-Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder?.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unitPrice}</TableCell>
                    <TableCell>{item.salesTax}</TableCell>
                    <TableCell className="font-semibold">{item.subTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary panel */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <div className="flex-1 bg-background min-h-[250px]" />
            <div className="w-[400px] bg-muted/30 p-4 space-y-3 border-l border-border">
              <div className="flex justify-between"><span className="text-sm">Sub-Total</span><span className="font-bold">{selectedOrder?.subTotal.toLocaleString()}</span></div>
              <div className="flex justify-between items-center"><span className="text-sm">Discount</span><Input type="number" value={editDiscount} onChange={(e) => setEditDiscount(Number(e.target.value))} className="w-32 h-8" /></div>
              <div className="flex justify-between"><span className="text-sm">Total</span><span className="font-bold">{((selectedOrder?.subTotal || 0) - editDiscount).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-sm">Total Tax</span><span className="font-bold">{selectedOrder?.totalTax}</span></div>
              <div className="flex justify-between"><span className="text-sm font-semibold">Grand Total</span><span className="font-bold">{selectedOrder?.grandTotal.toLocaleString()}</span></div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Payment Mode</span>
                <Select value={editPaymentMode} onValueChange={setEditPaymentMode}>
                  <SelectTrigger className="w-48 h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash - Reception">Cash - Reception</SelectItem>
                    <SelectItem value="Online - Bank Alfalah">Online - Bank Alfalah</SelectItem>
                    <SelectItem value="Online - Allied Bank">Online - Allied Bank</SelectItem>
                    <SelectItem value="Credit/Debit - Card">Credit/Debit - Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between items-center"><span className="text-sm">Payment Received</span><Input type="number" value={editPaymentReceived} onChange={(e) => setEditPaymentReceived(Number(e.target.value))} className="w-32 h-8" /></div>
              <div className="flex justify-between"><span className="text-sm">Balance Returned</span><span className="font-bold">{selectedOrder?.cashReturned}</span></div>
              <div className="flex justify-between items-center"><span className="text-sm">Sold To</span><Input value={editSoldTo} onChange={(e) => setEditSoldTo(e.target.value)} className="w-48 h-8" /></div>
              <div className="flex justify-between"><span className="text-sm">Sold By</span><span className="font-medium">Admin</span></div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleSuspend}>Suspend</Button>
                <Button className="flex-1 bg-primary/80 hover:bg-primary text-primary-foreground" onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
