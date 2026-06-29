"use client";

import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

const CATEGORIES = [
  { label: "Web Apps", slug: "web-app" },
  { label: "Mobile Apps", slug: "mobile-app" },
  { label: "Websites", slug: "website" },
  { label: "Landing Pages", slug: "landing-page" }, 
  { label: "Admin Dashboards", slug: "admin-dashboard" }, 
  { label: "E-commerce", slug: "e-commerce" }, 
  { label: "SaaS Templates", slug: "saas-template" }, 
  { label: "Portfolios", slug: "portfolio" }, 
  { label: "UI Kits", slug: "ui-kit" }
];

const PRODUCT_TYPES = ["Full Source Code", "Frontend Only", "Backend API", "UI Template"];
const TECH_STACKS = ["React", "Next.js", "Vue.js", "Flutter", "React Native", "Node.js", "Django"];

export interface FilterState {
  categories: string[];
  minPrice: string;
  maxPrice: string;
  productTypes: string[];
  techStacks: string[];
  minRating: number | null;
  verifiedSeller: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearAll: () => void;
}

export function FilterSidebar({ filters, onFilterChange, onClearAll }: FilterSidebarProps) {

  const handleArrayToggle = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentArray = (filters[key] as string[]) || [];
    if (checked) {
      onFilterChange(key, [...currentArray, value]);
    } else {
      onFilterChange(key, currentArray.filter((item) => item !== value));
    }
  };

  return (
    <Card className="p-4 border-border bg-card/50 hidden lg:block sticky top-24 h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-heading font-semibold text-lg">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          Filters
        </div>
        <button 
          onClick={onClearAll}
          className="text-xs px-3 py-1.5 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-full transition-all font-semibold shadow-sm"
        >
          Clear All
        </button>
      </div>
      
      <ScrollArea className="h-[calc(100%-3rem)] pr-4">
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">Categories</h3>
            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <div key={cat.slug} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cat-${cat.slug}`} 
                    checked={filters.categories.includes(cat.slug)}
                    onCheckedChange={(c) => handleArrayToggle("categories", cat.slug, c as boolean)}
                  />
                  <label htmlFor={`cat-${cat.slug}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground hover:text-foreground cursor-pointer">
                    {cat.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Price Range */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full bg-secondary border border-border rounded-md py-1.5 pl-6 pr-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange("minPrice", e.target.value)}
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full bg-secondary border border-border rounded-md py-1.5 pl-6 pr-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange("maxPrice", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Product Type */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">Product Type</h3>
            <div className="space-y-2.5">
              {PRODUCT_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type}`} 
                    checked={filters.productTypes.includes(type)}
                    onCheckedChange={(c) => handleArrayToggle("productTypes", type, c as boolean)}
                  />
                  <label htmlFor={`type-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground hover:text-foreground cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Tech Stack */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">Tech Stack</h3>
            <div className="space-y-2.5">
              {TECH_STACKS.map((tech) => (
                <div key={tech} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tech-${tech}`} 
                    checked={filters.techStacks.includes(tech)}
                    onCheckedChange={(c) => handleArrayToggle("techStacks", tech, c as boolean)}
                  />
                  <label htmlFor={`tech-${tech}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground hover:text-foreground cursor-pointer">
                    {tech}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Rating */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">Minimum Rating</h3>
            <div className="space-y-2.5">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`rating-${rating}`} 
                    checked={filters.minRating === rating}
                    onCheckedChange={(c) => onFilterChange("minRating", c ? rating : null)}
                  />
                  <label htmlFor={`rating-${rating}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground hover:text-foreground cursor-pointer flex items-center">
                    {rating} Stars & Up
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Verified Sellers Only */}
          <div className="flex items-center space-x-2 pb-6">
            <Checkbox 
              id="verified" 
              checked={filters.verifiedSeller}
              onCheckedChange={(c) => onFilterChange("verifiedSeller", !!c)}
            />
            <label htmlFor="verified" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer">
              Verified Sellers Only
            </label>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
