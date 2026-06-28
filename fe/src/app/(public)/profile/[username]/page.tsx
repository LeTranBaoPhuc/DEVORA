"use client";

import { Star, ShieldCheck, Calendar, Download, Link as LinkIcon, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/marketplace/product-card";

const PROFILE = {
  fullName: "Alex Rivera",
  username: "NeuralNinja",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  bio: "Full-stack AI developer specializing in LangChain and autonomous agents. Building tools that give developers superpowers.",
  ratingAvg: 4.9,
  totalSales: 1240,
  isVerifiedSeller: true,
  memberSince: "Jan 2024",
  location: "San Francisco, CA",
  website: "https://neuralninja.dev",
  github: "neuralninja",
  twitter: "neural_ninja_dev",
  skills: [
    { name: "Python", level: "Expert" },
    { name: "LangChain", level: "Expert" },
    { name: "React", level: "Advanced" },
    { name: "Node.js", level: "Advanced" },
    { name: "Prompt Engineering", level: "Expert" }
  ]
};

const PRODUCTS = [
  { id: "1", slug: "customer-support-agent", title: "Autonomous Customer Support AI Agent", coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600", price: 149.00, rating: 4.9, salesCount: 342, productType: "AI Agent", techStack: ["Python", "LangChain"], seller: { username: "NeuralNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", isVerified: true } },
  { id: "2", slug: "slack-summarizer", title: "Slack Thread Summarizer Bot", coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600", price: 49.00, rating: 4.8, salesCount: 898, productType: "Chatbot", techStack: ["Node.js", "Slack API"], seller: { username: "NeuralNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", isVerified: true } },
];

const REVIEWS = [
  { id: "r1", buyer: "TechStartupCEO", rating: 5, date: "Oct 12, 2025", comment: "Incredible agent. We deployed it in less than an hour and it handles 60% of our support tickets perfectly.", productTitle: "Autonomous Customer Support AI Agent" },
  { id: "r2", buyer: "DevOpsPro", rating: 5, date: "Sep 28, 2025", comment: "Code quality is top-notch. Very clean Python structure and easy to extend.", productTitle: "Autonomous Customer Support AI Agent" },
  { id: "r3", buyer: "CommunityManager", rating: 4, date: "Sep 15, 2025", comment: "Works exactly as described. Had some minor issues with rate limits but Alex helped fix it quickly.", productTitle: "Slack Thread Summarizer Bot" },
];

export default function UserProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border bg-card overflow-hidden shadow-lg">
            <div className="h-28 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/30 via-primary/5 to-transparent border-b border-border"></div>
            <CardContent className="p-6 pt-0 relative">
              <div className="flex justify-center -mt-14 mb-4">
                <Avatar className="w-28 h-28 border-4 border-card bg-card shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <AvatarImage src={PROFILE.avatar} />
                  <AvatarFallback>{PROFILE.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="text-center mb-6">
                <h1 className="text-2xl font-heading font-bold text-foreground flex items-center justify-center gap-2">
                  {PROFILE.fullName}
                  {PROFILE.isVerifiedSeller && <ShieldCheck className="w-5 h-5 text-primary drop-shadow-[0_0_5px_rgba(204,255,0,0.4)]" />}
                </h1>
                <div className="text-muted-foreground font-mono text-sm">@{PROFILE.username}</div>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm font-medium mb-6">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-foreground">{PROFILE.ratingAvg.toFixed(1)}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border"></div>
                <div className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{PROFILE.totalSales}</span>
                </div>
              </div>

              <Button 
                onClick={() => toast.success(`Opening chat with ${PROFILE.username}...`)}
                className="w-full mb-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Message
              </Button>

              <div className="space-y-4 text-sm">
                <p className="text-muted-foreground leading-relaxed">{PROFILE.bio}</p>
                
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4" /> <span>{PROFILE.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-4 h-4" /> <span>Joined {PROFILE.memberSince}</span>
                  </div>
                  {PROFILE.website && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <LinkIcon className="w-4 h-4" /> 
                      <a href={PROFILE.website} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{new URL(PROFILE.website).hostname}</a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex justify-center gap-4">
                  {PROFILE.github && (
                    <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                  )}
                  {PROFILE.twitter && (
                    <a href={`https://twitter.com/${PROFILE.twitter}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold mb-4 text-primary">Skills</h3>
              <div className="space-y-3">
                {PROFILE.skills.map(skill => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <Badge variant="secondary" className="text-xs font-normal border border-border bg-secondary">
                      {skill.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="products">
            <TabsList className="mb-6 bg-secondary border border-border p-1">
              <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Products ({PRODUCTS.length})</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Reviews ({REVIEWS.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PRODUCTS.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {REVIEWS.map(review => (
                  <Card key={review.id} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border border-border">
                            <AvatarFallback>{review.buyer.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-foreground">{review.buyer}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground/90 leading-relaxed mb-3">&quot;{review.comment}&quot;</p>
                      <div className="text-xs text-muted-foreground border-t border-border pt-3">
                        Purchased: <span className="font-medium text-foreground">{review.productTitle}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
