"use client"

import React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Zap, Wallet, CheckCircle, ArrowRight, X } from "lucide-react"
import Link from "next/link"

type FeatureType = "notifications" | "shortcuts" | "vault"

interface FeatureDemo {
  id: FeatureType
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  benefits: Array<{ icon: React.ComponentType<{ className?: string }>; title: string; description: string }>
  features: Array<{ title: string; description: string }>
  demo: {
    title: string
    description: string
    examples: Array<{ label: string; value: string }>
  }
}

const featureDemos: Record<FeatureType, FeatureDemo> = {
  notifications: {
    id: "notifications",
    title: "Live Notifications",
    subtitle: "Stay connected with real-time updates across all Q Social platforms",
    icon: Bell,
    benefits: [
      {
        icon: Zap,
        title: "Instant Updates",
        description: "Get notified immediately when someone likes, comments, or mentions you",
      },
      {
        icon: CheckCircle,
        title: "Cross-Platform",
        description: "Unified notifications from Q Vibes, Q Circles, and Q Gram in one place",
      },
      {
        icon: Bell,
        title: "Smart Filtering",
        description: "Customizable notification preferences to control what you see",
      },
    ],
    features: [
      { title: "Real-time Badge Updates", description: "Notification count updates instantly without page refresh" },
      { title: "Supabase Subscriptions", description: "WebSocket-powered live data streaming for instant delivery" },
      { title: "Read/Unread Tracking", description: "Mark notifications as read with visual indicators" },
      { title: "Activity Timeline", description: "Chronological feed of all your interactions" },
    ],
    demo: {
      title: "Notification Types",
      description: "Q Social delivers various notification types to keep you informed",
      examples: [
        { label: "Likes & Reactions", value: "Someone appreciated your content" },
        { label: "Comments & Replies", value: "New responses to your posts" },
        { label: "Mentions", value: "You've been tagged in a post" },
        { label: "Follows", value: "New followers joined your community" },
        { label: "QBP Rewards", value: "Earned points from your activity" },
      ],
    },
  },
  shortcuts: {
    id: "shortcuts",
    title: "Keyboard Shortcuts",
    subtitle: "Navigate Q Social at lightning speed with powerful keyboard commands",
    icon: Zap,
    benefits: [
      {
        icon: Zap,
        title: "Blazing Fast",
        description: "Access any feature instantly without touching your mouse",
      },
      {
        icon: CheckCircle,
        title: "Power User Tools",
        description: "Professional-grade shortcuts for maximum productivity",
      },
      {
        icon: Bell,
        title: "Easy to Learn",
        description: "Intuitive key combinations that make sense",
      },
    ],
    features: [
      { title: "Compose Shortcut (⌘K)", description: "Open compose dialog from anywhere to create new posts" },
      { title: "Navigation Commands", description: "Jump between platforms using keyboard-only navigation" },
      { title: "Search Shortcut (⌘/)", description: "Instantly access global search with one keystroke" },
      { title: "Custom Bindings", description: "Configure your own shortcuts for personalized workflow" },
    ],
    demo: {
      title: "Essential Shortcuts",
      description: "Master these key commands to become a Q Social power user",
      examples: [
        { label: "⌘K or Ctrl+K", value: "Compose new post" },
        { label: "G H", value: "Go to home feed" },
        { label: "G P", value: "Go to profile" },
        { label: "⌘/ or Ctrl+/", value: "Open search" },
        { label: "?", value: "Show all shortcuts" },
      ],
    },
  },
  vault: {
    id: "vault",
    title: "Live Vault Updates",
    subtitle: "Watch your QBP balance grow in real-time as you earn rewards",
    icon: Wallet,
    benefits: [
      {
        icon: Wallet,
        title: "Real-Time Balance",
        description: "See your QBP balance update instantly as you earn",
      },
      {
        icon: Zap,
        title: "Instant Rewards",
        description: "Earn QBP immediately for posts, replies, and engagement",
      },
      {
        icon: CheckCircle,
        title: "Toast Notifications",
        description: "Beautiful alerts show exactly how much you earned",
      },
    ],
    features: [
      { title: "Live Balance Tracking", description: "Real-time updates via WebSocket connections" },
      { title: "Earning Notifications", description: "Toast alerts for every QBP transaction" },
      { title: "Transaction History", description: "Complete log of all earnings and spending" },
      { title: "Daily Auto-Payout", description: "Automatic transfers to your exchange wallet" },
    ],
    demo: {
      title: "Earning Examples",
      description: "Here's how you earn QBP across Q Social platforms",
      examples: [
        { label: "Quality Post", value: "+10-100 QBP" },
        { label: "Thoughtful Reply", value: "+5-25 QBP" },
        { label: "Media Upload", value: "+25-200 QBP" },
        { label: "Circle Activity", value: "+5-50 QBP" },
        { label: "Daily Login", value: "+2 QBP" },
      ],
    },
  },
}

