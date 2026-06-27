"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function BuyerAuctionsPage() {
  const auctions = [
    { id: "a1", title: "Custom Discord bot for Patreon sync", budget: "$300 - $500", bids: 8, status: "OPEN", created: "2 days ago", description: "Looking for a bot that syncs Patreon roles to Discord with custom tier handling." },
    { id: "a4", title: "Figma plugin for Tailwind v4", budget: "$400 - $800", bids: 22, status: "IN_PROGRESS", created: "1 week ago", description: "Need a Figma plugin that exports variables to Tailwind v4 format." },
    { id: "a6", title: "React Native UI Kit", budget: "$1000 - $1500", bids: 45, status: "COMPLETED", created: "1 month ago", description: "A comprehensive UI kit for building fast RN apps." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/buyer" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold mb-1">My Auction Requests</h1>
            <p className="text-muted-foreground">Manage your custom development requests and bids.</p>
          </div>
        </div>
        <Link href="/auctions/new" className={buttonVariants({ className: "bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-[0_0_15px_rgba(204,255,0,0.3)]" })}>
          <Plus className="w-4 h-4 mr-2" /> Post New Request
        </Link>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
          <CardTitle>All Requests</CardTitle>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="pl-8 bg-secondary border-border"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {auctions.map((auction) => (
              <div key={auction.id} className="p-6 hover:bg-secondary/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <Link href={`/auctions/${auction.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-bold text-lg">{auction.title}</h3>
                      </Link>
                      <Badge className={
                        auction.status === "OPEN" ? "bg-primary/20 text-primary border-none" : 
                        auction.status === "IN_PROGRESS" ? "bg-info/20 text-info border-none" : 
                        "bg-secondary text-muted-foreground border-none"
                      }>
                        {auction.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 max-w-3xl">{auction.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                      <span>Posted {auction.created}</span>
                      <span>•</span>
                      <span className="font-medium text-foreground">{auction.bids} Proposals</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3 min-w-[120px]">
                    <div className="font-mono text-lg font-bold text-primary">{auction.budget}</div>
                    <Link href={`/auctions/${auction.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "w-full" })}>
                      View Bids
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
