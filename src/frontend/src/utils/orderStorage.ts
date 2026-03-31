import { saveSharedOrder } from "./sharedOrderStorage";

export interface LocalOrder {
  id: number;
  status: "Placed" | "Preparing" | "ReadyForPickup" | "Cancelled";
  items: Array<{
    menuItemId: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  pickupTime: string;
  paymentMethod: string;
  createdAt: number;
}

const KEY = (email: string) => `campusbite-orders-${email}`;

export function getOrders(email: string): LocalOrder[] {
  try {
    return JSON.parse(localStorage.getItem(KEY(email)) ?? "[]");
  } catch {
    return [];
  }
}

function saveOrders(email: string, orders: LocalOrder[]) {
  localStorage.setItem(KEY(email), JSON.stringify(orders));
}

export function saveOrder(
  email: string,
  order: Omit<LocalOrder, "id" | "status" | "createdAt">,
  userInfo?: { name: string; collegeId: string },
): LocalOrder {
  const orders = getOrders(email);
  const newOrder: LocalOrder = {
    ...order,
    id: Date.now(),
    status: "Placed",
    createdAt: Date.now(),
  };
  saveOrders(email, [newOrder, ...orders]);

  // Also write to shared store so vendor panel can see it
  saveSharedOrder({
    id: String(newOrder.id),
    studentName: userInfo?.name ?? email,
    studentEmail: email,
    collegeId: userInfo?.collegeId ?? "",
    items: order.items.map((item) => ({
      name: item.name,
      qty: item.quantity,
      price: item.price,
    })),
    totalAmount: order.totalAmount,
    pickupTime: order.pickupTime,
    paymentMethod: order.paymentMethod,
    status: "pending",
    createdAt: newOrder.createdAt,
  });

  return newOrder;
}

export function cancelOrder(email: string, orderId: number): void {
  const orders = getOrders(email);
  const updated = orders.map((o) =>
    o.id === orderId ? { ...o, status: "Cancelled" as const } : o,
  );
  saveOrders(email, updated);
}

export function updatePickupTime(
  email: string,
  orderId: number,
  newTime: string,
): void {
  const orders = getOrders(email);
  const updated = orders.map((o) =>
    o.id === orderId ? { ...o, pickupTime: newTime } : o,
  );
  saveOrders(email, updated);
}

// Called by vendor panel to sync status back to student's personal store
export function updateOrderStatusByIdAcrossUsers(
  orderId: string,
  newStatus: "Placed" | "Preparing" | "ReadyForPickup" | "Cancelled",
): void {
  // Iterate all localStorage keys to find the right user's order
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith("campusbite-orders-")) continue;
    const email = key.replace("campusbite-orders-", "");
    const orders = getOrders(email);
    const found = orders.find((o) => String(o.id) === orderId);
    if (found) {
      const updated = orders.map((o) =>
        String(o.id) === orderId ? { ...o, status: newStatus } : o,
      );
      localStorage.setItem(key, JSON.stringify(updated));
      break;
    }
  }
}
