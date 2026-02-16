import { prisma } from "@/lib/db";
import { MenuCard } from "@/components/MenuCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryLabels, Category } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getMenuItems() {
  try {
    const items = await prisma.menuItem.findMany({
      where: { isAvailable: true },
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
    console.error("Error fetching menu items:", error);
    return [];
  }
}

export default async function MenuPage() {
  const items = await getMenuItems();

  const categories: Category[] = ["APPETIZER", "MAIN_COURSE", "DESSERT", "BEVERAGE", "SPECIAL"];

  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category] = items.filter((item) => item.category === category);
    return acc;
  }, {} as Record<Category, typeof items>);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our carefully curated selection of dishes, each prepared with 
          passion and the finest ingredients
        </p>
      </div>

      {/* Menu Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-2xl mx-auto mb-12 flex flex-wrap justify-center h-auto gap-2">
          <TabsTrigger value="all" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            All Items
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              {categoryLabels[category]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
          {items.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No menu items available yet.</p>
            </div>
          )}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {itemsByCategory[category]?.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
            {itemsByCategory[category]?.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  No items available in this category.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
