import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { MENU_ITEMS } from "@/data/menuItems";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  ShoppingBag,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const FEATURED_IDS = [BigInt(1), BigInt(6), BigInt(10), BigInt(7)];

const HOW_IT_WORKS = [
  {
    icon: ShoppingBag,
    step: "01",
    title: "Browse Menu",
    desc: "Explore our freshly prepared breakfast, lunch, snacks and drinks — updated daily.",
  },
  {
    icon: Clock,
    step: "02",
    title: "Place Pre-Order",
    desc: "Select your items, choose a pickup time, and pay via UPI or Cash on Pickup.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Pick Up & Enjoy",
    desc: "Walk straight to the counter, collect your order, and save precious time!",
  },
];

export default function HomePage() {
  const { addItem, items } = useCart();
  const featuredItems = MENU_ITEMS.filter((m) => FEATURED_IDS.includes(m.id));

  const handleAddToCart = (item: (typeof MENU_ITEMS)[0]) => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-[520px] md:h-[580px] overflow-hidden"
        data-ocid="home.section"
      >
        <img
          src="/assets/whatsapp_image_2026-03-31_at_1.29.25_pm-019d42e7-f9cc-7101-bfc5-eada623f92b2.jpeg"
          alt="Saraswati College Canteen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-xl"
            >
              <Badge className="mb-4 bg-campus-yellow/20 text-campus-yellow border-campus-yellow/30 text-xs font-semibold">
                🏫 Saraswati College of Engineering
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                CampusBite –{" "}
                <span className="text-campus-yellow">
                  Your time is our priority!
                </span>
              </h1>
              <p className="text-white/85 text-lg mb-8">
                Skip the queue, pre-order your food and pick it up hot &amp;
                fresh.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/menu">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-semibold shadow-lg"
                    data-ocid="home.primary_button"
                  >
                    Order Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/tracking">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur"
                    data-ocid="home.secondary_button"
                  >
                    Track Order
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Kharghar, Navi Mumbai</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Open 8 AM – 6 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>4.8 ★ Student Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>15–20 min prep time</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted" data-ocid="home.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Three simple steps to your favourite meal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-card rounded-2xl p-7 shadow-card text-center relative overflow-hidden"
              >
                <span className="absolute top-4 right-4 text-4xl font-display font-bold text-primary/10">
                  {step.step}
                </span>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Favorites */}
      <section className="py-16 bg-background" data-ocid="home.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-1">
                Campus Favorites
              </h2>
              <p className="text-muted-foreground text-sm">
                Most loved by students
              </p>
            </div>
            <Link to="/menu">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                data-ocid="home.secondary_button"
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredItems.map((item, i) => {
              const inCart = items.find((ci) => ci.menuItemId === item.id);
              return (
                <motion.div
                  key={item.id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                  data-ocid={`home.item.${i + 1}`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-campus-yellow/20">
                        <span className="text-5xl">{item.emoji}</span>
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                      ₹{Number(item.price)}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleAddToCart(item)}
                      data-ocid={`home.item.${i + 1}`}
                    >
                      {inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 bg-gradient-to-r from-primary to-campus-yellow"
        data-ocid="home.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Hungry? Order in 30 seconds!
            </h2>
            <p className="text-white/90 mb-6">
              Browse 10+ freshly made items and skip the canteen queue forever.
            </p>
            <Link to="/menu">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-10 font-bold shadow-lg"
                data-ocid="home.primary_button"
              >
                Explore Full Menu
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
