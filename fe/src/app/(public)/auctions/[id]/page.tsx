"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Clock, Hammer, ShieldCheck, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { auctionApi } from "@/apis/auction.api";
import { useAuth } from "@/contexts/auth.context";

export default function AuctionDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [auction, setAuction] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBidding, setIsBidding] = useState(false);
  const [isAccepting, setIsAccepting] = useState<number | null>(null);

  const fetchAuctionAndBids = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const auctionRes = await auctionApi.getAuctionById(id as string).catch(() => auctionApi.getAuctionBySlug(id as string));
      setAuction(auctionRes);

      const bidsRes = await auctionApi.getBidsForAuction(auctionRes.id);
      setBids(bidsRes);
      
    } catch (err) {
      toast.error("Failed to load auction details.");
      router.push("/auctions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctionAndBids();
  }, [id]);

  const handlePlaceBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to place a bid.");
      return;
    }
    
    setIsBidding(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newBid = {
      auctionId: auction.id,
      price: Number(formData.get("price")),
      deliveryDays: Number(formData.get("deliveryDays")),
      coverLetter: formData.get("coverLetter") as string,
    };

    try {
      await auctionApi.placeBid(newBid);
      toast.success("Your bid has been submitted successfully!");
      form.reset();
      fetchAuctionAndBids();
    } catch (err: any) {
      toast.error(err.message || "Failed to place bid.");
    } finally {
      setIsBidding(false);
    }
  };

  const handleAcceptBid = async (bidId: number) => {
    if (!user) return;
    setIsAccepting(bidId);
    try {
      await auctionApi.acceptBid(bidId);
      toast.success("Bid accepted successfully!");
      fetchAuctionAndBids();
      // Optional: router.push(`/checkout/${bidId}`)
    } catch (err: any) {
      toast.error(err.message || "Failed to accept bid.");
    } finally {
      setIsAccepting(null);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Loading...</div>;
  }

  if (!auction) {
    return <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">Auction not found.</div>;
  }

  const isBuyer = user?.username === auction.buyerUsername;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/auctions" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Auctions
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Request Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline" className="text-muted-foreground border-border bg-secondary">
                {auction.categoryName}
              </Badge>
              <Badge className={auction.status === "OPEN" ? "bg-primary/20 text-primary border-none" : "bg-info/20 text-info border-none"}>
                {auction.status}
              </Badge>
              <span className="text-sm text-muted-foreground ml-2">
                Posted on {new Date(auction.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">{auction.title}</h1>
            
            <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground mb-8 whitespace-pre-wrap font-sans text-[15px]">
              {auction.description}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {auction.skills?.map((s: string) => <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>)}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Preferred Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {auction.preferredTechStack?.map((s: string) => <Badge key={s} variant="outline" className="font-normal border-border">{s}</Badge>)}
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Info Card */}
          <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-border">
                <AvatarImage src={auction.buyerAvatarUrl || `https://i.pravatar.cc/150?u=${auction.buyerId}`} />
                <AvatarFallback>{auction.buyerUsername?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-heading font-semibold text-lg">{auction.buyerUsername}</h4>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>5.0 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Bid Panel */}
        <div className="space-y-6">
          <Card className="border-border bg-card sticky top-24">
            <CardContent className="p-6">
              <div className="flex justify-between items-start pb-6 border-b border-border mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">Budget</div>
                  <div className="font-mono text-2xl font-bold text-primary">
                    ${auction.budgetMin} - ${auction.budgetMax}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-4 h-4" /> Deadline</div>
                  <div className="font-medium text-foreground">{new Date(auction.deadline).toLocaleDateString()}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Users className="w-4 h-4" /> Total Bids</div>
                  <div className="font-medium text-foreground">{bids.length}</div>
                </div>
              </div>

              {!isBuyer && auction.status === "OPEN" && (
                <div className="bg-secondary/50 rounded-lg p-5 border border-border">
                  <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                    <Hammer className="w-4 h-4 text-primary" /> Place Your Bid
                  </h3>
                  <form className="space-y-4" onSubmit={handlePlaceBid}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground font-medium">Proposed Price ($)</label>
                        <Input name="price" type="number" required placeholder="e.g. 400" className="bg-background border-border font-mono" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground font-medium">Delivery (Days)</label>
                        <Input name="deliveryDays" type="number" required placeholder="e.g. 5" className="bg-background border-border" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground font-medium">Cover Letter</label>
                      <Textarea name="coverLetter" required placeholder="Explain why you're the best fit..." className="bg-background border-border min-h-[100px] resize-y" />
                    </div>
                    <Button type="submit" disabled={isBidding} className="w-full font-semibold">
                      {isBidding ? "Submitting..." : "Submit Bid"}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Existing Bids */}
      <div className="mt-16 pt-8 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-heading font-bold">Existing Bids ({bids.length})</h2>
        </div>

        {bids.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No bids placed yet. Be the first!</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {bids.map((bid) => (
              <div key={bid.id} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                {bid.status === "ACCEPTED" && (
                  <div className="absolute top-0 right-0 bg-success text-success-foreground px-4 py-1 text-xs font-bold rounded-bl-lg">
                    ACCEPTED
                  </div>
                )}
                
                <div className="md:w-64 shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10 border border-border">
                      <AvatarImage src={bid.bidderAvatarUrl || `https://i.pravatar.cc/150?u=${bid.bidderId}`} />
                      <AvatarFallback>{bid.bidderUsername?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-heading font-semibold flex items-center gap-1 hover:text-primary transition-colors">
                        {bid.bidderUsername}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(bid.createdAt).toLocaleString()}</div>
                </div>
                
                <div className="flex-1">
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4">&quot;{bid.coverLetter}&quot;</p>
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Proposed Price</div>
                      <div className="font-mono font-bold text-primary">${bid.price}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Delivery Time</div>
                      <div className="font-medium text-foreground">{bid.deliveryDays} Days</div>
                    </div>
                  </div>
                  
                  {isBuyer && auction.status === "OPEN" && bid.status === "PENDING" && (
                    <div className="mt-4 pt-4 border-t border-border flex justify-end">
                      <Button 
                        onClick={() => handleAcceptBid(bid.id)}
                        disabled={isAccepting === bid.id}
                        className="bg-primary text-primary-foreground font-bold"
                      >
                        {isAccepting === bid.id ? "Accepting..." : "Accept Bid & Lock Escrow"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
