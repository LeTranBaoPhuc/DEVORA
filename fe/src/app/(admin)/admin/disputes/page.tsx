"use client";

import { useState } from "react";
import { AlertTriangle, Check, RotateCcw, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type DisputeStatus = "Open" | "Reviewing" | "Resolved (Refunded)" | "Resolved (Released)";

interface Dispute {
  id: string;
  orderId: string;
  buyer: string;
  seller: string;
  amount: number;
  reason: string;
  status: DisputeStatus;
  date: string;
}

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([
    { id: "DSP-5021", orderId: "ORD-9481", buyer: "TechStartupCEO", seller: "NeuralNinja", amount: 149.00, reason: "Item not as described", status: "Open", date: "2 hours ago" },
    { id: "DSP-5020", orderId: "ORD-9455", buyer: "CryptoBro", seller: "vibe_creator", amount: 500.00, reason: "Seller stopped responding", status: "Reviewing", date: "1 day ago" },
    { id: "DSP-5018", orderId: "ORD-9410", buyer: "DataNerd", seller: "nextjs_master", amount: 49.00, reason: "Bug in source code", status: "Resolved (Refunded)", date: "3 days ago" },
  ]);

  const handleResolve = (id: string, resolution: "Resolved (Refunded)" | "Resolved (Released)") => {
    setDisputes((prev) => 
      prev.map((d) => d.id === id ? { ...d, status: resolution } : d)
    );
    if (resolution === "Resolved (Refunded)") {
      toast.success(`Dispute ${id} resolved. Funds refunded to buyer.`);
    } else {
      toast.success(`Dispute ${id} resolved. Funds released to seller.`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Dispute Resolution</h1>
          <p className="text-muted-foreground">Manage order disputes and escrow funds.</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search disputes..." className="pl-9 bg-secondary border-border" />
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-bold text-danger">{disputes.filter(d => d.status === "Open" || d.status === "Reviewing").length}</span> active disputes
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Dispute ID</TableHead>
              <TableHead>Order / Amount</TableHead>
              <TableHead>Buyer & Seller</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disputes.map((dispute) => (
              <TableRow key={dispute.id} className="border-border hover:bg-secondary/30">
                <TableCell>
                  <div className="font-medium text-sm text-foreground">{dispute.id}</div>
                  <div className="text-xs text-muted-foreground">{dispute.date}</div>
                </TableCell>
                <TableCell>
                  <div className="font-mono text-sm text-primary">{dispute.orderId}</div>
                  <div className="text-sm font-bold">${dispute.amount.toFixed(2)}</div>
                </TableCell>
                <TableCell className="text-sm">
                  <div><span className="text-muted-foreground">B:</span> {dispute.buyer}</div>
                  <div><span className="text-muted-foreground">S:</span> {dispute.seller}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm max-w-[200px] truncate" title={dispute.reason}>{dispute.reason}</div>
                </TableCell>
                <TableCell>
                  {dispute.status === "Open" && <Badge className="bg-danger/20 text-danger border-none hover:bg-danger/20"><AlertTriangle className="w-3 h-3 mr-1"/> Open</Badge>}
                  {dispute.status === "Reviewing" && <Badge className="bg-amber-500/20 text-amber-500 border-none hover:bg-amber-500/20">Reviewing</Badge>}
                  {dispute.status.includes("Resolved") && <Badge className="bg-success/20 text-success border-none hover:bg-success/20">Resolved</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  {(dispute.status === "Open" || dispute.status === "Reviewing") ? (
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleResolve(dispute.id, "Resolved (Refunded)")}
                        className="h-8 text-danger hover:text-danger hover:bg-danger/10 border-danger/30"
                        title="Refund Buyer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleResolve(dispute.id, "Resolved (Released)")}
                        className="h-8 text-success hover:text-success hover:bg-success/10 border-success/30"
                        title="Release to Seller"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">{dispute.status}</span>
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
