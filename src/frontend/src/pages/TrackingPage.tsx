import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { generateTimeSlots } from "@/data/menuItems";
import {
  type LocalOrder,
  cancelOrder as cancelOrderUtil,
  getOrders,
  updatePickupTime as updatePickupTimeUtil,
} from "@/utils/orderStorage";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChefHat,
  Clock,
  Loader2,
  Package,
  Phone,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

const TIME_SLOTS = generateTimeSlots();

const STATUS_STEPS = [
  { key: "Placed", label: "Order Placed", icon: Package },
  { key: "Preparing", label: "Preparing", icon: ChefHat },
  { key: "ReadyForPickup", label: "Ready for Pickup", icon: CheckCircle2 },
];

function getStatusIndex(status: string): number {
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
}

function getStatusBadgeClass(status: string) {
  if (status === "ReadyForPickup")
    return "bg-green-100 text-green-700 border-green-200";
  if (status === "Preparing")
    return "bg-campus-yellow/20 text-yellow-700 border-yellow-200";
  if (status === "Cancelled") return "bg-red-100 text-red-700 border-red-200";
  return "bg-primary/10 text-primary border-primary/20";
}

interface OrderCardProps {
  order: LocalOrder;
  index: number;
  onUpdate: () => void;
  email: string;
}

