"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { AuctionCard } from "@/components/marketplace/auction-card";

const INITIAL_AUCTIONS = [
  {
    id: "a1",
    title: "Need a custom Discord bot that bridges our Patreon API to assign roles",
    category: "Chatbots",
    budgetMin: 300,
    budgetMax: 500,
    deadline: "2 days left",
    bidCount: 8,
    buyer: { username: "CommunityManager99", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026701a" },
    skills: ["Discord.js", "Patreon API", "Node.js", "MongoDB"],
    status: "OPEN" as const
  },
  {
    id: "a2",
    title: "Scrape product catalog from competitor website daily into Airtable",
    category: "Automation Scripts",
    budgetMin: 150,
    budgetMax: 250,
    deadline: "5 hrs left",
    bidCount: 14,
    buyer: { username: "EcomHustler", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026702a" },
    skills: ["Python", "BeautifulSoup", "Airtable API"],
    status: "OPEN" as const
  },
  {
    id: "a3",
    title: "AI Agent that can read PDFs and answer questions based on the content via WhatsApp",
    category: "AI Agents",
    budgetMin: 800,
    budgetMax: 1200,
    deadline: "1 week left",
    bidCount: 3,
    buyer: { username: "LegalTechStartup", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703a" },
    skills: ["LangChain", "OpenAI", "Twilio API", "Vector DB"],
    status: "OPEN" as const
  },
  {
    id: "a4",
    title: "Figma plugin to export styles directly to Tailwind v4 theme CSS variables",
    category: "Mini Apps",
    budgetMin: 400,
    budgetMax: 800,
    deadline: "Closed",
    bidCount: 22,
    buyer: { username: "DesignSysLead", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a" },
    skills: ["TypeScript", "Figma Plugin API", "TailwindCSS"],
    status: "IN_PROGRESS" as const
  }
];

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState(INITIAL_AUCTIONS);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAuction = {
      id: `a${Date.now()}`,
      title: formData.get("title") as string,
      category: formData.get("category") as string || "Web Apps",
      budgetMin: Number(formData.get("budgetMin")) || 100,
      budgetMax: Number(formData.get("budgetMax")) || 500,
      deadline: "7 days left",
      bidCount: 0,
      buyer: { username: "You (Mock User)", avatar: "https://github.com/shadcn.png" },
      skills: (formData.get("skills") as string).split(",").map(s => s.trim()).filter(Boolean),
      status: "OPEN" as const
    };
    
    setAuctions([newAuction, ...auctions]);
    toast.success("Your request has been posted successfully!");
    setOpen(false);
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
          <Select defaultValue="all">
            <SelectTrigger className="w-full bg-secondary border-border">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="ai-agents">AI Agents</SelectItem>
              <SelectItem value="mini-apps">Mini Apps</SelectItem>
              <SelectItem value="automation">Automation Scripts</SelectItem>
              <SelectItem value="chatbots">Chatbots</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 flex-1 min-w-[250px]">
          <Input type="number" placeholder="Min $" className="bg-secondary border-border" />
          <span className="text-muted-foreground">-</span>
          <Input type="number" placeholder="Max $" className="bg-secondary border-border" />
        </div>

        <div className="flex-1 min-w-[150px]">
          <Select defaultValue="open">
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

        <div className="flex-1 min-w-[150px]">
          <Select defaultValue="any">
            <SelectTrigger className="w-full bg-secondary border-border">
              <SelectValue placeholder="Deadline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Deadline</SelectItem>
              <SelectItem value="24h">Ending &lt; 24h</SelectItem>
              <SelectItem value="3d">Ending &lt; 3 days</SelectItem>
              <SelectItem value="1w">Ending &lt; 1 week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Auction List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold">Latest Requests</h2>
          <span className="text-sm text-muted-foreground">Showing {auctions.length} results</span>
        </div>
        
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}
        
        <div className="pt-8 flex justify-center">
          <Button onClick={() => toast.info("No more requests to load in mock data.")} variant="outline" className="w-full max-w-sm">Load More Requests</Button>
        </div>
      </div>
    </div>
  );
}
