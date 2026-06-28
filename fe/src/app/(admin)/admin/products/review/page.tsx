"use client";

import { useState } from "react";
import { Check, Search, X, Eye, PackageOpen, FileCode } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Product {
  id: string;
  title: string;
  category: string;
  seller: string;
  price: number;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function AdminProductReviewPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: "PRD-102", title: "AI Image Gen Wrapper", category: "Mini Apps", seller: "dev_dude", price: 89.00, date: "2 hours ago", status: "Pending" },
    { id: "PRD-101", title: "Supabase Auth Template", category: "SaaS Template", seller: "nextjs_master", price: 29.00, date: "5 hours ago", status: "Pending" },
    { id: "PRD-100", title: "LinkedIn Scraper Bot", category: "Automation", seller: "data_miner", price: 150.00, date: "Yesterday", status: "Pending" },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleReview = (id: string, action: "Approved" | "Rejected") => {
    setProducts((prev) => 
      prev.map((p) => p.id === id ? { ...p, status: action } : p)
    );
    if (action === "Approved") {
      toast.success(`Product ${id} has been approved and is now live.`);
    } else {
      toast.error(`Product ${id} has been rejected.`);
    }
    
    if (selectedProduct?.id === id) {
      setSelectedProduct(prev => prev ? { ...prev, status: action } : null);
    }
  };

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
            Showing <span className="font-bold text-foreground">{products.filter(p => p.status === "Pending").length}</span> pending products
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
            {products.map((prod) => (
              <TableRow key={prod.id} className="border-border hover:bg-secondary/30">
                <TableCell>
                  <div className="font-medium text-sm text-primary hover:underline cursor-pointer" onClick={() => setSelectedProduct(prod)}>{prod.title}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{prod.id}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs bg-secondary">{prod.category}</Badge>
                </TableCell>
                <TableCell className="text-sm font-medium">{prod.seller}</TableCell>
                <TableCell className="font-mono text-sm">${prod.price.toFixed(2)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{prod.date}</TableCell>
                <TableCell className="text-right">
                  {prod.status === "Pending" ? (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setSelectedProduct(prod)}
                      className="h-8 border-border text-foreground hover:bg-secondary"
                    >
                      <Eye className="w-4 h-4 mr-2" /> Review Details
                    </Button>
                  ) : (
                    <Badge className={prod.status === "Approved" ? "bg-success/20 text-success border-none" : "bg-danger/20 text-danger border-none"}>
                      {prod.status}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedProduct && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <PackageOpen className="w-5 h-5 text-primary" /> 
                  Product Review
                </SheetTitle>
                <SheetDescription>
                  {selectedProduct.id} • Submitted {selectedProduct.date}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                {/* Visual Thumbnail Mockup */}
                <div className="w-full aspect-video bg-secondary rounded-lg border border-border flex items-center justify-center overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80" alt="Product thumbnail" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-heading font-black text-white mb-2">{selectedProduct.title}</h2>
                      <Badge className="bg-primary text-primary-foreground">{selectedProduct.category}</Badge>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Requested Price</div>
                    <div className="text-2xl font-bold font-mono text-primary">${selectedProduct.price.toFixed(2)}</div>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Seller Trust</div>
                    <div className="text-lg font-bold text-success flex items-center gap-2">
                      {selectedProduct.seller} <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-bold text-sm mb-2 text-foreground flex items-center gap-2">
                    <FileCode className="w-4 h-4" /> Product Description
                  </h3>
                  <div className="p-4 bg-background border border-border rounded-lg text-sm text-muted-foreground leading-relaxed">
                    This is a complete source code package for building an AI-powered SaaS. 
                    It includes authentication, database schema, landing page, and Stripe payment integration.
                    <br/><br/>
                    <strong>Tech Stack:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Next.js 14 (App Router)</li>
                      <li>Supabase (Auth & DB)</li>
                      <li>Tailwind CSS</li>
                      <li>Stripe Subscriptions</li>
                    </ul>
                  </div>
                </div>

                {/* Action Bar */}
                {selectedProduct.status === "Pending" ? (
                  <div className="pt-4 border-t border-border space-y-3">
                    <h3 className="font-bold text-sm text-foreground">Moderation Decision</h3>
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-success hover:bg-success/90 text-white"
                        onClick={() => handleReview(selectedProduct.id, "Approved")}
                      >
                        <Check className="w-4 h-4 mr-2" /> Approve & Publish
                      </Button>
                      <Button 
                        className="flex-1 bg-danger hover:bg-danger/90 text-white"
                        onClick={() => handleReview(selectedProduct.id, "Rejected")}
                      >
                        <X className="w-4 h-4 mr-2" /> Reject Submission
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-border">
                    <div className={`p-3 rounded text-sm font-medium flex items-center justify-center ${selectedProduct.status === 'Approved' ? 'bg-success/10 text-success border-success/20' : 'bg-danger/10 text-danger border-danger/20'} border`}>
                      {selectedProduct.status === 'Approved' ? <Check className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" />} 
                      Status: {selectedProduct.status}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
