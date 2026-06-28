"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Search, Bell, Menu, MessageSquare, ChevronDown, Sun, Moon, ShoppingCart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language.context";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { user, logout, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-primary/20">
      {/* Top Tier: Logo, Links, Icons */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-8">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => toast.info("Opening mobile menu...")}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/" className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                D
              </div>
              <span className="font-heading font-black text-2xl tracking-tighter hidden sm:block">DEVORA</span>
            </Link>
          </div>
          
          {/* Main Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground uppercase tracking-wide flex-1 justify-center">
            <Link href="/marketplace" className="hover:text-foreground transition-colors hover:shadow-[0_2px_0_0_currentColor]">{t("nav.marketplace")}</Link>
            <Link href="/auctions" className="hover:text-foreground transition-colors hover:shadow-[0_2px_0_0_currentColor]">{t("nav.auctions")}</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground transition-colors outline-none cursor-pointer">
                {t("nav.more")} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>{t("nav.about")}</DropdownMenuItem>
                <DropdownMenuItem>{t("nav.support")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">

            {!user ? (
              <div className="flex items-center gap-2 ml-2">
                <Link href="/login">
                  <Button variant="ghost" className="font-semibold hover:text-primary transition-colors hidden sm:inline-flex">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_10px_rgba(204,255,0,0.3)] transition-all">
                    Sign up
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full" asChild>
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full" asChild>
                  <Link href="/messages">
                    <MessageSquare className="h-5 w-5" />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_5px_rgba(204,255,0,0.5)]"></span>
                    </Button>
                  } />
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                      <span className="font-semibold text-sm">Thông báo</span>
                      <Link href="/notifications" className="text-xs text-primary hover:underline">Mở rộng</Link>
                    </div>
                    <div className="py-2 px-1 max-h-80 overflow-y-auto">
                      <div className="px-3 py-2 hover:bg-secondary/50 rounded-md cursor-pointer mb-1 transition-colors">
                        <p className="text-sm font-medium text-foreground">Đơn hàng mới #1234</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Bạn có 1 đơn hàng mới từ John Doe</p>
                        <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">2 phút trước</p>
                      </div>
                      <div className="px-3 py-2 hover:bg-secondary/50 rounded-md cursor-pointer mb-1 transition-colors">
                        <p className="text-sm font-medium text-foreground">Đánh giá sản phẩm</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Sản phẩm "Web Template" vừa nhận đánh giá 5 sao</p>
                        <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">1 giờ trước</p>
                      </div>
                      <div className="px-3 py-2 hover:bg-secondary/50 rounded-md cursor-pointer transition-colors">
                        <p className="text-sm font-medium text-foreground">Hệ thống</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Yêu cầu rút tiền $500 đã hoàn tất</p>
                        <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">1 ngày trước</p>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="p-0 border-none bg-transparent hover:bg-transparent cursor-pointer rounded-full outline-none ml-2">
                    <Avatar className="h-9 w-9 border-2 border-border hover:border-primary transition-all">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 mt-1">
                    <DropdownMenuGroup>
                      <div className="flex items-center gap-3 p-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-0.5">
                          <p className="text-sm font-semibold leading-none">{user.username}</p>
                          {user.email !== user.username && (
                            <p className="text-xs text-muted-foreground truncate w-[160px]">{user.email}</p>
                          )}
                        </div>
                      </div>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer text-sm font-medium flex items-center gap-2">
                          {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Theme
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">Light</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">Dark</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">System</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer text-sm font-medium flex items-center gap-2">
                          <Globe className="w-4 h-4" /> Language ({lang})
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => { setLang("EN"); toast.success("Language changed to English"); }} className="cursor-pointer">English</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setLang("VI"); toast.success("Đã chuyển sang Tiếng Việt"); }} className="cursor-pointer">Tiếng Việt</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setLang("JP"); toast.success("日本語に変更しました"); }} className="cursor-pointer">日本語 (Japanese)</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setLang("KR"); toast.success("한국어로 변경되었습니다"); }} className="cursor-pointer">한국어 (Korean)</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setLang("FR"); toast.success("Langue changée en Français"); }} className="cursor-pointer">Français (French)</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem render={
                        <Link href="/dashboard/buyer" className="cursor-pointer w-full text-sm font-medium">My Dashboard</Link>
                      } />
                      <DropdownMenuItem render={
                        <Link href="/dashboard/buyer/orders" className="cursor-pointer w-full text-sm font-medium">My Purchases</Link>
                      } />
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem render={
                        <Link href="/dashboard/seller" className="cursor-pointer w-full text-sm font-medium text-primary focus:text-primary focus:bg-primary/10">Truy cập trang người bán</Link>
                      } />
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem render={
                        <Link href="/settings" className="cursor-pointer w-full text-sm font-medium">Account Settings</Link>
                      } />
                      <DropdownMenuItem onClick={() => { logout(); toast.success("Logged out successfully"); }} className="text-destructive cursor-pointer focus:text-destructive text-sm font-medium">
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Tier: Search Bar */}
      <div className="border-b-2 border-primary">
        <div className="container mx-auto px-4 h-12 flex items-center justify-center">
          <div className="flex w-full max-w-2xl border border-border rounded-full overflow-hidden focus-within:border-primary transition-colors bg-secondary/30">
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 border-r border-border text-sm text-muted-foreground flex items-center gap-2 hover:bg-secondary transition-colors outline-none cursor-pointer whitespace-nowrap">
                {t("nav.all_product")} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>{t("nav.all_product")}</DropdownMenuItem>
                <DropdownMenuItem>{t("nav.templates")}</DropdownMenuItem>
                <DropdownMenuItem>{t("nav.ai_agents")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={t("nav.search")} 
                className="w-full pl-9 border-none bg-transparent h-full focus-visible:ring-0 shadow-none text-sm rounded-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    toast.info(`Searching for: ${e.currentTarget.value}`);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
