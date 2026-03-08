import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Search, ArrowLeft, XCircle } from "lucide-react";

interface CartItem {
  id: number;
  code: string;
  item: string;
  quantity: number;
  unitPrice: number;
  salesTax: number;
  subTotal: number;
}

const availableProducts = [
  { code: "4331", name: "Apple Juice", price: 50, tax: 0 },
  { code: "5927", name: "Water Bottles", price: 30, tax: 0 },
  { code: "1431", name: "Towel", price: 200, tax: 5 },
  { code: "9930", name: "Red Bull", price: 300, tax: 0 },
  { code: "5707", name: "Coke", price: 60, tax: 0 },
  { code: "3832", name: "Water", price: 20, tax: 0 },
  { code: "4089", name: "Protein Bar", price: 120, tax: 5 },
  { code: "6210", name: "Whey Protein", price: 3500, tax: 10 },
  { code: "7501", name: "Gym Gloves", price: 500, tax: 5 },
  { code: "8844", name: "Skipping Rope", price: 250, tax: 0 },
  { code: "2290", name: "Shaker Bottle", price: 280, tax: 0 },
  { code: "3355", name: "BCAA Powder", price: 2600, tax: 10 },
];

export default function PointOfSalePage() {
  const { toast } = useToast();
  const [productSearch, setProductSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [isQuotation, setIsQuotation] = useState(false);
  const [paymentMode, setPaymentMode] = useState("Cash - Reception");
  const [paymentReceived, setPaymentReceived] = useState(0);
  const [soldTo, setSoldTo] = useState("Walk in Customer");

  const filteredProducts = availableProducts.filter(
    (p) => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.code.includes(productSearch)
  );

  const addProduct = (product: typeof availableProducts[0]) => {
    const existing = cart.find((i) => i.code === product.code);
    if (existing) {
      setCart((prev) =>
        prev.map((i) =>
          i.code === product.code
            ? { ...i, quantity: i.quantity + 1, subTotal: (i.quantity + 1) * i.unitPrice + ((i.quantity + 1) * i.unitPrice * i.salesTax) / 100 }
            : i
        )
      );
    } else {
      const subTotal = product.price + (product.price * product.tax) / 100;
      setCart((prev) => [
        ...prev,
        { id: Date.now(), code: product.code, item: product.name, quantity: 1, unitPrice: product.price, salesTax: product.tax, subTotal },
      ]);
    }
    setProductSearch("");
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty, subTotal: qty * i.unitPrice + (qty * i.unitPrice * i.salesTax) / 100 } : i))
    );
  };

  const subTotal = cart.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const totalTax = cart.reduce((s, i) => s + (i.quantity * i.unitPrice * i.salesTax) / 100, 0);
  const total = subTotal - discount;
  const grandTotal = total + totalTax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({ title: "Error", description: "Please add at least one product.", variant: "destructive" });
      return;
    }
    toast({ title: "Sale Complete", description: `Grand Total: ${grandTotal.toLocaleString()} — Sold to: ${soldTo}` });
    setCart([]);
    setDiscount(0);
    setPaymentReceived(0);
    setSoldTo("Walk in Customer");
  };

  const handleSuspend = () => {
    toast({ title: "Sale Suspended", description: "This sale has been suspended." });
  };

  return (
    <PageContainer title="Point of Sale" breadcrumbs={[{ label: "Sales", href: "/sales" }, { label: "Point of Sale" }]}>
      {/* Search bar */}
      <div className="bg-sidebar-accent rounded-t-lg p-3 flex items-center gap-4">
        <div className="relative">
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">Search Product By Name</span>
          <Input
            placeholder="Search here!"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="w-48 h-9 bg-background"
          />
          {productSearch && (
            <div className="absolute z-50 mt-1 w-72 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredProducts.map((p) => (
                <button key={p.code} className="w-full text-left px-3 py-2 hover:bg-accent text-sm" onClick={() => addProduct(p)}>
                  [{p.code}] {p.name} — Rs. {p.price}
                </button>
              ))}
              {filteredProducts.length === 0 && <div className="px-3 py-2 text-sm text-muted-foreground">No products found.</div>}
            </div>
          )}
        </div>
        <div>
          <span className="text-xs text-sidebar-accent-foreground block mb-0.5">Search Customer</span>
          <Input placeholder="Search here!" value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} className="w-48 h-9 bg-background" />
        </div>
        <Button variant="ghost" size="icon" className="mt-4"><ArrowLeft className="h-4 w-4 text-sidebar-accent-foreground" /></Button>
      </div>

      {/* Cart Table */}
      <div className="border border-border">
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
            {cart.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-muted-foreground">No Product Added</TableCell></TableRow>
            ) : (
              cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.id)}>
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>
                    <Input type="number" value={item.quantity} onChange={(e) => updateQty(item.id, Number(e.target.value))} className="w-20 h-8" min={1} />
                  </TableCell>
                  <TableCell>{item.unitPrice}</TableCell>
                  <TableCell>{item.salesTax}%</TableCell>
                  <TableCell className="font-semibold">{item.subTotal.toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary + Actions */}
      <div className="flex border border-t-0 border-border rounded-b-lg overflow-hidden">
        {/* Left empty space */}
        <div className="flex-1 bg-background min-h-[280px]" />

        {/* Right summary */}
        <div className="w-[420px] bg-muted/30 p-4 space-y-3 border-l border-border">
          <div className="flex justify-between"><span className="text-sm font-medium">Sub-Total</span><span className="font-bold">{subTotal.toLocaleString()}</span></div>
          <div className="flex justify-between items-center"><span className="text-sm font-medium">Quotation</span><Checkbox checked={isQuotation} onCheckedChange={(v) => setIsQuotation(!!v)} /></div>
          <div className="flex justify-between items-center"><span className="text-sm font-medium">Discount</span><Input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-32 h-8" /></div>
          <div className="flex justify-between"><span className="text-sm font-medium">Total</span><span className="font-bold">{total.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-sm font-medium">Total Tax</span><span className="font-bold">{totalTax.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-sm font-semibold">Grand Total</span><span className="font-bold">{grandTotal.toLocaleString()}</span></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Payment Mode</span>
            <Select value={paymentMode} onValueChange={setPaymentMode}>
              <SelectTrigger className="w-48 h-8"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash - Reception">Cash - Reception</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center"><span className="text-sm font-medium">Payment Received</span><Input type="number" value={paymentReceived} onChange={(e) => setPaymentReceived(Number(e.target.value))} className="w-32 h-8" /></div>
          <div className="flex justify-between items-center"><span className="text-sm font-medium">Sold To</span><Input value={soldTo} onChange={(e) => setSoldTo(e.target.value)} className="w-48 h-8" /></div>
          <div className="flex justify-between"><span className="text-sm font-medium">Sold By</span><span className="font-medium">Admin</span></div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleSuspend}>Suspend</Button>
            <Button className="flex-1 bg-primary/80 hover:bg-primary text-primary-foreground" onClick={handleCheckout}>Checkout</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
