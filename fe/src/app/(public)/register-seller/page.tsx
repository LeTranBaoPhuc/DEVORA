"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Rocket, Code2, Zap } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterSellerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to register as a seller
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Registration successful! Welcome to the Seller Dashboard.");
    router.push("/dashboard/seller");
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden border-b border-primary/20 bg-secondary/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.1)_0,transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6 border border-primary/30 shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter mb-6 uppercase text-primary drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
            Start Selling on Devora
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Join the ultimate marketplace for Vibe Coders. Monetize your AI agents, scripts, and automation tools with zero friction.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Benefits */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold font-heading mb-6">Why Sell With Us?</h2>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Instant Payouts</h3>
                <p className="text-muted-foreground text-sm">Get paid immediately upon delivery using our secure smart contracts or stripe connect.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Global Developer Audience</h3>
                <p className="text-muted-foreground text-sm">Reach thousands of developers and businesses looking for exactly what you build.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Secure & Automated</h3>
                <p className="text-muted-foreground text-sm">We handle the hosting, file delivery, and dispute resolution so you can focus on coding.</p>
              </div>
            </div>
            
            <div className="p-6 bg-secondary rounded-xl border border-border mt-8">
              <p className="text-sm italic text-muted-foreground">"Devora changed my life. I went from doing freelance gigs to selling my custom LangChain templates and making passive income every day."</p>
              <p className="text-sm font-bold mt-2 text-primary">- @NeuralNinja, Top Seller</p>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-2xl font-bold font-heading mb-2">Seller Registration</h2>
            <p className="text-sm text-muted-foreground mb-8">Setup your shop profile. You can edit this later in Settings.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Shop Name / Developer Handle *</label>
                <Input required placeholder="e.g. Acme Codes" className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">GitHub Profile or Portfolio URL *</label>
                <Input required type="url" placeholder="https://github.com/yourusername" className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Short Bio / Shop Description</label>
                <Textarea placeholder="Tell buyers what kind of tools you build..." className="min-h-[100px] bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
              </div>
              
              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-foreground">What will you sell? (Select all that apply)</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2 border border-border p-3 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                    <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground" />
                    <span className="text-sm">AI Agents</span>
                  </label>
                  <label className="flex items-center space-x-2 border border-border p-3 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                    <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground" />
                    <span className="text-sm">Web Templates</span>
                  </label>
                  <label className="flex items-center space-x-2 border border-border p-3 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                    <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground" />
                    <span className="text-sm">Scripts / Bots</span>
                  </label>
                  <label className="flex items-center space-x-2 border border-border p-3 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                    <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground" />
                    <span className="text-sm">UI Components</span>
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-4">
                <Checkbox id="terms" required className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground" />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-snug">
                  I agree to the <a href="#" className="text-primary hover:underline">Seller Terms of Service</a> and confirm that all code uploaded is original or properly licensed.
                </label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-12 font-bold text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all mt-4">
                {isSubmitting ? "Processing Application..." : "Register as Seller"}
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
