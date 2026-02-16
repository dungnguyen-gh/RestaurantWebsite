import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Category } from "@/lib/types";

// GET all menu items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as Category | null;
    const available = searchParams.get("available");

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (available !== null) {
      where.isAvailable = available === "true";
    }

    const items = await prisma.menuItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Serialize Decimal values to numbers
    const serializedItems = items.map((item) => ({
      ...item,
      price: Number(item.price),
    }));

    return NextResponse.json(serializedItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// POST new menu item (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, image, category, isAvailable } = body;

    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        isAvailable: isAvailable ?? true,
      },
    });

    // Serialize Decimal values to numbers
    const serializedItem = {
      ...item,
      price: Number(item.price),
    };

    return NextResponse.json(serializedItem, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
