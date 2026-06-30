"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { auctionApi } from "@/apis/auction.api";
import { useAuth } from "@/contexts/auth.context";

export default function BuyerAuctionsPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAuctions = async () => {
      try {
        setLoading(true);
        // We fetch all and filter by current user since there's no dedicated buyer filter in the backend yet
        const res = await auctionApi.getAuctions({ size: 100 });
        const allAuctions = res.data.data;
        const myAuctions = allAuctions.filter((a: any) => a.buyerUsername === user?.username);
        setAuctions(myAuctions);
      } catch (err) {
        console.error("Failed to load auctions", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyAuctions();
    }
  }, [user]);

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
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading your requests...</div>
            ) : auctions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">You haven't posted any requests yet.</div>
            ) : (
              auctions.map((auction) => (
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
                        <span>Posted {new Date(auction.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="font-medium text-foreground">{auction.bidsCount || 0} Proposals</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3 min-w-[120px]">
                      <div className="font-mono text-lg font-bold text-primary">${auction.budgetMin} - ${auction.budgetMax}</div>
                      <Link href={`/auctions/${auction.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "w-full" })}>
                        View Bids
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
