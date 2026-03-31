# CampusBite – Student + Vendor Connected App

## Current State
- App.tsx only shows Vendor Panel (LoginPage + DashboardShell) with no routing
- Student pages (AuthPage, HomePage, MenuPage, OrderPage, TrackingPage) exist but use TanStack Router links/navigate without a router being set up
- Student orders are saved to localStorage per user email via `orderStorage.ts`
- Vendor panel reads from hardcoded `initialOrders` mock data (mockVendorData.ts) — NOT from real student orders
- The two sides are completely disconnected

## Requested Changes (Diff)

### Add
- TanStack Router setup in main.tsx with routes for student pages (/auth, /, /menu, /order, /tracking) and vendor panel (/vendor, /vendor/dashboard)
- A shared order store `sharedOrderStorage.ts` in localStorage key `campusbite-shared-orders` that stores all orders from all students
- When student places order (saveOrder in orderStorage.ts), also write to shared store
- When vendor updates order status, also update the student's individual order store AND the shared store
- AuthProvider and CartProvider wrapping student routes

### Modify
- App.tsx: Set up TanStack Router with two sections — student app routes and vendor panel routes
- main.tsx: Add router provider, AuthProvider, CartProvider wrappers
- DashboardShell / OrdersManagement: Read orders from shared store instead of initialOrders mock data; poll every 5 seconds for new orders
- DashboardHome: Show real counts from shared store
- orderStorage.ts: saveOrder also writes to shared store; updateOrderStatus reads from shared store and syncs back
- TrackingPage: When vendor updates order status in shared store, student sees updated status

### Remove
- Hardcoded initialOrders being used as real data source in vendor panel

## Implementation Plan
1. Create `src/frontend/src/utils/sharedOrderStorage.ts` — shared order read/write functions with localStorage key `campusbite-shared-orders`
2. Update `orderStorage.ts` saveOrder to also write to shared store
3. Set up TanStack Router: create route tree in App.tsx with student routes (/, /auth, /menu, /order, /tracking) and vendor routes (/vendor, /vendor/dashboard)
4. Update main.tsx to add RouterProvider, AuthProvider, CartProvider
5. Update DashboardShell and DashboardHome to use shared store
6. Update OrdersManagement to read/write shared store; when vendor changes status, update both shared store and individual student store so TrackingPage reflects it
7. Vendor panel auto-polls every 5s for new orders
