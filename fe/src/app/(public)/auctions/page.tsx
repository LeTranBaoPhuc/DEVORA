"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { AuctionCard, AuctionCardProps } from "@/components/marketplace/auction-card";
import { auctionApi } from "@/apis/auction.api";
import { useAuth } from "@/contexts/auth.context";
export default function AuctionsPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<AuctionCardProps[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const fetchAuctions = async (currentPage = 1, append = false) => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        size: 9, // user asked for 9 max per page
      };
      if (category !== "all") params.categories = [category];
      if (status !== "all") params.status = status;
      if (minBudget) params.minBudget = Number(minBudget);
      if (maxBudget) params.maxBudget = Number(maxBudget);

      const res = await auctionApi.getAuctions(params);
      const data = res.data || [];
      
      const formatted = data.map((a: any) => ({
        id: String(a.id),
        title: a.title,
        category: a.categoryName,
        budgetMin: a.budgetMin,
        budgetMax: a.budgetMax,
        deadline: new Date(a.deadline).toLocaleDateString(),
        bidCount: a.bidsCount || 0,
        createdAt: a.createdAt,
        buyer: {
          username: a.buyerUsername,
          avatar: a.buyerAvatarUrl || `https://i.pravatar.cc/150?u=${a.buyerId}`
        },
        skills: a.skills || [],
        status: a.status
      }));

      if (append) {
        setAuctions(prev => [...prev, ...formatted]);
      } else {
        setAuctions(formatted);
      }
      
      setTotalPages(res.totalPages || 1);
      setTotalItems(res.totalItems || 0);
      setPage(res.page || 1);
    } catch (error) {
      toast.error("Failed to load auctions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions(1, false);
  }, [category, status, minBudget, maxBudget]);

  const loadMore = () => {
    if (page < totalPages) {
      fetchAuctions(page + 1, true);
    }
  };

  const handleClearAll = () => {
    setCategory("all");
    setStatus("all");
    setMinBudget("");
    setMaxBudget("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to post a request");
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 7); // Default 7 days from now

    const newAuction = {
      title: formData.get("title") as string,
      categoryId: 1, // Defaulting to category 1 for now, in real app should match the select
      description: formData.get("description") as string,
      budgetMin: Number(formData.get("budgetMin")) || 100,
      budgetMax: Number(formData.get("budgetMax")) || 500,
      deadline: deadlineDate.toISOString(),
      skills: (formData.get("skills") as string).split(",").map(s => s.trim()).filter(Boolean),
      preferredTechStack: [],
    };
    
    try {
      await auctionApi.createAuction(newAuction);
      toast.success("Your request has been posted successfully!");
      setOpen(false);
      fetchAuctions(1, false); // Reload first page
    } catch (err: any) {
      toast.error(err.message || "Failed to create auction");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-4 tracking-tighter">Job Board & Requests</h1>
          <p className="text-muted-foreground text-xl max-w-2xl">
            Find your next project. Browse requests from buyers and place your bid to win the job. Escrow guarantees safe payment.
          </p>
        </div>
        <div className="shrink-0">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button size="lg" className="w-full md:w-auto text-primary-foreground font-bold h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all" />}>
              <Plus className="w-5 h-5 mr-2" /> Post a Request
            </SheetTrigger>
            <SheetContent className="overflow-y-auto sm:max-w-xl">
              <SheetHeader>
                <SheetTitle>Post a New Request</SheetTitle>
                <SheetDescription>
                  Describe what you need built. Verified developers will review your request and place their bids.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Project Title</label>
                  <Input id="title" name="title" placeholder="e.g. Need a fullstack e-commerce app..." required className="bg-background border-border" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea id="description" name="description" placeholder="Describe the project requirements in detail..." required className="min-h-[120px] bg-background border-border" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="budgetMin" className="text-sm font-medium">Min Budget ($)</label>
                    <Input id="budgetMin" name="budgetMin" type="number" placeholder="100" required className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budgetMax" className="text-sm font-medium">Max Budget ($)</label>
                    <Input id="budgetMax" name="budgetMax" type="number" placeholder="500" required className="bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Select name="category" defaultValue="Web Apps">
                    <SelectTrigger className="w-full bg-background border-border">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Apps">Web Apps</SelectItem>
                      <SelectItem value="Mobile Apps">Mobile Apps</SelectItem>
                      <SelectItem value="AI Agents">AI Agents</SelectItem>
                      <SelectItem value="Automation Scripts">Automation Scripts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="skills" className="text-sm font-medium">Required Skills (comma separated)</label>
                  <Input id="skills" name="skills" placeholder="e.g. React, Node.js, Stripe" required className="bg-background border-border" />
                </div>

                <SheetFooter className="mt-8 pt-4 border-t border-border">
                  <SheetClose render={<Button variant="outline" type="button" />}>
                    Cancel
                  </SheetClose>
                  <Button type="submit">Post Request</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border p-4 rounded-xl flex flex-wrap items-center gap-4 mb-8 sticky top-20 z-40 shadow-sm">
        <div className="flex-1 min-w-[200px]">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-secondary border-border">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="ai-agents">AI Agents</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 flex-1 min-w-[250px]">
          <Input type="number" placeholder="Min $" className="bg-secondary border-border" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} />
          <span className="text-muted-foreground">-</span>
          <Input type="number" placeholder="Max $" className="bg-secondary border-border" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} />
        </div>

        <div className="flex-1 min-w-[150px]">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full bg-secondary border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(category !== "all" || status !== "all" || minBudget !== "" || maxBudget !== "") && (
          <Button variant="default" onClick={handleClearAll} className="px-6 font-bold">
            Clear All
          </Button>
        )}
      </div>

      {/* Auction List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold">Latest Requests</h2>
          <span className="text-sm text-muted-foreground">Showing {auctions.length} of {totalItems} results</span>
        </div>
        
        {loading && auctions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : auctions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
            No requests found matching your filters.
          </div>
        ) : (
          <div className="grid gap-4">
            {auctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>
        )}
        
        {page < totalPages && (
          <div className="pt-8 flex justify-center">
            <Button onClick={loadMore} disabled={loading} variant="outline" className="w-full max-w-sm">
              {loading ? "Loading..." : "Load More Requests"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
