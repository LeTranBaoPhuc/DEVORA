"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, ChevronRight, Download, FileArchive, MessageSquare, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const PIPELINE_STATES = ["Pending", "Paid", "In Escrow", "Delivering", "Delivered", "Completed"];

export default function OrderDetailPage() {
  const [currentStatus, setCurrentStatus] = useState("Delivered");
  const currentStepIndex = PIPELINE_STATES.indexOf(currentStatus);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <Link href="/dashboard/buyer" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-1 flex items-center gap-3">
              Order <span className="font-mono text-primary">#ORD-9481</span>
            </h1>
            <p className="text-muted-foreground">Placed on Oct 22, 2025 at 14:32 PM</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="text-danger hover:text-danger hover:bg-danger/10 border-danger/20" onClick={() => toast.success("Dispute opened. Support team will contact you.")}>
              <ShieldAlert className="w-4 h-4 mr-2" /> Open Dispute
            </Button>
            <Button variant="outline" asChild>
              <Link href="/messages"><MessageSquare className="w-4 h-4 mr-2" /> Contact Seller</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Status Pipeline Stepper */}
      <Card className="border-border bg-card">
        <CardContent className="p-8">
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -translate-y-1/2 rounded-full z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (PIPELINE_STATES.length - 1)) * 100}%` }}
            ></div>
            
            <div className="relative z-10 flex justify-between">
              {PIPELINE_STATES.map((state, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div key={state} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-3 bg-card transition-colors ${isCompleted ? "border-primary text-primary" : "border-border text-muted-foreground"} ${isCurrent ? "shadow-[0_0_15px_rgba(245,158,11,0.5)]" : ""}`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 fill-primary text-card" /> : <div className="w-2.5 h-2.5 rounded-full bg-border"></div>}
                    </div>
                    <span className={`text-xs font-medium uppercase tracking-wider ${isCurrent ? "text-primary font-bold" : (isCompleted ? "text-foreground" : "text-muted-foreground")}`}>
                      {state}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Deliveries */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Deliveries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/30 border border-border rounded-lg p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">Delivery #1</h4>
                    <span className="text-xs text-muted-foreground">Submitted Oct 24, 2025 at 09:15 AM</span>
                  </div>
                  <Badge className="bg-success/20 text-success border-none">Awaiting Review</Badge>
                </div>
                
                <p className="text-sm text-foreground/80 mb-4 bg-background p-3 rounded border border-border">
                  &quot;Here is the finalized code. I&apos;ve included the Dockerfile as requested and added comments to the main logic flow.&quot;
                </p>

                <div className="flex items-center gap-3 p-3 rounded bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer mb-6">
                  <div className="p-2 bg-secondary rounded text-primary"><FileArchive className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">source_code_v1.zip</div>
                    <div className="text-xs text-muted-foreground">14.2 MB</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toast.success("Download started: source_code_v1.zip")}><Download className="w-4 h-4" /></Button>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-border">
                  <Button variant="outline" className="text-danger hover:text-danger hover:bg-danger/10 border-danger/20" onClick={() => toast.success("Revision requested. Seller has been notified.")}>
                    Request Revision
                  </Button>
                  <Button className="bg-success hover:bg-success/90 text-white" onClick={() => { setCurrentStatus("Completed"); toast.success("Delivery accepted! Escrow funds can now be released."); }}>
                    Accept Delivery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product/Auction Info */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Item Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2 bg-secondary text-xs">Mini App</Badge>
                  <Link href="/marketplace/notion-habit-tracker">
                    <h3 className="font-heading font-semibold text-lg hover:text-primary transition-colors mb-2">
                      Advanced Notion Habit Tracker + Data Visualization Mini App
                    </h3>
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Seller: <Link href="/profile/vibe_creator" className="text-foreground hover:underline">vibe_creator</Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Payment & Escrow Info */}
        <div className="space-y-8">
          <Card className="border-border bg-card">
            <CardHeader className="bg-success/5 border-b border-success/20 pb-4">
              <CardTitle className="flex items-center gap-2 text-success">
                <ShieldCheck className="w-5 h-5" /> Escrow Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-6">
                Funds are currently securely held in DEVORA escrow. They will not be released to the seller until you accept the delivery.
              </p>
              
              <div className="p-4 bg-background border border-border rounded-lg mb-6">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Escrow Amount</div>
                <div className="font-mono text-2xl font-bold text-success">$29.99</div>
              </div>

              <Button className="w-full font-semibold" disabled={currentStatus !== "Completed"} onClick={() => toast.success("Funds released from Escrow successfully!")}>
                Release Funds
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                {currentStatus !== "Completed" ? "Action requires accepting a delivery first." : "You can now release funds to the seller."}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item Price</span>
                  <span className="font-mono">$29.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee (0%)</span>
                  <span className="font-mono">$0.00</span>
                </div>
                <Separator className="bg-border my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total Paid</span>
                  <span className="font-mono text-primary">$29.99</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-xs text-muted-foreground mb-2">Payment Method</div>
                <div className="flex items-center gap-2 text-sm font-medium bg-secondary p-3 rounded border border-border">
                  <div className="w-8 h-5 bg-foreground/10 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                  •••• 4242
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
