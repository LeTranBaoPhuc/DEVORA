"use client";

import { useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/marketplace/filter-sidebar";
import { ProductCard } from "@/components/marketplace/product-card";
import { AuctionCard } from "@/components/marketplace/auction-card";
import { SellerCard } from "@/components/marketplace/seller-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MOCK_PRODUCTS = [
  { id: "1", slug: "customer-support-agent", title: "Autonomous Customer Support AI Agent", coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600", price: 149.00, rating: 4.9, salesCount: 342, productType: "AI Agent", techStack: ["Python", "LangChain"], seller: { username: "NeuralNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", isVerified: true } },
  { id: "2", slug: "notion-habit-tracker", title: "Advanced Notion Habit Tracker", coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600", price: 29.99, rating: 4.7, salesCount: 1205, productType: "Mini App", techStack: ["Next.js"], seller: { username: "vibe_creator", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e", isVerified: false } },
];

const MOCK_AUCTIONS = [
  { id: "a1", title: "Need a custom Discord bot that bridges our Patreon API", category: "Chatbots", budgetMin: 300, budgetMax: 500, deadline: "2 days left", bidCount: 8, buyer: { username: "CommunityManager99", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026701a" }, skills: ["Discord.js", "Patreon API"], status: "OPEN" as const },
];

const MOCK_SELLERS = [
  { username: "NeuralNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", bio: "Full-stack AI developer specializing in LangChain and autonomous agents.", rating: 4.9, salesCount: 1240, isVerified: true, skills: ["Python", "OpenAI", "React"] },
];

export default function SearchPage() {
  const query = "AI Agent"; // Mock query since we can't easily parse suspense-wrapped useSearchParams without a client boundary wrapper

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Search Results for <span className="text-primary">&quot;{query}&quot;</span>
        </h1>
        <p className="text-muted-foreground">Found 142 products, 12 auctions, and 5 sellers.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-6">
            <Sheet>
              <SheetTrigger className={buttonVariants({ variant: "outline", size: "icon", className: "lg:hidden shrink-0" })}>
                <Filter className="w-4 h-4" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                defaultValue={query}
                className="pl-9 bg-card border-border w-full"
              />
            </div>
            <Button>Search</Button>
          </div>

          <Tabs defaultValue="products">
            <TabsList className="mb-6 bg-secondary/50 border border-border p-1 w-full sm:w-auto overflow-x-auto justify-start">
              <TabsTrigger value="products">Products (142)</TabsTrigger>
              <TabsTrigger value="auctions">Auctions (12)</TabsTrigger>
              <TabsTrigger value="sellers">Sellers (5)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {MOCK_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="auctions">
              <div className="space-y-4">
                {MOCK_AUCTIONS.map((auction) => (
                  <AuctionCard key={auction.id} {...auction} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sellers">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {MOCK_SELLERS.map((seller) => (
                  <SellerCard key={seller.username} {...seller} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 flex justify-center items-center gap-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="default" className="w-10 h-10 p-0">1</Button>
            <Button variant="outline" className="w-10 h-10 p-0">2</Button>
            <Button variant="outline" className="w-10 h-10 p-0">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
