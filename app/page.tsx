import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clock, Award, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuCard } from "@/components/MenuCard";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getFeaturedItems() {
  try {
    const items = await prisma.menuItem.findMany({
      where: { isAvailable: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
    // Convert Decimal and Date objects to serializable types
    return items.map((item) => ({
      ...item,
      price: Number(item.price),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching featured items:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredItems = await getFeaturedItems();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Restaurant interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-amber-500 text-sm font-medium">
                Award Winning Restaurant
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Taste the
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {" "}Extraordinary{" "}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience culinary excellence with our carefully crafted dishes, 
              made from the freshest ingredients and served with passion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg px-8"
                asChild
              >
                <Link href="/menu">
                  Order Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white/20 hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6 text-center">
                <div className="bg-amber-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
                <p className="text-muted-foreground text-sm">
                  Only the finest ingredients sourced from trusted local suppliers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6 text-center">
                <div className="bg-amber-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Hot and fresh food delivered to your doorstep in 30 minutes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6 text-center">
                <div className="bg-amber-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Free Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Enjoy free delivery on all orders above $25
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Dishes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular dishes, crafted by our expert chefs 
              to delight your taste buds
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
              asChild
            >
              <Link href="/menu">
                View Full Menu
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Chef cooking"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border">
                <div className="text-center">
                  <span className="text-4xl font-bold text-amber-500">15+</span>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                A Legacy of
                <span className="text-amber-500"> Culinary Excellence</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded in 2009, Savory & Sage has been serving exceptional 
                cuisine that combines traditional techniques with modern innovation. 
                Our team of passionate chefs brings decades of experience to every 
                dish they create.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We believe that great food starts with great ingredients. That&apos;s 
                why we partner with local farmers and suppliers to bring you the 
                freshest seasonal produce, premium meats, and sustainable seafood.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-amber-500">50+</span>
                  <p className="text-sm text-muted-foreground">Menu Items</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-amber-500">10k+</span>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-amber-500">4.9</span>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Delicious food"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
            </div>

            <div className="relative z-10 py-16 px-8 md:px-16">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Order?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Experience the best flavors from the comfort of your home. 
                  Place your order now and enjoy a delightful meal.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  asChild
                >
                  <Link href="/menu">
                    Browse Menu
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
