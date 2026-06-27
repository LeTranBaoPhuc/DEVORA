"use client";

import { Activity, CreditCard, DollarSign, Package, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-1">Platform Overview</h1>
        <p className="text-muted-foreground">High-level metrics and system health.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">Total GMV</h3>
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><DollarSign className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-mono font-bold">$142,500</div>
            <div className="text-sm text-success mt-2 font-medium">+15.2% this month</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">Active Users</h3>
              <div className="p-2 bg-info/10 rounded-lg text-info"><Users className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-mono font-bold">12,450</div>
            <div className="text-sm text-success mt-2 font-medium">+5.4% this month</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">Active Products</h3>
              <div className="p-2 bg-success/10 rounded-lg text-success"><Package className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-mono font-bold">3,892</div>
            <div className="text-sm text-success mt-2 font-medium">+120 new this week</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">Escrow Volume</h3>
              <div className="p-2 bg-secondary rounded-lg text-foreground"><CreditCard className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-mono font-bold">$45,200</div>
            <div className="text-sm text-muted-foreground mt-2 font-medium">Currently held</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded border border-border">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="font-medium text-sm">Escrow Service (Stripe)</span>
                </div>
                <Badge className="bg-success/20 text-success border-none">Operational</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded border border-border">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="font-medium text-sm">Storage Service (S3)</span>
                </div>
                <Badge className="bg-success/20 text-success border-none">Operational</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded border border-border">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span className="font-medium text-sm">Search Indexing</span>
                </div>
                <Badge className="bg-amber-500/20 text-amber-500 border-none">Degraded</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Queue</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">SLA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border hover:bg-secondary/30">
                  <TableCell className="font-medium text-sm">Products Pending Review</TableCell>
                  <TableCell className="text-right font-mono">24</TableCell>
                  <TableCell className="text-right text-success text-xs">OK</TableCell>
                </TableRow>
                <TableRow className="border-border hover:bg-secondary/30">
                  <TableCell className="font-medium text-sm">Open Disputes</TableCell>
                  <TableCell className="text-right font-mono text-danger font-bold">3</TableCell>
                  <TableCell className="text-right text-danger text-xs">Breached</TableCell>
                </TableRow>
                <TableRow className="border-border hover:bg-secondary/30">
                  <TableCell className="font-medium text-sm">KYC Verifications</TableCell>
                  <TableCell className="text-right font-mono">15</TableCell>
                  <TableCell className="text-right text-success text-xs">OK</TableCell>
                </TableRow>
                <TableRow className="border-border hover:bg-secondary/30">
                  <TableCell className="font-medium text-sm">Payouts Processing</TableCell>
                  <TableCell className="text-right font-mono">42</TableCell>
                  <TableCell className="text-right text-success text-xs">OK</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
