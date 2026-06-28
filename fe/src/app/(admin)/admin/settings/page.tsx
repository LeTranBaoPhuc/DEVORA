"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  const [fee, setFee] = useState("5");
  const [minPayout, setMinPayout] = useState("50");
  const [autoApprove, setAutoApprove] = useState(false);

  const handleSave = () => {
    toast.success("Global platform settings updated successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Global Settings</h1>
          <p className="text-muted-foreground">Configure marketplace rules, fees, and automation.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Financial Settings</CardTitle>
            <CardDescription>Configure fees and payout rules for the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3">
              <label htmlFor="platformFee" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Platform Fee (%)</label>
              <div className="flex items-center gap-3">
                <Input 
                  id="platformFee"
                  type="number" 
                  value={fee} 
                  onChange={(e) => setFee(e.target.value)}
                  className="max-w-[150px] bg-secondary" 
                />
                <span className="text-sm text-muted-foreground">Percentage taken from every successful transaction.</span>
              </div>
            </div>

            <div className="grid gap-3">
              <label htmlFor="minPayout" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Minimum Payout Amount ($)</label>
              <div className="flex items-center gap-3">
                <Input 
                  id="minPayout"
                  type="number" 
                  value={minPayout} 
                  onChange={(e) => setMinPayout(e.target.value)}
                  className="max-w-[150px] bg-secondary" 
                />
                <span className="text-sm text-muted-foreground">Minimum balance required for a seller to request withdrawal.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Moderation & Automation</CardTitle>
            <CardDescription>Control how products and users are verified.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-lg">
              <div className="space-y-0.5">
                <label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Auto-Approve Trusted Sellers</label>
                <p className="text-sm text-muted-foreground">
                  Automatically approve product submissions from sellers with an established positive track record.
                </p>
              </div>
              <input 
                type="checkbox"
                checked={autoApprove}
                onChange={(e) => setAutoApprove(e.target.checked)}
                className="h-5 w-5 accent-primary cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" /> Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
