"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, CreditCard, Wallet, Lock } from "lucide-react";

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const productPrice = 299.00;
  const platformFee = 14.95; // 5%
  const total = productPrice + platformFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    toast.loading("Processing payment securely...", { id: "checkout" });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Payment successful! Funds are now in escrow.", { id: "checkout" });
    setIsProcessing(false);
    
    // Redirect to buyer orders
    router.push("/dashboard/buyer");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Secure Checkout</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <Lock className="w-4 h-4" /> Your payment is secured and held in escrow until delivery.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Column: Payment Form */}
        <div>
          <form onSubmit={handleCheckout}>
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select how you want to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-secondary hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Credit Card
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="crypto" id="crypto" className="peer sr-only" />
                    <Label
                      htmlFor="crypto"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-secondary hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Wallet className="mb-3 h-6 w-6" />
                      Crypto Wallet
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name on card</Label>
                      <Input id="name" placeholder="First Last" required className="bg-secondary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card number</Label>
                      <Input id="card-number" placeholder="0000 0000 0000 0000" required className="bg-secondary" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="expiry">Expiry month/year</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input id="expiry-month" placeholder="MM" required className="bg-secondary" />
                          <Input id="expiry-year" placeholder="YY" required className="bg-secondary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="CVC" required className="bg-secondary" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "crypto" && (
                  <div className="p-6 border border-border rounded-lg bg-secondary/50 text-center animate-in fade-in slide-in-from-top-2">
                    <Wallet className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <h4 className="font-medium mb-2">Connect your wallet</h4>
                    <p className="text-sm text-muted-foreground mb-4">Pay with ETH, USDC, or SOL.</p>
                    <Button variant="outline" type="button" className="w-full bg-background" onClick={() => toast.info("Wallet connection mocked")}>
                      Connect MetaMask
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-6 border-t border-border">
                <Button type="submit" disabled={isProcessing} className="w-full h-12 text-lg font-bold">
                  {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div>
          <Card className="border-border bg-card/50">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary border border-border shrink-0">
                  <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground line-clamp-2">E-commerce Mobile App Full Source Code</h3>
                  <p className="text-sm text-muted-foreground mt-1">Source Code License</p>
                  <div className="flex items-center gap-1 text-xs text-success mt-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> AI Verified
                  </div>
                </div>
              </div>
              
              <Separator className="bg-border" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground font-mono">${productPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Platform Fee (5%)</span>
                  <span className="text-foreground font-mono">${platformFee.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="bg-border" />
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-mono font-bold text-2xl text-primary">${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/20 rounded-b-xl border-t border-border mt-4 text-xs text-muted-foreground flex flex-col items-start gap-2">
              <p>By completing your purchase, you agree to DEVORA's Terms of Service and Privacy Policy.</p>
              <p>Your funds will be held securely in escrow until you approve the delivered files.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
