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
  // ── Breakfast ──
  {
    id: BigInt(1),
    name: "Masala Dosa",
    category: "Breakfast",
    price: BigInt(45),
    description:
      "Crispy golden rice crepe filled with spiced potato masala, served with coconut chutney and hot sambar.",
    image: "/assets/generated/food-dosa.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🫓",
  },
  {
    id: BigInt(2),
    name: "Idli Sambar",
    category: "Breakfast",
    price: BigInt(30),
    description:
      "Soft steamed rice idlis served with piping hot lentil sambar and fresh coconut chutney.",
    image: "/assets/generated/food-idli.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍚",
  },
  {
    id: BigInt(3),
    name: "Poha",
    category: "Breakfast",
    price: BigInt(25),
    description:
      "Light flattened rice stir-fried with mustard seeds, curry leaves, onions and green peas, garnished with coriander.",
    image: "/assets/generated/food-poha.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍛",
  },
  {
    id: BigInt(4),
    name: "Upma",
    category: "Breakfast",
    price: BigInt(25),
    description:
      "Savoury semolina porridge cooked with veggies, mustard seeds and curry leaves. Light and filling!",
    image: "",
    isAvailable: true,
    emoji: "🥣",
  },
  {
    id: BigInt(5),
    name: "Aloo Paratha",
    category: "Breakfast",
    price: BigInt(40),
    description:
      "Whole-wheat flatbread stuffed with spiced mashed potato, served with fresh curd and pickle.",
    image: "",
    isAvailable: true,
    emoji: "🫓",
  },
  {
    id: BigInt(6),
    name: "Bread Butter Toast",
    category: "Breakfast",
    price: BigInt(20),
    description:
      "Golden toasted white bread with generous butter, served with jam. Simple, quick and satisfying.",
    image: "",
    isAvailable: true,
    emoji: "🍞",
  },

  // ── Lunch ──
  {
    id: BigInt(7),
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
    id: BigInt(8),
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
    id: BigInt(9),
    name: "Chole Bhature",
    category: "Lunch",
    price: BigInt(60),
    description:
      "Spicy Punjabi chickpea curry served with two large fluffy deep-fried bhature. A canteen classic!",
    image: "/assets/generated/food-cholebhature.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🫓",
  },
  {
    id: BigInt(10),
    name: "Paneer Butter Masala",
    category: "Lunch",
    price: BigInt(70),
    description:
      "Creamy tomato-based curry with soft paneer cubes, finished with butter and cream. Served with 2 chapatis.",
    image: "/assets/generated/food-paneer.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍛",
  },
  {
    id: BigInt(11),
    name: "Dal Rice",
    category: "Lunch",
    price: BigInt(50),
    description:
      "Comforting yellow dal tadka served with steamed basmati rice and a side of salad. Simple and wholesome.",
    image: "",
    isAvailable: true,
    emoji: "🍚",
  },
  {
    id: BigInt(12),
    name: "Rajma Rice",
    category: "Lunch",
    price: BigInt(55),
    description:
      "Rich kidney bean curry in a thick tomato-onion gravy, paired with steamed white rice and sliced onions.",
    image: "",
    isAvailable: true,
    emoji: "🫘",
  },
  {
    id: BigInt(13),
    name: "Veg Biryani",
    category: "Lunch",
    price: BigInt(80),
    description:
      "Fragrant basmati rice slow-cooked with mixed vegetables, whole spices, fried onions and fresh mint.",
    image: "/assets/generated/food-biryani.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍚",
  },
  {
    id: BigInt(14),
    name: "Club Sandwich",
    category: "Lunch",
    price: BigInt(40),
    description:
      "Triple-decker sandwich with paneer bhurji, fresh veggies, green chutney and cheese on toasted bread.",
    image: "/assets/generated/food-sandwich.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🥪",
  },
  {
    id: BigInt(15),
    name: "Veg Thali",
    category: "Lunch",
    price: BigInt(90),
    description:
      "Full meal — dal, sabzi, rice, 2 chapatis, salad, papad and a sweet. Best value lunch in the canteen!",
    image: "",
    isAvailable: true,
    emoji: "🍱",
  },

  // ── Snacks ──
  {
    id: BigInt(16),
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
    id: BigInt(17),
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
    id: BigInt(18),
    name: "Pav Bhaji",
    category: "Snacks",
    price: BigInt(45),
    description:
      "Spiced mashed vegetable curry served sizzling hot with butter-toasted pav buns and onion rings.",
    image: "/assets/generated/food-pavbhaji.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍲",
  },
  {
    id: BigInt(19),
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
    id: BigInt(20),
    name: "Bhel Puri",
    category: "Snacks",
    price: BigInt(25),
    description:
      "Puffed rice tossed with chopped onions, tomatoes, coriander, tamarind and green chutney. Tangy and crunchy!",
    image: "",
    isAvailable: true,
    emoji: "🥗",
  },
  {
    id: BigInt(21),
    name: "Bread Pakoda",
    category: "Snacks",
    price: BigInt(25),
    description:
      "Spiced potato-stuffed bread dipped in chickpea batter and deep-fried to golden crispy perfection.",
    image: "",
    isAvailable: true,
    emoji: "🍟",
  },
  {
    id: BigInt(22),
    name: "Misal Pav",
    category: "Snacks",
    price: BigInt(35),
    description:
      "Spicy sprouted moth bean curry topped with farsan, onions, coriander and lemon. Maharashtra's favourite!",
    image: "",
    isAvailable: true,
    emoji: "🥘",
  },
  {
    id: BigInt(23),
    name: "French Fries",
    category: "Snacks",
    price: BigInt(40),
    description:
      "Crispy golden potato fries seasoned with chaat masala and served with ketchup and mayo dips.",
    image: "/assets/generated/food-fries.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🍟",
  },
  {
    id: BigInt(24),
    name: "Spring Roll",
    category: "Snacks",
    price: BigInt(30),
    description:
      "Crispy fried rolls stuffed with spiced mixed vegetables and noodles, served with sweet chili sauce.",
    image: "",
    isAvailable: true,
    emoji: "🌯",
  },
  {
    id: BigInt(25),
    name: "Pani Puri",
    category: "Snacks",
    price: BigInt(20),
    description:
      "6 crispy hollow puris filled with spiced potato-chickpea mix and dipped in tangy tamarind pani.",
    image: "",
    isAvailable: true,
    emoji: "🫙",
  },
  {
    id: BigInt(26),
    name: "Dabeli",
    category: "Snacks",
    price: BigInt(20),
    description:
      "Kutchi street snack — spiced potato filling in a pav, topped with pomegranate, sev and chutneys.",
    image: "",
    isAvailable: true,
    emoji: "🫔",
  },

  // ── Drinks ──
  {
    id: BigInt(27),
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
    id: BigInt(28),
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
    id: BigInt(29),
    name: "Sweet Lassi",
    category: "Drinks",
    price: BigInt(30),
    description:
      "Thick chilled yogurt blended with sugar and a hint of rose water. Refreshing and creamy!",
    image: "/assets/generated/food-lassi.dim_400x300.jpg",
    isAvailable: true,
    emoji: "🥛",
  },
  {
    id: BigInt(30),
    name: "Mango Juice",
    category: "Drinks",
    price: BigInt(25),
    description:
      "Fresh pulpy Alphonso mango juice, chilled and served in a glass. Pure tropical goodness!",
    image: "",
    isAvailable: true,
    emoji: "🥭",
  },
  {
    id: BigInt(31),
    name: "Butter Milk (Chaas)",
    category: "Drinks",
    price: BigInt(15),
    description:
      "Spiced salted chaas with cumin, ginger and fresh coriander. Perfect with any meal!",
    image: "",
    isAvailable: true,
    emoji: "🥛",
  },
  {
    id: BigInt(32),
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
    id: BigInt(33),
    name: "Mineral Water",
    category: "Drinks",
    price: BigInt(15),
    description: "Chilled 500 ml sealed mineral water bottle.",
    image: "",
    isAvailable: true,
    emoji: "💧",
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
