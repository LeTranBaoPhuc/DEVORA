import Link from "next/link";
import { Star, Code2, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface SellerCardProps {
  username: string;
  avatar: string;
  bio: string;
  rating: number;
  salesCount: number;
  isVerified: boolean;
  skills: string[];
}

export function SellerCard({
  username,
  avatar,
  bio,
  rating,
  salesCount,
  isVerified,
  skills,
}: SellerCardProps) {
  return (
    <Card className="bg-card border-border hover:border-border-hover transition-colors group">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Link href={`/profile/${username}`}>
            <div className="relative mb-4 inline-block">
              <Avatar className="w-20 h-20 border-2 border-border group-hover:border-primary transition-colors">
                <AvatarImage src={avatar} />
                <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {isVerified && (
                <div className="absolute bottom-0 right-0 bg-background rounded-full p-0.5">
                  <ShieldCheck className="w-5 h-5 text-success fill-success/20" />
                </div>
              )}
            </div>
          </Link>
          
          <Link href={`/profile/${username}`}>
            <h3 className="font-heading font-semibold text-lg text-foreground hover:text-primary transition-colors">
              {username}
            </h3>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2 min-h-[40px]">
            {bio}
          </p>
          
          <div className="flex items-center gap-4 mt-4 text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-foreground">{rating.toFixed(1)}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border"></div>
            <div className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{salesCount} Sales</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-1.5 mt-5 w-full">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary font-normal text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
