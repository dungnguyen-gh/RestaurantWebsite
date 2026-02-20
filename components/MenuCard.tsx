"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { SerializableMenuItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useCallback, memo } from "react";

interface MenuCardProps {
  item: SerializableMenuItem;
}

function MenuCardComponent({ item }: MenuCardProps) {
  const { addToCart, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isInCart = items.some((cartItem) => cartItem.menuItem.id === item.id);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = useCallback(() => {
    addToCart(item);
    setIsAdded(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  }, [addToCart, item]);

  const categoryColors: Record<string, string> = {
    APPETIZER: "bg-blue-500/10 text-blue-500",
    MAIN_COURSE: "bg-green-500/10 text-green-500",
    DESSERT: "bg-pink-500/10 text-pink-500",
    BEVERAGE: "bg-cyan-500/10 text-cyan-500",
    SPECIAL: "bg-amber-500/10 text-amber-500",
  };

  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-amber-500/50 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image || "/images/food-placeholder.svg"}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge
          className={`absolute top-3 left-3 ${categoryColors[item.category] || "bg-gray-500/10 text-gray-500"}`}
          variant="secondary"
        >
          {item.category.replace("_", " ")}
        </Badge>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="text-2xl font-bold text-white">
            ${Number(item.price).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-500 transition-colors line-clamp-1">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {item.description}
        </p>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          disabled={isAdded}
          aria-label={isInCart ? "Add more to cart" : "Add to cart"}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added
            </>
          ) : isInCart ? (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add More
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

// Memoize to prevent unnecessary re-renders
export const MenuCard = memo(MenuCardComponent);
MenuCard.displayName = "MenuCard";
