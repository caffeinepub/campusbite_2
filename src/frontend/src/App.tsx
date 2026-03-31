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
  useNavigate,
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

// ---------- Role Selection Landing Page ----------
function RoleSelectPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo / Branding */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <img
          src="/assets/generated/campusbite-logo.png"
          alt="CampusBite"
          style={{ height: "72px", objectFit: "contain", marginBottom: "12px" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#ea580c",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          CampusBite
        </h1>
        <p style={{ color: "#78716c", marginTop: "8px", fontSize: "1.1rem" }}>
          Saraswati College of Engineering — Canteen Pre-Order
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: "640px",
        }}
      >
        {/* Student Card */}
        <button
          type="button"
          data-ocid="role_select.student.button"
          onClick={() => navigate({ to: "/auth" })}
          style={{
            flex: "1 1 240px",
            background: "#fff",
            border: "2px solid #fdba74",
            borderRadius: "20px",
            padding: "36px 28px",
            cursor: "pointer",
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(234,88,12,0.10)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#ea580c";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 32px rgba(234,88,12,0.18)";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#fdba74";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 24px rgba(234,88,12,0.10)";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#fff7ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "2rem",
            }}
          >
            🎓
          </div>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#1c1917",
              margin: "0 0 8px",
            }}
          >
            Student / Faculty
          </h2>
          <p style={{ color: "#78716c", fontSize: "0.9rem", margin: 0 }}>
            Browse menu, place orders &amp; track pickup
          </p>
          <div
            style={{
              marginTop: "20px",
              background: "#ea580c",
              color: "#fff",
              borderRadius: "10px",
              padding: "10px 20px",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Login / Sign Up →
          </div>
        </button>

        {/* Vendor Card */}
        <button
          type="button"
          data-ocid="role_select.vendor.button"
          onClick={() => navigate({ to: "/vendor" })}
          style={{
            flex: "1 1 240px",
            background: "#fff",
            border: "2px solid #fdba74",
            borderRadius: "20px",
            padding: "36px 28px",
            cursor: "pointer",
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(234,88,12,0.10)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#ea580c";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 32px rgba(234,88,12,0.18)";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#fdba74";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 24px rgba(234,88,12,0.10)";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#fff7ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "2rem",
            }}
          >
            🍽️
          </div>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#1c1917",
              margin: "0 0 8px",
            }}
          >
            Vendor / Canteen Staff
          </h2>
          <p style={{ color: "#78716c", fontSize: "0.9rem", margin: 0 }}>
            Manage orders, menu &amp; canteen operations
          </p>
          <div
            style={{
              marginTop: "20px",
              background: "#1c1917",
              color: "#fff",
              borderRadius: "10px",
              padding: "10px 20px",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Vendor Login →
          </div>
        </button>
      </div>

      <p style={{ marginTop: "48px", color: "#a8a29e", fontSize: "0.85rem" }}>
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          style={{ color: "#ea580c", textDecoration: "none" }}
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}

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

const roleSelectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    const stored = localStorage.getItem("campusbite-current-user");
    if (stored) {
      // Already logged in as student — redirect to home
      throw redirect({ to: "/home" });
    }
    return <RoleSelectPage />;
  },
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
  path: "/home",
  component: HomePage,
  beforeLoad: () => {
    const stored = localStorage.getItem("campusbite-current-user");
    if (!stored) throw redirect({ to: "/" });
  },
});

const menuRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/menu",
  component: MenuPage,
  beforeLoad: () => {
    const stored = localStorage.getItem("campusbite-current-user");
    if (!stored) throw redirect({ to: "/" });
  },
});

const orderRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/order",
  component: OrderPage,
  beforeLoad: () => {
    const stored = localStorage.getItem("campusbite-current-user");
    if (!stored) throw redirect({ to: "/" });
  },
});

const trackingRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/tracking",
  component: TrackingPage,
  beforeLoad: () => {
    const stored = localStorage.getItem("campusbite-current-user");
    if (!stored) throw redirect({ to: "/" });
  },
});

const vendorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor",
  component: VendorApp,
});

const routeTree = rootRoute.addChildren([
  roleSelectRoute,
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
