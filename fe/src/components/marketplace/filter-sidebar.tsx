"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const CATEGORIES = [
  "Web Apps", "Mobile Apps", "Landing Pages", 
  "Admin Dashboards", "E-commerce", "SaaS Templates", 
  "Portfolios", "UI Kits"
];

const PRODUCT_TYPES = ["Full Source Code", "Frontend Only", "Backend API", "UI Template"];
const LICENSES = ["Single Use", "Unlimited", "Resale Rights"];
const TECH_STACKS = ["React", "Next.js", "Vue.js", "Flutter", "React Native", "Node.js", "Django"];

export function FilterSidebar() {
  return (
    <Card className="p-4 border-border bg-card/50 hidden lg:block sticky top-24 h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-2 font-heading font-semibold text-lg mb-6">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        Filters
      </div>
      
      <ScrollArea className="h-[calc(100%-3rem)] pr-4">
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">Categories</h3>
            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox id={`cat-${cat}`} />
                  <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground hover:text-foreground cursor-pointer">
                    {cat}
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
                <input type="number" placeholder="Min" className="w-full bg-secondary border border-border rounded-md py-1.5 pl-6 pr-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                <input type="number" placeholder="Max" className="w-full bg-secondary border border-border rounded-md py-1.5 pl-6 pr-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
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
                  <Checkbox id={`type-${type}`} />
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
                  <Checkbox id={`tech-${tech}`} />
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
                  <Checkbox id={`rating-${rating}`} />
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
            <Checkbox id="verified" />
            <label htmlFor="verified" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground cursor-pointer">
              Verified Sellers Only
            </label>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
