"use client";

import { Check, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminProductReviewPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Product Moderation</h1>
          <p className="text-muted-foreground">Review new submissions before they go live on the marketplace.</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search submissions..." className="pl-9 bg-secondary border-border" />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">24</span> pending products
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Submission</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: "PRD-102", title: "AI Image Gen Wrapper", category: "Mini Apps", seller: "dev_dude", price: 89.00, date: "2 hours ago" },
              { id: "PRD-101", title: "Supabase Auth Template", category: "SaaS Template", seller: "nextjs_master", price: 29.00, date: "5 hours ago" },
              { id: "PRD-100", title: "LinkedIn Scraper Bot", category: "Automation", seller: "data_miner", price: 150.00, date: "Yesterday" },
            ].map((prod) => (
              <TableRow key={prod.id} className="border-border hover:bg-secondary/30">
                <TableCell>
                  <div className="font-medium text-sm text-primary hover:underline cursor-pointer">{prod.title}</div>
                  <div className="text-xs text-muted-foreground font-mono">{prod.id}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs bg-secondary">{prod.category}</Badge>
                </TableCell>
                <TableCell className="text-sm font-medium">{prod.seller}</TableCell>
                <TableCell className="font-mono text-sm">${prod.price.toFixed(2)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{prod.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="h-8">Review Details</Button>
                    <Button size="sm" className="h-8 bg-success hover:bg-success/90 text-white w-8 px-0"><Check className="w-4 h-4" /></Button>
                    <Button size="sm" className="h-8 bg-danger hover:bg-danger/90 text-white w-8 px-0"><X className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
