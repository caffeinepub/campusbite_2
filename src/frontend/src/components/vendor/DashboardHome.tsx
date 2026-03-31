import type { Section } from "@/App";
import type { Order } from "@/data/mockVendorData";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import StatusPill from "./StatusPill";

interface Props {
  orders: Order[];
  onSectionChange: (s: Section) => void;
}

export default function DashboardHome({ orders, onSectionChange }: Props) {
  const totalToday = orders.length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const preparing = orders.filter((o) => o.status === "preparing").length;
  const completed = orders.filter((o) => o.status === "completed").length;

  const stats = [
    {
      label: "Total Orders Today",
      value: totalToday,
      icon: <ShoppingBag size={20} />,
      delta: "+3 from yesterday",
      color: "text-orange-500",
    },
    {
      label: "Pending Orders",
      value: pending,
      icon: <Clock size={20} />,
      delta: "Awaiting action",
      color: "text-amber-500",
    },
    {
      label: "Preparing",
      value: preparing,
      icon: <TrendingUp size={20} />,
      delta: "In kitchen",
      color: "text-blue-500",
    },
    {
      label: "Completed",
      value: completed,
      icon: <CheckCircle size={20} />,
      delta: "Successfully served",
      color: "text-green-500",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const hourlyData = [
    { hour: "10am", count: 4 },
    { hour: "11am", count: 7 },
    { hour: "12pm", count: 9 },
    { hour: "1pm", count: 6 },
    { hour: "2pm", count: 3 },
    { hour: "3pm", count: 1 },
  ];
  const maxCount = Math.max(...hourlyData.map((h) => h.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.section"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-100 shadow-xs p-4 flex items-start gap-3"
            data-ocid={`dashboard.card.${i + 1}`}
          >
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className={s.color}>{s.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs font-medium text-gray-600 leading-tight">
                {s.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{s.delta}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <button
              type="button"
              onClick={() => onSectionChange("orders")}
              className="text-xs text-orange-500 font-medium flex items-center gap-1 hover:text-orange-600"
              data-ocid="dashboard.orders.link"
            >
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order, i) => (
              <div
                key={order.id}
                className="px-5 py-3 flex items-center gap-3"
                data-ocid={`dashboard.order.item.${i + 1}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-orange-500">
                      #{order.id}
                    </span>
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {order.studentName}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {order.items}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-500">
                    {order.pickupTime}
                  </span>
                  <StatusPill status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats / Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-xs">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Orders by Hour</h2>
            <p className="text-xs text-gray-400">Today's distribution</p>
          </div>
          <div className="p-5">
            <div className="flex items-end gap-2 h-28">
              {hourlyData.map((h) => (
                <div
                  key={h.hour}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <span className="text-xs text-gray-500 font-medium">
                    {h.count}
                  </span>
                  <div
                    className="w-full bg-orange-400 rounded-t-md transition-all"
                    style={{ height: `${(h.count / maxCount) * 72}px` }}
                  />
                  <span className="text-[10px] text-gray-400">{h.hour}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Revenue</span>
                <span className="font-bold text-gray-900">₹2,840</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Avg. Prep Time</span>
                <span className="font-bold text-gray-900">17 min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Peak Hour</span>
                <span className="font-bold text-gray-900">12 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
