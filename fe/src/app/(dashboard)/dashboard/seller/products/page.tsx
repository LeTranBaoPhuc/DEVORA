"use client";

import Link from "next/link";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MOCK_PRODUCTS = [
  { id: "1", title: "Autonomous Customer Support AI Agent", status: "active", price: 149.00, sales: 342, rating: 4.9, views: 1250, createdAt: "Oct 15, 2025" },
  { id: "2", title: "Slack Summarizer Bot", status: "active", price: 49.00, sales: 898, rating: 4.8, views: 3200, createdAt: "Sep 02, 2025" },
  { id: "3", title: "Zendesk API Wrapper", status: "draft", price: 19.00, sales: 0, rating: 0, views: 0, createdAt: "Oct 24, 2025" },
  { id: "4", title: "AI Image Gen Wrapper", status: "pending", price: 89.00, sales: 0, rating: 0, views: 0, createdAt: "Oct 26, 2025" },
];

export default function SellerProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">My Products</h1>
          <p className="text-muted-foreground">Manage your listings and track performance.</p>
        </div>
        <Link href="/dashboard/seller/products/new" className={buttonVariants({})}><Plus className="w-4 h-4 mr-2" /> List New Product</Link>
      </div>

      <Card className="border-border bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9 bg-secondary border-border" />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PRODUCTS.map((product) => (
              <TableRow key={product.id} className="border-border hover:bg-secondary/30">
                <TableCell className="font-medium text-sm">
                  {product.title}
                </TableCell>
                <TableCell>
                  {product.status === "active" && <Badge className="bg-success/20 text-success border-none">Active</Badge>}
                  {product.status === "draft" && <Badge variant="outline" className="text-muted-foreground">Draft</Badge>}
                  {product.status === "pending" && <Badge className="bg-amber-500/20 text-amber-500 border-none">Pending Review</Badge>}
                </TableCell>
                <TableCell className="font-mono text-sm">${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>{product.rating > 0 ? product.rating : "-"}</TableCell>
                <TableCell>{product.views}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{product.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", className: "h-8 w-8 p-0" })}>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuItem>Edit Product</DropdownMenuItem>
                      <DropdownMenuItem>View Performance</DropdownMenuItem>
                      {product.status === "active" && <DropdownMenuItem>Pause Listing</DropdownMenuItem>}
                      <DropdownMenuItem className="text-danger focus:bg-danger/10 focus:text-danger">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
