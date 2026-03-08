import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Search, X, XCircle, Edit, User, AlertTriangle, ArrowLeft, Printer, Users, Save } from "lucide-react";

interface OrderItem {
  code: string;
  item: string;
  quantity: number;
  purchasePrice: number;
  subTotal: number;
  wholesalePrice: number;
  retailPrice: number;
}

interface PurchaseOrder {
  id: number;
  orderNumber: string;
  createdDate: string;
  supplier: string;
  supplierContact: string;
  remarks: string;
  remainingBalance: number;
  status: "unfulfilled" | "fulfilled";
  items: OrderItem[];
  paymentMode: string;
}

const mockOrders: PurchaseOrder[] = [
  {
    id: 1, orderNumber: "Inv#-PO-2026-3-1", createdDate: "5/3/26, 5:43 PM", supplier: "Muhammad Aqeel", supplierContact: "03454404345",
    remarks: "Need this to be purchased by tomorrow.", remainingBalance: 19550, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [
      { code: "9930", item: "Red Bull", quantity: 10, purchasePrice: 80, subTotal: 800, wholesalePrice: 80, retailPrice: 100 },
      { code: "5927", item: "Water Bottles", quantity: 125, purchasePrice: 150, subTotal: 18750, wholesalePrice: 100, retailPrice: 150 },
    ],
  },
  {
    id: 2, orderNumber: "Inv#-PO-2026-2-2", createdDate: "25/2/26, 10:43 PM", supplier: "Adeel Equipment Supplier", supplierContact: "03654545454",
    remarks: "No Remarks", remainingBalance: 450, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "4331", item: "Apple Juice", quantity: 15, purchasePrice: 30, subTotal: 450, wholesalePrice: 40, retailPrice: 50 }],
  },
  {
    id: 3, orderNumber: "Inv#-PO-2026-2-1", createdDate: "25/2/26, 10:43 PM", supplier: "Adeel Equipment Supplier", supplierContact: "03654545454",
    remarks: "No Remarks", remainingBalance: 0, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "1431", item: "Towel", quantity: 5, purchasePrice: 100, subTotal: 500, wholesalePrice: 150, retailPrice: 200 }],
  },
  {
    id: 4, orderNumber: "108", createdDate: "18/12/25, 3:43 PM", supplier: "Uzair Swimming Product Supplier", supplierContact: "03333333333",
    remarks: "No Remarks", remainingBalance: 0, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "5707", item: "Coke", quantity: 20, purchasePrice: 40, subTotal: 800, wholesalePrice: 50, retailPrice: 60 }],
  },
  {
    id: 5, orderNumber: "792", createdDate: "18/12/25, 3:04 PM", supplier: "Uzair Swimming Product Supplier", supplierContact: "03333333333",
    remarks: "No Remarks", remainingBalance: 0, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "3832", item: "Water", quantity: 50, purchasePrice: 10, subTotal: 500, wholesalePrice: 15, retailPrice: 20 }],
  },
  {
    id: 6, orderNumber: "376", createdDate: "15/12/25, 2:03 PM", supplier: "Waqas Ali", supplierContact: "03331121212",
    remarks: "No Remarks", remainingBalance: 0, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "4089", item: "Protein Bar", quantity: 10, purchasePrice: 80, subTotal: 800, wholesalePrice: 100, retailPrice: 120 }],
  },
  {
    id: 7, orderNumber: "802", createdDate: "11/12/25, 2:44 PM", supplier: "Ali Khan", supplierContact: "03331245787",
    remarks: "No Remarks", remainingBalance: 0, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "6210", item: "Whey Protein", quantity: 2, purchasePrice: 2500, subTotal: 5000, wholesalePrice: 3000, retailPrice: 3500 }],
  },
  {
    id: 8, orderNumber: "331", createdDate: "30/7/25, 10:35 AM", supplier: "Waqas", supplierContact: "03437068981",
    remarks: "No Remarks", remainingBalance: 0, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "4331", item: "Apple Juice", quantity: 30, purchasePrice: 30, subTotal: 900, wholesalePrice: 40, retailPrice: 50 }],
  },
  {
    id: 9, orderNumber: "958", createdDate: "31/5/25, 3:51 PM", supplier: "Osama Sports", supplierContact: "03228222425",
    remarks: "No Remarks", remainingBalance: 0, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "7501", item: "Gym Gloves", quantity: 20, purchasePrice: 300, subTotal: 6000, wholesalePrice: 400, retailPrice: 500 }],
  },
  {
    id: 10, orderNumber: "245", createdDate: "25/4/25, 4:16 PM", supplier: "Osama Sports", supplierContact: "03228222425",
    remarks: "No Remarks", remainingBalance: 0, status: "unfulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "8844", item: "Skipping Rope", quantity: 10, purchasePrice: 150, subTotal: 1500, wholesalePrice: 200, retailPrice: 250 }],
  },
  {
    id: 11, orderNumber: "FUL-001", createdDate: "10/1/26, 9:00 AM", supplier: "Ali Khan", supplierContact: "03331245787",
    remarks: "Delivered on time", remainingBalance: 0, status: "fulfilled", paymentMode: "Bank Transfer",
    items: [{ code: "2290", item: "Shaker Bottle", quantity: 50, purchasePrice: 150, subTotal: 7500, wholesalePrice: 200, retailPrice: 280 }],
  },
  {
    id: 12, orderNumber: "FUL-002", createdDate: "15/2/26, 11:00 AM", supplier: "Muhammad Aqeel", supplierContact: "03454404345",
    remarks: "All items received", remainingBalance: 0, status: "fulfilled", paymentMode: "Cash - Reception",
    items: [{ code: "3355", item: "BCAA Powder", quantity: 10, purchasePrice: 1800, subTotal: 18000, wholesalePrice: 2200, retailPrice: 2600 }],
  },
];

