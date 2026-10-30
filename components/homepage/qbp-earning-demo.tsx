"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Zap,
  TrendingUp,
  Users,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Gift,
  Award,
  BarChart3,
  MessageSquare,
  UserPlus,
  Flame,
} from "lucide-react"
import Link from "next/link"

type EarningMethod = {
  id: string
  icon: typeof Zap
  title: string
  description: string
  reward: string
  modalContent: {
    subtitle: string
    benefits: string[]
    howItWorks: { step: string; description: string }[]
    tips: string[]
    examples: { title: string; description: string; reward: string }[]
  }
}

const earningMethods: EarningMethod[] = [
  {
    id: "posting",
    icon: Zap,
    title: "Posting & Engagement",
    description: "Create quality posts, replies, and interact with the community",
    reward: "+10-100 QBP per post",
    modalContent: {
      subtitle: "Earn rewards for every quality post and engagement",
      benefits: [
        "Earn QBP for every original post you create",
        "Bonus rewards for high-engagement content",
        "Additional points for likes, reposts, and replies",
        "Daily posting streaks multiply your rewards",
      ],
      howItWorks: [
        {
          step: "Create Content",
          description: "Write original posts, share insights, or create engaging discussions on Q Vibes",
        },
        {
          step: "Get Engagement",
          description: "Receive likes, comments, and reposts from the community",
        },
        {
          step: "Earn QBP",
          description: "Automatically receive QBP based on post quality and engagement metrics",
        },
      ],
      tips: [
        "Post during peak hours for maximum visibility",
        "Use relevant categories to reach your target audience",
        "Include media (images, videos) for higher engagement",
        "Maintain a consistent posting schedule for streak bonuses",
      ],
      examples: [
        {
          title: "Viral Post",
          description: "A well-crafted post with 100+ likes and 50+ replies",
          reward: "100 QBP",
        },
        {
          title: "Quality Discussion",
          description: "Thoughtful post sparking meaningful conversation",
          reward: "50 QBP",
        },
        {
          title: "Daily Post",
          description: "Regular post with moderate engagement",
          reward: "10-25 QBP",
        },
      ],
    },
  },
  {
    id: "replies",
    icon: TrendingUp,
    title: "Quality Replies",
    description: "Engage thoughtfully with meaningful comments and discussions",
    reward: "+5-25 QBP per reply",
    modalContent: {
      subtitle: "Contribute to discussions and earn rewards for quality replies",
      benefits: [
        "Earn QBP for every thoughtful reply",
        "Higher rewards for replies with engagement",
        "Build reputation through quality contributions",
        "Get featured in top replies for bonus rewards",
      ],
      howItWorks: [
        {
          step: "Find Discussions",
          description: "Browse trending topics and posts in your areas of interest",
        },
        {
          step: "Add Value",
          description: "Write meaningful replies that contribute to the conversation",
        },
        {
          step: "Get Rewarded",
          description: "Receive QBP based on reply quality and engagement received",
        },
      ],
      tips: [
        "Add unique insights or perspectives to discussions",
        "Use proper formatting and clear language",
        "Reference sources when sharing information",
        "Reply early to trending posts for more visibility",
      ],
      examples: [
        {
          title: "Expert Analysis",
          description: "Detailed reply with sources and insights (20+ likes)",
          reward: "25 QBP",
        },
        {
          title: "Helpful Response",
          description: "Useful reply that answers questions (5-10 likes)",
          reward: "15 QBP",
        },
        {
          title: "Quick Engagement",
          description: "Brief but valuable contribution to discussion",
          reward: "5-10 QBP",
        },
      ],
    },
  },
  {
    id: "referrals",
    icon: Users,
    title: "Referrals",
    description: "Invite friends and earn rewards when they join",
    reward: "+50 QBP per referral",
    modalContent: {
      subtitle: "Grow Q Social and earn rewards for bringing new members",
      benefits: [
        "Earn 50 QBP for each successful referral",
        "Get 10% of your referrals' earnings for 30 days",
        "Unlock exclusive referral badges and achievements",
        "Access to special referral leaderboards",
      ],
      howItWorks: [
        {
          step: "Share Your Link",
          description: "Get your unique referral link from your profile settings",
        },
        {
          step: "Invite Friends",
          description: "Share your link via social media, email, or direct messages",
        },
        {
          step: "Earn Together",
          description: "Receive instant 50 QBP when they sign up, plus bonus earnings",
        },
      ],
      tips: [
        "Share why you love Q Social in your invitation",
        "Post your referral link on other social platforms",
        "Engage with your referrals to help them get started",
        "Join referral campaigns for multiplied rewards",
      ],
      examples: [
        {
          title: "10 Referrals",
          description: "Invite 10 friends who all sign up and start posting",
          reward: "500 QBP + 30-day bonus",
        },
        {
          title: "Active Referral",
          description: "Friend earns 1000 QBP in first month (you get 10%)",
          reward: "50 QBP + 100 QBP bonus",
        },
        {
          title: "Single Referral",
          description: "One friend signs up and verifies their account",
          reward: "50 QBP",
        },
      ],
    },
  },
  {
    id: "quests",
    icon: Trophy,
    title: "Monthly Quests",
    description: "Complete special challenges and earn bonus rewards",
    reward: "+100-500 QBP per quest",
    modalContent: {
      subtitle: "Take on exciting challenges and unlock massive rewards",
      benefits: [
        "Complete themed monthly challenges",
        "Earn up to 500 QBP per quest",
        "Unlock exclusive badges and achievements",
        "Compete on quest leaderboards for extra rewards",
      ],
      howItWorks: [
        {
          step: "Check Quests",
          description: "Visit the Quests tab to see available monthly challenges",
        },
        {
          step: "Complete Tasks",
          description: "Follow quest requirements (post X times, engage Y users, etc.)",
        },
        {
          step: "Claim Rewards",
          description: "Automatically receive QBP and badges upon completion",
        },
      ],
      tips: [
        "Start quests early in the month for more time",
        "Focus on quests that match your activity style",
        "Some quests have bonus multipliers on weekends",
        "Track your progress in the Quests dashboard",
      ],
      examples: [
        {
          title: "Content Creator",
          description: "Post 30 times in a month with 10+ likes each",
          reward: "500 QBP + Creator Badge",
        },
        {
          title: "Community Builder",
          description: "Reply to 100 posts with quality contributions",
          reward: "300 QBP + Builder Badge",
        },
        {
          title: "Explorer",
          description: "Join 5 new Circles and engage in each",
          reward: "100 QBP + Explorer Badge",
        },
      ],
    },
  },
]

