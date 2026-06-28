"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LifeBuoy } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-heading font-bold mb-8">Help Center & Support</h1>
      
      <Card className="border-border bg-card max-w-4xl">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground min-h-[40vh]">
          <LifeBuoy className="w-12 h-12 mb-4 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">How can we help?</h2>
          <p className="max-w-md">
            Our comprehensive support documentation, seller guides, and dispute resolution workflows are currently being migrated to this new portal. Please check back soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
