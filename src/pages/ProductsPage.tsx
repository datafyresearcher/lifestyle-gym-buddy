import { useState, useRef } from "react";
import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, X, XCircle, Edit, Plus, ArrowLeft, Package, Tag, Info, FileText, PackagePlus, PackageMinus, Printer, Users } from "lucide-react";

interface Product {
  id: number;
  code: string;
  name: string;
  image: string;
  inStock: number;
  unit: string;
  category: string;
  type: "ready" | "ingredients_based" | "ingredient";
  date: string;
  description: string;
  purchasePrice: number;
  wholesalePrice: number;
  salePrice: number;
  discount: number;
  barcode: string;
  storageMin: number;
  storageMax: number;
  remarks: string;
  addedStock: { qty: number; purchasePrice: number; wholesalePrice: number; salePrice: number; totalPayment: number; paymentMode: string; date: string }[];
  removedStock: { qty: number; purchasePrice: number; wholesalePrice: number; salePrice: number; comment: string; date: string }[];
}

const mockProducts: Product[] = [
  {
    id: 1, code: "4331", name: "Apple Juice", image: "🧃", inStock: 496, unit: "", category: "Drinks", type: "ready",
    date: "Dec 13, 2023, 11:44:44 AM", description: "", purchasePrice: 30, wholesalePrice: 40, salePrice: 50, discount: 5,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 20, purchasePrice: 30, wholesalePrice: 40, salePrice: 50, totalPayment: 0, paymentMode: "true", date: "Dec 13, 2023, 11:44:44 AM" },
      { qty: 5, purchasePrice: 30, wholesalePrice: 40, salePrice: 50, totalPayment: 0, paymentMode: "true", date: "Dec 13, 2023, 11:45:47 AM" },
      { qty: 100, purchasePrice: 30, wholesalePrice: 40, salePrice: 50, totalPayment: 0, paymentMode: "true", date: "Jun 25, 2025, 6:47:50 PM" },
      { qty: 100, purchasePrice: 30, wholesalePrice: 40, salePrice: 50, totalPayment: 0, paymentMode: "true", date: "Nov 21, 2025, 3:34:40 PM" },
      { qty: 100, purchasePrice: 30, wholesalePrice: 40, salePrice: 50, totalPayment: 0, paymentMode: "Cash-Reception", date: "Feb 25, 2026, 10:46:24 PM" },
    ],
    removedStock: [],
  },
  {
    id: 2, code: "5927", name: "Water Bottles", image: "🧴", inStock: 278, unit: "Count", category: "Drinks", type: "ready",
    date: "Feb 11, 2024, 4:43:16 PM", description: "", purchasePrice: 20, wholesalePrice: 25, salePrice: 30, discount: 0,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 200, purchasePrice: 20, wholesalePrice: 25, salePrice: 30, totalPayment: 0, paymentMode: "true", date: "Feb 11, 2024, 4:43:16 PM" },
      { qty: 100, purchasePrice: 20, wholesalePrice: 25, salePrice: 30, totalPayment: 0, paymentMode: "Cash-Reception", date: "Jan 5, 2026, 2:15:30 PM" },
    ],
    removedStock: [
      { qty: 22, purchasePrice: 20, wholesalePrice: 25, salePrice: 30, comment: "Expired", date: "Dec 1, 2025, 10:00:00 AM" },
    ],
  },
  {
    id: 3, code: "1431", name: "Towel", image: "🧻", inStock: 297, unit: "Count", category: "Accessories", type: "ready",
    date: "Jul 30, 2025, 10:36:03 AM", description: "", purchasePrice: 100, wholesalePrice: 150, salePrice: 200, discount: 10,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 300, purchasePrice: 100, wholesalePrice: 150, salePrice: 200, totalPayment: 0, paymentMode: "true", date: "Jul 30, 2025, 10:36:03 AM" },
    ],
    removedStock: [
      { qty: 3, purchasePrice: 100, wholesalePrice: 150, salePrice: 200, comment: "Damaged", date: "Aug 15, 2025, 3:00:00 PM" },
    ],
  },
  {
    id: 4, code: "9930", name: "Red Bull", image: "🥤", inStock: 111, unit: "Count", category: "Drinks", type: "ready",
    date: "Nov 25, 2025, 3:11:24 PM", description: "", purchasePrice: 200, wholesalePrice: 250, salePrice: 300, discount: 0,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 111, purchasePrice: 200, wholesalePrice: 250, salePrice: 300, totalPayment: 0, paymentMode: "true", date: "Nov 25, 2025, 3:11:24 PM" },
    ],
    removedStock: [],
  },
  {
    id: 5, code: "5707", name: "Coke", image: "🥤", inStock: 197, unit: "Count", category: "Drinks", type: "ready",
    date: "Dec 4, 2025, 12:47:14 PM", description: "", purchasePrice: 40, wholesalePrice: 50, salePrice: 60, discount: 0,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 200, purchasePrice: 40, wholesalePrice: 50, salePrice: 60, totalPayment: 0, paymentMode: "true", date: "Dec 4, 2025, 12:47:14 PM" },
    ],
    removedStock: [
      { qty: 3, purchasePrice: 40, wholesalePrice: 50, salePrice: 60, comment: "Spilled", date: "Dec 10, 2025, 1:00:00 PM" },
    ],
  },
  {
    id: 6, code: "3832", name: "Water", image: "💧", inStock: 97, unit: "Count", category: "Drinks", type: "ready",
    date: "Dec 5, 2025, 3:29:17 PM", description: "", purchasePrice: 10, wholesalePrice: 15, salePrice: 20, discount: 0,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 100, purchasePrice: 10, wholesalePrice: 15, salePrice: 20, totalPayment: 0, paymentMode: "true", date: "Dec 5, 2025, 3:29:17 PM" },
    ],
    removedStock: [
      { qty: 3, purchasePrice: 10, wholesalePrice: 15, salePrice: 20, comment: "Leaked", date: "Dec 20, 2025, 9:00:00 AM" },
    ],
  },
  {
    id: 7, code: "4089", name: "Protein Bar", image: "🍫", inStock: 85, unit: "Count", category: "Supplements", type: "ready",
    date: "Jan 1, 2026, 3:30:33 PM", description: "", purchasePrice: 80, wholesalePrice: 100, salePrice: 120, discount: 5,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 85, purchasePrice: 80, wholesalePrice: 100, salePrice: 120, totalPayment: 0, paymentMode: "true", date: "Jan 1, 2026, 3:30:33 PM" },
    ],
    removedStock: [],
  },
  {
    id: 8, code: "6210", name: "Whey Protein", image: "🥛", inStock: 45, unit: "Count", category: "Supplements", type: "ingredients_based",
    date: "Feb 10, 2026, 9:15:00 AM", description: "Premium whey protein powder", purchasePrice: 2500, wholesalePrice: 3000, salePrice: 3500, discount: 0,
    barcode: "8901234567890", storageMin: 10, storageMax: 100, remarks: "Keep in cool dry place",
    addedStock: [
      { qty: 50, purchasePrice: 2500, wholesalePrice: 3000, salePrice: 3500, totalPayment: 125000, paymentMode: "Bank Transfer", date: "Feb 10, 2026, 9:15:00 AM" },
    ],
    removedStock: [
      { qty: 5, purchasePrice: 2500, wholesalePrice: 3000, salePrice: 3500, comment: "Expired batch", date: "Mar 1, 2026, 11:00:00 AM" },
    ],
  },
  {
    id: 9, code: "7501", name: "Gym Gloves", image: "🧤", inStock: 60, unit: "Pairs", category: "Accessories", type: "ready",
    date: "Jan 15, 2026, 2:00:00 PM", description: "Leather gym gloves", purchasePrice: 300, wholesalePrice: 400, salePrice: 500, discount: 0,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 60, purchasePrice: 300, wholesalePrice: 400, salePrice: 500, totalPayment: 18000, paymentMode: "Cash", date: "Jan 15, 2026, 2:00:00 PM" },
    ],
    removedStock: [],
  },
  {
    id: 10, code: "8844", name: "Skipping Rope", image: "🪢", inStock: 35, unit: "Count", category: "Equipment", type: "ready",
    date: "Feb 20, 2026, 10:30:00 AM", description: "", purchasePrice: 150, wholesalePrice: 200, salePrice: 250, discount: 0,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 35, purchasePrice: 150, wholesalePrice: 200, salePrice: 250, totalPayment: 5250, paymentMode: "Cash", date: "Feb 20, 2026, 10:30:00 AM" },
    ],
    removedStock: [],
  },
  {
    id: 11, code: "2290", name: "Shaker Bottle", image: "🍶", inStock: 120, unit: "Count", category: "Accessories", type: "ready",
    date: "Mar 1, 2026, 8:00:00 AM", description: "500ml shaker", purchasePrice: 150, wholesalePrice: 200, salePrice: 280, discount: 10,
    barcode: "", storageMin: 0, storageMax: 0, remarks: "",
    addedStock: [
      { qty: 120, purchasePrice: 150, wholesalePrice: 200, salePrice: 280, totalPayment: 18000, paymentMode: "Cash", date: "Mar 1, 2026, 8:00:00 AM" },
    ],
    removedStock: [],
  },
  {
    id: 12, code: "3355", name: "BCAA Powder", image: "💊", inStock: 30, unit: "Count", category: "Supplements", type: "ingredient",
    date: "Feb 28, 2026, 4:00:00 PM", description: "Branch chain amino acids", purchasePrice: 1800, wholesalePrice: 2200, salePrice: 2600, discount: 0,
    barcode: "8901234567891", storageMin: 5, storageMax: 50, remarks: "Store below 25°C",
    addedStock: [
      { qty: 30, purchasePrice: 1800, wholesalePrice: 2200, salePrice: 2600, totalPayment: 54000, paymentMode: "Bank Transfer", date: "Feb 28, 2026, 4:00:00 PM" },
    ],
    removedStock: [],
  },
];

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTab, setDetailTab] = useState("info");
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);

  // Editable fields for product detail
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPurchasePrice, setEditPurchasePrice] = useState(0);
  const [editWholesalePrice, setEditWholesalePrice] = useState(0);
  const [editSalePrice, setEditSalePrice] = useState(0);
  const [editDiscount, setEditDiscount] = useState(0);
  const [editInventory, setEditInventory] = useState(0);
  const [editBarcode, setEditBarcode] = useState("");
  const [editStorageMin, setEditStorageMin] = useState(0);
  const [editStorageMax, setEditStorageMax] = useState(0);
  const [editRemarks, setEditRemarks] = useState("");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search);
    const matchTab =
      activeTab === "all" ||
      (activeTab === "ready" && p.type === "ready") ||
      (activeTab === "ingredients_based" && p.type === "ingredients_based") ||
      (activeTab === "ingredient" && p.type === "ingredient");
    return matchSearch && matchTab;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setEditName(product.name);
    setEditCategory(product.category);
    setEditDescription(product.description);
    setEditPurchasePrice(product.purchasePrice);
    setEditWholesalePrice(product.wholesalePrice);
    setEditSalePrice(product.salePrice);
    setEditDiscount(product.discount);
    setEditInventory(product.inStock);
    setEditBarcode(product.barcode);
    setEditStorageMin(product.storageMin);
    setEditStorageMax(product.storageMax);
    setEditRemarks(product.remarks);
    setDetailTab("info");
    setDetailOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedProduct) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              name: editName,
              category: editCategory,
              description: editDescription,
              purchasePrice: editPurchasePrice,
              wholesalePrice: editWholesalePrice,
              salePrice: editSalePrice,
              discount: editDiscount,
              inStock: editInventory,
              barcode: editBarcode,
              storageMin: editStorageMin,
              storageMax: editStorageMax,
              remarks: editRemarks,
            }
          : p
      )
    );
    toast({ title: "Product Updated", description: `${editName} has been updated successfully.` });
    setDetailOpen(false);
  };

  const handleDelete = (product: Product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    toast({ title: "Product Deleted", description: `${product.name} has been removed.`, variant: "destructive" });
    setDeleteConfirm(null);
    if (paginated.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <PageContainer title="Products Management" breadcrumbs={[{ label: "Products" }]}>
      {/* Tabs */}
      <div className="flex items-center gap-6 mb-4 border-b border-border">
        {[
          { key: "all", label: "All" },
          { key: "ready", label: "Ready to Sell" },
          { key: "ingredients_based", label: "Ingredients Based" },
          { key: "ingredient", label: "Ingredients" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-4 bg-sidebar-accent rounded-t-lg p-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search By Item Name"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-8 w-60 h-9 bg-background"
            />
          </div>
          {search && (
            <Button variant="ghost" size="icon" onClick={() => setSearch("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon"><Users className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Printer className="h-5 w-5" /></Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-b-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar-accent">
              <TableHead className="font-semibold text-sidebar-accent-foreground">Code</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Image</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Item</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">In Stock</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Unit</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Date</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No products found.</TableCell>
              </TableRow>
            ) : (
              paginated.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{product.code}</TableCell>
                  <TableCell>
                    <span className="text-3xl">{product.image}</span>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="font-semibold">{product.inStock}</TableCell>
                  <TableCell>{product.unit || "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{product.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                        onClick={() => setDeleteConfirm(product)}
                      >
                        <XCircle className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-foreground hover:bg-accent rounded-full"
                        onClick={() => openDetail(product)}
                      >
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
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="icon"
              className={`h-8 w-8 rounded-full ${currentPage === page ? "bg-primary text-primary-foreground" : "text-sidebar-accent-foreground"}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>▶</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-accent-foreground" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>⏭</Button>
        </div>
      </div>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Detail / Edit Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Edit Product — {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => setDetailOpen(false)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Go Back
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleUpdate}>
              Update
            </Button>
            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <PackagePlus className="h-4 w-4 mr-1" /> Add Stock
            </Button>
            <Button size="sm" variant="destructive">
              <PackageMinus className="h-4 w-4 mr-1" /> Remove Stock
            </Button>
          </div>

          {/* Detail Tabs */}
          <Tabs value={detailTab} onValueChange={setDetailTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="info" className="gap-1"><Tag className="h-4 w-4" /> Product Info</TabsTrigger>
              <TabsTrigger value="extra" className="gap-1"><Info className="h-4 w-4" /> Extra Info</TabsTrigger>
              <TabsTrigger value="added" className="gap-1"><PackagePlus className="h-4 w-4" /> Added Stock</TabsTrigger>
              <TabsTrigger value="removed" className="gap-1"><PackageMinus className="h-4 w-4" /> Removed Stock</TabsTrigger>
            </TabsList>

            {/* Product Info Tab */}
            <TabsContent value="info" className="mt-4 space-y-6">
              <div className="flex items-start gap-8">
                <div className="text-8xl">{selectedProduct?.image}</div>
                <div className="flex-1 space-y-4">
                  <div className="bg-sidebar-accent p-3 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-sidebar-accent-foreground">Product Image</span>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">📷 Capture</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">⬆ Upload Image</Button>
                      <Button size="sm" variant="destructive">✕ Remove Image</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold">Product Type</Label>
                <Select value={selectedProduct?.type} disabled>
                  <SelectTrigger className="w-48 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ready">Ready to Sell</SelectItem>
                    <SelectItem value="ingredients_based">Ingredients Based</SelectItem>
                    <SelectItem value="ingredient">Ingredient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Product Details</h3>
                  <div>
                    <Label>Code</Label>
                    <Input value={selectedProduct?.code || ""} disabled className="mt-1" />
                  </div>
                  <div>
                    <Label>Name</Label>
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="mt-1" placeholder="Description" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Inventory *</h3>
                  <div>
                    <Input type="number" value={editInventory} onChange={(e) => setEditInventory(Number(e.target.value))} />
                  </div>
                  <h3 className="font-semibold">Cost & Price *</h3>
                  <div>
                    <Label>Purchase Price</Label>
                    <Input type="number" value={editPurchasePrice} onChange={(e) => setEditPurchasePrice(Number(e.target.value))} className="mt-1" />
                  </div>
                  <div>
                    <Label>Wholesale Price</Label>
                    <Input type="number" value={editWholesalePrice} onChange={(e) => setEditWholesalePrice(Number(e.target.value))} className="mt-1" />
                  </div>
                  <div>
                    <Label>Sale Price</Label>
                    <Input type="number" value={editSalePrice} onChange={(e) => setEditSalePrice(Number(e.target.value))} className="mt-1" />
                  </div>
                  <div>
                    <Label>Discount</Label>
                    <Input type="number" value={editDiscount} onChange={(e) => setEditDiscount(Number(e.target.value))} className="mt-1" />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Extra Info Tab */}
            <TabsContent value="extra" className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Storage Info</h3>
                  <div>
                    <Label>Barcode</Label>
                    <Input value={editBarcode} onChange={(e) => setEditBarcode(e.target.value)} className="mt-1" placeholder="Barcode" />
                  </div>
                  <div>
                    <Label>Min Storage</Label>
                    <Input type="number" value={editStorageMin} onChange={(e) => setEditStorageMin(Number(e.target.value))} className="mt-1" />
                  </div>
                  <div>
                    <Label>Max Storage</Label>
                    <Input type="number" value={editStorageMax} onChange={(e) => setEditStorageMax(Number(e.target.value))} className="mt-1" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Remarks</h3>
                  <Textarea value={editRemarks} onChange={(e) => setEditRemarks(e.target.value)} placeholder="Remarks" className="min-h-[150px]" />
                </div>
              </div>
            </TabsContent>

            {/* Added Stock Tab */}
            <TabsContent value="added" className="mt-4">
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-sidebar-accent">
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Stock Quantity</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Purchase Price</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Wholesale Price</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Sale Price</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Total Payment</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Payment Mode</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Stock Added Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProduct?.addedStock.length === 0 ? (
                      <TableRow><TableCell colSpan={7} className="text-center py-6 text-muted-foreground">No stock added yet.</TableCell></TableRow>
                    ) : (
                      selectedProduct?.addedStock.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell>{s.qty}</TableCell>
                          <TableCell>{s.purchasePrice}</TableCell>
                          <TableCell>{s.wholesalePrice}</TableCell>
                          <TableCell>{s.salePrice}</TableCell>
                          <TableCell>{s.totalPayment || "—"}</TableCell>
                          <TableCell>{s.paymentMode}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{s.date}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Removed Stock Tab */}
            <TabsContent value="removed" className="mt-4">
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-sidebar-accent">
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Stock Quantity</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Purchase Price</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Wholesale Price</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Sale Price</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Comment</TableHead>
                      <TableHead className="text-sidebar-accent-foreground font-semibold">Stock Removed Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProduct?.removedStock.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No stock removed yet.</TableCell></TableRow>
                    ) : (
                      selectedProduct?.removedStock.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell>{s.qty}</TableCell>
                          <TableCell>{s.purchasePrice}</TableCell>
                          <TableCell>{s.wholesalePrice}</TableCell>
                          <TableCell>{s.salePrice}</TableCell>
                          <TableCell>{s.comment || "—"}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{s.date}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
