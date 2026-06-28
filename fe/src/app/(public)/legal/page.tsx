"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-heading font-bold mb-8">Legal & Policies</h1>
      
      <Card className="border-border bg-card max-w-4xl">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground min-h-[40vh]">
          <Scale className="w-12 h-12 mb-4 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">Policies Document Center</h2>
          <p className="max-w-md">
            The legal agreements (Terms of Service, Privacy Policy, Payment & Fees) are currently being reviewed by our legal team and will be updated here shortly. 
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
