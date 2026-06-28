"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, MoreVertical, Paperclip, Send, FileCode, CheckCheck, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const INITIAL_CHATS = [
  { id: "1", user: { username: "NeuralNinja", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }, lastMessage: "I've uploaded the requested changes.", time: "10:24 AM", unread: 2, context: "Order ORD-9482" },
  { id: "2", user: { username: "vibe_creator", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" }, lastMessage: "Thanks for the purchase!", time: "Yesterday", unread: 0, context: "Order ORD-9481" },
  { id: "3", user: { username: "CodeVibe", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706h" }, lastMessage: "Could you clarify the Patreon API requirements?", time: "Tuesday", unread: 0, context: "Auction Bid" },
];

const INITIAL_MESSAGES: Record<string, any[]> = {
  "1": [
    { id: "m1", senderId: "other", text: "Hi! I just started working on the Discord bot for you.", time: "09:00 AM" },
    { id: "m2", senderId: "me", text: "Great! Let me know if you need the Patreon API keys.", time: "09:15 AM" },
    { id: "m3", senderId: "other", text: "Yes please, could you share them securely?", time: "09:20 AM" },
    { id: "m4", senderId: "other", text: "Also, I've drafted the initial schema for the MongoDB database.", time: "10:20 AM" },
    { id: "m5", senderId: "other", text: "", attachment: { name: "schema_v1.ts", size: "2.4 KB" }, time: "10:24 AM" },
  ],
  "2": [
    { id: "m1", senderId: "me", text: "Just bought the Notion template, it looks awesome!", time: "Yesterday" },
    { id: "m2", senderId: "other", text: "Thanks for the purchase!", time: "Yesterday" },
  ],
  "3": [
    { id: "m1", senderId: "other", text: "Could you clarify the Patreon API requirements?", time: "Tuesday" },
  ]
};

export default function MessagesPage() {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(INITIAL_CHATS[0].id);
  const [messagesData, setMessagesData] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
  const activeMessages = messagesData[activeChatId] || [];

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: `m${Date.now()}`,
      senderId: "me",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessagesData(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));

    // Update last message in chat list
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, lastMessage: inputText, time: "Just now" };
      }
      return chat;
    }));

    setInputText("");
    
    // Simulate reply
    setTimeout(() => {
      const replyMessage = {
        id: `r${Date.now()}`,
        senderId: "other",
        text: "Got it, I'm checking right now.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessagesData(curr => ({
        ...curr,
        [activeChatId]: [...(curr[activeChatId] || []), replyMessage]
      }));
      
      setChats(curr => curr.map(chat => {
        if (chat.id === activeChatId) {
          return { ...chat, lastMessage: replyMessage.text, time: "Just now" };
        }
        return chat;
      }));
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full w-full max-w-7xl mx-auto border-x border-border">
      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-border bg-card flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-heading font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 bg-secondary border-border" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="divide-y divide-border">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                className={`p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${activeChatId === chat.id ? "bg-secondary" : ""}`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <div className="flex gap-3">
                  <Avatar className="w-12 h-12 border border-border">
                    <AvatarImage src={chat.user.avatar} />
                    <AvatarFallback>{chat.user.username.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-foreground truncate">{chat.user.username}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && chat.id !== activeChatId && (
                        <Badge className="bg-primary text-primary-foreground border-none rounded-full min-w-[20px] h-5 flex items-center justify-center p-0">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-background relative hidden md:flex">
        {/* Chat Header */}
        <div className="h-20 border-b border-border bg-card/50 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10 border border-border">
              <AvatarImage src={activeChat.user.avatar} />
              <AvatarFallback>{activeChat.user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{activeChat.user.username}</h3>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                Context: <Link href="#" className="text-primary hover:underline">{activeChat.context}</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => toast.info("View Details mock")} variant="ghost" size="icon"><Info className="w-5 h-5 text-muted-foreground" /></Button>
            <Button onClick={() => toast.info("More Options mock")} variant="ghost" size="icon"><MoreVertical className="w-5 h-5 text-muted-foreground" /></Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-6 pb-4">
            <div className="text-center text-xs text-muted-foreground mb-8">
              Today
            </div>
            
            {activeMessages.map(msg => {
              const isMe = msg.senderId === "me";
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}>
                  <div className={`flex gap-3 max-w-[70%] ${isMe ? "flex-row-reverse" : ""}`}>
                    {!isMe && (
                      <Avatar className="w-8 h-8 border border-border shrink-0 mt-auto">
                        <AvatarImage src={activeChat.user.avatar} />
                        <AvatarFallback>{activeChat.user.username.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className="flex flex-col gap-1">
                      <div className={`p-3 rounded-2xl ${isMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm border border-border"}`}>
                        {msg.text && <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>}
                        {msg.attachment && (
                          <div 
                            onClick={() => toast.success(`Downloading ${msg.attachment.name}...`)}
                            className="flex items-center gap-3 p-3 bg-background/20 rounded-xl mt-1 border border-primary/20 cursor-pointer hover:bg-background/30 transition-colors"
                          >
                            <div className="p-2 bg-background/50 rounded-lg"><FileCode className="w-5 h-5" /></div>
                            <div>
                              <div className="text-sm font-medium">{msg.attachment.name}</div>
                              <div className="text-xs opacity-80">{msg.attachment.size}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={`text-[10px] text-muted-foreground flex items-center gap-1 ${isMe ? "justify-end" : ""}`}>
                        {msg.time} {isMe && <CheckCheck className="w-3 h-3 text-primary" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card shrink-0">
          <div className="flex items-end gap-2">
            <Button onClick={() => toast.info("Attach file mock")} variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
              <Paperclip className="w-5 h-5" />
            </Button>
            <div className="flex-1 bg-secondary rounded-xl border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all p-1">
              <textarea 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none focus:outline-none resize-none p-3 text-sm min-h-[44px] max-h-32"
                placeholder="Type a message..."
                rows={1}
              />
            </div>
            <Button onClick={handleSendMessage} disabled={!inputText.trim()} size="icon" className="shrink-0 h-11 w-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