export function RealtimeFeaturesDemo() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureType | null>(null)

  const demo = selectedFeature ? featureDemos[selectedFeature] : null

  return (
    <>
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Live Notifications */}
        <button
          onClick={() => setSelectedFeature("notifications")}
          className="rounded-2xl border border-border bg-card p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 text-left group active:scale-98 touch-manipulation"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <Bell className="h-5 w-5 text-accent" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-success">Live</span>
            </div>
          </div>
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
            Live Notifications
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Real-time notification badges update instantly via Supabase subscriptions
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-destructive">3</span>
            </div>
            <span>Unread notification counter</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View Full Demo</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </button>

        {/* Keyboard Shortcuts */}
        <button
          onClick={() => setSelectedFeature("shortcuts")}
          className="rounded-2xl border border-border bg-card p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 text-left group active:scale-98 touch-manipulation"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded border border-border">⌘K</kbd>
          </div>
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
            Keyboard Shortcuts
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Power user shortcuts for lightning-fast navigation</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Compose post</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">⌘K</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Go to home</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">G H</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">⌘/</kbd>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View Full Demo</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </button>

        {/* Live Vault Updates */}
        <button
          onClick={() => setSelectedFeature("vault")}
          className="rounded-2xl border border-border bg-card p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 text-left group active:scale-98 touch-manipulation"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <Wallet className="h-5 w-5 text-accent" />
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-accent animate-pulse" />
              <span className="text-xs font-bold text-accent">+5 QBP</span>
            </div>
          </div>
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
            Live Vault Updates
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            QBP balance updates in real-time with toast notifications for earnings
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
            <span className="text-xs font-medium text-success">Earned 5.00 QBP</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View Full Demo</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </button>
      </div>

      {/* Fullscreen Demo Modal */}
      {demo && (
        <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0 overflow-hidden">
            <DialogHeader className="relative p-6 sm:p-8 border-b border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Badge className="mb-3 bg-accent/20 text-accent border-accent/30">Real-Time Feature Demo</Badge>
                  <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">{demo.title}</DialogTitle>
                  <DialogDescription className="text-base sm:text-lg text-muted-foreground">
                    {demo.subtitle}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="space-y-8 max-w-5xl mx-auto">
                {/* Key Benefits */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {demo.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-border bg-card/50 p-4 hover:border-accent/50 transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                            <benefit.icon className="h-4 w-4 text-accent" />
                          </div>
                          <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature Breakdown */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">Feature Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {demo.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Demo Section */}
                <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{demo.demo.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{demo.demo.description}</p>
                  <div className="space-y-3">
                    {demo.demo.examples.map((example, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-background/50 p-3 border border-border"
                      >
                        <span className="text-sm font-medium text-foreground">{example.label}</span>
                        <span className="text-sm text-accent font-semibold">{example.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border p-6 sm:p-8 bg-card/50">
              <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto">
                <Button variant="outline" onClick={() => setSelectedFeature(null)} className="bg-transparent">
                  Close Demo
                </Button>
                <Link href="/register">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
