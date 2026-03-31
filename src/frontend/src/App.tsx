import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NotificationBanner from "@/components/NotificationBanner";
import { Toaster } from "@/components/ui/sonner";
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
} from "@tanstack/react-router";

function RootLayout() {
  return (
    <CartProvider>
      <NotificationBanner />
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster position="bottom-right" />
    </CartProvider>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu",
  component: MenuPage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order",
  component: OrderPage,
});

const trackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tracking",
  component: TrackingPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  menuRoute,
  orderRoute,
  trackingRoute,
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
