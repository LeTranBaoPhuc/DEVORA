"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Search, Bell, Menu, MessageSquare, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
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
            <Button variant="ghost" size="icon" className="md:hidden">
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
            {/* Language Switcher */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                className="font-bold text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setLang(lang === "EN" ? "VI" : "EN");
                  toast.success(lang === "EN" ? "Đã chuyển sang Tiếng Việt" : "Language changed to English");
                }}
              >
                {lang}
              </Button>
            )}

            {/* Theme Toggler */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button onClick={() => toast.info("You have 3 new notifications")} variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="p-0 border-none bg-transparent hover:bg-transparent cursor-pointer rounded-full outline-none">
                <Avatar className="h-8 w-8 border border-border hover:border-primary transition-colors">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/seller" className="cursor-pointer w-full">Seller Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Settings page is under construction")} className="text-muted-foreground cursor-pointer">
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Logged out successfully")} className="text-destructive cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
