import { z } from "zod";
import { Category, OrderStatus } from "./types";

// Menu item validation
export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  description: z.string().min(1, "Description is required").max(500, "Description too long"),
  price: z.number().positive("Price must be positive").max(10000, "Price too high"),
  image: z.string().url("Invalid image URL").optional().nullable(),
  category: z.enum(["APPETIZER", "MAIN_COURSE", "DESSERT", "BEVERAGE", "SPECIAL"]),
  isAvailable: z.boolean().default(true),
});

export const createMenuItemSchema = menuItemSchema;
export const updateMenuItemSchema = menuItemSchema.partial();

// Order validation
export const orderItemSchema = z.object({
  menuItemId: z.string().uuid("Invalid menu item ID"),
  quantity: z.number().int().positive("Quantity must be positive").max(100, "Quantity too high"),
  price: z.number().positive("Price must be positive"),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string().min(5, "Phone is required").max(20, "Phone too long"),
  address: z.string().min(5, "Address is required").max(500, "Address too long"),
  notes: z.string().max(1000, "Notes too long").optional().nullable(),
  items: z.array(orderItemSchema).min(1, "At least one item required"),
  total: z.number().positive("Total must be positive"),
});

export const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED", "CANCELLED"]),
});

// Admin login validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().min(1, "Message is required").max(2000, "Message too long"),
});

// Query params validation
export const menuQuerySchema = z.object({
  category: z.enum(["APPETIZER", "MAIN_COURSE", "DESSERT", "BEVERAGE", "SPECIAL"]).optional(),
  available: z.enum(["true", "false"]).transform((val) => val === "true").optional(),
});

export const orderQuerySchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED", "CANCELLED"]).optional(),
});
