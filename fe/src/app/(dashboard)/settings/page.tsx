"use client";

import { Save, ShieldAlert, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-1">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile, security preferences, and seller KYC.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-8 bg-secondary/50 border border-border p-1 w-full overflow-x-auto justify-start">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Account & Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
          <TabsTrigger value="seller">Seller Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>This information will be displayed publicly so be careful what you share.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-border">
                <Avatar className="w-20 h-20 border-2 border-border">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <AvatarFallback>NN</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <Button variant="ghost" size="sm" className="text-danger">Remove</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="Alex" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="Rivera" className="bg-secondary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">devora.co/</span>
                  <Input defaultValue="NeuralNinja" className="pl-[85px] bg-secondary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea defaultValue="Full-stack AI developer specializing in LangChain and autonomous agents." className="bg-secondary min-h-[100px]" />
                <p className="text-xs text-muted-foreground">Brief description for your profile.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website URL</label>
                  <Input defaultValue="https://neuralninja.dev" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub Username</label>
                  <Input defaultValue="neuralninja" className="bg-secondary" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-w-md">
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="••••••••" className="bg-secondary" />
              </div>
              <div className="space-y-2 max-w-md">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="••••••••" className="bg-secondary" />
              </div>
              <div className="space-y-2 max-w-md">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input type="password" placeholder="••••••••" className="bg-secondary" />
              </div>
              <Button className="mt-2">Update Password</Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-border bg-secondary/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-foreground">Authenticator App</h4>
                  <p className="text-sm text-muted-foreground mt-1">Use an app like Google Authenticator or Authy to generate one-time codes.</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Email Notifications</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="n1" defaultChecked />
                  <label htmlFor="n1" className="text-sm font-medium leading-none">Order updates (purchases, deliveries)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="n2" defaultChecked />
                  <label htmlFor="n2" className="text-sm font-medium leading-none">Auction bids and updates</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="n3" defaultChecked />
                  <label htmlFor="n3" className="text-sm font-medium leading-none">New direct messages</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="n4" />
                  <label htmlFor="n4" className="text-sm font-medium leading-none">Marketing and newsletters</label>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button><Save className="w-4 h-4 mr-2" /> Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyc">
          <Card className="border-border bg-card border-amber-500/30">
            <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <ShieldAlert className="w-5 h-5" /> KYC Verification Status: Pending
              </CardTitle>
              <CardDescription>To sell products and withdraw funds, you must verify your identity.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Upload ID Document</h4>
                <p className="text-sm text-muted-foreground mb-4">Please upload a clear photo of your passport, driver&apos;s license, or national ID card.</p>
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-card hover:bg-secondary/30 transition-colors cursor-pointer text-center">
                  <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium mb-1">Upload Document</p>
                </div>
              </div>
              <Button className="w-full" disabled>Submit for Verification</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seller">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Seller Profile</CardTitle>
              <CardDescription>Customize how buyers see you on the marketplace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Seller Bio (Markdown)</label>
                <Textarea defaultValue="I have been building bots for 5 years..." className="bg-secondary min-h-[150px]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Top Skills (comma separated)</label>
                <Input defaultValue="Python, LangChain, React, Node.js" className="bg-secondary" />
              </div>
              <div className="pt-4 flex justify-end">
                <Button><Save className="w-4 h-4 mr-2" /> Save Seller Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
