"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Rocket, UploadCloud } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { auctionApi } from "@/apis/auction.api";
import { useAuth } from "@/contexts/auth.context";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewAuctionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to post a request");
      return;
    }
    
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 7); // Default 7 days from now

    // Parse Budget: e.g. "500 - 1000"
    const budgetStr = (formData.get("budget") as string) || "100 - 500";
    const budgetParts = budgetStr.split("-").map(s => Number(s.trim()));
    const budgetMin = budgetParts[0] || 100;
    const budgetMax = budgetParts[1] || budgetMin;

    const newAuction = {
      title: formData.get("title") as string,
      categoryId: 1, // Defaulting to category 1 for now
      description: formData.get("description") as string,
      budgetMin: budgetMin,
      budgetMax: budgetMax,
      deadline: deadlineDate.toISOString(),
      skills: (formData.get("skills") as string).split(",").map(s => s.trim()).filter(Boolean),
      preferredTechStack: [],
    };
    
    try {
      await auctionApi.createAuction(newAuction);
      toast.success("Your request has been posted successfully! Sellers can now bid on it.");
      router.push("/auctions");
    } catch (err: any) {
      toast.error(err.message || "Failed to create auction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/buyer" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Post a Custom Request</h1>
          <p className="text-muted-foreground">Describe what you need built and let sellers bid on your project.</p>
        </div>
      </div>

      <Card className="bg-card border-border shadow-xl">
        <CardHeader className="bg-secondary/30 border-b border-border pb-6">
          <CardTitle className="text-xl flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" /> Request Details
          </CardTitle>
          <CardDescription>
            Be as specific as possible to get accurate bids from top Vibe Coders.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Project Title *</label>
              <Input name="title" required placeholder="e.g. Custom LangChain Agent for processing PDFs" className="h-12 bg-secondary/50 border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Detailed Description *</label>
              <Textarea name="description" required placeholder="Describe the features, tech stack, and any specific requirements..." className="min-h-[150px] bg-secondary/50 border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Estimated Budget ($) *</label>
                <Input name="budget" required type="text" placeholder="e.g. 500 - 1000" className="h-12 bg-secondary/50 border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Expected Timeline *</label>
                <Input name="timeline" required type="text" placeholder="e.g. 2 weeks" className="h-12 bg-secondary/50 border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Required Skills (Comma separated)</label>
              <Input name="skills" placeholder="e.g. Next.js, Python, Supabase" className="h-12 bg-secondary/50 border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Attachments (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-secondary/20 hover:bg-secondary/40 hover:border-primary/50 transition-all cursor-pointer group">
                <UploadCloud className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium group-hover:text-primary transition-colors">Click to upload files or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, ZIP up to 10MB</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <Link href="/dashboard/buyer" className={buttonVariants({ variant: "outline", className: "h-12 px-6" })}>
                Cancel
              </Link>
              <Button type="submit" disabled={isSubmitting} className="h-12 px-8 font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
                {isSubmitting ? "Posting..." : "Post Request"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
