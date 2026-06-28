"use client";

import { useState } from "react";
import { Ban, Check, CheckCircle2, Clock, Search, X, Eye, FileText, Activity } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleKYC = (id: string, action: "Approved" | "Rejected") => {
    setUsers((prev) => 
      prev.map((u) => u.id === id ? { ...u, kyc: action } : u)
    );
    toast.success(`KYC for user ${id} has been ${action.toLowerCase()}.`);
    
    if (selectedUser?.id === id) {
      setSelectedUser(prev => prev ? { ...prev, kyc: action } : null);
    }
  };

  const handleBan = (id: string) => {
    setUsers((prev) => 
      prev.map((u) => u.id === id ? { ...u, banned: !u.banned } : u)
    );
    toast.info(`User ${id} ban status toggled.`);
    
    if (selectedUser?.id === id) {
      setSelectedUser(prev => prev ? { ...prev, banned: !prev.banned } : null);
    }
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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setSelectedUser(user)}
                    className="h-8 border-border text-foreground hover:bg-secondary"
                  >
                    <Eye className="w-4 h-4 mr-2" /> View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedUser && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase">
                    {selectedUser.name.substring(0, 2)}
                  </div>
                  {selectedUser.name}
                  {selectedUser.banned && <Badge className="bg-danger text-white ml-2">BANNED</Badge>}
                </SheetTitle>
                <SheetDescription>
                  {selectedUser.id} • {selectedUser.email}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-3 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Role</div>
                    <div className="font-bold text-foreground">{selectedUser.role}</div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Joined</div>
                    <div className="font-bold text-foreground">{selectedUser.joined}</div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Last IP</div>
                    <div className="font-mono text-sm text-foreground">192.168.1.42</div>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Risk Score</div>
                    <div className="font-bold text-success">Low (2%)</div>
                  </div>
                </div>

                {selectedUser.role === "Seller" && (
                  <div>
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-foreground">
                      <FileText className="w-4 h-4" /> KYC Verification
                    </h3>
                    <div className="p-4 bg-secondary/20 border border-border rounded-lg space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-bold">{selectedUser.kyc}</span>
                      </div>
                      
                      {/* Visual KYC Mockup */}
                      {selectedUser.kyc !== "N/A" && (
                        <div className="grid grid-cols-2 gap-4 mt-2 mb-4">
                          <div className="space-y-1 text-center">
                            <span className="text-xs text-muted-foreground">ID Document</span>
                            <div className="w-full aspect-[1.6/1] bg-secondary border border-border rounded flex items-center justify-center overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1633265486064-086b219458ce?w=400&q=80" alt="ID Document Mockup" className="w-full h-full object-cover blur-[2px] opacity-80" />
                            </div>
                          </div>
                          <div className="space-y-1 text-center">
                            <span className="text-xs text-muted-foreground">Face Scan (Selfie)</span>
                            <div className="w-full aspect-[1.6/1] bg-secondary border border-border rounded flex items-center justify-center overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt="Face Scan Mockup" className="w-full h-full object-cover opacity-90" />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedUser.kyc === "Pending" && (
                        <div className="pt-3 border-t border-border flex gap-2">
                          <Button size="sm" className="flex-1 bg-success hover:bg-success/90 text-white" onClick={() => handleKYC(selectedUser.id, "Approved")}>
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </Button>
                          <Button size="sm" className="flex-1 bg-danger hover:bg-danger/90 text-white" onClick={() => handleKYC(selectedUser.id, "Rejected")}>
                            <X className="w-4 h-4 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-foreground">
                    <Activity className="w-4 h-4" /> Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 text-sm">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0"></div>
                      <div>
                        <div className="text-foreground">Logged in from new device</div>
                        <div className="text-xs text-muted-foreground">Today at 10:42 AM</div>
                      </div>
                    </div>
                    {selectedUser.role === "Seller" ? (
                      <div className="flex gap-3 text-sm">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-success shrink-0"></div>
                        <div>
                          <div className="text-foreground">Submitted new product for review</div>
                          <div className="text-xs text-muted-foreground">Yesterday</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 text-sm">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-info shrink-0"></div>
                        <div>
                          <div className="text-foreground">Purchased "Supabase Auth Template"</div>
                          <div className="text-xs text-muted-foreground">3 days ago</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    className={`w-full ${selectedUser.banned ? 'text-success hover:text-success border-success/30' : 'text-danger hover:text-danger hover:bg-danger/10 border-danger/30'}`}
                    onClick={() => handleBan(selectedUser.id)}
                  >
                    <Ban className="w-4 h-4 mr-2" /> 
                    {selectedUser.banned ? "Lift Ban (Restore Account)" : "Ban User Account"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
