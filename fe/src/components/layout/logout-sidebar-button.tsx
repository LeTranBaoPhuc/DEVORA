"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function LogoutSidebarButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={() => logout()}
      className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
    >
      <LogOut className="w-4 h-4" /> Logout
    </button>
  );
}
