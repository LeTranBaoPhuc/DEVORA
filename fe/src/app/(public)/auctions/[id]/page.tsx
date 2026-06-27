"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Clock, Hammer, ShieldCheck, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AUCTION = {
  id: "a1",
  title: "Need a custom Discord bot that bridges our Patreon API to assign roles",
  description: `We run a large Discord community for vibe coders and we use Patreon for memberships. We need a Discord bot that can:
  
1. Connect to our Patreon API.
2. Automatically assign Discord roles based on active Patreon tiers.
3. Remove roles if a pledge is cancelled or declined.
4. Provide a command for users to manually link/sync their accounts if they joined Discord late.

We need this built in Node.js using Discord.js. It needs to be well-documented so we can host it ourselves on a VPS.`,
  category: "Chatbots",
  budgetMin: 300,
  budgetMax: 500,
  deadline: "2 days left",
  createdAt: "Oct 20, 2025",
  bidCount: 8,
  buyer: { 
    username: "CommunityManager99", 
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026701a",
    rating: 4.8,
    joinDate: "Mar 2023",
    totalSpent: "$2,450"
  },
  skills: ["Discord.js", "Patreon API", "Node.js", "MongoDB"],
  preferredTechStack: ["TypeScript", "Docker"],
  status: "OPEN" as const
};

const BIDS = [
  {
    id: "b1",
    bidder: { username: "BotSmith", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h", rating: 4.9, isVerified: true },
    price: 350,
    deliveryDays: 5,
    coverLetter: "I have built over 20 Discord bots, including 3 that specifically integrate with Patreon. I can use TypeScript and provide a Dockerfile for easy VPS deployment.",
    timestamp: "2 hours ago"
  },
  {
    id: "b2",
    bidder: { username: "NodeNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705h", rating: 4.5, isVerified: false },
    price: 450,
    deliveryDays: 3,
    coverLetter: "I can deliver this very quickly. I'll use MongoDB to cache the linked accounts to avoid hitting Patreon rate limits.",
    timestamp: "5 hours ago"
  },
  {
    id: "b3",
    bidder: { username: "CodeVibe", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706h", rating: 4.7, isVerified: true },
    price: 300,
    deliveryDays: 7,
    coverLetter: "I'll build exactly what you need. My code is fully documented. I've read the Patreon API docs and have a plan for the webhook integration.",
    timestamp: "1 day ago"
  }
];

export default function AuctionDetailPage() {
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
                {AUCTION.category}
              </Badge>
              <Badge className="bg-primary/20 text-primary border-none">OPEN</Badge>
              <span className="text-sm text-muted-foreground ml-2">Posted on {AUCTION.createdAt}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">{AUCTION.title}</h1>
            
            <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground mb-8 whitespace-pre-wrap font-sans text-[15px]">
              {AUCTION.description}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {AUCTION.skills.map(s => <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>)}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Preferred Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {AUCTION.preferredTechStack.map(s => <Badge key={s} variant="outline" className="font-normal border-border">{s}</Badge>)}
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Info Card */}
          <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-border">
                <AvatarImage src={AUCTION.buyer.avatar} />
                <AvatarFallback>{AUCTION.buyer.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-heading font-semibold text-lg">{AUCTION.buyer.username}</h4>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{AUCTION.buyer.rating} Rating</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-border"></div>
                  <div>Member since {AUCTION.buyer.joinDate}</div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-sm text-muted-foreground mb-1">Total Spent</div>
              <div className="font-mono font-bold text-foreground">{AUCTION.buyer.totalSpent}</div>
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
                    ${AUCTION.budgetMin} - ${AUCTION.budgetMax}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-4 h-4" /> Deadline</div>
                  <div className="font-medium text-foreground">{AUCTION.deadline}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Users className="w-4 h-4" /> Total Bids</div>
                  <div className="font-medium text-foreground">{AUCTION.bidCount}</div>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-5 border border-border">
                <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                  <Hammer className="w-4 h-4 text-primary" /> Place Your Bid
                </h3>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Your bid has been submitted successfully!");
                }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground font-medium">Proposed Price ($)</label>
                      <Input type="number" placeholder="e.g. 400" className="bg-background border-border font-mono" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground font-medium">Delivery (Days)</label>
                      <Input type="number" placeholder="e.g. 5" className="bg-background border-border" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground font-medium">Cover Letter</label>
                    <Textarea placeholder="Explain why you're the best fit..." className="bg-background border-border min-h-[100px] resize-y" />
                  </div>
                  <Button className="w-full font-semibold">Submit Bid</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Existing Bids */}
      <div className="mt-16 pt-8 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-heading font-bold">Existing Bids ({AUCTION.bidCount})</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {BIDS.map((bid) => (
            <div key={bid.id} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6">
              <div className="md:w-64 shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarImage src={bid.bidder.avatar} />
                    <AvatarFallback>{bid.bidder.username.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/profile/${bid.bidder.username}`} className="font-heading font-semibold flex items-center gap-1 hover:text-primary transition-colors">
                      {bid.bidder.username}
                      {bid.bidder.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-success" />}
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{bid.bidder.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{bid.timestamp}</div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
