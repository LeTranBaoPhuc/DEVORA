"use client";

import { useState } from "react";
import { Check, CheckCircle2, Clock, Search, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type PayoutStatus = "Pending" | "Paid" | "Failed";

interface Payout {
  id: string;
  seller: string;
  amount: number;
  bank: string;
  requested: string;
  status: PayoutStatus;
}

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([
    { id: "PAY-10492", seller: "NeuralNinja", amount: 1250.00, bank: "Chase •••• 4242", requested: "2 hours ago", status: "Pending" },
    { id: "PAY-10490", seller: "vibe_creator", amount: 450.00, bank: "BofA •••• 9921", requested: "Yesterday", status: "Pending" },
    { id: "PAY-10488", seller: "nextjs_master", amount: 3200.00, bank: "Citi •••• 1123", requested: "3 days ago", status: "Paid" },
  ]);

  const handlePayout = (id: string, action: "Paid" | "Failed") => {
    setPayouts((prev) => 
      prev.map((p) => p.id === id ? { ...p, status: action } : p)
    );
    if (action === "Paid") {
      toast.success(`Payout ${id} marked as Paid.`);
    } else {
      toast.error(`Payout ${id} rejected.`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Payout Processing</h1>
          <p className="text-muted-foreground">Manage and approve seller withdrawal requests.</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search payouts..." className="pl-9 bg-secondary border-border" />
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-bold text-info">{payouts.filter(p => p.status === "Pending").length}</span> pending requests
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Payout ID</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Bank Details</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((payout) => (
              <TableRow key={payout.id} className="border-border hover:bg-secondary/30">
                <TableCell>
                  <div className="font-mono text-sm text-foreground">{payout.id}</div>
                </TableCell>
                <TableCell className="font-medium text-sm">{payout.seller}</TableCell>
                <TableCell className="font-mono text-sm font-bold text-primary">${payout.amount.toFixed(2)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{payout.bank}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{payout.requested}</TableCell>
                <TableCell>
                  {payout.status === "Pending" && <Badge className="bg-info/20 text-info border-none hover:bg-info/20"><Clock className="w-3 h-3 mr-1"/> Pending</Badge>}
                  {payout.status === "Paid" && <Badge className="bg-success/20 text-success border-none hover:bg-success/20"><CheckCircle2 className="w-3 h-3 mr-1"/> Paid</Badge>}
                  {payout.status === "Failed" && <Badge className="bg-danger/20 text-danger border-none hover:bg-danger/20">Failed</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  {payout.status === "Pending" ? (
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handlePayout(payout.id, "Paid")}
                        className="h-8 text-success hover:text-success hover:bg-success/10 border-success/30"
                        title="Mark as Paid"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handlePayout(payout.id, "Failed")}
                        className="h-8 text-danger hover:text-danger hover:bg-danger/10 border-danger/30"
                        title="Reject Payout"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
