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
): LocalOrder {
  const orders = getOrders(email);
  const newOrder: LocalOrder = {
    ...order,
    id: Date.now(),
    status: "Placed",
    createdAt: Date.now(),
  };
  saveOrders(email, [newOrder, ...orders]);
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
