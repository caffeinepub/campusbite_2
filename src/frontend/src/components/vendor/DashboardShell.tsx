import type { Section } from "@/App";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  initialEmergencyRequests,
  initialMenuItems,
} from "@/data/mockVendorData";
import type { EmergencyRequest, MenuItem, Order } from "@/data/mockVendorData";
import { getAllSharedOrders } from "@/utils/sharedOrderStorage";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ClipboardList,
  Clock,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import DashboardHome from "./DashboardHome";
import EmergencyHandling from "./EmergencyHandling";
import MenuManagement from "./MenuManagement";
import Notifications from "./Notifications";
import OrdersManagement from "./OrdersManagement";
import Reports from "./Reports";
import TimeManagement from "./TimeManagement";

interface Props {
  activeSection: Section;
  onSectionChange: (s: Section) => void;
  onLogout: () => void;
}

const navItems: {
  id: Section;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  {
    id: "orders",
    label: "Orders",
    icon: <ClipboardList size={18} />,
    badge: 0,
  },
  { id: "menu", label: "Menu Management", icon: <UtensilsCrossed size={18} /> },
  { id: "time", label: "Time Management", icon: <Clock size={18} /> },
  { id: "emergency", label: "Emergency", icon: <AlertTriangle size={18} /> },
  { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

function sharedToVendorOrder(
  so: ReturnType<typeof getAllSharedOrders>[number],
): Order {
  return {
    id: so.id,
    studentName: `${so.studentName} (${so.collegeId || "N/A"})`,
    items: so.items.map((i) => `${i.name} ×${i.qty}`).join(", "),
    qty: so.items.reduce((sum, i) => sum + i.qty, 0),
    pickupTime: so.pickupTime,
    status: so.status === "cancelled" ? "completed" : so.status,
  };
}

export default function DashboardShell({
  activeSection,
  onSectionChange,
  onLogout,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(() =>
    getAllSharedOrders().map(sharedToVendorOrder),
  );
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [emergencyRequests, setEmergencyRequests] = useState<
    EmergencyRequest[]
  >(initialEmergencyRequests);

  // Poll shared store every 5 seconds for new student orders
  useEffect(() => {
    const poll = () => {
      const fresh = getAllSharedOrders().map(sharedToVendorOrder);
      setOrders(fresh);
    };
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, []);

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const navWithBadge = navItems.map((n) =>
    n.id === "orders" ? { ...n, badge: pendingCount } : n,
  );

  function renderSection() {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardHome orders={orders} onSectionChange={onSectionChange} />
        );
      case "orders":
        return <OrdersManagement orders={orders} setOrders={setOrders} />;
      case "menu":
        return (
          <MenuManagement menuItems={menuItems} setMenuItems={setMenuItems} />
        );
      case "time":
        return <TimeManagement />;
      case "emergency":
        return (
          <EmergencyHandling
            requests={emergencyRequests}
            setRequests={setEmergencyRequests}
          />
        );
      case "reports":
        return <Reports orders={orders} />;
      case "notifications":
        return <Notifications orders={orders} setOrders={setOrders} />;
      case "settings":
        return <SettingsPage />;
      default:
        return null;
    }
  }

  return (
    <div className="flex h-screen bg-[#F3F5F7] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="button"
          tabIndex={0}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-100 flex flex-col shadow-xs transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src="/assets/campusbite-logo.png"
              alt="CampusBite"
              className="h-9 w-9 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div>
              <p className="font-bold text-orange-500 text-lg leading-tight font-display">
                CampusBite
              </p>
              <p className="text-xs text-gray-400 font-medium">Vendor Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navWithBadge.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                setSidebarOpen(false);
              }}
              data-ocid={`nav.${item.id}.link`}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    activeSection === item.id
                      ? "bg-white text-orange-500"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onLogout}
            data-ocid="nav.logout.button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 shadow-xs">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search orders, students..."
              className="pl-9 bg-gray-50 border-gray-200 rounded-lg text-sm h-9"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => onSectionChange("notifications")}
              data-ocid="header.notifications.button"
            >
              <Bell size={20} className="text-gray-500" />
              {pendingCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-orange-100 text-orange-600 text-xs font-bold">
                  VA
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                Vendor Admin
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">{renderSection()}</main>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-gray-500 text-sm mb-6">
        Manage your vendor account settings.
      </p>
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Canteen Name</p>
          <Input defaultValue="Saraswati College Canteen" className="mt-1" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Contact Number</p>
          <Input defaultValue="+91 98765 43210" className="mt-1" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">UPI ID</p>
          <Input defaultValue="canteen@upi" className="mt-1" />
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          data-ocid="settings.save_button"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
