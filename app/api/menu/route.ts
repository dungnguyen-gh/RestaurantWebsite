import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { serializeMenuItems, serializeMenuItem } from "@/lib/serialization";
import { createMenuItemSchema, menuQuerySchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

// GET all menu items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate query params
    const queryResult = menuQuerySchema.safeParse({
      category: searchParams.get("category") || undefined,
      available: searchParams.get("available") || undefined,
    });

    const where: Prisma.MenuItemWhereInput = {};

    if (queryResult.success) {
      if (queryResult.data.category) {
        where.category = queryResult.data.category;
      }
      if (queryResult.data.available !== undefined) {
        where.isAvailable = queryResult.data.available;
      }
    }

    const items = await prisma.menuItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(serializeMenuItems(items));
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// POST new menu item (admin only - protected by middleware)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = createMenuItemSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, description, price, image, category, isAvailable } = result.data;

    const item = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        image,
        category,
        isAvailable,
      },
    });

    return NextResponse.json(serializeMenuItem(item), { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