function OrderCard({ order, index, onUpdate, email }: OrderCardProps) {
  const [showTimeDialog, setShowTimeDialog] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isUpdatingTime, setIsUpdatingTime] = useState(false);

  const statusIdx = getStatusIndex(order.status);
  const canCancel = order.status === "Placed";

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      cancelOrderUtil(email, order.id);
      toast.success("Order cancelled successfully.");
      setShowCancelConfirm(false);
      onUpdate();
    } catch {
      toast.error("Failed to cancel order.");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleUpdateTime = async () => {
    if (!newTime) {
      toast.error("Please select a new pickup time.");
      return;
    }
    setIsUpdatingTime(true);
    try {
      updatePickupTimeUtil(email, order.id, newTime);
      toast.success("Pickup time updated!");
      setShowTimeDialog(false);
      onUpdate();
    } catch {
      toast.error("Failed to update pickup time.");
    } finally {
      setIsUpdatingTime(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl shadow-card p-6"
      data-ocid={`tracking.item.${index + 1}`}
    >
      {/* Order Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Order ID</p>
          <p className="font-bold text-foreground">#{order.id}</p>
        </div>
        <Badge className={`text-xs ${getStatusBadgeClass(order.status)}`}>
          {order.status === "ReadyForPickup"
            ? "Ready for Pickup"
            : order.status}
        </Badge>
      </div>

      {/* Status Progress Bar */}
      {order.status !== "Cancelled" && (
        <div className="mb-5">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-border z-0" />
            <div
              className="absolute left-0 top-4 h-0.5 bg-primary z-0 transition-all duration-700"
              style={{
                width: `${(statusIdx / (STATUS_STEPS.length - 1)) * 100}%`,
              }}
            />
            {STATUS_STEPS.map((step, si) => {
              const active = si <= statusIdx;
              return (
                <div
                  key={step.key}
                  className="relative z-10 flex flex-col items-center gap-1.5"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted border border-border text-muted-foreground"
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`text-xs font-medium text-center max-w-[60px] leading-tight ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order Details */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Items</span>
          <span className="font-medium text-right">
            {order.items.map((oi) => `${oi.name} ×${oi.quantity}`).join(", ")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-bold text-foreground">
            ₹{order.totalAmount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pickup Time</span>
          <span className="font-medium text-foreground">
            {order.pickupTime}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment</span>
          <span className="font-medium text-foreground">
            {order.paymentMethod}
          </span>
        </div>
      </div>

      {order.status !== "Cancelled" && (
        <>
          <Separator className="mb-4" />
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-primary text-primary hover:bg-primary/5"
              onClick={() => setShowTimeDialog(true)}
              data-ocid={`tracking.item.${index + 1}`}
            >
              <Clock className="h-3.5 w-3.5" /> Change Pickup Time
            </Button>
            {canCancel && (
              <Button
                variant="destructive"
                size="sm"
                className="gap-1.5"
                onClick={() => setShowCancelConfirm(true)}
                data-ocid={`tracking.delete_button.${index + 1}`}
              >
                <XCircle className="h-3.5 w-3.5" /> Cancel Order
              </Button>
            )}
          </div>
          {canCancel && (
            <p className="text-xs text-muted-foreground mt-2">
              * Cancel is only available while order status is "Placed".
            </p>
          )}
        </>
      )}

      {order.status === "Cancelled" && (
        <div className="mt-2 flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          <XCircle className="h-4 w-4 shrink-0" />
          <span>This order has been cancelled.</span>
        </div>
      )}

      {/* Change Time Dialog */}
      <Dialog open={showTimeDialog} onOpenChange={setShowTimeDialog}>
        <DialogContent data-ocid="tracking.dialog">
          <DialogHeader>
            <DialogTitle>Change Pickup Time</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <Select value={newTime} onValueChange={setNewTime}>
              <SelectTrigger data-ocid="tracking.select">
                <SelectValue placeholder="Select a new time" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTimeDialog(false)}
              data-ocid="tracking.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleUpdateTime}
              disabled={isUpdatingTime}
              data-ocid="tracking.confirm_button"
            >
              {isUpdatingTime ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update Time"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirm Dialog */}
      <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <DialogContent data-ocid="tracking.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Cancel Order?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">
            Are you sure you want to cancel order #{order.id}? This action
            cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelConfirm(false)}
              data-ocid="tracking.cancel_button"
            >
              Keep Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isCancelling}
              data-ocid="tracking.confirm_button"
            >
              {isCancelling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Yes, Cancel Order"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

interface CancelByIdProps {
  email: string;
  collegeId: string;
  onUpdate: () => void;
}

function CancelOrderByIdSection({
  email,
  collegeId,
  onUpdate,
}: CancelByIdProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [collegeIdInput, setCollegeIdInput] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (!collegeIdInput.trim()) {
      toast.error("Please enter your College ID.");
      return;
    }
    if (collegeIdInput.trim().toLowerCase() !== collegeId.toLowerCase()) {
      toast.error(
        "Incorrect College ID. Please enter the one you registered with.",
      );
      return;
    }

    const orders = getOrders(email);
    const placedOrders = orders.filter((o) => o.status === "Placed");
    if (placedOrders.length === 0) {
      toast.error("No active orders in 'Placed' status to cancel.");
      return;
    }

    setIsCancelling(true);
    try {
      for (const order of placedOrders) {
        cancelOrderUtil(email, order.id);
      }
      toast.success("Your order(s) have been cancelled.");
      setShowDialog(false);
      setCollegeIdInput("");
      onUpdate();
    } catch {
      toast.error("Failed to cancel order(s). Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="font-semibold text-red-700 flex items-center gap-2 mb-1 text-sm">
          <XCircle className="h-4 w-4" /> Cancel Order
        </h3>
        <p className="text-xs text-red-600/80 mb-3">
          Cancel is only possible while order is in 'Placed' status.
        </p>
        <Button
          variant="destructive"
          size="sm"
          className="w-full gap-2"
          onClick={() => setShowDialog(true)}
          data-ocid="tracking.delete_button"
        >
          <XCircle className="h-4 w-4" /> Cancel My Order
        </Button>
      </div>

      <Dialog
        open={showDialog}
        onOpenChange={(open) => {
          setShowDialog(open);
          if (!open) setCollegeIdInput("");
        }}
      >
        <DialogContent data-ocid="tracking.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              Verify &amp; Cancel Order
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-3">
            <p className="text-sm text-muted-foreground">
              Enter your College ID to confirm. All active orders in{" "}
              <strong>'Placed'</strong> status will be cancelled.
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="cancel-college-id">College ID</Label>
              <Input
                id="cancel-college-id"
                type="text"
                placeholder="e.g. SCOE2024001"
                value={collegeIdInput}
                onChange={(e) => setCollegeIdInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCancel()}
                data-ocid="tracking.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDialog(false);
                setCollegeIdInput("");
              }}
              data-ocid="tracking.cancel_button"
            >
              Go Back
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isCancelling || !collegeIdInput.trim()}
              data-ocid="tracking.confirm_button"
            >
              {isCancelling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Cancel Order"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function TrackingPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = useCallback(() => {
    if (currentUser) {
      setOrders(getOrders(currentUser.email));
    }
    setIsLoading(false);
  }, [currentUser]);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 30000);
    const handleFocus = () => loadOrders();
    window.addEventListener("focus", handleFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [loadOrders]);

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-muted flex items-center justify-center px-4">
        <div className="text-center" data-ocid="tracking.empty_state">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Track Your Orders
          </h2>
          <p className="text-muted-foreground mb-6">
            Login to view your order status.
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate({ to: "/auth" })}
            data-ocid="tracking.primary_button"
          >
            Login to Continue
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted">
      <section className="bg-background border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">
            Track Your Orders
          </h1>
          <p className="text-muted-foreground">
            Real-time status of your canteen orders
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders list */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading && (
              <div
                className="flex items-center justify-center py-20"
                data-ocid="tracking.loading_state"
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {!isLoading && orders.length === 0 && (
              <div
                className="text-center py-20 bg-card rounded-2xl shadow-xs"
                data-ocid="tracking.empty_state"
              >
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  No orders yet
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Place your first pre-order now!
                </p>
                <Link to="/menu">
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid="tracking.primary_button"
                  >
                    Browse Menu
                  </Button>
                </Link>
              </div>
            )}

            {orders.map((order, i) => (
              <OrderCard
                key={order.id}
                order={order}
                index={i}
                email={currentUser.email}
                onUpdate={loadOrders}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Cancel Order Section */}
            <CancelOrderByIdSection
              email={currentUser.email}
              collegeId={currentUser.collegeId}
              onUpdate={loadOrders}
            />

            {/* Emergency Contact */}
            <div
              className="bg-card rounded-2xl shadow-card p-6 sticky top-20"
              data-ocid="tracking.card"
            >
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> Emergency Contact
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Having trouble with your order? Contact the canteen directly.
              </p>

              <div className="space-y-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                  data-ocid="tracking.link"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Call us</p>
                    <p className="font-semibold text-foreground text-sm">
                      +91 98765 43210
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                  data-ocid="tracking.link"
                >
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <SiWhatsapp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp us</p>
                    <p className="font-semibold text-foreground text-sm">
                      +91 98765 43210
                    </p>
                  </div>
                </a>
              </div>

              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground text-center">
                Canteen timings: 8:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
