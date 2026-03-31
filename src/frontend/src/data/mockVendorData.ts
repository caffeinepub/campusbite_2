export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "completed";

export interface Order {
  id: string;
  studentName: string;
  items: string;
  qty: number;
  pickupTime: string;
  status: OrderStatus;
  notified?: boolean;
}

export const initialOrders: Order[] = [
  {
    id: "CB001",
    studentName: "Priya Sharma",
    items: "Veg Biryani, Lassi",
    qty: 2,
    pickupTime: "12:30 PM",
    status: "pending",
  },
  {
    id: "CB002",
    studentName: "Rahul Verma",
    items: "Poha, Chai",
    qty: 1,
    pickupTime: "12:45 PM",
    status: "accepted",
  },
  {
    id: "CB003",
    studentName: "Anjali Patel",
    items: "Pav Bhaji",
    qty: 3,
    pickupTime: "1:00 PM",
    status: "preparing",
  },
  {
    id: "CB004",
    studentName: "Vikram Singh",
    items: "Dal Rice, Buttermilk",
    qty: 1,
    pickupTime: "1:15 PM",
    status: "ready",
  },
  {
    id: "CB005",
    studentName: "Sneha Kulkarni",
    items: "Chole Bhature",
    qty: 2,
    pickupTime: "1:30 PM",
    status: "pending",
  },
  {
    id: "CB006",
    studentName: "Arjun Desai",
    items: "Aloo Paratha, Chai",
    qty: 1,
    pickupTime: "1:45 PM",
    status: "completed",
  },
  {
    id: "CB007",
    studentName: "Meera Nair",
    items: "Maggi, Cold Coffee",
    qty: 2,
    pickupTime: "2:00 PM",
    status: "pending",
  },
  {
    id: "CB008",
    studentName: "Rohan Joshi",
    items: "Veg Chow Mein",
    qty: 1,
    pickupTime: "2:15 PM",
    status: "preparing",
  },
];

export type MenuCategory =
  | "All"
  | "Breakfast"
  | "Snacks"
  | "Meals"
  | "Drinks"
  | "Chinese";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Exclude<MenuCategory, "All">;
  image: string;
  available: boolean;
}

export const initialMenuItems: MenuItem[] = [
  {
    id: "M001",
    name: "Veg Biryani",
    price: 80,
    category: "Meals",
    image: "/assets/generated/food-biryani.dim_400x300.jpg",
    available: true,
  },
  {
    id: "M002",
    name: "Poha",
    price: 30,
    category: "Breakfast",
    image: "/assets/generated/food-poha.dim_400x300.jpg",
    available: true,
  },
  {
    id: "M003",
    name: "Pav Bhaji",
    price: 60,
    category: "Meals",
    image: "/assets/generated/food-pavbhaji.dim_400x300.jpg",
    available: true,
  },
  {
    id: "M004",
    name: "Samosa",
    price: 20,
    category: "Snacks",
    image: "/assets/generated/food-samosa.dim_400x300.jpg",
    available: true,
  },
  {
    id: "M005",
    name: "Masala Chai",
    price: 15,
    category: "Drinks",
    image: "/assets/generated/food-tea.dim_400x300.jpg",
    available: true,
  },
  {
    id: "M006",
    name: "Aloo Paratha",
    price: 50,
    category: "Breakfast",
    image: "/assets/generated/food-poha.dim_400x300.jpg",
    available: true,
  },
  {
    id: "M007",
    name: "Veg Chow Mein",
    price: 70,
    category: "Chinese",
    image: "/assets/generated/food-maggi.dim_400x300.jpg",
    available: false,
  },
  {
    id: "M008",
    name: "Chole Bhature",
    price: 70,
    category: "Meals",
    image: "/assets/generated/food-cholebhature.dim_400x300.jpg",
    available: true,
  },
  {
    id: "M009",
    name: "Maggi",
    price: 40,
    category: "Snacks",
    image: "/assets/generated/food-maggi.dim_400x300.jpg",
    available: true,
  },
  {
    id: "M010",
    name: "Lassi",
    price: 35,
    category: "Drinks",
    image: "/assets/generated/food-lassi.dim_400x300.jpg",
    available: true,
  },
];

export interface EmergencyRequest {
  id: string;
  studentName: string;
  orderId: string;
  type: "time_change" | "cancel";
  requestedTime?: string;
  reason: string;
  status: "pending" | "accepted" | "rejected";
}

export const initialEmergencyRequests: EmergencyRequest[] = [
  {
    id: "E001",
    studentName: "Priya Sharma",
    orderId: "CB001",
    type: "time_change",
    requestedTime: "1:00 PM",
    reason: "Lab session extended",
    status: "pending",
  },
  {
    id: "E002",
    studentName: "Meera Nair",
    orderId: "CB007",
    type: "cancel",
    reason: "Going home early",
    status: "pending",
  },
  {
    id: "E003",
    studentName: "Rahul Verma",
    orderId: "CB002",
    type: "time_change",
    requestedTime: "1:30 PM",
    reason: "Exam timing clash",
    status: "pending",
  },
  {
    id: "E004",
    studentName: "Sneha Kulkarni",
    orderId: "CB005",
    type: "cancel",
    reason: "Changed mind",
    status: "accepted",
  },
];
