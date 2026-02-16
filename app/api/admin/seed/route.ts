import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const sampleMenuItems = [
  {
    name: "Truffle Mushroom Soup",
    description: "Creamy wild mushroom soup with truffle oil and fresh herbs",
    price: 12.99,
    category: "APPETIZER",
    image: "https://images.unsplash.com/photo-1547592166-23acbe3a624b?w=400&h=300&fit=crop",
  },
  {
    name: "Crispy Calamari",
    description: "Tender calamari rings, lightly fried with garlic aioli",
    price: 14.99,
    category: "APPETIZER",
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=300&fit=crop",
  },
  {
    name: "Grilled Ribeye Steak",
    description: "Prime ribeye with herb butter, roasted vegetables, and mashed potatoes",
    price: 42.99,
    category: "MAIN_COURSE",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
  },
  {
    name: "Pan-Seared Salmon",
    description: "Atlantic salmon with lemon butter sauce and seasonal greens",
    price: 32.99,
    category: "MAIN_COURSE",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
  },
  {
    name: "Chicken Parmesan",
    description: "Breaded chicken breast with marinara, mozzarella, and spaghetti",
    price: 24.99,
    category: "MAIN_COURSE",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop",
  },
  {
    name: "Lobster Thermidor",
    description: "Whole lobster with creamy cognac sauce and gruyère cheese",
    price: 58.99,
    category: "SPECIAL",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop",
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 10.99,
    category: "DESSERT",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
  },
  {
    name: "Crème Brûlée",
    description: "Classic vanilla custard with caramelized sugar crust",
    price: 9.99,
    category: "DESSERT",
    image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=300&fit=crop",
  },
  {
    name: "Artisan Lemonade",
    description: "Freshly squeezed lemons with mint and sparkling water",
    price: 5.99,
    category: "BEVERAGE",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
  },
  {
    name: "House Red Wine",
    description: "Premium Cabernet Sauvignon from Napa Valley",
    price: 12.99,
    category: "BEVERAGE",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  },
];

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst();
    
    if (!existingAdmin) {
      // Create default admin
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await prisma.admin.create({
        data: {
          email: "admin@restaurant.com",
          password: hashedPassword,
          name: "Administrator",
        },
      });
    }

    // Check if menu items exist
    const existingItems = await prisma.menuItem.findFirst();
    
    if (!existingItems) {
      // Create sample menu items
      for (const item of sampleMenuItems) {
        await prisma.menuItem.create({
          data: item,
        });
      }
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      admin: existingAdmin ? null : {
        email: "admin@restaurant.com",
        password: "admin123",
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
