import { Button } from "@/components/ui/button";
import type { Order } from "@/data/mockVendorData";
import { Bell, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function Notifications({ orders, setOrders }: Props) {
  const readyOrders = orders.filter((o) => o.status === "ready");

  function notifyStudent(id: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, notified: true } : o)),
    );
    toast.success(`Student notified for order #${id} – Order Ready! 🎉`);
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500">
          Notify students when their orders are ready for pickup.
        </p>
      </div>

      {readyOrders.length === 0 ? (
        <div
          className="bg-white rounded-xl border border-gray-100 shadow-xs py-16 text-center"
          data-ocid="notifications.empty_state"
        >
          <Bell size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">
            No orders ready for pickup right now.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Orders marked "Ready" will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="notifications.list">
          {readyOrders.map((order, i) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-gray-100 shadow-xs p-4 flex items-center gap-4"
              data-ocid={`notifications.item.${i + 1}`}
            >
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                <Bell size={18} className="text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-orange-500 text-xs">
                    #{order.id}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm">
                    {order.studentName}
                  </span>
                  {order.notified && (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle size={12} /> Notified
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{order.items}</p>
                <p className="text-xs text-gray-400">
                  Pickup: {order.pickupTime}
                </p>
              </div>
              {!order.notified ? (
                <Button
                  onClick={() => notifyStudent(order.id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs shrink-0"
                  data-ocid={`notifications.notify.button.${i + 1}`}
                >
                  <Bell size={13} className="mr-1" /> Notify Student – Order
                  Ready
                </Button>
              ) : (
                <span
                  className="flex items-center gap-1 text-green-600 text-xs font-semibold shrink-0"
                  data-ocid={`notifications.success_state.${i + 1}`}
                >
                  <CheckCircle size={16} /> Sent
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
