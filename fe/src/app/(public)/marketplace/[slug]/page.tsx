"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { marketplaceApi } from "@/apis/marketplace.api";
import { Star, Download, Heart, ShieldCheck, Share2, Check, ExternalLink, ShoppingCart, ChevronRight, CheckCircle2, Copy, MessageSquare, Play, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ProductCard } from "@/components/marketplace/product-card";

const PRODUCT = {
  id: "1",
  slug: "ecommerce-mobile-app",
  title: "E-commerce Mobile App Full Source Code",
  description: "A complete, production-ready e-commerce mobile application built with React Native, Firebase, and Stripe. Includes user authentication, product catalog, shopping cart, secure checkout, and order history. Beautiful UI designed for conversion.",
  version: "2.1.4",
  lastUpdated: "Oct 24, 2025",
  compatiblePlatforms: ["iOS", "Android", "Web"],
  demoUrl: "https://example.com",
  images: [
    "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=1200"
  ],
  price: 299.00,
  originalPrice: 499.00,
  rating: 4.9,
  reviewCount: 128,
  salesCount: 342,
  productType: "Mobile App",
  licenseType: "Single Use",
  techStack: ["React Native", "Firebase", "Stripe", "Redux"],
  aiToolsUsed: ["Figma to Code", "GitHub Copilot"],
  aiVerified: true,
  aiQualityScore: 96,
  seller: { 
    username: "AppMaster", 
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", 
    isVerified: true,
    rating: 4.9,
    memberSince: "Jan 2024"
  },
  hasManagedHosting: true,
  hostingPriceMonthly: 49.00,
  hostingPriceYearly: 490.00,
};

