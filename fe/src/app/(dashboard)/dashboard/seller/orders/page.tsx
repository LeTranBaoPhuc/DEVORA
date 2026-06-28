"use client";

import Link from "next/link";
import { ArrowLeft, Box, Search, CheckCircle, Server, FileCode, Ban } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SellerOrdersPage() {
  const orders = [
    { id: "ORD-9502", type: "MANAGED", buyer: "TechStartupCEO", product: "Customer Support Agent", amount: 149.00, status: "Pending Setup", deadline: "In 2 days", statusColor: "bg-amber-500/20 text-amber-500" },
    { id: "ORD-9501", type: "SOURCE", buyer: "EcomHustler", product: "Airtable Sync Script", amount: 250.00, status: "Delivered", deadline: "-", statusColor: "bg-success/20 text-success" },
    { id: "ORD-9498", type: "MANAGED", buyer: "CommunityManager", product: "Slack Summarizer", amount: 49.00, status: "Active", deadline: "-", statusColor: "bg-info/20 text-info" },
    { id: "ORD-9490", type: "SOURCE", buyer: "DataNerd", product: "Notion Template", amount: 15.00, status: "Delivered", deadline: "-", statusColor: "bg-success/20 text-success" },
    { id: "ORD-9485", type: "MANAGED", buyer: "CryptoBro", product: "Trading Bot", amount: 500.00, status: "Cancelled", deadline: "-", statusColor: "bg-destructive/20 text-destructive" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/seller">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold">Sales & Orders</h1>
            <p className="text-sm text-muted-foreground">Manage your incoming orders and fulfillments</p>
          </div>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" />
              Incoming Orders
            </CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-9 h-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px] h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending Setup</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-mono text-xs w-[100px]">ORDER_ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product / Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-border hover:bg-secondary/30 transition-colors group">
                    <TableCell className="font-mono text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      <Link href={`/dashboard/orders/${order.id}`}>{order.id}</Link>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{order.buyer}</TableCell>
                    <TableCell className="text-sm">
                      <div className="font-medium line-clamp-1">{order.product}</div>
                      {order.type === "MANAGED" ? (
                        <div className="flex items-center gap-1 text-[10px] text-info mt-1 uppercase font-semibold tracking-wider">
                          <Server className="w-3 h-3" /> Managed Server
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1 uppercase font-semibold tracking-wider">
                          <FileCode className="w-3 h-3" /> Source Only
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm">${order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${order.statusColor} border-none font-normal text-xs`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.deadline}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {order.status === "Pending Setup" && order.type === "MANAGED" && (
                          <Button size="sm" onClick={() => toast.success(`Server setup initiated for ${order.id}`)} className="h-8 bg-primary text-primary-foreground hover:bg-primary/90">
                            Set up Server
                          </Button>
                        )}
                        {order.status === "Active" && order.type === "MANAGED" && (
                          <Button variant="outline" size="sm" onClick={() => toast.info(`Managing instance ${order.id}`)} className="h-8 border-info text-info hover:bg-info/10">
                            Manage Instance
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8" asChild>
                          <Link href={`/dashboard/orders/${order.id}`}>Details</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
