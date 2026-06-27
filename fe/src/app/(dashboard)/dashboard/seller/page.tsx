"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, CreditCard, DollarSign, PackagePlus, PieChart, Wallet } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function SellerDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Seller Dashboard</h1>
          <p className="text-muted-foreground">Overview of your sales, products, and earnings.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/seller/payouts" className={buttonVariants({ variant: "outline" })}><CreditCard className="w-4 h-4 mr-2" /> Payouts</Link>
          <Link href="/dashboard/seller/products/new" className={buttonVariants({})}><PackagePlus className="w-4 h-4 mr-2" /> List Product</Link>
        </div>
      </div>

      {/* Finance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Wallet className="w-16 h-16" />
          </div>
          <CardContent className="p-6 relative z-10">
            <h3 className="font-medium opacity-90 mb-2 text-sm uppercase tracking-wider">Available Balance</h3>
            <div className="text-4xl font-mono font-bold">$2,450.00</div>
            <div className="mt-4 flex items-center text-sm font-medium">
              Ready for payout
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">Pending Payout</h3>
              <div className="p-2 bg-info/10 rounded-lg text-info"><DollarSign className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-mono font-bold text-foreground">$840.00</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Processing in escrow
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">Total Earnings</h3>
              <div className="p-2 bg-success/10 rounded-lg text-success"><BarChart3 className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-mono font-bold text-foreground">$14,230.50</div>
            <div className="mt-2 text-sm text-success font-medium flex items-center">
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center border-t border-border bg-secondary/20">
            <div className="text-center text-muted-foreground flex flex-col items-center">
              <BarChart3 className="w-10 h-10 mb-2 opacity-50" />
              <p>Revenue Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center border-t border-border bg-secondary/20">
            <div className="text-center text-muted-foreground flex flex-col items-center">
              <PieChart className="w-10 h-10 mb-2 opacity-50" />
              <p>Status Donut Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold">Active Orders</h2>
        </div>
        <Card className="border-border bg-card overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-mono text-xs">ORDER_ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "ORD-9502", buyer: "TechStartupCEO", product: "Customer Support Agent", amount: 149.00, status: "In Escrow", deadline: "-", statusColor: "bg-amber-500/20 text-amber-500" },
                { id: "ORD-9501", buyer: "EcomHustler", product: "Airtable Sync Script", amount: 250.00, status: "Delivering", deadline: "Tomorrow", statusColor: "bg-info/20 text-info" },
                { id: "ORD-9498", buyer: "CommunityManager", product: "Slack Summarizer", amount: 49.00, status: "Pending", deadline: "-", statusColor: "bg-muted text-muted-foreground" },
              ].map((order) => (
                <TableRow key={order.id} className="border-border hover:bg-secondary/30">
                  <TableCell className="font-mono text-xs text-muted-foreground">{order.id}</TableCell>
                  <TableCell className="font-medium text-sm">{order.buyer}</TableCell>
                  <TableCell className="text-sm line-clamp-1 max-w-[200px]">{order.product}</TableCell>
                  <TableCell className="font-mono text-sm">${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${order.statusColor} border-none font-normal text-xs`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.deadline}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/orders/${order.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
