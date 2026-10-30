"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import {
  MessageCircle,
  Users,
  TrendingUp,
  CheckCircle,
  Crown,
  Send,
  DollarSign,
  Activity,
  Zap,
  ImageIcon,
  Grid,
  Link2,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Profile } from "@/types/database"

interface QProfileHeaderProps {
  profile: Profile & {
    vault_balances?: { bitcoin_points: number; mining_credits: number }[]
  }
  followerCount: number
  followingCount: number
  postCount: number
  engagementScore?: number
  qScore: number
  isVerified: boolean
  verificationLevel?: 1 | 2 | 3
  activePlatforms: Array<"vibes" | "circles" | "gram" | "qnektn">
  isOwnProfile: boolean
  onFollow?: () => void
  onMessage?: () => void
  onTip?: () => void
}

const platformIcons = {
  vibes: { icon: Activity, label: "Q-Vibes", color: "text-accent" },
  circles: { icon: Users, label: "Q-Circles", color: "text-champagne" },
  gram: { icon: ImageIcon, label: "Q-Gram", color: "text-pink-500" },
  qnektn: { icon: Link2, label: "QNEKTn", color: "text-green-500" },
}

export function QProfileHeader({
  profile,
  followerCount,
  followingCount,
  postCount,
  engagementScore = 75,
  qScore,
  isVerified,
  verificationLevel = 2,
  activePlatforms,
  isOwnProfile,
  onFollow,
  onMessage,
  onTip,
}: QProfileHeaderProps) {
  const [activeTab, setActiveTab] = useState("vibes")
  const qbpBalance = profile.vault_balances?.[0]?.bitcoin_points || 0

  // Calculate Q-Score color
  const getQScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500 bg-green-500/10 border-green-500/30"
    if (score >= 50) return "text-accent bg-accent/10 border-accent/30"
    if (score >= 30) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
    return "text-red-500 bg-red-500/10 border-red-500/30"
  }

  return (
    <div className="border-b border-border bg-card">
      {/* Cover Image Area */}
      <div className="relative h-32 sm:h-48 bg-gradient-to-br from-accent/20 via-accent/10 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      </div>

      {/* Profile Content */}
      <div className="relative px-4 sm:px-6">
        {/* Avatar and Action Buttons Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-16">
          {/* Avatar with Verification Badge */}
          <div className="relative">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background ring-2 ring-accent/20">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-accent/30 to-accent/10 text-2xl sm:text-4xl font-bold">
                {profile.display_name?.charAt(0) || profile.username?.charAt(0) || "Q"}
              </AvatarFallback>
            </Avatar>
            {/* Blue Q-Mark Verification Badge */}
            {isVerified && (
              <div
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent border-2 border-background shadow-lg"
                title={`Verified via Q-Scan Level ${verificationLevel}`}
              >
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="flex gap-2 pb-2">
              <Button
                onClick={onFollow}
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                size="sm"
              >
                <Users className="h-4 w-4" />
                Follow
              </Button>
              <Button
                onClick={onTip}
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 gap-2 bg-transparent"
                size="sm"
              >
                <DollarSign className="h-4 w-4 text-accent" />
                Q-Tip
              </Button>
              <Button
                onClick={onMessage}
                variant="outline"
                className="border-border hover:bg-secondary gap-2 bg-transparent"
                size="sm"
              >
                <Send className="h-4 w-4" />
                Message
              </Button>
            </div>
          )}
        </div>

        {/* Name, Q-ID, and Q-Score Section */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Name and Verified Badge */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {profile.display_name || profile.username}
              </h1>
              {verificationLevel === 3 && (
                <Badge className="bg-gradient-to-r from-accent to-yellow-500 text-white border-0 gap-1">
                  <Crown className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>

            {/* Q-Score Badge with Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-full border-2 px-3 py-1.5 backdrop-blur-sm cursor-help transition-all hover:scale-105",
                      getQScoreColor(qScore),
                    )}
                  >
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-bold">Q-Score: {qScore}</span>
                    <Info className="h-3 w-3 opacity-70" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-popover/95 backdrop-blur-sm border-accent/20">
                  <div className="space-y-2 p-2">
                    <p className="font-semibold text-foreground">Q-Score Breakdown:</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Verification Level: Up to 30 points</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Activity className="h-3 w-3 text-accent" />
                        <span>Account Longevity: Up to 20 points</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-champagne" />
                        <span>Engagement: Up to 25 points</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-accent" />
                        <span>Community Trust: Up to 25 points</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground italic mt-2">
                      Your Q-Score reflects your trustworthiness and standing in the Q Social ecosystem.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Q-ID */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-base">@{profile.username}.qid</span>
            {profile.verified_human && (
              <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-500 text-xs">
                Human Verified
              </Badge>
            )}
          </div>

          {/* Bio */}
          {profile.bio && <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">{profile.bio}</p>}
        </div>

        {/* Platform Icons Row with Clickable Links */}
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(platformIcons).map(([key, { icon: Icon, label, color }]) => {
            const isActive = activePlatforms.includes(key as keyof typeof platformIcons)
            const platformUrls = {
              vibes: `/profile/${profile.id}?tab=vibes`,
              circles: `/profile/${profile.id}?tab=circles`,
              gram: `/profile/${profile.id}?tab=gram`,
              qnektn: `/profile/${profile.id}?tab=qnektn`,
            }
            return (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={platformUrls[key as keyof typeof platformUrls]}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-lg border p-3 transition-all active:scale-95",
                        isActive
                          ? "border-accent/50 bg-accent/10 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                          : "border-border bg-secondary/50 opacity-50 hover:opacity-70",
                      )}
                    >
                      <Icon className={cn("h-5 w-5 transition-colors", isActive ? color : "text-muted-foreground")} />
                      <span className="text-[10px] text-muted-foreground font-medium">{label.split("-")[1]}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {isActive ? `View ${label} profile` : `${label} profile inactive`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4">
          <Card className="p-3 bg-card/50 border-border hover:border-accent/30 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Followers</span>
              <span className="text-xl sm:text-2xl font-bold text-foreground">{followerCount.toLocaleString()}</span>
            </div>
          </Card>
          <Card className="p-3 bg-card/50 border-border hover:border-accent/30 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Q-Bits</span>
              <span className="text-xl sm:text-2xl font-bold text-foreground">{postCount.toLocaleString()}</span>
            </div>
          </Card>
          <Card className="p-3 bg-card/50 border-border hover:border-accent/30 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Engagement</span>
              <span className="text-xl sm:text-2xl font-bold text-accent">{engagementScore}%</span>
            </div>
          </Card>
          <Card className="p-3 bg-card/50 border-border hover:border-accent/30 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">QBP Balance</span>
              <span className="text-xl sm:text-2xl font-bold text-accent">{qbpBalance.toLocaleString()}</span>
            </div>
          </Card>
        </div>

        {/* Platform Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto">
            <TabsTrigger
              value="vibes"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-4 py-3"
            >
              <Activity className="mr-2 h-4 w-4" />
              Q-Vibes
            </TabsTrigger>
            <TabsTrigger
              value="circles"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-4 py-3"
            >
              <Users className="mr-2 h-4 w-4" />
              Q-Circles
            </TabsTrigger>
            <TabsTrigger
              value="gram"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-4 py-3"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Q-Gram
            </TabsTrigger>
            <TabsTrigger
              value="qnektn"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-4 py-3"
            >
              <Link2 className="mr-2 h-4 w-4" />
              QNEKTn
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
