"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  Check, 
  Sparkles, 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Bookmark,
  TrendingUp,
  Zap,
  Shield,
  Eye,
  Globe,
  Lock,
  Bitcoin,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FeatureDemo {
  id: string
  title: string
  subtitle: string
  description: string
  benefits: string[]
  features: Array<{
    icon: any
    title: string
    description: string
  }>
  demo: {
    type: "interaction" | "visual" | "stats"
    content: any
  }
  cta: {
    text: string
    href: string
  }
}

const featureDemos: Record<string, FeatureDemo> = {
  "q-vibes": {
    id: "q-vibes",
    title: "Q Vibes: Real-Time Microblogging",
    subtitle: "Share your thoughts, earn rewards",
    description: "Express yourself in 280 characters or less with category-based feeds, instant engagement, and QBP rewards for quality content.",
    benefits: [
      "Earn 2-25 QBP per post based on engagement",
      "Category-based discovery for targeted audiences",
      "Real-time notifications and interactions",
      "Quote, reply, and thread conversations"
    ],
    features: [
      {
        icon: MessageCircle,
        title: "Threaded Conversations",
        description: "Build deep discussions with nested replies and quote posts"
      },
      {
        icon: TrendingUp,
        title: "Category Feeds",
        description: "Discover content in Technology, Sports, Entertainment, and more"
      },
      {
        icon: Bitcoin,
        title: "Engagement Rewards",
        description: "Earn QBP for likes, replies, and quality interactions"
      },
      {
        icon: Shield,
        title: "Verified Community",
        description: "Interact only with real, verified humans"
      }
    ],
    demo: {
      type: "interaction",
      content: null
    },
    cta: {
      text: "Start Posting on Q Vibes",
      href: "/register"
    }
  },
  "q-circles": {
    id: "q-circles",
    title: "Q Circles: Community Building",
    subtitle: "Create and manage vibrant communities",
    description: "Build engaged communities with powerful moderation tools, event planning, and member rewards. Perfect for brands, creators, and enthusiasts.",
    benefits: [
      "Earn 5-50 QBP per community activity",
      "Advanced moderation and member management",
      "Event planning and scheduling tools",
      "Private or public circle options"
    ],
    features: [
      {
        icon: Users,
        title: "Member Management",
        description: "Invite, approve, and moderate members with role-based permissions"
      },
      {
        icon: Sparkles,
        title: "Event Planning",
        description: "Schedule events, send reminders, and track RSVPs"
      },
      {
        icon: Lock,
        title: "Privacy Controls",
        description: "Choose between public, private, or invite-only circles"
      },
      {
        icon: Bitcoin,
        title: "Community Rewards",
        description: "Reward active members with QBP incentives"
      }
    ],
    demo: {
      type: "visual",
      content: null
    },
    cta: {
      text: "Create Your Circle",
      href: "/register"
    }
  },
  "q-gram": {
    id: "q-gram",
    title: "Q Gram: Visual Storytelling",
    subtitle: "Share photos, earn creator rewards",
    description: "Share stunning visual content with AI-assisted moderation. Perfect for photographers, artists, and visual creators earning substantial QBP rewards.",
    benefits: [
      "Earn 25-200 QBP per quality media post",
      "AI-powered content moderation",
      "Stories and highlights features",
      "Creator monetization tools"
    ],
    features: [
      {
        icon: Eye,
        title: "Visual Discovery",
        description: "Explore trending content through an intuitive grid interface"
      },
      {
        icon: Sparkles,
        title: "Stories & Highlights",
        description: "Share temporary stories or save your best moments"
      },
      {
        icon: Shield,
        title: "AI Moderation",
        description: "Automated content screening for community safety"
      },
      {
        icon: Bitcoin,
        title: "Creator Earnings",
        description: "Highest QBP rewards for original visual content"
      }
    ],
    demo: {
      type: "visual",
      content: null
    },
    cta: {
      text: "Start Creating on Q Gram",
      href: "/register"
    }
  }
}

interface FeatureDemoModalProps {
  featureId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeatureDemoModal({ featureId, open, onOpenChange }: FeatureDemoModalProps) {
  const demo = featureDemos[featureId]

  if (!demo) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0 overflow-hidden bg-background">
        {/* Header */}
        <div className="relative border-b border-border bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 sm:p-8">
          <div className="absolute inset-0 bg-grid-white/5" />
          <DialogHeader className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge className="mb-3 bg-accent/20 text-accent border-accent/30">
                  Platform Demo
                </Badge>
                <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">
                  {demo.title}
                </DialogTitle>
                <DialogDescription className="text-base sm:text-lg text-muted-foreground">
                  {demo.subtitle}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {demo.description}
            </p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Key Benefits</h3>
            <div className="grid gap-3">
              {demo.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Features</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {demo.features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-accent/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <feature.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Demo Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Try It Out</h3>
            <div className="relative rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-accent/5 rounded-xl opacity-50" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                  <span className="text-lg font-semibold text-foreground">Experience {demo.title.split(":")[0]}</span>
                </div>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Create your free account to start using {demo.title.split(":")[0]} and earning QBP rewards immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
                  <Link href={demo.cta.href}>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25">
                      {demo.cta.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" onClick={() => onOpenChange(false)}>
                    Close Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* QBP Earning Info */}
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Bitcoin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Earn QBP Rewards</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every action you take earns Quantum Bit Points (QBP). Post content, engage with the community, and build your following to maximize your earnings. QBP can be converted to real value through the QuantumYield Exchange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
