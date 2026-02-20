// Cart calculation utilities to ensure consistency across the app

export interface CartTotals {
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
}

export const TAX_RATE = 0.10; // 10% tax
export const FREE_DELIVERY_THRESHOLD = 25;
export const DELIVERY_FEE = 0; // Free delivery

/**
 * Calculate cart totals with tax
 */
export function calculateCartTotals(subtotal: number): CartTotals {
  const tax = subtotal * TAX_RATE;
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + tax + delivery;

  return {
    subtotal,
    tax,
    delivery,
    total,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Check if cart qualifies for free delivery
 */
export function qualifiesForFreeDelivery(subtotal: number): boolean {
  return subtotal >= FREE_DELIVERY_THRESHOLD;
}

/**
 * Calculate remaining amount for free delivery
 */
export function remainingForFreeDelivery(subtotal: number): number {
  return Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
}
