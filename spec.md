# CampusBite

## Current State
Scaffolded project with empty Motoko backend and default React frontend. No existing application logic.

## Requested Changes (Diff)

### Add
- User authentication: signup (name, email, phone, role: Student/Faculty, college ID, password) and login (email + password)
- Menu page: food items with images, prices, quantity selector (+/-), Add to Cart button
- Cart system: stores selected items with quantities
- Order page: review cart items, choose pickup time, estimated prep time (15-20 min), payment (UPI QR code or Cash on Pickup)
- Order tracking page: status steps (Order Placed → Preparing → Ready for Pickup)
- Emergency section: Change Pickup Time button, Cancel Order button, contact with WhatsApp link
- Notification banner: "Your order is ready!" message
- Home page with hero banner (college canteen image), CampusBite logo, tagline, Order Now CTA
- Footer with social links
- Mobile-friendly responsive design
- Bright orange/yellow/white color scheme

### Modify
- Replace default frontend with full multi-page app
- Backend to handle users, menu items, and orders

### Remove
- Default scaffolded frontend content

## Implementation Plan
1. Backend: User registration/login, menu items CRUD, order management (place, track, update, cancel)
2. Frontend pages: Login/Signup, Home, Menu, Order, Order Tracking
3. Frontend components: Navbar with logo, Cart sidebar, Notification toast, Footer
4. Food item images generated via AI image generation
5. College canteen hero banner image
6. CampusBite logo integrated from uploaded asset
