# CampusBite Vendor Panel

## Current State
This is a new vendor dashboard application for CampusBite canteen staff, separate from the student-facing app.

## Requested Changes (Diff)

### Add
- Vendor Login page (email + password)
- Dashboard Home with summary stats: Total Orders Today, Pending Orders, Completed Orders
- Orders Management: list of incoming orders (student name, food items, quantity, pickup time) with Accept / Mark as Preparing / Mark as Ready buttons
- Time Management: default prep time 15-20 min, option to update delay time
- Notifications: "Notify Student – Order Ready" button per order
- Menu Management: add/edit/delete food items, upload food images, set price
- Emergency Handling: view student requests (time change / cancel), accept or reject
- Reports Section: daily sales summary, total orders chart
- CampusBite logo at top of sidebar/navbar
- White + orange theme, clean dashboard style

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: vendor auth, order management (CRUD + status updates), menu management (CRUD), time management, emergency requests, daily reports
2. Frontend: Login page → authenticated dashboard shell with sidebar nav → 6 dashboard sections (Home, Orders, Time, Notifications, Menu, Emergency, Reports)
3. Use orange (#F97316) + white color scheme throughout
4. Mock/seed data for demo orders and menu items
