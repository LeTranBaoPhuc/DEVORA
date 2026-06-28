"use client";

import { useState } from "react";
import { Check, CheckCircle2, Clock, Search, X, Eye, Landmark, AlertTriangle } from "lucide-react";
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

  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  const handlePayout = (id: string, action: "Paid" | "Failed") => {
    setPayouts((prev) => 
      prev.map((p) => p.id === id ? { ...p, status: action } : p)
    );
    if (action === "Paid") {
      toast.success(`Payout ${id} marked as Paid.`);
    } else {
      toast.error(`Payout ${id} rejected.`);
    }
    
    if (selectedPayout?.id === id) {
      setSelectedPayout(prev => prev ? { ...prev, status: action } : null);
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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setSelectedPayout(payout)}
                    className="h-8 border-border text-foreground hover:bg-secondary"
                  >
                    <Eye className="w-4 h-4 mr-2" /> View Request
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={!!selectedPayout} onOpenChange={(open) => !open && setSelectedPayout(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedPayout && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-primary" /> 
                  Withdrawal Request
                </SheetTitle>
                <SheetDescription>
                  {selectedPayout.id} • Requested {selectedPayout.requested}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 text-center">
                  <div className="text-sm text-muted-foreground mb-2">Requested Amount</div>
                  <div className="text-4xl font-bold font-mono text-primary">${selectedPayout.amount.toFixed(2)}</div>
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-3 text-foreground">Seller Verification</h3>
                  <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Seller Name:</span>
                      <span className="font-medium text-foreground">{selectedPayout.seller}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">KYC Status:</span>
                      <span className="font-bold text-success">Verified</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-muted-foreground">Dispute Rate:</span>
                      <span className="font-mono text-success">0.5% (Very Low)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-3 text-foreground">Destination Account</h3>
                  <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bank Name:</span>
                      <span className="font-medium text-foreground">{selectedPayout.bank.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Account Number:</span>
                      <span className="font-mono text-foreground">•••• •••• •••• {selectedPayout.bank.split(' ')[2]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Routing Number:</span>
                      <span className="font-mono text-foreground">122000247</span>
                    </div>
                  </div>
                </div>

                {selectedPayout.status === "Pending" && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-500 leading-relaxed">
                      Verify that the funds have been successfully wired from the platform's main account to the destination account before marking as Paid.
                    </p>
                  </div>
                )}

                {selectedPayout.status === "Pending" ? (
                  <div className="pt-4 border-t border-border flex gap-3">
                    <Button 
                      className="flex-1 bg-success hover:bg-success/90 text-white"
                      onClick={() => handlePayout(selectedPayout.id, "Paid")}
                    >
                      <Check className="w-4 h-4 mr-2" /> Mark as Paid
                    </Button>
                    <Button 
                      className="flex-1 bg-danger hover:bg-danger/90 text-white"
                      onClick={() => handlePayout(selectedPayout.id, "Failed")}
                    >
                      <X className="w-4 h-4 mr-2" /> Reject Payout
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-border">
                    <div className={`p-3 rounded text-sm font-medium flex items-center justify-center ${selectedPayout.status === 'Paid' ? 'bg-success/10 text-success border-success/20' : 'bg-danger/10 text-danger border-danger/20'} border`}>
                      {selectedPayout.status === 'Paid' ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" />} 
                      Status: {selectedPayout.status}
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
