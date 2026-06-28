"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ListPlus, Wallet, Package, Settings, LogOut } from "lucide-react";
import { TopNav } from "@/components/layout/top-nav";
import { LogoutSidebarButton } from "@/components/layout/logout-sidebar-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSellerMode = pathname?.startsWith("/dashboard/seller");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        {/* Dashboard Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
          <div className="p-6">
            {!isSellerMode && (
              <>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Buyer</div>
                <nav className="space-y-1 mb-8">
                  <Link href="/dashboard/buyer" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/dashboard/buyer' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                    <LayoutDashboard className={`w-4 h-4 ${pathname === '/dashboard/buyer' ? 'text-primary' : ''}`} /> Dashboard
                  </Link>
                  <Link href="/dashboard/buyer/orders" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/dashboard/buyer/orders' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                    <ShoppingBag className={`w-4 h-4 ${pathname === '/dashboard/buyer/orders' ? 'text-primary' : ''}`} /> My Orders
                  </Link>
                  <Link href="/dashboard/buyer/auctions" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/dashboard/buyer/auctions' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                    <ListPlus className={`w-4 h-4 ${pathname === '/dashboard/buyer/auctions' ? 'text-primary' : ''}`} /> Auction Requests
                  </Link>
                </nav>
              </>
            )}

            {isSellerMode && (
              <>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Seller</div>
                <nav className="space-y-1 mb-8">
                  <Link href="/dashboard/seller" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/dashboard/seller' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                    <Wallet className={`w-4 h-4 ${pathname === '/dashboard/seller' ? 'text-primary' : ''}`} /> Earnings & Stats
                  </Link>
                  <Link href="/dashboard/seller/products" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname?.startsWith('/dashboard/seller/products') ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                    <Package className={`w-4 h-4 ${pathname?.startsWith('/dashboard/seller/products') ? 'text-primary' : ''}`} /> My Products
                  </Link>
                  <Link href="/dashboard/seller/payouts" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/dashboard/seller/payouts' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                    <Wallet className={`w-4 h-4 ${pathname === '/dashboard/seller/payouts' ? 'text-primary' : ''}`} /> Payouts
                  </Link>
                </nav>
              </>
            )}

            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Settings</div>
            <nav className="space-y-1">
              <Link href="/settings" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/settings' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}`}>
                <Settings className={`w-4 h-4 ${pathname === '/settings' ? 'text-primary' : ''}`} /> Account Settings
              </Link>
              <LogoutSidebarButton />
            </nav>
          </div>
        </aside>

        {/* Dashboard Main Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
