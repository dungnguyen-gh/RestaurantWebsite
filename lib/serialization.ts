import { MenuItem, Order, OrderItem } from "@prisma/client";

// Serialize Decimal to number for MenuItem
export function serializeMenuItem<T extends { price: unknown }>(item: T) {
  return {
    ...item,
    price: Number(item.price),
  };
}

// Serialize MenuItem array
export function serializeMenuItems<T extends { price: unknown }>(items: T[]) {
  return items.map(serializeMenuItem);
}

// Serialize Order with nested items
export function serializeOrder(
  order: Order & {
    items: (OrderItem & {
      menuItem?: { price: unknown } & Record<string, unknown>;
    })[];
  }
) {
  return {
    ...order,
    total: Number(order.total),
    items: order.items.map((item) => ({
      ...item,
      price: Number(item.price),
      menuItem: item.menuItem
        ? {
            ...item.menuItem,
            price: Number(item.menuItem.price),
          }
        : undefined,
    })),
  };
}

// Serialize Order array
export function serializeOrders(
  orders: (Order & {
    items: (OrderItem & {
      menuItem?: { price: unknown } & Record<string, unknown>;
    })[];
  })[]
) {
  return orders.map(serializeOrder);
}

// Serialize OrderItem
export function serializeOrderItem(
  item: OrderItem & {
    menuItem?: { price: unknown } & Record<string, unknown>;
  }
) {
  return {
    ...item,
    price: Number(item.price),
    menuItem: item.menuItem
      ? {
          ...item.menuItem,
          price: Number(item.menuItem.price),
        }
      : undefined,
  };
}
