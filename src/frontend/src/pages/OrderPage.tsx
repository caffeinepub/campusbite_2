import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { generateTimeSlots } from "@/data/menuItems";
import { saveOrder } from "@/utils/orderStorage";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  Check,
  Clock,
  Copy,
  Loader2,
  Minus,
  Plus,
  QrCode,
  ShoppingBag,
  Trash2,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const TIME_SLOTS = generateTimeSlots();

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center justify-between gap-2 bg-muted rounded-lg px-3 py-2">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground text-sm">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="p-1.5 rounded-md hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
        title="Copy"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export default function OrderPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { items, updateQuantity, removeItem, clearCart, totalAmount } =
    useCart();

  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cash">("cash");
  const [isPlacing, setIsPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      toast.error("Please login to place an order.");
      navigate({ to: "/auth" });
      return;
    }
    if (!pickupTime) {
      toast.error("Please select a pickup time.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsPlacing(true);
    try {
      saveOrder(
        currentUser.email,
        {
          paymentMethod: paymentMethod === "upi" ? "UPI" : "Cash on Pickup",
          pickupTime,
          totalAmount,
          items: items.map((item) => ({
            menuItemId: Number(item.menuItemId),
            name: item.name,
            quantity: item.quantity,
            price: Number(item.price),
          })),
        },
        { name: currentUser.name, collegeId: currentUser.collegeId },
      );
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate({ to: "/tracking" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to place order.";
      toast.error(msg);
    } finally {
      setIsPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-muted flex items-center justify-center px-4">
        <div className="text-center" data-ocid="cart.empty_state">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious items from our menu!
          </p>
          <Link to="/menu">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="cart.primary_button"
            >
              Browse Menu
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted">
      <section className="bg-background border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">
            Your Order
          </h1>
          <p className="text-muted-foreground">
            Review your cart and choose a pickup time
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-semibold text-foreground text-lg">
              Cart Items
            </h2>
            {items.map((item, i) => (
              <motion.div
                key={item.menuItemId.toString()}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl shadow-xs p-4 flex items-center gap-4"
                data-ocid={`cart.item.${i + 1}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      🍽️
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ₹{Number(item.price)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.menuItemId, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.menuItemId, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="font-bold text-foreground w-16 text-right">
                  ₹{Number(item.price) * item.quantity}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.menuItemId)}
                  className="text-destructive hover:text-destructive/80 transition-colors ml-1"
                  data-ocid={`cart.delete_button.${i + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}

            {/* Pickup Time */}
            <div className="bg-card rounded-xl shadow-xs p-5 space-y-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Select Pickup Time
              </h2>
              <Select value={pickupTime} onValueChange={setPickupTime}>
                <SelectTrigger data-ocid="order.select">
                  <SelectValue placeholder="Choose your pickup time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {pickupTime && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>Estimated preparation time: 15–20 minutes</span>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-xl shadow-xs p-5 space-y-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" /> Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    paymentMethod === "upi"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                  data-ocid="order.toggle"
                >
                  <QrCode className="h-6 w-6 mb-2 text-primary" />
                  <p className="font-semibold text-sm text-foreground">
                    UPI Payment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Scan QR or pay by number
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    paymentMethod === "cash"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                  data-ocid="order.toggle"
                >
                  <Banknote className="h-6 w-6 mb-2 text-primary" />
                  <p className="font-semibold text-sm text-foreground">
                    Cash on Pickup
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pay at counter
                  </p>
                </button>
              </div>

              {paymentMethod === "upi" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-1"
                  data-ocid="order.section"
                >
                  <Tabs defaultValue="qr" className="w-full">
                    <TabsList className="w-full mb-3">
                      <TabsTrigger
                        value="qr"
                        className="flex-1 gap-1.5"
                        data-ocid="order.tab"
                      >
                        <QrCode className="h-3.5 w-3.5" /> Scan QR
                      </TabsTrigger>
                      <TabsTrigger
                        value="number"
                        className="flex-1 gap-1.5"
                        data-ocid="order.tab"
                      >
                        <span className="text-base leading-none">📱</span> Pay
                        by Number
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="qr" className="mt-0">
                      <div className="flex flex-col items-center gap-3 py-2">
                        <div className="w-36 h-36 bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2">
                          <QrCode className="h-12 w-12 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground text-center">
                            Scan QR to Pay
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Open any UPI app and scan this QR code
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="number" className="mt-0">
                      <div className="space-y-2 py-2">
                        <CopyableField
                          label="UPI Phone Number"
                          value="9876543210"
                        />
                        <CopyableField label="UPI ID" value="campusbite@upi" />
                        <p className="text-xs text-muted-foreground text-center pt-1">
                          Open any UPI app (GPay, PhonePe, Paytm), enter this
                          number or UPI ID, and complete payment.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}

              {paymentMethod === "cash" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 p-3 bg-muted rounded-lg text-sm text-muted-foreground flex items-center gap-2"
                  data-ocid="order.section"
                >
                  <Banknote className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    Pay in cash when you collect your order at the canteen
                    counter.
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="bg-card rounded-xl shadow-xs p-5 sticky top-20"
              data-ocid="order.card"
            >
              <h2 className="font-semibold text-foreground text-lg mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div
                    key={item.menuItemId.toString()}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{Number(item.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold text-foreground text-base mb-1">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
              {pickupTime && (
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Pickup at</span>
                  <span className="font-medium text-foreground">
                    {pickupTime}
                  </span>
                </div>
              )}
              <Badge
                variant="outline"
                className="mb-4 text-primary border-primary/30 bg-primary/5 text-xs"
              >
                ⏱️ Ready in 15–20 minutes
              </Badge>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold"
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                data-ocid="order.submit_button"
              >
                {isPlacing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
