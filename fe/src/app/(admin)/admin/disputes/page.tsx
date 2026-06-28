"use client";

import { useState } from "react";
import { AlertTriangle, Check, RotateCcw, Search, Eye, MessageSquare, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  const handleResolve = (id: string, resolution: "Resolved (Refunded)" | "Resolved (Released)") => {
    setDisputes((prev) => 
      prev.map((d) => d.id === id ? { ...d, status: resolution } : d)
    );
    if (resolution === "Resolved (Refunded)") {
      toast.success(`Dispute ${id} resolved. Funds refunded to buyer.`);
    } else {
      toast.success(`Dispute ${id} resolved. Funds released to seller.`);
    }
    
    // Update active sheet if open
    if (selectedDispute?.id === id) {
      setSelectedDispute(prev => prev ? { ...prev, status: resolution } : null);
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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setSelectedDispute(dispute)}
                    className="h-8 border-border text-foreground hover:bg-secondary"
                  >
                    <Eye className="w-4 h-4 mr-2" /> View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={!!selectedDispute} onOpenChange={(open) => !open && setSelectedDispute(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedDispute && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-danger" /> 
                  Dispute Details: {selectedDispute.id}
                </SheetTitle>
                <SheetDescription>
                  Full audit log and chat history for this dispute.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Escrow Amount</div>
                    <div className="text-2xl font-bold font-mono text-primary">${selectedDispute.amount.toFixed(2)}</div>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Order ID</div>
                    <div className="text-lg font-mono text-foreground">{selectedDispute.orderId}</div>
                  </div>
                </div>

                {/* Complaint */}
                <div>
                  <h3 className="font-bold text-sm mb-2 text-foreground">Buyer Complaint</h3>
                  <div className="p-3 bg-danger/10 text-danger-foreground rounded border border-danger/20 text-sm">
                    "{selectedDispute.reason}"
                  </div>
                </div>

                {/* Chat Log Mock */}
                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-foreground">
                    <MessageSquare className="w-4 h-4" /> Message History
                  </h3>
                  <div className="space-y-4 bg-background border border-border rounded-lg p-4 h-64 overflow-y-auto">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-xs text-muted-foreground font-bold">{selectedDispute.buyer} (Buyer)</span>
                      <div className="bg-secondary px-3 py-2 rounded-lg text-sm max-w-[85%]">
                        Hello, the source code provided does not compile. There are missing dependencies.
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-xs text-muted-foreground font-bold">{selectedDispute.seller} (Seller)</span>
                      <div className="bg-primary/20 border border-primary/30 px-3 py-2 rounded-lg text-sm max-w-[85%]">
                        Did you run `npm install`? The dependencies are all in package.json.
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-xs text-muted-foreground font-bold">{selectedDispute.buyer} (Buyer)</span>
                      <div className="bg-secondary px-3 py-2 rounded-lg text-sm max-w-[85%]">
                        Yes, I did. But it references a private repo that I don't have access to. I want a refund.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                {(selectedDispute.status === "Open" || selectedDispute.status === "Reviewing") ? (
                  <div className="pt-4 border-t border-border space-y-3">
                    <h3 className="font-bold text-sm text-foreground">Admin Decision</h3>
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-danger hover:bg-danger/90 text-white"
                        onClick={() => handleResolve(selectedDispute.id, "Resolved (Refunded)")}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" /> Refund Buyer
                      </Button>
                      <Button 
                        className="flex-1 bg-success hover:bg-success/90 text-white"
                        onClick={() => handleResolve(selectedDispute.id, "Resolved (Released)")}
                      >
                        <Check className="w-4 h-4 mr-2" /> Release to Seller
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-border">
                    <div className="bg-success/10 text-success border border-success/20 p-3 rounded text-sm font-medium flex items-center justify-center">
                      <Check className="w-4 h-4 mr-2" /> {selectedDispute.status}
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
