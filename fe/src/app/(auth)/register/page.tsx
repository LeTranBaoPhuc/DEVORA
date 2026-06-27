"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const [role, setRole] = useState<"buyer" | "seller" | "both">("buyer");

  return (
    <>
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-heading font-bold mb-2">Create an account</h2>
        <p className="text-muted-foreground">Join DEVORA and start vibing.</p>
      </div>

      <form className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">First Name</label>
            <Input type="text" placeholder="Alex" className="h-12 bg-card border-border" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <Input type="text" placeholder="Rivera" className="h-12 bg-card border-border" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Username</label>
          <Input type="text" placeholder="alexrivera" className="h-12 bg-card border-border" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input type="email" placeholder="m@example.com" className="h-12 bg-card border-border" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Password</label>
          <Input type="password" placeholder="••••••••" className="h-12 bg-card border-border" />
        </div>

        <div className="space-y-3 pt-2">
          <label className="text-sm font-medium text-foreground">I want to...</label>
          <div className="grid grid-cols-3 gap-3">
            <Button 
              type="button" 
              variant={role === "buyer" ? "default" : "outline"}
              className={`h-12 ${role === "buyer" ? "" : "bg-card border-border hover:bg-secondary"}`}
              onClick={() => setRole("buyer")}
            >
              Buy
            </Button>
            <Button 
              type="button" 
              variant={role === "seller" ? "default" : "outline"}
              className={`h-12 ${role === "seller" ? "" : "bg-card border-border hover:bg-secondary"}`}
              onClick={() => setRole("seller")}
            >
              Sell
            </Button>
            <Button 
              type="button" 
              variant={role === "both" ? "default" : "outline"}
              className={`h-12 ${role === "both" ? "" : "bg-card border-border hover:bg-secondary"}`}
              onClick={() => setRole("both")}
            >
              Both
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I agree to the <Link href="/terms" className="text-foreground hover:text-primary underline underline-offset-4">Terms of Service</Link> and <Link href="/privacy" className="text-foreground hover:text-primary underline underline-offset-4">Privacy Policy</Link>.
          </label>
        </div>

        <Button className="w-full h-12 font-semibold text-base mt-4">Create Account</Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground font-medium hover:text-primary transition-colors">
          Sign in
        </Link>
      </div>
    </>
  );
}
