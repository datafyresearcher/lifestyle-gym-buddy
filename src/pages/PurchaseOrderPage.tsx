import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Search, ArrowLeft, XCircle, User } from "lucide-react";

interface Supplier {
  name: string;
  photo: string;
  mobile: string;
}

interface OrderItem {
  id: number;
  code: string;
  item: string;
  quantity: number;
  purchasePrice: number;
  subTotal: number;
}

const availableSuppliers: Supplier[] = [
  { name: "Adeel Equipment Supplier", photo: "/avatars/avatar-1.jpg", mobile: "03654545454" },
  { name: "Ali Khan", photo: "", mobile: "03331245787" },
  { name: "Muhammad Aqeel", photo: "", mobile: "03454404345" },
  { name: "Osama Weight Supplier", photo: "", mobile: "03228222425" },
  { name: "Uzair Swimming Product Supplier", photo: "", mobile: "03333333333" },
  { name: "Waqas Ali", photo: "", mobile: "03331121212" },
];

const availableProducts = [
  { code: "4331", name: "Apple Juice", price: 30 },
  { code: "5927", name: "Water Bottles", price: 20 },
  { code: "1431", name: "Towel", price: 100 },
  { code: "9930", name: "Red Bull", price: 200 },
  { code: "5707", name: "Coke", price: 40 },
  { code: "3832", name: "Water", price: 10 },
  { code: "4089", name: "Protein Bar", price: 80 },
  { code: "6210", name: "Whey Protein", price: 2500 },
];

export default function PurchaseOrderPage() {
  const { toast } = useToast();
  const [supplierSearch, setSupplierSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [productSearch, setProductSearch] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [remarks, setRemarks] = useState("");
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);

  const filteredSuppliers = availableSuppliers.filter((s) =>
    s.name.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  const filteredProducts = availableProducts.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.code.includes(productSearch)
  );

  const addProduct = (product: typeof availableProducts[0]) => {
    const existing = orderItems.find((i) => i.code === product.code);
    if (existing) {
      setOrderItems((prev) =>
        prev.map((i) =>
          i.code === product.code
            ? { ...i, quantity: i.quantity + 1, subTotal: (i.quantity + 1) * i.purchasePrice }
            : i
        )
      );
    } else {
      setOrderItems((prev) => [
        ...prev,
        { id: Date.now(), code: product.code, item: product.name, quantity: 1, purchasePrice: product.price, subTotal: product.price },
      ]);
    }
    setProductSearch("");
  };

  const removeItem = (id: number) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return;
    setOrderItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty, subTotal: qty * i.purchasePrice } : i))
    );
  };

  const grandTotal = orderItems.reduce((sum, i) => sum + i.subTotal, 0);

  const handleGenerate = () => {
    if (!selectedSupplier) {
      toast({ title: "Error", description: "Please select a supplier first.", variant: "destructive" });
      return;
    }
    if (orderItems.length === 0) {
      toast({ title: "Error", description: "Please add at least one product.", variant: "destructive" });
      return;
    }
    toast({ title: "Purchase Order Generated", description: `Order for ${selectedSupplier.name} — Total: ${grandTotal}` });
    setSelectedSupplier(null);
    setOrderItems([]);
    setRemarks("");
  };

  const handleSuspend = () => {
    toast({ title: "Order Suspended", description: "Purchase order has been suspended." });
  };

  return (
    <PageContainer title="Purchase Order" breadcrumbs={[{ label: "Purchasing", href: "/purchasing" }, { label: "Purchase Order" }]}>
      {/* Supplier Section */}
      <div className="bg-sidebar-accent rounded-t-lg p-3 flex items-center gap-2">
        <div className="relative">
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">Search Supplier By Name</span>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search here!"
              value={supplierSearch}
              onChange={(e) => { setSupplierSearch(e.target.value); setShowSupplierDropdown(true); }}
              onFocus={() => setShowSupplierDropdown(true)}
              className="w-60 h-9 bg-background"
            />
            <Button variant="ghost" size="icon" onClick={() => { setSupplierSearch(""); setShowSupplierDropdown(false); }}>
              <ArrowLeft className="h-4 w-4 text-sidebar-accent-foreground" />
            </Button>
          </div>
          {showSupplierDropdown && supplierSearch && (
            <div className="absolute z-50 top-full mt-1 w-72 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredSuppliers.map((s) => (
                <button
                  key={s.name}
                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm flex items-center gap-2"
                  onClick={() => { setSelectedSupplier(s); setSupplierSearch(""); setShowSupplierDropdown(false); }}
                >
                  <Avatar className="h-6 w-6">
                    {s.photo ? <AvatarImage src={s.photo} /> : null}
                    <AvatarFallback className="text-xs"><User className="h-3 w-3" /></AvatarFallback>
                  </Avatar>
                  {s.name}
                </button>
              ))}
              {filteredSuppliers.length === 0 && (
                <div className="px-3 py-2 text-sm text-muted-foreground">No suppliers found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Supplier Table */}
      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar-accent">
              <TableHead className="font-semibold text-sidebar-accent-foreground">Supplier Name</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Photo</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Mobile No</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedSupplier ? (
              <TableRow>
                <TableCell className="font-medium">{selectedSupplier.name}</TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    {selectedSupplier.photo ? <AvatarImage src={selectedSupplier.photo} /> : null}
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{selectedSupplier.mobile}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-muted-foreground">No Supplier Added</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product Search */}
      <div className="mt-4 relative">
        <Input
          placeholder="Search Product By Name"
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="w-80 h-9"
        />
        {productSearch && (
          <div className="absolute z-50 mt-1 w-80 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filteredProducts.map((p) => (
              <button
                key={p.code}
                className="w-full text-left px-3 py-2 hover:bg-accent text-sm"
                onClick={() => addProduct(p)}
              >
                [{p.code}] {p.name} — Rs. {p.price}
              </button>
            ))}
            {filteredProducts.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted-foreground">No products found.</div>
            )}
          </div>
        )}
      </div>

      {/* Order Items Table */}
      <div className="mt-2 border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-sidebar-accent">
              <TableHead className="font-semibold text-sidebar-accent-foreground">Action</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Code</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Item</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Quantity</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Purchase Price</TableHead>
              <TableHead className="font-semibold text-sidebar-accent-foreground">Sub-Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground">No Product Added</TableCell>
              </TableRow>
            ) : (
              orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.id)}>
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQty(item.id, Number(e.target.value))}
                      className="w-20 h-8"
                      min={1}
                    />
                  </TableCell>
                  <TableCell>{item.purchasePrice}</TableCell>
                  <TableCell className="font-semibold">{item.subTotal}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Grand Total */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border">
          <span></span>
          <div className="flex items-center gap-8">
            <span className="font-semibold">Grand Total</span>
            <span className="font-bold text-lg">{grandTotal}</span>
          </div>
        </div>

        {/* Footer: Remarks + Actions */}
        <div className="flex items-start gap-4 p-4 border-t border-border">
          <Textarea
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="flex-1 min-h-[80px]"
          />
          <Button
            variant="outline"
            className="min-w-[160px] text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={handleSuspend}
          >
            Suspend
          </Button>
          <Button
            className="min-w-[160px] bg-primary/80 hover:bg-primary text-primary-foreground"
            onClick={handleGenerate}
          >
            Generate
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
