"use client";

import Link from "next/link";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/routes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await login(email, password);
      if (result) {
        toast.success("Welcome back!");
        if (typeof result === 'object' && result.role === 'ADMIN') {
          router.push("/admin");
        } else {
          router.push(ROUTES.HOME);
        }
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const result = await loginWithGoogle(credentialResponse.credential);
        if (result) {
          toast.success("Đăng nhập bằng Google thành công!");
          if (typeof result === 'object' && result.role === 'ADMIN') {
            router.push("/admin");
          } else {
            router.push(ROUTES.HOME);
          }
        } else {
          setErrorMessage("Đăng nhập Google thất bại.");
        }
      } catch (err: any) {
        setErrorMessage(err.message || "Lỗi khi xử lý đăng nhập Google.");
      }
    }
  };

  const handleGoogleError = () => {
    setErrorMessage("Đăng nhập Google thất bại.");
  };

  return (
    <>
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-heading font-bold mb-2">Welcome back</h2>
        <p className="text-muted-foreground">Log in to your DEVORA account to continue.</p>
      </div>

      <div className="flex justify-center gap-8 mb-8 items-center">
        <Button variant="outline" className="w-[60px] h-[60px] rounded-full p-0 flex items-center justify-center bg-card hover:bg-secondary border-border text-foreground transition-transform hover:scale-105">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          <span className="sr-only">Continue with GitHub</span>
        </Button>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "172937673201-dli9dvvahvkpo6gr4gfhtibbe5mo71lg.apps.googleusercontent.com"}>
          <div className="transform scale-[1.5] hover:scale-[1.55] transition-transform origin-center flex items-center justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              type="icon"
              shape="circle"
              theme="filled_black"
            />
          </div>
        </GoogleOAuthProvider>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="p-3 text-sm text-destructive-foreground bg-destructive/90 rounded-md">
            {errorMessage}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors" required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="h-12 bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary transition-colors pr-10" 
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-full font-bold text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-foreground font-medium hover:text-primary transition-colors">
          Sign up
        </Link>
      </div>
    </>
  );
}
