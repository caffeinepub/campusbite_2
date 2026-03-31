import type { Order } from "@/data/mockVendorData";
import { Calendar, IndianRupee, ShoppingBag, TrendingUp } from "lucide-react";

interface Props {
  orders: Order[];
}

const weeklyData = [
  { day: "Mon", orders: 22, revenue: 2640 },
  { day: "Tue", orders: 28, revenue: 3360 },
  { day: "Wed", orders: 18, revenue: 2160 },
  { day: "Thu", orders: 35, revenue: 4200 },
  { day: "Fri", orders: 42, revenue: 5040 },
  { day: "Sat", orders: 15, revenue: 1800 },
  { day: "Sun", orders: 8, revenue: 960 },
];

const hourlyOrders = [
  { hour: "9am", orders: 2 },
  { hour: "10am", orders: 5 },
  { hour: "11am", orders: 8 },
  { hour: "12pm", orders: 14 },
  { hour: "1pm", orders: 11 },
  { hour: "2pm", orders: 6 },
  { hour: "3pm", orders: 3 },
  { hour: "4pm", orders: 1 },
];
const maxOrders = Math.max(...hourlyOrders.map((h) => h.orders));

export default function Reports({ orders }: Props) {
  const completed = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.qty * 80, 0);
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const summaryStats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: <ShoppingBag size={18} />,
      color: "text-orange-500",
    },
    {
      label: "Completed",
      value: completed,
      icon: <TrendingUp size={18} />,
      color: "text-green-500",
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: <IndianRupee size={18} />,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500">
          Daily and weekly sales summaries.
        </p>
      </div>

      {/* Today */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-orange-500" />
          <h2 className="font-semibold text-gray-900">Today's Summary</h2>
          <span className="text-xs text-gray-400 ml-auto">{today}</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {summaryStats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              data-ocid={`reports.summary.card.${i + 1}`}
            >
              <div className="flex justify-center mb-1">
                <span className={s.color}>{s.icon}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-5">
        <h2 className="font-semibold text-gray-900 mb-1">
          Orders by Hour (Today)
        </h2>
        <p className="text-xs text-gray-400 mb-4">Peak time: 12 PM</p>
        <div className="flex items-end gap-2 h-32">
          {hourlyOrders.map((h) => (
            <div
              key={h.hour}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-xs text-gray-500">{h.orders}</span>
              <div
                className="w-full bg-orange-400 rounded-t-md"
                style={{ height: `${(h.orders / maxOrders) * 96}px` }}
              />
              <span className="text-[10px] text-gray-400">{h.hour}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Last 7 Days Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="reports.table">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-5 py-3">
                  Day
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-5 py-3">
                  Orders
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-5 py-3">
                  Revenue
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-5 py-3">
                  Avg/Order
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {weeklyData.map((d, i) => (
                <tr
                  key={d.day}
                  className="hover:bg-gray-50/50"
                  data-ocid={`reports.row.item.${i + 1}`}
                >
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {d.day}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{d.orders}</td>
                  <td className="px-5 py-3 text-green-600 font-semibold">
                    ₹{d.revenue}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    ₹{Math.round(d.revenue / d.orders)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
