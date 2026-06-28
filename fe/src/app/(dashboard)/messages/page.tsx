"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-heading font-bold">Messages</h1>
      
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground h-[50vh]">
          <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
          <h2 className="text-lg font-semibold mb-2">No Messages Yet</h2>
          <p>When you start a conversation with a buyer or seller, it will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
