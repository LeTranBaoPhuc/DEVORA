"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = ["Basic Info", "Media", "Files & Tech", "Pricing", "Review"];

export default function CreateProductPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Title</label>
              <Input placeholder="e.g. Autonomous Customer Support AI Agent" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description</label>
              <Input placeholder="1-2 sentence summary" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Description (Markdown supported)</label>
              <Textarea placeholder="Describe the features, benefits, and how it works..." className="bg-secondary min-h-[200px]" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger className="bg-secondary"><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-agents">AI Agents</SelectItem>
                    <SelectItem value="mini-apps">Mini Apps</SelectItem>
                    <SelectItem value="automation">Automation Scripts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Type</label>
                <Select>
                  <SelectTrigger className="bg-secondary"><SelectValue placeholder="Select Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="source-code">Full Source Code</SelectItem>
                    <SelectItem value="saas">SaaS Template</SelectItem>
                    <SelectItem value="api">API Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Images (up to 8)</label>
              <div className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer text-center">
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                <p className="text-sm font-medium mb-1">Drag & drop images or click to browse</p>
                <p className="text-xs text-muted-foreground">16:9 ratio recommended. JPG, PNG up to 5MB.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preview Video URL (Optional)</label>
              <Input placeholder="YouTube or Vimeo URL" className="bg-secondary" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Source File Archive (.zip, .tar.gz)</label>
              <div className="border border-border rounded-xl p-6 flex flex-col items-center justify-center bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer text-center">
                <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium mb-1">Upload the deliverable file</p>
                <p className="text-xs text-muted-foreground">This will be securely stored in DEVORA Escrow.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Documentation URL</label>
              <Input placeholder="https://" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Demo URL (Optional)</label>
              <Input placeholder="https://" className="bg-secondary" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tech Stack (Comma separated)</label>
                <Input placeholder="e.g. Next.js, Tailwind, Stripe" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">AI Tools Used (Comma separated)</label>
                <Input placeholder="e.g. OpenAI, LangChain" className="bg-secondary" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (USD)</label>
                <Input type="number" placeholder="0.00" className="bg-secondary font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Original Price (Optional, for discounts)</label>
                <Input type="number" placeholder="0.00" className="bg-secondary font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">License Type</label>
              <Select>
                <SelectTrigger className="bg-secondary"><SelectValue placeholder="Select License" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Use (Standard)</SelectItem>
                  <SelectItem value="unlimited">Unlimited Projects</SelectItem>
                  <SelectItem value="resale">Resale Rights</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="license_key" />
                <label htmlFor="license_key" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Require DEVORA License Key verification?
                </label>
              </div>
              <p className="text-xs text-muted-foreground pl-6">If enabled, DEVORA will generate and require a license key for this product. You can limit the number of active installations.</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 text-center py-12">
            <Check className="w-16 h-16 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold">Ready to submit!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Please review your product details carefully. Once submitted, it will be sent to our moderation team for review before going live.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="mb-4">
        <Link href="/dashboard/seller/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-heading font-bold mb-1">List New Product</h1>
        <p className="text-muted-foreground">Complete all steps to submit your product to the marketplace.</p>
      </div>

      {/* Stepper Header */}
      <div className="relative mb-12 mt-8">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary -translate-y-1/2 z-0"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}></div>
        <div className="relative z-10 flex justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 bg-card transition-colors ${isCompleted || isCurrent ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <div className={`mt-2 text-xs font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-8">
          {renderStepContent()}

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
              Back
            </Button>
            {currentStep < STEPS.length - 1 ? (
              <Button onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}>
                Continue to {STEPS[currentStep + 1]}
              </Button>
            ) : (
              <Button className="bg-success text-white hover:bg-success/90">
                Submit for Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