const RELATED_PRODUCTS = [
  {
    id: "2", slug: "saas-dashboard-nextjs", title: "Modern SaaS Dashboard", coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", price: 149.99, rating: 4.7, salesCount: 1205, productType: "Web App", techStack: ["Next.js"], seller: { username: "WebNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e", isVerified: false }
  },
  {
    id: "3", slug: "social-media-management", title: "Social Media Platform", coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600", price: 499.00, rating: 4.8, salesCount: 89, productType: "Web App", techStack: ["MERN Stack"], seller: { username: "CodeCrafter", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f", isVerified: true }
  },
  {
    id: "4", slug: "fitness-tracking-app", title: "Fitness Tracking App", coverImage: "https://images.unsplash.com/photo-1526506114642-990520a2e053?auto=format&fit=crop&q=80&w=600", price: 199.00, rating: 4.6, salesCount: 2341, productType: "Mobile App", techStack: ["Flutter"], seller: { username: "FitDevs", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g", isVerified: true }
  },
  {
    id: "5", slug: "real-estate-portal", title: "Real Estate Portal", coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600", price: 345.00, rating: 4.9, salesCount: 672, productType: "Web App", techStack: ["Vue.js"], seller: { username: "PropertyTech", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h", isVerified: false }
  }
];

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [purchaseTier, setPurchaseTier] = useState<"source" | "managed">("source");
  const [hostingBilling, setHostingBilling] = useState<"monthly" | "yearly">("monthly");
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState(PRODUCT);

  useEffect(() => {
    if (slug) {
      marketplaceApi.getProductBySlug(slug)
        .then(res => {
          if (res.data) {
            const apiData = res.data;
            setProduct(prev => ({
              ...prev,
              id: apiData.id,
              slug: apiData.slug,
              title: apiData.title,
              coverImage: apiData.coverImage,
              images: [apiData.coverImage, ...prev.images.slice(1)],
              price: apiData.price,
              rating: apiData.rating,
              salesCount: apiData.salesCount,
              productType: apiData.productType,
              techStack: apiData.techStack,
              seller: {
                ...prev.seller,
                username: apiData.seller.username,
                avatar: apiData.seller.avatar,
                isVerified: apiData.seller.verified
              }
            }));
          }
        })
        .catch(err => {
          console.error("Failed to fetch product:", err);
        });
    }
  }, [slug]);

  const handleBuyNow = () => {
    toast.success("Redirecting to checkout...");
    setTimeout(() => {
      router.push("/checkout/1");
    }, 1000);
  };

  const handleChat = () => {
    router.push("/messages?seller=" + product.seller.username);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/marketplace">Marketplace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/marketplace?category=ai-agents`}>AI Agents</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-[16/9] bg-secondary rounded-xl overflow-hidden border border-border relative group">
            <img src={product.images[activeImage]} alt={product.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Dialog>
                <DialogTrigger render={
                  <Button size="lg" className="rounded-full gap-2 shadow-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-none">
                    <Play className="w-5 h-5 fill-current" /> Live Preview
                  </Button>
                } />
                <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 border-none bg-black overflow-hidden flex flex-col sm:rounded-xl">
                  <div className="h-14 bg-zinc-900 flex items-center justify-between px-6 text-white border-b border-zinc-800 shrink-0">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-zinc-400" />
                      <span className="font-medium text-zinc-100">{product.title} - Live Demo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800" asChild>
                        <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <DialogClose render={
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800">
                          <X className="w-5 h-5" />
                        </Button>
                      } />
                    </div>
                  </div>
                  <div className="flex-1 w-full bg-zinc-950 relative">
                    {/* Skeleton loader for iframe */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 border-4 border-zinc-800 border-t-primary rounded-full animate-spin"></div>
                    </div>
                    <iframe src={product.demoUrl} className="w-full h-full border-none relative z-10 bg-white" allow="fullscreen" />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-foreground border-none shadow-sm font-medium px-3 py-1">
              {product.productType}
            </Badge>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {product.images.map((img, i) => (
              <div 
                key={i} 
                className={`aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${activeImage === i ? 'border-primary' : 'border-border hover:border-border-hover'}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium">Overview</TabsTrigger>
                <TabsTrigger value="demo" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium">Demo</TabsTrigger>
                <TabsTrigger value="docs" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium">Documentation</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium">Reviews ({product.reviewCount})</TabsTrigger>
                <TabsTrigger value="qa" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium">Q&A</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6 space-y-8">
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-4">About this Product</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.techStack.map(t => <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Tools & Libraries</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.aiToolsUsed.map(t => <Badge key={t} variant="outline" className="font-normal border-border">{t}</Badge>)}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">Compatible Platforms</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-foreground">
                    {product.compatiblePlatforms.map(platform => (
                      <li key={platform} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-success" /> {platform}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="demo" className="pt-6 space-y-8">
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-4">Product Demo</h3>
                  <div 
                    onClick={() => toast.info("Video demo is not available in this preview.")}
                    className="aspect-video bg-black/5 rounded-xl overflow-hidden flex flex-col items-center justify-center border border-border text-muted-foreground relative group cursor-pointer hover:bg-black/10 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-primary-foreground border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                    <span>Watch Video Demo</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {product.images.map((img, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          setActiveImage(i);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          toast.success(`Switched to image ${i + 1}`);
                        }}
                        className="aspect-video rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="docs" className="pt-6">
                <p className="text-muted-foreground">Documentation content goes here...</p>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <p className="text-muted-foreground">Reviews content goes here...</p>
              </TabsContent>
              <TabsContent value="qa" className="pt-6">
                <p className="text-muted-foreground">Q&A content goes here...</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Column: Checkout & Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-border bg-card sticky top-24">
            <div className="mb-2 flex flex-wrap gap-2">
              {product.aiVerified && (
                <Badge variant="default" className="bg-primary/20 text-primary border-none flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> AI Verified (Score: {product.aiQualityScore}/100)
                </Badge>
              )}
              <Badge variant="outline" className="border-border text-muted-foreground">
                {product.licenseType}
              </Badge>
            </div>

            <h1 className="text-2xl font-heading font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
                <span>({product.reviewCount})</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border"></div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4" />
                <span className="text-foreground">{product.salesCount}</span> Sales
              </div>
            </div>

            {/* Purchase Options */}
            <div className="mb-6 space-y-3">
              {/* Source Code Only Option */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${purchaseTier === "source" ? "border-primary bg-primary/5" : "border-border hover:border-border-hover bg-background"}`}
                onClick={() => setPurchaseTier("source")}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${purchaseTier === "source" ? "border-primary" : "border-muted-foreground"}`}>
                      {purchaseTier === "source" && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <span className="font-bold">Source Code Only</span>
                  </div>
                  <span className="text-xl font-mono font-bold text-foreground">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-6">One-time payment. Download the code and host it yourself.</p>
              </div>

              {/* Managed Hosting Option */}
              {product.hasManagedHosting && (
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${purchaseTier === "managed" ? "border-primary bg-primary/5" : "border-border hover:border-border-hover bg-background"}`}
                  onClick={() => setPurchaseTier("managed")}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${purchaseTier === "managed" ? "border-primary" : "border-muted-foreground"}`}>
                        {purchaseTier === "managed" && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <span className="font-bold">Managed Setup & Hosting</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6 mb-3">Base price ${product.price.toFixed(2)} + recurring hosting fee. Seller handles setup and server maintenance.</p>
                  
                  {purchaseTier === "managed" && (
                    <div className="pl-6 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg w-fit mb-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setHostingBilling("monthly"); }}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${hostingBilling === "monthly" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                        >
                          Monthly
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setHostingBilling("yearly"); }}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${hostingBilling === "yearly" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                        >
                          Yearly (Save 15%)
                        </button>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-mono font-bold text-primary">
                          ${hostingBilling === "monthly" ? product.hostingPriceMonthly?.toFixed(2) : product.hostingPriceYearly?.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground mb-1">/ {hostingBilling === "monthly" ? "month" : "year"}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button onClick={handleBuyNow} size="lg" className="w-full text-primary-foreground font-semibold h-12 text-base">
                {purchaseTier === "source" ? "Buy Source Code" : "Buy & Subscribe to Hosting"}
              </Button>
              <Button onClick={handleChat} variant="outline" size="lg" className="w-full font-semibold h-12 text-base border border-border hover:border-primary hover:text-primary transition-colors text-foreground bg-transparent">
                Chat to Customize
              </Button>
              <div className="flex gap-3">
                <Button onClick={handleWishlist} variant="outline" className={`flex-1 h-12 bg-transparent border-border hover:border-border-hover ${isWishlisted ? 'text-danger border-danger/50 hover:border-danger' : ''}`}>
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-danger text-danger' : ''}`} /> 
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
                <Button onClick={handleShare} variant="outline" size="icon" className="h-12 w-12 shrink-0 bg-transparent border-border hover:border-border-hover">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Link href={`/profile/${product.seller.username}`}>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Avatar className="w-12 h-12 border border-border">
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>{product.seller.username.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground truncate">{product.seller.username}</span>
                      {product.seller.isVerified && <ShieldCheck className="w-4 h-4 text-success shrink-0" />}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Member since {product.seller.memberSince}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Version</span>
                <span className="text-foreground font-mono">{product.version}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Last Updated</span>
                <span className="text-foreground">{product.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24 pt-12 border-t border-border">
        <h2 className="text-2xl font-heading font-bold mb-8">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RELATED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
