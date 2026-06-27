import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-card border-r border-border p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <div className="bg-primary text-primary-foreground font-heading font-bold px-3 py-1.5 rounded-md tracking-tighter text-xl">
              DEVORA
            </div>
          </Link>
          <h1 className="text-4xl font-heading font-bold leading-tight mb-6">
            The marketplace built for <br /> <span className="text-primary">vibe coders</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Join thousands of developers buying and selling AI agents, automation scripts, and next-gen tools.
          </p>
        </div>
        
        <div className="relative z-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} DEVORA. All rights reserved.
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-background relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors lg:hidden">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
