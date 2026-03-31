import { Button } from "@/components/ui/button";
import type { Order, OrderStatus } from "@/data/mockVendorData";
import { useState } from "react";
import { toast } from "sonner";
import StatusPill from "./StatusPill";

interface Props {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "accepted",
  accepted: "preparing",
  preparing: "ready",
  ready: "completed",
};

const actionLabel: Partial<Record<OrderStatus, string>> = {
  pending: "Accept Order",
  accepted: "Mark Preparing",
  preparing: "Mark Ready",
  ready: "Mark Completed",
};

const actionColor: Partial<Record<OrderStatus, string>> = {
  pending: "bg-orange-500 hover:bg-orange-600 text-white",
  accepted: "bg-blue-500 hover:bg-blue-600 text-white",
  preparing: "bg-amber-500 hover:bg-amber-600 text-white",
  ready: "bg-green-500 hover:bg-green-600 text-white",
};

const filterOptions: (OrderStatus | "all")[] = [
  "all",
  "pending",
  "accepted",
  "preparing",
  "ready",
  "completed",
];

export default function OrdersManagement({ orders, setOrders }: Props) {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  function advanceStatus(id: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = nextStatus[o.status];
        if (!next) return o;
        toast.success(
          `Order #${id} → ${next.charAt(0).toUpperCase() + next.slice(1)}`,
        );
        return { ...o, status: next };
      }),
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-sm text-gray-500">
          Manage and update order statuses in real time.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2" data-ocid="orders.filter.tab">
        {filterOptions.map((f) => (
          <button
            type="button"
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
              filter === f
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-orange-50"
            }`}
            data-ocid={`orders.${f}.tab`}
          >
            {f === "all" ? "All Orders" : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="orders.table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Student
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3 hidden md:table-cell">
                  Items
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Qty
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3 hidden sm:table-cell">
                  Pickup
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50/50 transition-colors"
                  data-ocid={`orders.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <span className="font-bold text-orange-500 text-xs">
                      #{order.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {order.studentName}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-[180px] truncate">
                    {order.items}
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">
                    {order.qty}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                    {order.pickupTime}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={order.status} />
                  </td>
                  <td className="px-4 py-3">
                    {nextStatus[order.status] ? (
                      <button
                        type="button"
                        onClick={() => advanceStatus(order.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${actionColor[order.status]}`}
                        data-ocid={`orders.action.button.${i + 1}`}
                      >
                        {actionLabel[order.status]}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">Done</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-gray-400 text-sm"
                    data-ocid="orders.empty_state"
                  >
                    No orders found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
