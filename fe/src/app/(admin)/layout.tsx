"use client";

import Link from "next/link";
import { BarChart3, Users, Package, AlertTriangle, ShieldCheck, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast.error("Vui lòng đăng nhập để tiếp tục");
        router.push("/login");
      } else if (user.role !== "ADMIN") {
        toast.error("Bạn không có quyền truy cập trang quản trị");
        router.push("/marketplace");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "ADMIN") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Admin TopNav */}
      <header className="h-16 border-b border-border bg-card shrink-0 flex items-center px-6 justify-between z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="bg-danger text-danger-foreground font-heading font-bold px-2 py-1 rounded-sm text-sm tracking-tighter">
            ADMIN
          </div>
          <span className="font-heading font-bold text-lg hidden sm:inline-block">DEVORA</span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="text-muted-foreground">{user.firstName} {user.lastName}</span>
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
            {user.firstName?.charAt(0) || "A"}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Admin Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card overflow-y-auto">
          <div className="p-4">
            <nav className="space-y-1">
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <BarChart3 className="w-4 h-4" /> Platform Overview
              </Link>
              <div className="pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-3">Moderation</div>
              <Link href="/admin/products/review" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-danger/10 text-danger transition-colors">
                <ShieldCheck className="w-4 h-4" /> Product Review
              </Link>
              <Link href="/admin/disputes" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <AlertTriangle className="w-4 h-4" /> Disputes
              </Link>
              <div className="pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-3">Management</div>
              <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <Users className="w-4 h-4" /> Users & KYC
              </Link>
              <Link href="/admin/payouts" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <Package className="w-4 h-4" /> Payouts
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4 border-t border-border">
            <nav className="space-y-1">
              <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <Settings className="w-4 h-4" /> Global Settings
              </Link>
              <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                <LogOut className="w-4 h-4" /> Exit Admin
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
