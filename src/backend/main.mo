import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Include authorization logic
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  public type UserProfile = {
    name : Text;
    phone : Text;
    role : Text; // "Student" or "Faculty"
    collegeId : Text;
  };

  public type MenuItem = {
    id : Nat;
    name : Text;
    category : Text;
    price : Nat;
    description : Text;
    isAvailable : Bool;
  };

  public type OrderItem = {
    menuItemId : Nat;
    quantity : Nat;
    itemPrice : Nat;
  };

  public type OrderRecord = {
    id : Nat;
    userId : Principal;
    items : [OrderItem];
    totalAmount : Nat;
    pickupTime : Text;
    paymentMethod : Text; // "Cash", "UPI", "Card", etc.
    status : Text; // "Placed", "Preparing", ...
    createdAt : Int;
  };

  public type CreateOrderInput = {
    items : [OrderItem];
    pickupTime : Text;
    paymentMethod : Text;
  };

  // Compare OrderRecords by createdAt (newest first)
  module OrderRecord {
    public func compareByNewestFirst(o1 : OrderRecord, o2 : OrderRecord) : Order.Order {
      Int.compare(o2.createdAt, o1.createdAt);
    };
  };

  // Persistent storage
  let userProfiles = Map.empty<Principal, UserProfile>();
  let menuItems = Map.empty<Nat, MenuItem>();
  let orders = Map.empty<Nat, OrderRecord>();

  func verifyUserExists(caller : Principal) {
    if (caller.isAnonymous()) { Runtime.trap("Must be logged in") };
    switch (userProfiles.get(caller)) {
      case (null) {
        Runtime.trap("User profile does not exist, please post it before placing orders.");
      };
      case (_) {};
    };
  };

  var orderCounter = 0;
  var menuItemCounter = 0;

  // Place order
  public shared ({ caller }) func placeOrder(orderInput : CreateOrderInput) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) { Runtime.trap("Only users can place orders") };
    verifyUserExists(caller);

    let totalAmount = orderInput.items.foldLeft(0, func(acc, item) { acc + (item.quantity * item.itemPrice) });

    let orderId = orderCounter;
    orderCounter += 1;

    let newOrder : OrderRecord = {
      id = orderId;
      userId = caller;
      items = orderInput.items;
      totalAmount;
      pickupTime = orderInput.pickupTime;
      paymentMethod = orderInput.paymentMethod;
      status = "Placed";
      createdAt = Time.now();
    };

    orders.add(orderId, newOrder);
    orderId;
  };

  // Get my orders
  public query ({ caller }) func getMyOrders() : async [OrderRecord] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) { Runtime.trap("Only users can get orders") };
    verifyUserExists(caller);

    orders.values().toArray().map(func(o) { o }).filter(func(order) { order.userId == caller }).sort(OrderRecord.compareByNewestFirst);
  };

  // Cancel order
  public shared ({ caller }) func cancelOrder(orderId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) { Runtime.trap("Only users can cancel orders") };
    let order = switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
    if (order.status == "Completed" or order.status == "Cancelled") {
      Runtime.trap("Cannot cancel completed or already cancelled order");
    };
    if (order.userId != caller) { Runtime.trap("You do not own this order") };
    let updatedOrder = {
      order with
      status = "Cancelled";
    };
    orders.add(orderId, updatedOrder);
  };

  // Update pickup time
  public shared ({ caller }) func updatePickupTime(orderId : Nat, newPickupTime : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) { Runtime.trap("Only users can update pickup times") };
    verifyUserExists(caller);
    let order = switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
    if (caller != order.userId) { Runtime.trap("You do not own this order") };
    let updatedOrder = { order with pickupTime = newPickupTime };
    orders.add(orderId, updatedOrder);
  };

  // Admin: Update order status
  public shared ({ caller }) func updateOrderStatus(orderId : Nat, newStatus : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) { Runtime.trap("Only admins can update order status") };
    let order = switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
    let updatedOrder = { order with status = newStatus };
    orders.add(orderId, updatedOrder);
  };

  // Get menu items
  public query ({ caller }) func getAllMenuItems() : async [MenuItem] {
    menuItems.values().toArray();
  };

  // Edit menu item (admin)
  public shared ({ caller }) func editMenuItem(menuItem : MenuItem) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) { Runtime.trap("Only admins can edit menu items") };
    ignore switch (menuItems.get(menuItem.id)) {
      case (null) { Runtime.trap("Menu item not found") };
      case (?item) { item };
    };
    menuItems.add(menuItem.id, menuItem);
  };

  // Create new menu item (admin)
  public shared ({ caller }) func createMenuItem(menuItem : MenuItem) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) { Runtime.trap("Only admins can create menu items") };
    menuItems.add(menuItem.id, menuItem);
    let newId = menuItemCounter;
    menuItemCounter += 1;
    newId;
  };

  // Seed 10 menu items in the beginning
  let preSeededMenuItems = [
    (0, {
      id = 0;
      name = "Veg Sandwich";
      category = "Snacks";
      price = 50;
      description = "Delicious vegetarian sandwich";
      isAvailable = true;
    }),
    (1, {
      id = 1;
      name = "Masala Dosa";
      category = "Breakfast";
      price = 60;
      description = "Crispy dosa with potato filling";
      isAvailable = true;
    }),
    (2, {
      id = 2;
      name = "Idli Sambar";
      category = "Breakfast";
      price = 40;
      description = "Soft idlis with spicy sambar";
      isAvailable = true;
    }),
    (3, {
      id = 3;
      name = "Chicken Roll";
      category = "Snacks";
      price = 80;
      description = "Juicy chicken roll";
      isAvailable = true;
    }),
    (4, {
      id = 4;
      name = "Paneer Wrap";
      category = "Snacks";
      price = 70;
      description = "Paneer wrap with fresh veggies";
      isAvailable = true;
    }),
    (5, {
      id = 5;
      name = "Poha";
      category = "Breakfast";
      price = 30;
      description = "Light and fluffy poha";
      isAvailable = true;
    }),
    (6, {
      id = 6;
      name = "Vada Pav";
      category = "Snacks";
      price = 25;
      description = "Mumbai style vada pav";
      isAvailable = true;
    }),
    (7, {
      id = 7;
      name = "Tea";
      category = "Beverages";
      price = 20;
      description = "Hot and refreshing tea";
      isAvailable = true;
    }),
    (8, {
      id = 8;
      name = "Coffee";
      category = "Beverages";
      price = 25;
      description = "Strong coffee";
      isAvailable = true;
    }),
    (9, {
      id = 9;
      name = "Egg Omelette";
      category = "Breakfast";
      price = 35;
      description = "Fluffy egg omelette";
      isAvailable = true;
    }),
  ];
  for (menuItem in preSeededMenuItems.values()) {
    menuItems.add(menuItem.0, menuItem.1);
  };

  // Save user profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) { Runtime.trap("Only users can save profiles") };
    let validRoles = [profile.role == "Student", profile.role == "Faculty"];
    if (validRoles.all(func(role) { not role })) { Runtime.trap("Invalid role, please use 'Student' or 'Faculty'") };
    userProfiles.add(caller, profile);
  };

  // Get own user profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  // Get another user profile (admin)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Can only view your own profile");
    };
    userProfiles.get(user);
  };
};
