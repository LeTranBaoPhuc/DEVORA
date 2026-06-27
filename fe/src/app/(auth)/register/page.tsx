"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/routes";
import { toast } from "sonner";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    const success = await register(formData);
    setIsSubmitting(false);

    if (success) {
      router.push(ROUTES.LOGIN);
    }
  };

  return (
    <>
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-heading font-bold mb-2">Create an account</h2>
        <p className="text-muted-foreground">Join DEVORA and start vibing.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">First Name</label>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="Alex" required className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Rivera" required className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Username</label>
          <Input name="username" value={formData.username} onChange={handleChange} type="text" placeholder="alexrivera" required className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="m@example.com" required className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <Input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="0123456789" required className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" required className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirm Password</label>
            <Input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="••••••••" required className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="terms" required className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary" />
          <label htmlFor="terms" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I agree to the <Link href="/terms" className="text-foreground hover:text-primary transition-colors underline underline-offset-4">Terms of Service</Link> and <Link href="/privacy" className="text-foreground hover:text-primary transition-colors underline underline-offset-4">Privacy Policy</Link>.
          </label>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full h-12 font-bold text-base mt-4 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
          {isSubmitting ? "Creating Account..." : "Create Account"}
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
