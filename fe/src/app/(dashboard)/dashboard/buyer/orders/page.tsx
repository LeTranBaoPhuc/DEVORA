"use client";

import Link from "next/link";
import { ArrowLeft, Box, Search, Download, Server } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function BuyerOrdersPage() {
  const orders = [
    { id: "ORD-9482", type: "MANAGED", item: "Customer Support Agent", seller: "NeuralNinja", amount: 149.00, status: "In Escrow", date: "2026-06-25", statusColor: "bg-amber-500/20 text-amber-500", expiresAt: "2026-07-25" },
    { id: "ORD-9481", type: "SOURCE", item: "Notion Habit Tracker", seller: "vibe_creator", amount: 29.99, status: "Delivered", date: "2026-06-20", statusColor: "bg-success/20 text-success" },
    { id: "ORD-9455", type: "MANAGED", item: "Slack Summarizer Bot", seller: "NeuralNinja", amount: 49.00, status: "Completed", date: "2026-06-15", statusColor: "bg-secondary text-foreground", expiresAt: "2026-07-15" },
    { id: "ORD-9412", type: "MANAGED", item: "Shopify Custom Theme", seller: "DesignPro", amount: 299.00, status: "Completed", date: "2026-05-28", statusColor: "bg-secondary text-foreground", expiresAt: "Expired" },
    { id: "ORD-9399", type: "SOURCE", item: "Web Scraper Script", seller: "DataWiz", amount: 75.00, status: "Cancelled", date: "2026-05-10", statusColor: "bg-destructive/20 text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/buyer" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">My Orders</h1>
          <p className="text-muted-foreground">View and manage all your purchased products and services.</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
          <CardTitle>All Orders</CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 bg-secondary border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-mono text-xs w-[120px]">ORDER_ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-border hover:bg-secondary/30">
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    <Link href={`/dashboard/orders/${order.id}`} className="hover:text-primary transition-colors">{order.id}</Link>
                  </TableCell>
                  <TableCell className="text-sm">{order.date}</TableCell>
                  <TableCell className="font-medium text-sm">
                    {order.item}
                    {order.type === "MANAGED" && (
                      <div className="flex items-center gap-1 text-xs text-info mt-1">
                        <Server className="w-3 h-3" /> Managed Server
                        {order.expiresAt === "Expired" ? (
                          <span className="text-destructive ml-1">(Expired)</span>
                        ) : (
                          <span className="text-muted-foreground ml-1">until {order.expiresAt}</span>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.seller}</TableCell>
                  <TableCell className="font-mono text-sm">${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${order.statusColor} border-none font-normal text-xs`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {(order.status === "Delivered" || order.status === "Completed") && (
                        <Button variant="outline" size="sm" className="h-8" title="Download Source Code">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      {order.type === "MANAGED" && (order.status === "Delivered" || order.status === "Completed") && (
                        <Button size="sm" className="h-8 bg-primary text-primary-foreground hover:bg-primary/90" title="Renew Server">
                          Renew
                        </Button>
                      )}
                      <Link href={`/dashboard/orders/${order.id}`} className={buttonVariants({ variant: "ghost", size: "sm", className: "h-8" })}>
                        Details
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
