export interface MenuItemFrontend {
  id: bigint;
  name: string;
  category: string;
  price: bigint;
  description: string;
  image: string;
  isAvailable: boolean;
  emoji: string;
}

export const MENU_ITEMS: MenuItemFrontend[] = [
  {
    id: BigInt(1),
    name: "Veg Pizza",
    category: "Lunch",
    price: BigInt(80),
    description:
      "Crispy thin-crust pizza loaded with bell peppers, mushrooms, corn, and melted mozzarella on zesty tomato sauce.",
    image: "/assets/generated/food-pizza.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍕",
  },
  {
    id: BigInt(2),
    name: "Aloo Burger",
    category: "Lunch",
    price: BigInt(60),
    description:
      "Spiced aloo tikki patty with fresh lettuce, tomato, cheese and zesty mayo in a toasted golden bun.",
    image: "/assets/generated/food-burger.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍔",
  },
  {
    id: BigInt(3),
    name: "Club Sandwich",
    category: "Snacks",
    price: BigInt(40),
    description:
      "Triple-decker sandwich with paneer bhurji, fresh veggies, green chutney and cheese on toasted bread.",
    image: "/assets/generated/food-sandwich.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🥪",
  },
  {
    id: BigInt(4),
    name: "Masala Tea",
    category: "Drinks",
    price: BigInt(15),
    description:
      "Aromatic ginger-cardamom tea brewed with full-cream milk and premium Assam tea leaves.",
    image: "/assets/generated/food-tea.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍵",
  },
  {
    id: BigInt(5),
    name: "Cappuccino",
    category: "Drinks",
    price: BigInt(20),
    description:
      "Freshly brewed espresso topped with velvety steamed milk foam, finished with a dusting of cocoa powder.",
    image: "/assets/generated/food-coffee.dim_400x300.jpg",
    isAvailable: true,
    emoji: "☕",
  },
  {
    id: BigInt(6),
    name: "Vada Pav",
    category: "Snacks",
    price: BigInt(15),
    description:
      "Mumbai's favourite street food — crispy fried vada in a soft pav with green chutney and tamarind sauce.",
    image: "/assets/generated/food-vadapav.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🥙",
  },
  {
    id: BigInt(7),
    name: "Crispy Samosa",
    category: "Snacks",
    price: BigInt(10),
    description:
      "Golden flaky pastry stuffed with spiced potato and peas, served hot with tangy mint chutney.",
    image: "/assets/generated/food-samosa.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🥟",
  },
  {
    id: BigInt(8),
    name: "Masala Maggi",
    category: "Snacks",
    price: BigInt(30),
    description:
      "Stir-fried Maggi noodles with crunchy veggies, fresh herbs, and a generous sprinkle of spicy Maggi masala.",
    image: "/assets/generated/food-maggi.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍜",
  },
  {
    id: BigInt(9),
    name: "Cold Drink",
    category: "Drinks",
    price: BigInt(25),
    description:
      "Chilled canned soft drink — Pepsi, Sprite, or Mirinda. The perfect pick-me-up between lectures!",
    image: "",
    isAvailable: true,
    emoji: "🥤",
  },
  {
    id: BigInt(10),
    name: "Masala Dosa",
    category: "Breakfast",
    price: BigInt(45),
    description:
      "Crispy golden rice crepe filled with spiced potato masala, served with coconut chutney and hot sambar.",
    image: "/assets/generated/food-dosa.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🫓",
  },
];

export const CATEGORIES = ["All", "Breakfast", "Lunch", "Snacks", "Drinks"];

export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let min = 0; min < 60; min += 30) {
      if (hour === 18 && min > 0) break;
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const displayMin = min === 0 ? "00" : "30";
      slots.push(`${displayHour}:${displayMin} ${period}`);
    }
  }
  return slots;
}
