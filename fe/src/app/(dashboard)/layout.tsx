import Link from "next/link";
import { LayoutDashboard, ShoppingBag, ListPlus, Wallet, Package, Settings, LogOut } from "lucide-react";
import { TopNav } from "@/components/layout/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        {/* Dashboard Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
          <div className="p-6">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Buyer</div>
            <nav className="space-y-1">
              <Link href="/dashboard/buyer" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-secondary text-foreground">
                <LayoutDashboard className="w-4 h-4 text-primary" /> Dashboard
              </Link>
              <Link href="/dashboard/buyer/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <ShoppingBag className="w-4 h-4" /> My Orders
              </Link>
              <Link href="/dashboard/buyer/auctions" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <ListPlus className="w-4 h-4" /> Auction Requests
              </Link>
            </nav>

            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-8 mb-4">Seller</div>
            <nav className="space-y-1">
              <Link href="/dashboard/seller" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <Wallet className="w-4 h-4" /> Earnings & Stats
              </Link>
              <Link href="/dashboard/seller/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <Package className="w-4 h-4" /> My Products
              </Link>
              <Link href="/dashboard/seller/payouts" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <Wallet className="w-4 h-4" /> Payouts
              </Link>
            </nav>

            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-8 mb-4">Settings</div>
            <nav className="space-y-1">
              <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <Settings className="w-4 h-4" /> Account Settings
              </Link>
              <Link href="/logout" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </Link>
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
