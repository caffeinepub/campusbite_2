import type { OrderStatus } from "@/data/mockVendorData";

const config: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-gray-100 text-gray-600" },
  accepted: { label: "Accepted", className: "bg-blue-100 text-blue-700" },
  preparing: { label: "Preparing", className: "bg-amber-100 text-amber-700" },
  ready: { label: "Ready", className: "bg-green-100 text-green-700" },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-800",
  },
};

export default function StatusPill({ status }: { status: OrderStatus }) {
  const { label, className } = config[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}
