"use client";

import Link from "next/link";
import { ArrowRight, Bot, Code2, Database, LayoutTemplate, MessageSquare, Rocket, ShoppingCart, Workflow, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/marketplace/product-card";
import { SellerCard } from "@/components/marketplace/seller-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/language.context";

const CATEGORIES = [
  { name: "AI Agents", icon: Bot, count: "1.2k" },
  { name: "Mini Apps", icon: LayoutTemplate, count: "840" },
  { name: "Automation Scripts", icon: Workflow, count: "2.1k" },
  { name: "Prompt Templates", icon: MessageSquare, count: "3.5k" },
  { name: "Chatbots", icon: MessageSquare, count: "950" },
  { name: "Data Tools", icon: Database, count: "420" },
  { name: "Marketing Tools", icon: Rocket, count: "630" },
  { name: "E-commerce Tools", icon: ShoppingCart, count: "510" },
];

const FEATURED_PRODUCTS = [
  {
    id: "1",
    slug: "customer-support-agent",
    title: "Autonomous Customer Support AI Agent with Zendesk Integration",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
    price: 149.00,
    rating: 4.9,
    salesCount: 342,
    productType: "AI Agent",
    techStack: ["Python", "LangChain", "OpenAI"],
    seller: { username: "NeuralNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", isVerified: true }
  },
  {
    id: "2",
    slug: "notion-habit-tracker",
    title: "Advanced Notion Habit Tracker + Data Visualization Mini App",
    coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600",
    price: 29.99,
    rating: 4.7,
    salesCount: 1205,
    productType: "Mini App",
    techStack: ["Next.js", "Tailwind", "Notion API"],
    seller: { username: "vibe_creator", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e", isVerified: false }
  },
  {
    id: "3",
    slug: "x-auto-poster",
    title: "Twitter/X Viral Auto-Poster Script with Sentiment Analysis",
    coverImage: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=600",
    price: 59.00,
    rating: 4.8,
    salesCount: 89,
    productType: "Automation Script",
    techStack: ["Node.js", "Puppeteer", "VADER"],
    seller: { username: "ScriptKiddiePro", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f", isVerified: true }
  },
  {
    id: "4",
    slug: "seo-blog-writer",
    title: "Ultimate SEO Blog Writer Prompt Template pack (100+ Prompts)",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600",
    price: 15.00,
    rating: 4.6,
    salesCount: 2341,
    productType: "Prompt Template",
    techStack: ["ChatGPT", "Claude", "Gemini"],
    seller: { username: "PromptMaster", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g", isVerified: true }
  },
  {
    id: "5",
    slug: "discord-moderator",
    title: "Discord Community Moderator Bot with Anti-Spam & Leveling",
    coverImage: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=600",
    price: 45.00,
    rating: 4.9,
    salesCount: 672,
    productType: "Chatbot",
    techStack: ["Discord.js", "MongoDB", "Express"],
    seller: { username: "BotSmith", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h", isVerified: false }
  },
  {
    id: "6",
    slug: "crypto-arbitrage",
    title: "Crypto Arbitrage High-Frequency Trading Bot",
    coverImage: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=600",
    price: 499.00,
    rating: 4.5,
    salesCount: 42,
    productType: "Data Tool",
    techStack: ["Go", "Redis", "Docker"],
    seller: { username: "QuantVibes", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704i", isVerified: true }
  }
];

const TRENDING_SELLERS = [
  { username: "NeuralNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", bio: "Full-stack AI developer specializing in LangChain and autonomous agents.", rating: 4.9, salesCount: 1240, isVerified: true, skills: ["Python", "OpenAI", "React"] },
  { username: "ScriptKiddiePro", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f", bio: "Automation expert creating time-saving scripts for digital marketers.", rating: 4.8, salesCount: 892, isVerified: true, skills: ["Node.js", "Puppeteer", "AWS"] },
  { username: "PromptMaster", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g", bio: "Prompt engineering consultant for Fortune 500s. I build systems that work.", rating: 4.7, salesCount: 5621, isVerified: true, skills: ["Prompt Engineering", "ChatGPT", "Claude"] },
];

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-10 left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-40 right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-sm text-muted-foreground mb-8">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                {t("hero.badge")}
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-6 leading-[1.1] uppercase">
                {t("hero.title1")}<br />
                {t("hero.title2")} <span className="text-primary">{t("hero.title_highlight")}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                {t("hero.desc")}
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-foreground text-background hover:bg-foreground/90 rounded-sm">
                  {t("hero.btn_browse")}
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold bg-secondary/20 hover:bg-secondary/40 rounded-sm">
                  {t("hero.btn_post")}
                </Button>
              </div>
            </div>

            {/* Right Abstract Cards */}
            <div className="flex-1 relative w-full h-[500px] hidden md:block">
              {/* Decorative shapes resembling the mockup */}
              <div className="absolute top-0 right-10 w-[400px] h-[200px] bg-secondary/80 backdrop-blur rounded-3xl border border-border/50 shadow-2xl z-20 flex items-center justify-center">
                 <div className="text-center">
                   <div className="text-4xl font-mono font-bold text-foreground mb-2">12,482</div>
                   <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("hero.stats.products")}</div>
                 </div>
              </div>
              <div className="absolute top-[220px] right-10 w-[400px] h-[200px] bg-secondary/90 backdrop-blur rounded-3xl border border-border/50 shadow-2xl z-30 flex items-center justify-center">
                 <div className="text-center">
                   <div className="text-4xl font-mono font-bold text-foreground mb-2">$8.4M+</div>
                   <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("hero.stats.transactions")}</div>
                 </div>
              </div>
              <div className="absolute top-[-20px] right-[-20px] w-[460px] h-[480px] bg-card/40 backdrop-blur rounded-3xl border border-border/20 z-10"></div>
              
              {/* Floating squares */}
              <div className="absolute top-[-10px] left-[40px] w-12 h-12 bg-primary/40 rounded-lg blur-sm"></div>
              <div className="absolute top-[180px] right-[-40px] w-16 h-16 bg-primary/30 rounded-lg blur-md"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="border-y border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href={`/marketplace?category=${category.name.toLowerCase().replace(" ", "-")}`}>
                  <div className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all group flex flex-col items-center text-center gap-3">
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{category.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
            <h2 className="text-2xl font-heading font-bold uppercase tracking-wider relative">
              FEATURED PRODUCTS
              <span className="absolute -bottom-[17px] left-0 w-full h-1 bg-foreground"></span>
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-transparent hover:bg-secondary w-10 h-10">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-transparent hover:bg-secondary w-10 h-10">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Masonry-style Grid Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {FEATURED_PRODUCTS.map((prod, i) => (
              <div key={prod.id} className={`flex flex-col ${i % 2 !== 0 ? 'lg:mt-16' : ''}`}>
                 <ProductCard {...prod} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Devora Works */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-2xl font-heading font-bold uppercase tracking-wider mb-12 border-b border-border pb-4 inline-block relative">
          HOW DEVORA WORK
          <span className="absolute -bottom-[1px] left-0 w-full h-1 bg-foreground"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Marketplace Flow */}
          <div className="bg-secondary/20 border border-border/50 rounded-2xl p-8 flex flex-col gap-2">
             <div className="bg-[#D9D9D9] text-black font-bold uppercase p-4 rounded-t-lg flex items-center justify-between">
                <span>1. BROWSE & DISCOVER</span>
                <ShoppingCart className="w-5 h-5" />
             </div>
             <div className="bg-[#4D4D4D] text-white font-bold uppercase p-4 flex items-center justify-between">
                <span>2. PURCHASE & ESCROW</span>
             </div>
             <div className="bg-[#D9D9D9] text-black font-bold uppercase p-4 flex items-center justify-between">
                <span>3. DOWNLOAD & DEPLOY</span>
             </div>
             <div className="bg-[#D9D9D9] text-black p-6 rounded-b-lg flex flex-col gap-4 h-[250px] relative">
                <p className="text-sm font-medium w-1/2">SEARCH THOUSANDS OF AI AGENTS, SCRIPTS, AND TEMPLATES. BUY SECURELY. GET INSTANT ACCESS TO SOURCE CODE AND DOCUMENTATION.</p>
                <div className="absolute bottom-6 right-6 w-1/2 h-[150px] bg-[#8C8C8C] rounded-lg flex items-center justify-center">
                   <LayoutTemplate className="w-12 h-12 text-white/50" />
                </div>
             </div>
          </div>

          {/* Reverse Auctions Flow */}
          <div className="bg-secondary/20 border border-border/50 rounded-2xl p-8 flex flex-col gap-2">
             <div className="bg-[#D9D9D9] text-black font-bold uppercase p-4 rounded-t-lg flex items-center justify-between">
                <span>1. POST REQUIREMENTS</span>
                <Code2 className="w-5 h-5" />
             </div>
             <div className="bg-[#4D4D4D] text-white font-bold uppercase p-4 flex items-center justify-between">
                <span>2. RECEIVE BIDS</span>
             </div>
             <div className="bg-[#D9D9D9] text-black font-bold uppercase p-4 flex items-center justify-between">
                <span>3. SELECT & ESCROW</span>
             </div>
             <div className="bg-[#D9D9D9] text-black p-6 rounded-b-lg flex flex-col gap-4 h-[250px] relative">
                <p className="text-sm font-medium w-1/2">DESCRIBE WHAT YOU NEED BUILT. VERIFIED VIBE CODERS BID TO BUILD YOUR SOLUTION. CHOOSE THE BEST BID AND FUNDS ARE SECURED UNTIL DELIVERY.</p>
                <div className="absolute bottom-6 right-6 w-1/2 h-[150px] bg-[#8C8C8C] rounded-lg flex items-center justify-center">
                   <Workflow className="w-12 h-12 text-white/50" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trending Sellers (Reviews Layout) */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
           <h2 className="text-2xl font-heading font-bold uppercase tracking-wider relative">
              TRENDING SELLERS
              <span className="absolute -bottom-[17px] left-0 w-full h-1 bg-foreground"></span>
           </h2>
        </div>

        <div className="bg-secondary/20 p-8 py-16 relative w-full overflow-hidden flex items-center justify-center rounded-xl">
           {/* Line behind cards */}
           <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[100px] bg-secondary border-y border-border/50 z-0"></div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full max-w-6xl">
             {TRENDING_SELLERS.map((seller) => (
               <div key={seller.username} className="bg-card border border-border p-6 rounded-lg shadow-xl min-h-[160px] flex flex-col gap-4 relative hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                     <Avatar className="w-10 h-10 border-2 border-primary/20">
                        <AvatarImage src={seller.avatar} />
                        <AvatarFallback>{seller.username.slice(0, 2)}</AvatarFallback>
                     </Avatar>
                     <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{seller.username}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                           <Star className="w-3 h-3 fill-primary text-primary" />
                           {seller.rating} • {seller.salesCount} sales
                        </div>
                     </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &quot;{seller.bio}&quot;
                  </p>
                  <div className="absolute top-6 right-6 w-2 h-2 bg-primary rounded-full"></div>
               </div>
             ))}
           </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
           <div className="w-6 h-2 bg-foreground rounded-full"></div>
           <div className="w-2 h-2 bg-muted rounded-full"></div>
           <div className="w-2 h-2 bg-muted rounded-full"></div>
           <ChevronLeft className="w-4 h-4 text-muted mx-2 cursor-pointer" />
           <ChevronRight className="w-4 h-4 text-foreground cursor-pointer" />
        </div>
      </section>

    </div>
  );
}
