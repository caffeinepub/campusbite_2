import { Toaster } from "@/components/ui/sonner";
import DashboardShell from "@/components/vendor/DashboardShell";
import LoginPage from "@/components/vendor/LoginPage";
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("dashboard");

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  return (
    <>
      <DashboardShell
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={() => setIsLoggedIn(false)}
      />
      <Toaster richColors position="top-right" />
    </>
  );
}
