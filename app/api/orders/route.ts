import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { serializeOrders, serializeOrder } from "@/lib/serialization";
import { createOrderSchema, orderQuerySchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

// GET all orders (admin only for all, could extend for user-specific)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate query params
    const queryResult = orderQuerySchema.safeParse({
      status: searchParams.get("status") || undefined,
    });

    const where: Prisma.OrderWhereInput = {};

    if (queryResult.success && queryResult.data.status) {
      where.status = queryResult.data.status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(serializeOrders(orders));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = createOrderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { customerName, phone, address, notes, items, total } = result.data;

    // Verify all menu items exist and are available
    const menuItemIds = items.map((item) => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: { in: menuItemIds },
        isAvailable: true,
      },
    });

    if (menuItems.length !== menuItemIds.length) {
      return NextResponse.json(
        { error: "One or more items are not available" },
        { status: 400 }
      );
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        notes,
        total,
        items: {
          create: items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    return NextResponse.json(serializeOrder(order), { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
