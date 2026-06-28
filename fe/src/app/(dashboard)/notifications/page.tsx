"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-heading font-bold">Notifications</h1>
      
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground h-[50vh]">
          <Bell className="w-12 h-12 mb-4 opacity-50" />
          <h2 className="text-lg font-semibold mb-2">You're all caught up</h2>
          <p>No new notifications to display right now.</p>
        </CardContent>
      </Card>
    </div>
  );
}
