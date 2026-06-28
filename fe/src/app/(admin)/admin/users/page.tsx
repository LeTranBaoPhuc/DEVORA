"use client";

import { useState } from "react";
import { Ban, Check, CheckCircle2, Clock, Search, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type KYCStatus = "Pending" | "Approved" | "Rejected" | "N/A";
type UserRole = "Buyer" | "Seller" | "Admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  kyc: KYCStatus;
  joined: string;
  banned?: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: "USR-9921", name: "Alice Bob", email: "alice@example.com", role: "Seller", kyc: "Pending", joined: "Today" },
    { id: "USR-9920", name: "David Chen", email: "david.chen@startup.io", role: "Buyer", kyc: "N/A", joined: "2 days ago" },
    { id: "USR-9915", name: "NeuralNinja", email: "ninja@ai.com", role: "Seller", kyc: "Approved", joined: "1 month ago" },
    { id: "USR-9910", name: "Scammer123", email: "scammer@fishy.com", role: "Buyer", kyc: "N/A", joined: "2 months ago" },
  ]);

  const handleKYC = (id: string, action: "Approved" | "Rejected") => {
    setUsers((prev) => 
      prev.map((u) => u.id === id ? { ...u, kyc: action } : u)
    );
    toast.success(`KYC for user ${id} has been ${action.toLowerCase()}.`);
  };

  const handleBan = (id: string) => {
    setUsers((prev) => 
      prev.map((u) => u.id === id ? { ...u, banned: !u.banned } : u)
    );
    toast.info(`User ${id} ban status toggled.`);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Users & KYC</h1>
          <p className="text-muted-foreground">Manage user accounts and verify seller identities.</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users by name, email..." className="pl-9 bg-secondary border-border" />
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-bold text-info">{users.filter(u => u.kyc === "Pending").length}</span> KYC pending
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>User / Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>KYC Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className={`border-border hover:bg-secondary/30 ${user.banned ? 'opacity-50' : ''}`}>
                <TableCell>
                  <div className="font-medium text-sm text-foreground flex items-center gap-2">
                    {user.name} {user.banned && <Badge className="bg-danger text-white border-none text-[10px] px-1 py-0 h-4">BANNED</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-1">{user.id}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  {user.kyc === "Pending" && <Badge className="bg-info/20 text-info border-none hover:bg-info/20"><Clock className="w-3 h-3 mr-1"/> Pending</Badge>}
                  {user.kyc === "Approved" && <Badge className="bg-success/20 text-success border-none hover:bg-success/20"><CheckCircle2 className="w-3 h-3 mr-1"/> Approved</Badge>}
                  {user.kyc === "Rejected" && <Badge className="bg-danger/20 text-danger border-none hover:bg-danger/20">Rejected</Badge>}
                  {user.kyc === "N/A" && <span className="text-xs text-muted-foreground ml-2">-</span>}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.joined}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {user.kyc === "Pending" && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleKYC(user.id, "Approved")}
                          className="h-8 text-success hover:text-success hover:bg-success/10 border-success/30"
                          title="Approve KYC"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleKYC(user.id, "Rejected")}
                          className="h-8 text-danger hover:text-danger hover:bg-danger/10 border-danger/30"
                          title="Reject KYC"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleBan(user.id)}
                      className="h-8 text-muted-foreground hover:text-danger hover:bg-danger/10"
                      title={user.banned ? "Unban User" : "Ban User"}
                    >
                      <Ban className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
