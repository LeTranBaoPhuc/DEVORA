"use client";

import { Bell, ShoppingBag, ListPlus, CreditCard, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNav } from "@/components/layout/top-nav";

const NOTIFICATIONS = [
  {
    date: "Today",
    items: [
      { id: "1", type: "order", title: "Order Delivered", body: "vibe_creator has submitted the final files for ORD-9481. Please review and accept.", time: "10:30 AM", unread: true, icon: ShoppingBag, color: "text-success bg-success/10" },
      { id: "2", type: "message", title: "New Message", body: "NeuralNinja: I've uploaded the requested changes to the schema.", time: "10:24 AM", unread: true, icon: MessageSquare, color: "text-primary bg-primary/10" },
    ]
  },
  {
    date: "Yesterday",
    items: [
      { id: "3", type: "auction", title: "New Bid on your Auction", body: "CodeVibe placed a bid of $300 on your Discord bot request.", time: "02:15 PM", unread: false, icon: ListPlus, color: "text-info bg-info/10" },
      { id: "4", type: "payment", title: "Payout Processed", body: "Your payout request for $840.50 has been processed to Chase •••• 4242.", time: "09:00 AM", unread: false, icon: CreditCard, color: "text-success bg-success/10" },
    ]
  },
  {
    date: "Older",
    items: [
      { id: "5", type: "system", title: "Welcome to DEVORA!", body: "Your account has been successfully created. Start browsing the marketplace.", time: "Oct 20", unread: false, icon: Bell, color: "text-foreground bg-secondary" },
      { id: "6", type: "system", title: "Action Required: Verify Email", body: "Please click the link in your email to verify your address.", time: "Oct 20", unread: false, icon: AlertCircle, color: "text-danger bg-danger/10" },
    ]
  }
];

export default function NotificationsPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopNav />
      <div className="flex-1 overflow-y-auto container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-heading font-bold">Notifications</h1>
          <Button variant="outline" size="sm">Mark all as read</Button>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button variant="default" size="sm" className="rounded-full px-6">All</Button>
          <Button variant="outline" size="sm" className="rounded-full px-6 bg-card">Orders</Button>
          <Button variant="outline" size="sm" className="rounded-full px-6 bg-card">Auctions</Button>
          <Button variant="outline" size="sm" className="rounded-full px-6 bg-card">Payments</Button>
          <Button variant="outline" size="sm" className="rounded-full px-6 bg-card">System</Button>
        </div>

        <div className="space-y-10">
          {NOTIFICATIONS.map(group => (
            <div key={group.date}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 pl-2">
                {group.date}
              </h3>
              <div className="space-y-3">
                {group.items.map(notification => {
                  const Icon = notification.icon;
                  return (
                    <div 
                      key={notification.id} 
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${notification.unread ? "bg-secondary border-primary/30" : "bg-card border-border"}`}
                    >
                      <div className={`p-3 rounded-xl ${notification.color} shrink-0 mt-1`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className={`text-base font-semibold ${notification.unread ? "text-foreground" : "text-foreground/90"}`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-muted-foreground shrink-0">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {notification.body}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-3"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
