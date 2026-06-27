"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {

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
            <Input type="text" placeholder="Alex" className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <Input type="text" placeholder="Rivera" className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Username</label>
          <Input type="text" placeholder="alexrivera" className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input type="email" placeholder="m@example.com" className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Password</label>
          <Input type="password" placeholder="••••••••" className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
        </div>



        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="terms" className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary" />
          <label htmlFor="terms" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I agree to the <Link href="/terms" className="text-foreground hover:text-primary transition-colors underline underline-offset-4">Terms of Service</Link> and <Link href="/privacy" className="text-foreground hover:text-primary transition-colors underline underline-offset-4">Privacy Policy</Link>.
          </label>
        </div>

        <Button className="w-full h-12 font-bold text-base mt-4 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
          Create Account
        </Button>
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
