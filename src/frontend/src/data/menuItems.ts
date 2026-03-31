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
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop&q=80",
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
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop&q=80",
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
    image: "/assets/image-019d4337-0b20-755e-bbbb-17f1d47356de.png",
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
    image: "/assets/image-019d4336-f95a-7618-ae7b-26de04b55898.png",
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
    image: "/assets/image-019d4345-b648-703d-9f1d-e2d52abb8293.png",
    isAvailable: true,
    emoji: "🫓",
  },
  {
    id: BigInt(6),
    name: "Bread Butter",
    category: "Breakfast",
    price: BigInt(20),
    description:
      "Golden toasted white bread with generous butter, served with jam. Simple, quick and satisfying.",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍞",
  },
  {
    id: BigInt(7),
    name: "Veg Sandwich",
    category: "Breakfast",
    price: BigInt(35),
    description:
      "Fresh vegetables with cheese and green chutney grilled between toasted bread slices.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🥪",
  },
  {
    id: BigInt(8),
    name: "Omelette",
    category: "Breakfast",
    price: BigInt(30),
    description:
      "Fluffy egg omelette with onions, tomatoes, green chillies and coriander. Served with bread.",
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍳",
  },
  {
    id: BigInt(9),
    name: "Boiled Eggs",
    category: "Breakfast",
    price: BigInt(20),
    description:
      "2 perfectly boiled eggs served with salt, pepper and a slice of bread.",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🥚",
  },

  // ── Lunch ──
  {
    id: BigInt(11),
    name: "Dal Rice",
    category: "Lunch",
    price: BigInt(50),
    description:
      "Comforting yellow dal tadka served with steamed basmati rice and a side of salad.",
    image: "/assets/image-019d4336-f91b-774b-8777-9e9150e46446.png",
    isAvailable: true,
    emoji: "🍚",
  },
  {
    id: BigInt(12),
    name: "Rajma Chawal",
    category: "Lunch",
    price: BigInt(55),
    description:
      "Rich kidney bean curry in thick tomato-onion gravy, paired with steamed white rice.",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🫘",
  },
  {
    id: BigInt(13),
    name: "Chole Bhature",
    category: "Lunch",
    price: BigInt(60),
    description:
      "Spicy Punjabi chickpea curry served with two large fluffy deep-fried bhature.",
    image: "/assets/image-019d4336-f99d-703e-815e-1ed39068a958.png",
    isAvailable: true,
    emoji: "🫓",
  },
  {
    id: BigInt(14),
    name: "Paneer Butter Masala + Roti",
    category: "Lunch",
    price: BigInt(70),
    description:
      "Creamy tomato-based curry with soft paneer cubes, finished with butter and cream. Served with 2 rotis.",
    image: "/assets/image-019d4345-b616-7342-b81a-41b13754dd91.png",
    isAvailable: true,
    emoji: "🍛",
  },
  {
    id: BigInt(15),
    name: "Mix Veg + Roti",
    category: "Lunch",
    price: BigInt(55),
    description:
      "Seasonal mixed vegetables in a spiced gravy served with fresh whole wheat rotis.",
    image: "/assets/image-019d4345-b6f8-7580-acd2-3c8e218caa9b.png",
    isAvailable: true,
    emoji: "🥘",
  },
  {
    id: BigInt(16),
    name: "Fried Rice",
    category: "Lunch",
    price: BigInt(65),
    description:
      "Wok-tossed basmati rice with vegetables, eggs or paneer, soy sauce and spring onions.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍳",
  },
  {
    id: BigInt(17),
    name: "Veg Biryani",
    category: "Lunch",
    price: BigInt(80),
    description:
      "Fragrant basmati rice slow-cooked with mixed vegetables, whole spices, fried onions and fresh mint.",
    image: "/assets/image-019d4345-b6fc-749f-b076-413aff7d2ec8.png",
    isAvailable: true,
    emoji: "🍚",
  },
  {
    id: BigInt(18),
    name: "Curd Rice",
    category: "Lunch",
    price: BigInt(40),
    description:
      "Soft cooked rice mixed with fresh curd, tempered with mustard seeds and curry leaves.",
    image: "/assets/image-019d4345-b6c7-7778-9598-d8009212fdf1.png",
    isAvailable: true,
    emoji: "🍚",
  },
  {
    id: BigInt(19),
    name: "Roti Sabzi",
    category: "Lunch",
    price: BigInt(45),
    description:
      "3 soft whole wheat rotis served with the day's special sabzi and dal.",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🫓",
  },

  // ── Dinner ──
  {
    id: BigInt(20),
    name: "Paneer Tikka Masala + Naan",
    category: "Dinner",
    price: BigInt(90),
    description:
      "Smoky grilled paneer cubes in rich tikka masala gravy, served with soft butter naan.",
    image: "/assets/image-019d4336-faa2-7196-ac6e-f896b87f0a09.png",
    isAvailable: true,
    emoji: "🍛",
  },
  {
    id: BigInt(23),
    name: "Hakka Noodles",
    category: "Dinner",
    price: BigInt(60),
    description:
      "Indo-Chinese style stir-fried noodles with veggies, soy sauce, and chilli in a hot wok.",
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍜",
  },
  {
    id: BigInt(25),
    name: "Dal Tadka + Jeera Rice",
    category: "Dinner",
    price: BigInt(60),
    description:
      "Smoky dal tadka with ghee and red chilli, served alongside fragrant cumin-tempered jeera rice.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍲",
  },
  {
    id: BigInt(26),
    name: "Butter Roti + Sabzi",
    category: "Dinner",
    price: BigInt(50),
    description:
      "3 soft butter-smeared rotis with the night's special seasonal vegetable sabzi.",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🫓",
  },
  {
    id: BigInt(27),
    name: "Chicken Curry + Rice",
    category: "Dinner",
    price: BigInt(100),
    description:
      "Tender chicken pieces in a rich, aromatic curry served with steamed basmati rice.",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍗",
  },

  // ── Snacks ──
  {
    id: BigInt(28),
    name: "Samosa",
    category: "Snacks",
    price: BigInt(10),
    description:
      "Golden flaky pastry stuffed with spiced potato and peas, served hot with tangy mint chutney.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🥟",
  },
  {
    id: BigInt(29),
    name: "Vada Pav",
    category: "Snacks",
    price: BigInt(15),
    description:
      "Mumbai's favourite street food — crispy fried vada in a soft pav with green chutney and tamarind sauce.",
    image:
      "https://blog.swiggy.com/wp-content/uploads/2024/11/Image-1_mumbai-vada-pav-1024x538.png",
    isAvailable: true,
    emoji: "🥙",
  },
  {
    id: BigInt(30),
    name: "Pav Bhaji",
    category: "Snacks",
    price: BigInt(45),
    description:
      "Spiced mashed vegetable curry served sizzling hot with butter-toasted pav buns and onion rings.",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍲",
  },
  {
    id: BigInt(31),
    name: "French Fries",
    category: "Snacks",
    price: BigInt(40),
    description:
      "Crispy golden potato fries seasoned with chaat masala and served with ketchup and mayo dips.",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍟",
  },
  {
    id: BigInt(32),
    name: "Veg Burger",
    category: "Snacks",
    price: BigInt(50),
    description:
      "Crispy aloo tikki patty with lettuce, tomato, cheese and zesty mayo in a toasted golden bun.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍔",
  },
  {
    id: BigInt(33),
    name: "Cheese Sandwich",
    category: "Snacks",
    price: BigInt(40),
    description:
      "Grilled sandwich with melted cheese, vegetables and green chutney between golden toasted bread.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🥪",
  },
  {
    id: BigInt(34),
    name: "Maggi",
    category: "Snacks",
    price: BigInt(30),
    description:
      "Stir-fried Maggi noodles with crunchy veggies and a generous sprinkle of spicy masala.",
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍜",
  },
  {
    id: BigInt(36),
    name: "Momos",
    category: "Snacks",
    price: BigInt(50),
    description:
      "Steamed or fried dumplings filled with spiced vegetables or paneer, served with spicy red chutney.",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🥟",
  },

  // ── Chinese ──

  {
    id: BigInt(60),
    name: "Veg Chow Mein",
    category: "Chinese",
    price: BigInt(60),
    description:
      "Stir-fried noodles with julienned vegetables, garlic, soy sauce and sesame oil in a hot wok.",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍜",
  },
  {
    id: BigInt(61),
    name: "Veg Fried Rice (Chinese)",
    category: "Chinese",
    price: BigInt(60),
    description:
      "Wok-tossed basmati rice with vegetables, soy sauce, spring onions and a hint of vinegar.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍳",
  },

  // ── Shakes ──
  {
    id: BigInt(37),
    name: "Chocolate Shake",
    category: "Shakes",
    price: BigInt(60),
    description:
      "Rich creamy chocolate milkshake blended with full-cream milk and topped with chocolate syrup.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍫",
  },
  {
    id: BigInt(38),
    name: "Strawberry Shake",
    category: "Shakes",
    price: BigInt(60),
    description:
      "Fresh strawberry milkshake blended with chilled milk and a scoop of vanilla ice cream.",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍓",
  },
  {
    id: BigInt(39),
    name: "Mango Shake",
    category: "Shakes",
    price: BigInt(60),
    description:
      "Thick Alphonso mango shake blended with chilled milk. Tropical, sweet and utterly refreshing!",
    image:
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🥭",
  },
  {
    id: BigInt(40),
    name: "Banana Shake",
    category: "Shakes",
    price: BigInt(55),
    description:
      "Creamy banana milkshake blended with ripe bananas, cold milk and a hint of honey.",
    image:
      "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍌",
  },
  {
    id: BigInt(41),
    name: "Oreo Shake",
    category: "Shakes",
    price: BigInt(70),
    description:
      "Indulgent Oreo cookie milkshake blended with vanilla ice cream and topped with crushed Oreos.",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍪",
  },

  // ── Tea & Coffee ──
  {
    id: BigInt(42),
    name: "Chai",
    category: "Tea & Coffee",
    price: BigInt(10),
    description:
      "Hot brewed tea with milk and sugar. The classic student energy booster!",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍵",
  },
  {
    id: BigInt(43),
    name: "Masala Chai",
    category: "Tea & Coffee",
    price: BigInt(15),
    description:
      "Aromatic ginger-cardamom tea brewed with full-cream milk and premium Assam tea leaves.",
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍵",
  },
  {
    id: BigInt(44),
    name: "Cutting Chai",
    category: "Tea & Coffee",
    price: BigInt(10),
    description:
      "Mumbai-style strong half-cup tea served in a small glass. Perfect quick refreshment!",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍵",
  },
  {
    id: BigInt(45),
    name: "Hot Coffee",
    category: "Tea & Coffee",
    price: BigInt(20),
    description:
      "Freshly brewed hot coffee with steamed milk. Perfect to stay alert through lectures!",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "☕",
  },
  {
    id: BigInt(46),
    name: "Cold Coffee",
    category: "Tea & Coffee",
    price: BigInt(35),
    description:
      "Chilled blended coffee with milk and ice cream. Creamy, sweet and refreshing!",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "☕",
  },
  {
    id: BigInt(47),
    name: "Black Coffee",
    category: "Tea & Coffee",
    price: BigInt(15),
    description:
      "Strong plain black coffee without milk. Pure, bold and energizing.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "☕",
  },

  // ── Fresh Drinks ──
  {
    id: BigInt(48),
    name: "Orange Juice",
    category: "Fresh Drinks",
    price: BigInt(40),
    description:
      "Freshly squeezed pure orange juice, chilled and served in a tall glass. 100% natural!",
    image:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍊",
  },
  {
    id: BigInt(49),
    name: "Watermelon Juice",
    category: "Fresh Drinks",
    price: BigInt(35),
    description:
      "Ice-cold fresh watermelon juice, sweetened with a hint of black salt and lemon.",
    image:
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍉",
  },
  {
    id: BigInt(50),
    name: "Sugarcane Juice",
    category: "Fresh Drinks",
    price: BigInt(25),
    description:
      "Freshly pressed sugarcane juice with ginger and lemon. Natural energy drink!",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🌿",
  },
  {
    id: BigInt(52),
    name: "Salted Lassi",
    category: "Fresh Drinks",
    price: BigInt(30),
    description:
      "Chilled yogurt-based drink with roasted cumin, black salt and fresh mint. Cooling and refreshing!",
    image: "/assets/image-019d4336-f624-71c9-bba5-62e9ee21d723.png",
    isAvailable: true,
    emoji: "🥛",
  },
  {
    id: BigInt(53),
    name: "Buttermilk (Chaas)",
    category: "Fresh Drinks",
    price: BigInt(15),
    description:
      "Spiced salted chaas with cumin, ginger and fresh coriander. Perfect with any meal!",
    image: "/assets/image-019d4336-fa1d-771f-8172-665fb239ad79.png",
    isAvailable: true,
    emoji: "🥛",
  },

  // ── Soft Drinks ──
  {
    id: BigInt(54),
    name: "Coca-Cola",
    category: "Soft Drinks",
    price: BigInt(30),
    description:
      "Chilled Coca-Cola 300ml can or bottle. The classic refreshing cold drink!",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🥤",
  },
  {
    id: BigInt(55),
    name: "Sprite",
    category: "Soft Drinks",
    price: BigInt(30),
    description:
      "Chilled Sprite 300ml — lemon-lime fizzy refreshment for any time of day.",
    image: "/assets/image-019d4336-f7c3-726d-b4ab-471bba8c79d2.png",
    isAvailable: true,
    emoji: "🥤",
  },
  {
    id: BigInt(56),
    name: "Fanta",
    category: "Soft Drinks",
    price: BigInt(30),
    description:
      "Chilled Fanta 300ml — sweet and fizzy orange-flavoured drink. A canteen favourite!",
    image: "/assets/image-019d4336-f787-731b-9c78-3ce0141dadf2.png",
    isAvailable: true,
    emoji: "🥤",
  },
  {
    id: BigInt(57),
    name: "Lemon Soda",
    category: "Soft Drinks",
    price: BigInt(20),
    description:
      "Fizzy soda with fresh lemon juice, black salt and mint. Refreshing and tangy!",
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🍋",
  },
  {
    id: BigInt(58),
    name: "Iced Tea",
    category: "Soft Drinks",
    price: BigInt(35),
    description:
      "Chilled brewed tea with lemon and mint. Sweet, refreshing and perfect for hot days!",
    image:
      "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&h=300&fit=crop&q=80",
    isAvailable: true,
    emoji: "🧊",
  },
];

export const CATEGORIES = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Chinese",
  "Shakes",
  "Tea & Coffee",
  "Fresh Drinks",
  "Soft Drinks",
];

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
