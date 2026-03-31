import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, ShoppingCart, UtensilsCrossed, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalCount } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Menu", to: "/menu" },
    { label: "Track Order", to: "/tracking" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.link"
          >
            <img
              src="/assets/campusbite-logo.png"
              alt="CampusBite"
              className="h-10 w-auto"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const fallback = img.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <span
              className="hidden items-center gap-1.5 font-display font-bold text-xl text-primary"
              style={{ display: "none" }}
            >
              <UtensilsCrossed className="h-5 w-5" />
              CampusBite
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/order" className="relative" data-ocid="nav.link">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-ocid="cart.button"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                    {totalCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {currentUser ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
                  {currentUser.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  data-ocid="auth.secondary_button"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate({ to: "/auth" })}
                data-ocid="auth.primary_button"
              >
                Login / Sign Up
              </Button>
            )}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium px-2 py-1.5 rounded hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <>
                <span className="text-sm font-medium px-2 text-muted-foreground">
                  {currentUser.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  data-ocid="auth.secondary_button"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  navigate({ to: "/auth" });
                  setMobileOpen(false);
                }}
                data-ocid="auth.primary_button"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
