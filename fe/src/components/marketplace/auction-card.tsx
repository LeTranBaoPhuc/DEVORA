"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Hammer, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface AuctionCardProps {
  id: string;
  title: string;
  category: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  bidCount: number;
  buyer: {
    username: string;
    avatar: string;
  };
  skills: string[];
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED";
}

export function AuctionCard({
  id,
  title,
  category,
  budgetMin,
  budgetMax,
  deadline,
  bidCount,
  buyer,
  skills,
  status
}: AuctionCardProps) {
  const router = useRouter();

  return (
    <div className="group rounded-2xl border border-border bg-transparent hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 p-6">
      <div className="flex flex-col md:flex-row justify-between gap-8">
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs text-muted-foreground border-border font-normal bg-secondary">
                {category}
              </Badge>
              {status === "OPEN" && (
                <Badge className="bg-primary/20 text-primary border-none hover:bg-primary/30">OPEN</Badge>
              )}
              {status === "IN_PROGRESS" && (
                <Badge className="bg-info/20 text-info border-none hover:bg-info/30">IN PROGRESS</Badge>
              )}
              {status === "COMPLETED" && (
                <Badge className="bg-success/20 text-success border-none hover:bg-success/30">COMPLETED</Badge>
              )}
            </div>
            
            <Link href={`/auctions/${id}`}>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-4">
                {title}
              </h3>
            </Link>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-normal">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6 border border-border">
                <AvatarImage src={buyer.avatar} />
                <AvatarFallback>{buyer.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Link href={`/profile/${buyer.username}`} className="text-sm text-muted-foreground hover:text-foreground">
                Posted by {buyer.username}
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-between min-w-[200px] shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
            <div className="space-y-4 w-full md:text-right">
              <div>
                <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">Budget</div>
                <div className="font-mono text-xl font-bold text-primary">
                  ${budgetMin} - ${budgetMax}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex flex-col md:items-end gap-1">
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Deadline</div>
                  <div className="font-medium text-foreground">{deadline}</div>
                </div>
                <div className="flex flex-col md:items-end gap-1">
                  <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Bids</div>
                  <div className="font-medium text-foreground">{bidCount}</div>
                </div>
              </div>
            </div>

            <Button onClick={() => router.push(`/auctions/${id}`)} className="w-full mt-4" disabled={status !== "OPEN"}>
              <Hammer className="w-4 h-4 mr-2" />
              {status === "OPEN" ? "Place Bid" : "Bidding Closed"}
            </Button>
          </div>
          
      </div>
    </div>
  );
}