export function QBPEarningDemo() {
  const [selectedMethod, setSelectedMethod] = useState<EarningMethod | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {earningMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method)}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/10 cursor-pointer active:scale-98"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-all group-hover:scale-110">
                <method.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{method.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <p className="font-semibold text-accent">{method.reward}</p>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modal */}
      <Dialog open={!!selectedMethod} onOpenChange={() => setSelectedMethod(null)}>
        {selectedMethod && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                  <selectedMethod.icon className="h-7 w-7 text-accent" />
                </div>
                <div className="flex-1">
                  <Badge className="mb-2 bg-accent/20 text-accent border-accent/30">Earning Method</Badge>
                  <DialogTitle className="text-2xl sm:text-3xl font-bold">
                    {selectedMethod.title}
                  </DialogTitle>
                  <DialogDescription className="text-base sm:text-lg mt-2">
                    {selectedMethod.modalContent.subtitle}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-8 py-4">
              {/* Reward Highlight */}
              <div className="rounded-xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Potential Earnings</p>
                <p className="text-3xl sm:text-4xl font-bold text-accent">{selectedMethod.reward}</p>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Key Benefits
                </h3>
                <div className="grid gap-3">
                  {selectedMethod.modalContent.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10"
                    >
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  How It Works
                </h3>
                <div className="space-y-4">
                  {selectedMethod.modalContent.howItWorks.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{step.step}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-accent" />
                  Pro Tips
                </h3>
                <div className="grid gap-2">
                  {selectedMethod.modalContent.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Real Examples
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {selectedMethod.modalContent.examples.map((example, index) => (
                    <div key={index} className="rounded-lg border border-border bg-card p-4">
                      <h4 className="font-semibold text-foreground mb-2">{example.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{example.description}</p>
                      <div className="pt-3 border-t border-border">
                        <p className="text-sm font-bold text-accent">{example.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Ready to Start Earning?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join Q Social today and start earning QBP with every interaction
                </p>
                <Link href="/register">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
