"use client";

import { Building2, CreditCard, Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PayoutsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-1">Payouts</h1>
        <p className="text-muted-foreground">Manage your earnings and bank accounts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="p-6">
            <h3 className="font-medium opacity-90 mb-2 text-sm uppercase tracking-wider">Available for Payout</h3>
            <div className="text-4xl font-mono font-bold mb-6">$2,450.00</div>
            <Button variant="secondary" className="w-full text-primary font-bold">
              Request Payout
            </Button>
            <p className="text-xs mt-3 opacity-80 text-center">Standard processing time: 2-3 business days</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Bank Accounts</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Account
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-primary/50 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-background rounded-md border border-border">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-2">Chase Bank <Badge className="bg-primary/20 text-primary border-none">Primary</Badge></div>
                    <div className="text-sm text-muted-foreground font-mono">•••• •••• •••• 4242</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border bg-card rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-background rounded-md border border-border">
                    <Building2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Bank of America</div>
                    <div className="text-sm text-muted-foreground font-mono">•••• •••• •••• 9921</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Set Primary</Button>
                  <Button variant="ghost" size="sm" className="text-danger">Remove</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-mono text-xs">PAYOUT_ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bank Account</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead>Processed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "PAY-10492", amount: 1250.00, status: "Processing", bank: "Chase •••• 4242", requested: "Oct 24, 2025", processed: "-" },
                { id: "PAY-10311", amount: 840.50, status: "Paid", bank: "Chase •••• 4242", requested: "Oct 15, 2025", processed: "Oct 17, 2025" },
                { id: "PAY-09882", amount: 3200.00, status: "Paid", bank: "BofA •••• 9921", requested: "Sep 28, 2025", processed: "Oct 01, 2025" },
                { id: "PAY-09412", amount: 450.00, status: "Failed", bank: "BofA •••• 9921", requested: "Sep 10, 2025", processed: "Sep 12, 2025" },
              ].map((payout) => (
                <TableRow key={payout.id} className="border-border hover:bg-secondary/30">
                  <TableCell className="font-mono text-xs text-muted-foreground">{payout.id}</TableCell>
                  <TableCell className="font-mono text-sm font-semibold">${payout.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {payout.status === "Paid" && <Badge className="bg-success/20 text-success border-none">Paid</Badge>}
                    {payout.status === "Processing" && <Badge className="bg-info/20 text-info border-none">Processing</Badge>}
                    {payout.status === "Failed" && <Badge className="bg-danger/20 text-danger border-none">Failed</Badge>}
                  </TableCell>
                  <TableCell className="text-sm">{payout.bank}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{payout.requested}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{payout.processed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
