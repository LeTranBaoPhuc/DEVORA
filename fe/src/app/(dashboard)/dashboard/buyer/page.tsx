"use client";

import Link from "next/link";
import { ArrowRight, Box, Clock, LayoutDashboard, ListPlus, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BuyerDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Manage your orders and auction requests.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/marketplace" className={buttonVariants({ variant: "outline" })}><Search className="w-4 h-4 mr-2" /> Browse</Link>
          <Link href="/auctions/new" className={buttonVariants({})}>
            <ListPlus className="w-4 h-4 mr-2" /> Post Request
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground">Active Orders</h3>
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Clock className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-heading font-bold">3</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground">Completed</h3>
              <div className="p-2 bg-success/10 rounded-lg text-success"><Box className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-heading font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground">Open Requests</h3>
              <div className="p-2 bg-info/10 rounded-lg text-info"><ListPlus className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-heading font-bold">1</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground">Total Spent</h3>
              <div className="p-2 bg-secondary rounded-lg text-foreground"><LayoutDashboard className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-mono font-bold text-primary">$1,245.00</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold">Recent Orders</h2>
            <Link href="/dashboard/buyer/orders" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <Card className="border-border bg-card overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-mono text-xs">ORDER_ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "ORD-9482", item: "Customer Support Agent", seller: "NeuralNinja", amount: 149.00, status: "In Escrow", statusColor: "bg-amber-500/20 text-amber-500" },
                  { id: "ORD-9481", item: "Notion Habit Tracker", seller: "vibe_creator", amount: 29.99, status: "Delivered", statusColor: "bg-success/20 text-success" },
                  { id: "ORD-9455", item: "Slack Summarizer Bot", seller: "NeuralNinja", amount: 49.00, status: "Completed", statusColor: "bg-secondary text-foreground" },
                ].map((order) => (
                  <TableRow key={order.id} className="border-border hover:bg-secondary/30">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <Link href={`/dashboard/orders/${order.id}`} className="hover:text-primary transition-colors">{order.id}</Link>
                    </TableCell>
                    <TableCell className="font-medium text-sm line-clamp-1 max-w-[200px]">{order.item}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.seller}</TableCell>
                    <TableCell className="font-mono text-sm">${order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${order.statusColor} border-none font-normal text-xs`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* My Auction Requests */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold">My Requests</h2>
            <Link href="/dashboard/buyer/auctions" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { id: "a1", title: "Custom Discord bot for Patreon sync", budget: "$300 - $500", bids: 8, status: "OPEN" },
                  { id: "a4", title: "Figma plugin for Tailwind v4", budget: "$400 - $800", bids: 22, status: "IN_PROGRESS" },
                ].map((auction) => (
                  <div key={auction.id} className="p-5 hover:bg-secondary/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={auction.status === "OPEN" ? "bg-primary/20 text-primary border-none" : "bg-info/20 text-info border-none"}>
                        {auction.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{auction.bids} Bids</span>
                    </div>
                    <Link href={`/auctions/${auction.id}`}>
                      <h4 className="font-medium text-sm hover:text-primary transition-colors line-clamp-2 mb-3">
                        {auction.title}
                      </h4>
                    </Link>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-mono font-bold text-primary">{auction.budget}</span>
                      <Link href={`/auctions/${auction.id}`} className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs">
                        View Bids <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
