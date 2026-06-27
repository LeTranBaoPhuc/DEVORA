import type { Metadata } from "next";
import { Inter, Geist, Funnel_Sans, IBM_Plex_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

const fontHeading = Funnel_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontCaption = Inter({
  variable: "--font-caption",
  subsets: ["latin"],
});

const fontMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "DEVORA | The Marketplace for Vibe Coders",
  description: "Browse & buy AI Agents, Mini Apps, Automation Scripts, Prompt Templates, and Chatbots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontHeading.variable} ${fontSans.variable} ${fontCaption.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
