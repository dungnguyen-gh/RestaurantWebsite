import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {};

    if (status) {
      where.status = status;
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

    // Serialize Decimal values to numbers
    const serializedOrders = orders.map((order) => ({
      ...order,
      total: Number(order.total),
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
        menuItem: {
          ...item.menuItem,
          price: Number(item.menuItem.price),
        },
      })),
    }));

    return NextResponse.json(serializedOrders);
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
    const { customerName, phone, address, notes, items, total } = body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
        total: parseFloat(total),
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: parseFloat(item.price),
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

    // Serialize Decimal values to numbers
    const serializedOrder = {
      ...order,
      total: Number(order.total),
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
        menuItem: {
          ...item.menuItem,
          price: Number(item.menuItem.price),
        },
      })),
    };

    return NextResponse.json(serializedOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
