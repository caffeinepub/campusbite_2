import { Toaster } from "@/components/ui/sonner";
import DashboardShell from "@/components/vendor/DashboardShell";
import LoginPage from "@/components/vendor/LoginPage";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import MenuPage from "@/pages/MenuPage";
import OrderPage from "@/pages/OrderPage";
import TrackingPage from "@/pages/TrackingPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { useState } from "react";

export type Section =
  | "dashboard"
  | "orders"
  | "menu"
  | "time"
  | "emergency"
  | "reports"
  | "notifications"
  | "settings";

// ---------- Student App wrapper (provides Auth + Cart context) ----------
function StudentApp() {
  return (
    <AuthProvider>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </AuthProvider>
  );
}

// ---------- Vendor App wrapper ----------
function VendorApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("dashboard");

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <DashboardShell
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}

// ---------- Routes ----------
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const studentLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "student",
  component: StudentApp,
});

const authRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/auth",
  component: AuthPage,
});

const homeRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/",
  component: HomePage,
  beforeLoad: () => {
    // Redirect to auth if not logged in
    const stored = localStorage.getItem("campusbite-current-user");
    if (!stored) throw redirect({ to: "/auth" });
  },
});

const menuRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/menu",
  component: MenuPage,
  beforeLoad: () => {
    const stored = localStorage.getItem("campusbite-current-user");
    if (!stored) throw redirect({ to: "/auth" });
  },
});

const orderRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/order",
  component: OrderPage,
  beforeLoad: () => {
    const stored = localStorage.getItem("campusbite-current-user");
    if (!stored) throw redirect({ to: "/auth" });
  },
});

const trackingRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/tracking",
  component: TrackingPage,
  beforeLoad: () => {
    const stored = localStorage.getItem("campusbite-current-user");
    if (!stored) throw redirect({ to: "/auth" });
  },
});

const vendorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor",
  component: VendorApp,
});

const routeTree = rootRoute.addChildren([
  studentLayoutRoute.addChildren([
    homeRoute,
    authRoute,
    menuRoute,
    orderRoute,
    trackingRoute,
  ]),
  vendorRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
