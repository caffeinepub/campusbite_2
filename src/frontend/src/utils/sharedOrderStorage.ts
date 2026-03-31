export type SharedOrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export interface SharedOrder {
  id: string;
  studentName: string;
  studentEmail: string;
  collegeId: string;
  items: Array<{ name: string; qty: number; price: number }>;
  totalAmount: number;
  pickupTime: string;
  paymentMethod: string;
  status: SharedOrderStatus;
  createdAt: number;
}

const SHARED_KEY = "campusbite-shared-orders";

export function getAllSharedOrders(): SharedOrder[] {
  try {
    return JSON.parse(localStorage.getItem(SHARED_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveSharedOrder(order: SharedOrder): void {
  const orders = getAllSharedOrders();
  const existing = orders.findIndex((o) => o.id === order.id);
  if (existing >= 0) {
    orders[existing] = order;
  } else {
    orders.unshift(order);
  }
  localStorage.setItem(SHARED_KEY, JSON.stringify(orders));
}

export function updateSharedOrderStatus(
  orderId: string,
  status: SharedOrderStatus,
): void {
  const orders = getAllSharedOrders();
  const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
  localStorage.setItem(SHARED_KEY, JSON.stringify(updated));
}
