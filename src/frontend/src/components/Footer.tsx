import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Phone } from "lucide-react";
import { SiInstagram, SiWhatsapp, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-campus-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/campusbite-logo.png"
                alt="CampusBite"
                className="h-10 w-auto brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Skip the queue, pre-order your food. Your time is our priority!
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-campus-yellow transition-colors"
                aria-label="Instagram"
                data-ocid="footer.link"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-campus-yellow transition-colors"
                aria-label="Twitter / X"
                data-ocid="footer.link"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-campus-yellow transition-colors"
                aria-label="WhatsApp"
                data-ocid="footer.link"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/home" },
                { label: "Menu", to: "/menu" },
                { label: "Place Order", to: "/order" },
                { label: "Track Order", to: "/tracking" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 hover:text-campus-yellow transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* College Info */}
          <div>
            <h3 className="font-semibold text-white mb-3">College Canteen</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-campus-yellow" />
                <span>
                  Saraswati College of Engineering,
                  <br />
                  Kharghar, Navi Mumbai – 410210
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 shrink-0 text-campus-yellow" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-campus-yellow transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/50">
            © {year}. Built with{" "}
            <Heart className="inline h-3 w-3 text-red-400 mx-0.5" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-sm text-white/50">
            Canteen timings: 8:00 AM – 6:00 PM
          </p>
        </div>
      </div>
    </footer>
  );
}
