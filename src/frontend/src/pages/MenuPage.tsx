import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { CATEGORIES, MENU_ITEMS } from "@/data/menuItems";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { items: cartItems, addItem, updateQuantity, totalCount } = useCart();

  const filtered =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((m) => m.category === activeCategory);

  const getCartItem = (id: bigint) =>
    cartItems.find((i) => i.menuItemId === id);

  const handleAdd = (item: (typeof MENU_ITEMS)[0]) => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <main className="min-h-screen bg-muted">
      {/* Header */}
      <section className="bg-background border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">
            Our Menu
          </h1>
          <p className="text-muted-foreground">
            Fresh, delicious food made with love at Saraswati College Canteen
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8" data-ocid="menu.tab">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:bg-card hover:text-foreground border border-border"
              }`}
              data-ocid="menu.tab"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="menu.list"
          >
            {filtered.map((item, i) => {
              const cartItem = getCartItem(item.id);
              return (
                <motion.div
                  key={item.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow flex flex-col"
                  data-ocid={`menu.item.${i + 1}`}
                >
                  {/* Food Image */}
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-campus-yellow/20 to-accent/20">
                        <span className="text-6xl">{item.emoji}</span>
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs">
                      {item.category}
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-background/90 text-foreground text-sm font-bold border">
                      ₹{Number(item.price)}
                    </Badge>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-foreground text-base mb-1">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Actions */}
                    <div className="mt-4">
                      {cartItem ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, cartItem.quantity - 1)
                              }
                              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              data-ocid={`menu.item.${i + 1}`}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="font-bold text-foreground w-5 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, cartItem.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                              data-ocid={`menu.item.${i + 1}`}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            ₹{Number(item.price) * cartItem.quantity}
                          </span>
                        </div>
                      ) : (
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => handleAdd(item)}
                          data-ocid={`menu.item.${i + 1}`}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filtered.length === 0 && (
              <div
                className="col-span-full py-20 text-center"
                data-ocid="menu.empty_state"
              >
                <p className="text-muted-foreground">
                  No items in this category right now.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating cart bar */}
        {totalCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <Link to="/order">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-lg font-semibold"
                data-ocid="cart.primary_button"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Cart ({totalCount} items)
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