const ITEMS_PER_PAGE = 10;

export default function PurchaseOrdersPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<PurchaseOrder[]>(mockOrders);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"unfulfilled" | "fulfilled">("unfulfilled");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<PurchaseOrder | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

  // Edit state
  const [editItems, setEditItems] = useState<OrderItem[]>([]);
  const [editRemarks, setEditRemarks] = useState("");
  const [editRemaining, setEditRemaining] = useState(0);
  const [editPaymentMode, setEditPaymentMode] = useState("");

  const filtered = orders.filter(
    (o) => o.status === activeTab && (o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.supplier.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const openDetail = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setEditItems(order.items.map((i) => ({ ...i })));
    setEditRemarks(order.remarks);
    setEditRemaining(order.remainingBalance);
    setEditPaymentMode(order.paymentMode);
    setDetailOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedOrder) return;
    const grandTotal = editItems.reduce((s, i) => s + i.subTotal, 0);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, items: editItems, remarks: editRemarks, remainingBalance: editRemaining, paymentMode: editPaymentMode }
          : o
      )
    );
    toast({ title: "Order Updated", description: `${selectedOrder.orderNumber} updated. Grand Total: ${grandTotal}` });
    setDetailOpen(false);
  };

  const handleFulfill = () => {
    if (!selectedOrder) return;
    setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? { ...o, status: "fulfilled" as const } : o)));
    toast({ title: "Order Fulfilled", description: `${selectedOrder.orderNumber} has been fulfilled.` });
    setDetailOpen(false);
  };

  const handleDelete = (order: PurchaseOrder) => {
    setOrders((prev) => prev.filter((o) => o.id !== order.id));
    toast({ title: "Order Deleted", description: `${order.orderNumber} has been removed.`, variant: "destructive" });
    setDeleteConfirm(null);
  };

  const handleDeleteFromDetail = () => {
    if (!selectedOrder) return;
    handleDelete(selectedOrder);
    setDetailOpen(false);
  };

  const updateItem = (idx: number, field: keyof OrderItem, value: number) => {
    setEditItems((prev) => {
      const updated = [...prev];
      (updated[idx] as any)[field] = value;
      if (field === "quantity" || field === "purchasePrice") {
        updated[idx].subTotal = updated[idx].quantity * updated[idx].purchasePrice;
      }
      return updated;
    });
  };

  const removeItem = (idx: number) => {
    setEditItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const grandTotal = editItems.reduce((s, i) => s + i.subTotal, 0);

  return (
    <PageContainer title="Purchase Orders" breadcrumbs={[{ label: "Purchasing", href: "/purchasing" }, { label: "Purchase Orders" }]}>
      {/* Tabs */}
      <div className="flex items-center gap-6 mb-4 border-b border-border">
        {[
          { key: "unfulfilled" as const, label: "✕ Unfulfilled" },
          { key: "fulfilled" as const, label: "✓ Fulfilled" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center justify-between mb-0 bg-sidebar-accent rounded-t-lg p-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="text-xs text-sidebar-accent-foreground block mb-0.5">Search By Order Number</span>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search here!"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-60 h-9 bg-background"
              />
              {search && (
                <Button variant="ghost" size="icon" onClick={() => setSearch("")}>
                  <X className="h-4 w-4 text-sidebar-accent-foreground" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon"><Users className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
      </div>

      {/* Table */}
      <div className="rounded-b-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar-accent">
              <TableHead className="font-semibold text-sidebar-accent-foreground">Order Number</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Created Date</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Supplier</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Supplier Contact</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Remarks</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Remaining Balance</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No orders found.</TableCell></TableRow>
            ) : (
              paginated.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell className="text-sm">{order.createdDate}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.supplierContact}</TableCell>
                  <TableCell className="text-sm max-w-[180px] truncate">{order.remarks}</TableCell>
                  <TableCell>{order.remainingBalance || "..."}</TableCell>
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
            Are you sure you want to Delete?
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}><X className="h-4 w-4 mr-1" /> No</Button>
            <Button onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>✓ Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Detail / Edit Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Purchase Order — {selectedOrder?.orderNumber}</DialogTitle></DialogHeader>

          {/* Top bar */}
          <div className="flex items-center justify-between bg-sidebar-accent p-3 rounded-lg">
            <Button variant="ghost" size="icon" onClick={() => setDetailOpen(false)}>
              <ArrowLeft className="h-5 w-5 text-sidebar-accent-foreground" />
            </Button>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleUpdate}>
                <Save className="h-4 w-4 mr-1" /> Update
              </Button>
              <Button variant="ghost" size="icon"><Printer className="h-5 w-5 text-sidebar-accent-foreground" /></Button>
            </div>
          </div>

          {/* Supplier info */}
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-sidebar-accent">
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Supplier Name</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Photo</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Mobile No</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{selectedOrder?.supplier}</TableCell>
                  <TableCell>
                    <Avatar className="h-8 w-8"><AvatarFallback><User className="h-4 w-4" /></AvatarFallback></Avatar>
                  </TableCell>
                  <TableCell>{selectedOrder?.supplierContact}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Purchase Price</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Sub-Total</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Wholesale Price/Unit</TableHead>
                  <TableHead className="font-semibold text-sidebar-accent-foreground">Retail Price/Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editItems.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(idx)}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell><Input type="number" value={item.quantity} onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))} className="w-20 h-8" min={1} /></TableCell>
                    <TableCell><Input type="number" value={item.purchasePrice} onChange={(e) => updateItem(idx, "purchasePrice", Number(e.target.value))} className="w-20 h-8" /></TableCell>
                    <TableCell><Input type="number" value={item.subTotal} disabled className="w-20 h-8" /></TableCell>
                    <TableCell><Input type="number" value={item.wholesalePrice} onChange={(e) => updateItem(idx, "wholesalePrice", Number(e.target.value))} className="w-24 h-8" /></TableCell>
                    <TableCell><Input type="number" value={item.retailPrice} onChange={(e) => updateItem(idx, "retailPrice", Number(e.target.value))} className="w-24 h-8" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Totals */}
            <div className="p-4 space-y-2 bg-muted/30 border-t border-border">
              <div className="flex justify-end gap-8"><span className="font-semibold">Grand Total</span><span className="font-bold">{grandTotal.toLocaleString()}</span></div>
              <div className="flex justify-end items-center gap-4">
                <span className="text-sm">Remaining Amount to be paid</span>
                <Input type="number" value={editRemaining} onChange={(e) => setEditRemaining(Number(e.target.value))} className="w-32 h-8" />
              </div>
              <div className="flex justify-end items-center gap-4">
                <span className="text-sm">Mode of Payment</span>
                <Select value={editPaymentMode} onValueChange={setEditPaymentMode}>
                  <SelectTrigger className="w-48 h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash - Reception">Cash - Reception</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-start gap-4 p-4 border-t border-border">
              <Textarea placeholder="Remarks" value={editRemarks} onChange={(e) => setEditRemarks(e.target.value)} className="flex-1 min-h-[80px]" />
              <Button variant="outline" className="min-w-[140px] text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleDeleteFromDetail}>Delete</Button>
              <Button className="min-w-[140px] bg-primary/80 hover:bg-primary text-primary-foreground" onClick={handleFulfill}>Fulfill</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
