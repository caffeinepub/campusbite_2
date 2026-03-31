import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    category: string;
    price: bigint;
}
export interface CreateOrderInput {
    paymentMethod: string;
    pickupTime: string;
    items: Array<OrderItem>;
}
export interface OrderRecord {
    id: bigint;
    status: string;
    paymentMethod: string;
    userId: Principal;
    createdAt: bigint;
    totalAmount: bigint;
    pickupTime: string;
    items: Array<OrderItem>;
}
export interface UserProfile {
    name: string;
    role: string;
    collegeId: string;
    phone: string;
}
export interface OrderItem {
    quantity: bigint;
    itemPrice: bigint;
    menuItemId: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelOrder(orderId: bigint): Promise<void>;
    createMenuItem(menuItem: MenuItem): Promise<bigint>;
    editMenuItem(menuItem: MenuItem): Promise<void>;
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<OrderRecord>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(orderInput: CreateOrderInput): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(orderId: bigint, newStatus: string): Promise<void>;
    updatePickupTime(orderId: bigint, newPickupTime: string): Promise<void>;
}
