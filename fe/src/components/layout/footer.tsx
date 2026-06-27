import Link from "next/link";
import { MessageSquare, Bot, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-heading font-black mb-4">DEVORA</h2>
            <p className="text-sm text-muted-foreground mb-6">
              The premier marketplace for vibe coders. Buy and sell AI agents, mini apps, and automation scripts.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <MessageSquare className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Globe className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Bot className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-bold mb-4">Marketplace</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Browse Products</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Auctions Job Board</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">AI Agents</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Prompt Templates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4">For Sellers</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Start Selling</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Seller Guide</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Payment & Fees</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Dispute Resolution</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground border-t border-border pt-8">
          Copyright © 2026 DEVORA Marketplace. All Rights Reserved. UI on devora platform.
        </div>
      </div>
    </footer>
  );
}
