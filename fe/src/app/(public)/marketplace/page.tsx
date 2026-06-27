"use client";

import { useState } from "react";
import { Search, LayoutGrid, List as ListIcon, Filter } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/marketplace/product-card";
import { FilterSidebar } from "@/components/marketplace/filter-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MOCK_PRODUCTS = [
  {
    id: "1", slug: "ecommerce-mobile-app", title: "E-commerce Mobile App Full Source Code",
    coverImage: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600",
    price: 299.00, rating: 4.9, salesCount: 342, productType: "Mobile App", techStack: ["React Native", "Firebase", "Stripe"],
    seller: { username: "AppMaster", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", isVerified: true }
  },
  {
    id: "2", slug: "saas-dashboard-nextjs", title: "Modern SaaS Dashboard & Landing Page",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    price: 149.99, rating: 4.7, salesCount: 1205, productType: "Web App", techStack: ["Next.js", "Tailwind CSS", "Supabase"],
    seller: { username: "WebNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e", isVerified: false }
  },
  {
    id: "3", slug: "social-media-management", title: "Social Media Management Platform",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
    price: 499.00, rating: 4.8, salesCount: 89, productType: "Web App", techStack: ["MERN Stack", "Socket.io", "AWS"],
    seller: { username: "CodeCrafter", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f", isVerified: true }
  },
  {
    id: "4", slug: "fitness-tracking-app", title: "Pro Fitness & Workout Tracking App",
    coverImage: "https://images.unsplash.com/photo-1526506114642-990520a2e053?auto=format&fit=crop&q=80&w=600",
    price: 199.00, rating: 4.6, salesCount: 2341, productType: "Mobile App", techStack: ["Flutter", "Dart", "Firebase"],
    seller: { username: "FitDevs", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g", isVerified: true }
  },
  {
    id: "5", slug: "real-estate-portal", title: "Premium Real Estate Listing Portal",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
    price: 345.00, rating: 4.9, salesCount: 672, productType: "Web App", techStack: ["Vue.js", "Laravel", "MySQL"],
    seller: { username: "PropertyTech", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h", isVerified: false }
  },
  {
    id: "6", slug: "food-delivery-kit", title: "Complete Food Delivery App Solution",
    coverImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600",
    price: 599.00, rating: 4.5, salesCount: 42, productType: "Mobile App", techStack: ["Swift", "Kotlin", "Node.js"],
    seller: { username: "EatsApp", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704i", isVerified: true }
  },
  {
    id: "7", slug: "job-board-platform", title: "Niche Job Board & Recruitment Platform",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600",
    price: 250.00, rating: 4.8, salesCount: 512, productType: "Web App", techStack: ["Django", "React", "PostgreSQL"],
    seller: { username: "HireDev", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704j", isVerified: true }
  },
  {
    id: "8", slug: "portfolio-template-pro", title: "Creative Developer Portfolio Template",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    price: 49.00, rating: 4.4, salesCount: 890, productType: "Website", techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    seller: { username: "UIUX_Master", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704k", isVerified: false }
  },
];

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-heading font-black mb-4 tracking-tighter">Creative Assets & Tools</h1>
        <p className="text-muted-foreground text-xl max-w-2xl">Discover the best tools, scripts, and applications built by the world&apos;s top developers. Ready to deploy.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex-1 w-full flex items-center gap-2">
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
              
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9 bg-card border-border hover:border-border-hover w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                Showing 1-8 of 12,482
              </span>
              
              <Select defaultValue="newest">
                <SelectTrigger className="w-[160px] bg-card border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="best-selling">Best Selling</SelectItem>
                  <SelectItem value="top-rated">Top Rated</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center rounded-md border border-border p-1 bg-card hidden sm:flex">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="icon" 
                  className="w-7 h-7"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="icon" 
                  className="w-7 h-7"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Grid / List */}
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }>
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} layout={viewMode} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="default" className="w-10 h-10 p-0">1</Button>
            <Button variant="outline" className="w-10 h-10 p-0">2</Button>
            <Button variant="outline" className="w-10 h-10 p-0">3</Button>
            <span className="text-muted-foreground">...</span>
            <Button variant="outline" className="w-10 h-10 p-0">10</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
