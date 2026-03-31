import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetMyOrders } from "@/hooks/useQueries";
import { Bell, X } from "lucide-react";
import { useState } from "react";

export default function NotificationBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: orders } = useGetMyOrders();

  if (!identity || dismissed) return null;

  const readyOrders =
    orders?.filter((o) => o.status === "ReadyForPickup") ?? [];
  if (readyOrders.length === 0) return null;

  return (
    <div
      className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between gap-3 sticky top-0 z-[60]"
      data-ocid="notification.toast"
    >
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 shrink-0 animate-bounce" />
        <p className="text-sm font-medium">
          🎉 Your order is ready! Please collect from the canteen counter.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="shrink-0 hover:opacity-80 transition-opacity"
        aria-label="Dismiss notification"
        data-ocid="notification.close_button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
