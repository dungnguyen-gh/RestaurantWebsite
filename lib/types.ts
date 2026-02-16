export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: Category;
  isAvailable: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Serializable version for client components (after server serialization)
export type SerializableMenuItem = Omit<MenuItem, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type Category = "APPETIZER" | "MAIN_COURSE" | "DESSERT" | "BEVERAGE" | "SPECIAL";

export const categoryLabels: Record<Category, string> = {
  APPETIZER: "Appetizers",
  MAIN_COURSE: "Main Courses",
  DESSERT: "Desserts",
  BEVERAGE: "Beverages",
  SPECIAL: "Chef's Specials",
};

export interface CartItem {
  menuItem: SerializableMenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  notes: string | null;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

export const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  READY: "Ready for Pickup",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const orderStatusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-500",
  CONFIRMED: "bg-blue-500",
  PREPARING: "bg-orange-500",
  READY: "bg-green-500",
  DELIVERED: "bg-gray-500",
  CANCELLED: "bg-red-500",
};

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  price: number;
  menuItem: MenuItem;
}

export interface CheckoutFormData {
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
