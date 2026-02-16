import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET single menu item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    // Serialize Decimal values to numbers
    const serializedItem = {
      ...item,
      price: Number(item.price),
    };

    return NextResponse.json(serializedItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu item" },
      { status: 500 }
    );
  }
}

// PUT update menu item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, price, image, category, isAvailable } = body;

    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    const item = await prisma.menuItem.update({
      where: { id },
      data: {
        name: name ?? existingItem.name,
        description: description ?? existingItem.description,
        price: price ? parseFloat(price) : existingItem.price,
        image: image !== undefined ? image : existingItem.image,
        category: category ?? existingItem.category,
        isAvailable: isAvailable !== undefined ? isAvailable : existingItem.isAvailable,
      },
    });

    // Serialize Decimal values to numbers
    const serializedItem = {
      ...item,
      price: Number(item.price),
    };

    return NextResponse.json(serializedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

// DELETE menu item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    await prisma.menuItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
