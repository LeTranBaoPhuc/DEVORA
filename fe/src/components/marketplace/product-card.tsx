import Link from "next/link";
import { Star, Download, ExternalLink, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  price: number;
  rating: number;
  salesCount: number;
  productType: string;
  techStack: string[];
  seller: {
    username: string;
    avatar: string;
    isVerified: boolean;
  };
  layout?: "grid" | "list";
}

export function ProductCard({
  slug,
  title,
  coverImage,
  price,
  rating,
  salesCount,
  productType,
  techStack,
  seller,
  layout = "grid",
}: ProductCardProps) {
  if (layout === "list") {
    return (
      <Card className="bg-transparent border-none shadow-none flex flex-col sm:flex-row group gap-6">
        <div className="w-full sm:w-72 h-48 sm:h-auto bg-secondary relative overflow-hidden shrink-0 rounded-xl">
          <Link href={`/marketplace/${slug}`}>
            <img src={coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </Link>
          <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur text-foreground border-none shadow-sm">
            {productType}
          </Badge>
        </div>
        <div className="flex-1 flex flex-col py-2">
          <div className="flex justify-between items-start gap-4">
            <div>
              <Link href={`/marketplace/${slug}`}>
                <h3 className="font-heading font-bold text-xl text-foreground hover:text-primary transition-colors line-clamp-1">
                  {title}
                </h3>
              </Link>
              <div className="flex items-center gap-3 mt-3">
                <Avatar className="w-7 h-7 border-2 border-transparent group-hover:border-primary transition-colors">
                  <AvatarImage src={seller.avatar} />
                  <AvatarFallback>{seller.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <Link href={`/profile/${seller.username}`} className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
                  {seller.username}
                  {seller.isVerified && <ShieldCheck className="w-4 h-4 text-success" />}
                </Link>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-2xl font-bold text-foreground">${price.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs bg-secondary/50 text-muted-foreground border-none font-medium hover:bg-secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-5 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-foreground">{rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4" />
                <span>{salesCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="group flex flex-col h-full">
      <div className="aspect-[4/3] w-full bg-secondary relative overflow-hidden rounded-xl shrink-0">
        <Link href={`/marketplace/${slug}`}>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
          <img src={coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
        <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur text-foreground border-none shadow-sm z-20 font-medium">
          {productType}
        </Badge>
        {/* Optional quick action button on hover could go here */}
      </div>
      
      <div className="pt-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1 gap-3">
          <Link href={`/marketplace/${slug}`} className="flex-1">
            <h3 className="font-heading font-bold text-base text-foreground hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <div className="font-mono text-base font-bold text-foreground">${price.toFixed(2)}</div>
        </div>
        
        <div className="flex items-center justify-between mt-1 mb-3">
          <Link href={`/profile/${seller.username}`} className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 truncate">
            {seller.username}
            {seller.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-success" />}
          </Link>
          
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-foreground">{rating.toFixed(1)}</span>
            <span className="mx-1">•</span>
            <Download className="w-3.5 h-3.5" />
            <span>{salesCount}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {techStack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-[10px] px-2 py-0.5 h-5 bg-secondary/50 text-muted-foreground border-none font-medium hover:bg-secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
