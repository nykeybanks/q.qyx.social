"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Bitcoin,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Clock,
  TrendingUp,
  Gift,
  Zap,
  Settings,
  ExternalLink,
  Plus,
  Activity,
  Target,
  Users,
  Flame,
  Trophy,
  Share2,
  Copy,
  ChevronRight,
} from "lucide-react"
import type { VaultBalance, VaultTransaction, Wallet as WalletType } from "@/types/database"
import { useToast } from "@/hooks/use-toast"

interface VaultDashboardProps {
  balance: VaultBalance | null
  transactions: VaultTransaction[]
  wallets: WalletType[]
}

const earningMethods = [
  { name: "Content Creation", points: "+10-100", icon: Zap, description: "Create quality posts and media" },
  { name: "Engagement", points: "+1-10", icon: TrendingUp, description: "Like, comment, and share" },
  { name: "Daily Check-in", points: "+5", icon: Gift, description: "Log in every day" },
  { name: "Referrals", points: "+50", icon: ArrowUpRight, description: "Invite friends to join" },
  { name: "Monthly Quests", points: "+100-500", icon: Trophy, description: "Complete special challenges" },
]

export function VaultDashboard({ balance, transactions, wallets }: VaultDashboardProps) {
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(balance?.auto_payout_enabled ?? true)
  const { toast } = useToast()

  const [dailyStreak, setDailyStreak] = useState(7)
  const dailyGoal = 100
  const todayEarned = 67
  const progressPercent = (todayEarned / dailyGoal) * 100

  const formatPoints = (points: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(points)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earn":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />
      case "spend":
      case "withdraw":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "earn":
        return "text-green-500"
      case "spend":
      case "withdraw":
        return "text-red-500"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Enhanced with gradient and better mobile spacing */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              QBP Vault
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Quantum Bit Points</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-border text-xs sm:text-sm hover:bg-accent/5 hover:border-accent/50 touch-manipulation transition-all active:scale-95"
            >
              <Settings className="mr-0 sm:mr-1.5 h-4 w-4" />
              <span className="hidden xs:inline">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        <Card className="border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <CardHeader className="relative p-4 sm:p-6">
            <CardDescription className="flex items-center gap-2 text-xs sm:text-sm">
              <Bitcoin className="h-3 w-3 sm:h-4 sm:w-4 text-accent animate-pulse" />
              Available Balance
            </CardDescription>
            <CardTitle className="text-2xl sm:text-4xl font-bold text-accent">
              {formatPoints(Number(balance?.bitcoin_points || 0))}
              <span className="text-base sm:text-lg font-normal text-muted-foreground ml-2">BP</span>
            </CardTitle>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Daily Goal Progress</span>
                <span className="text-accent font-medium">
                  {todayEarned}/{dailyGoal} BP
                </span>
              </div>
              <Progress value={progressPercent} className="h-2 bg-accent/20" />
            </div>
          </CardHeader>
          <CardContent className="relative p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="rounded-lg bg-background/50 backdrop-blur-sm p-2 sm:p-3 border border-border/50">
                <p className="text-[10px] xs:text-xs text-muted-foreground">Total Earned</p>
                <p className="text-sm sm:text-lg font-semibold text-foreground">
                  {formatPoints(Number(balance?.total_earned || 0))} BP
                </p>
              </div>
              <div className="rounded-lg bg-background/50 backdrop-blur-sm p-2 sm:p-3 border border-border/50">
                <p className="text-[10px] xs:text-xs text-muted-foreground">Mining Credits</p>
                <p className="text-sm sm:text-lg font-semibold text-foreground">
                  {formatPoints(Number(balance?.mining_credits || 0))} MC
                </p>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3">
              <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-xs sm:text-sm h-9 sm:h-10">
                <ArrowUpRight className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                Withdraw
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent border-border text-xs sm:text-sm h-9 sm:h-10">
                <ExternalLink className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                Exchange
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-transparent overflow-hidden relative">
          <div className="absolute right-0 top-0 h-full w-24 bg-orange-500/5 blur-2xl" />
          <CardContent className="relative p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Streak</p>
                <p className="text-2xl font-bold text-orange-500">{dailyStreak} Days</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/30">
              +{dailyStreak * 5} BP Bonus
            </Badge>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="earn" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-secondary text-xs sm:text-sm">
            <TabsTrigger value="earn">Earn</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="referrals">Refer</TabsTrigger>
          </TabsList>

          {/* Earn Tab */}
          <TabsContent value="earn" className="mt-3 sm:mt-4 space-y-4 sm:space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">How to Earn</CardTitle>
                <CardDescription>Complete activities to earn Bitcoin Points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {earningMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:bg-accent/5 hover:border-accent/30 hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <method.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-accent/10 text-accent font-mono">
                        {method.points}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Achievement Goals
                </CardTitle>
                <CardDescription>Complete goals to unlock bonus rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "First Post", progress: 100, reward: "+10 BP", completed: true },
                  { name: "10 Posts", progress: 70, reward: "+50 BP", completed: false },
                  { name: "100 Likes", progress: 45, reward: "+100 BP", completed: false },
                ].map((goal, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {goal.completed && <Trophy className="h-4 w-4 text-accent" />}
                        <span className={`text-sm font-medium ${goal.completed ? "text-accent" : ""}`}>
                          {goal.name}
                        </span>
                      </div>
                      <Badge variant={goal.completed ? "default" : "secondary"}>{goal.reward}</Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Auto Payout Settings */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Auto Payout
                </CardTitle>
                <CardDescription>Automatically receive your earnings daily</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-payout" className="text-foreground">
                      Enable Auto Payout
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Daily at {balance?.auto_payout_time || "5:00 PM"} your timezone
                    </p>
                  </div>
                  <Switch id="auto-payout" checked={autoPayoutEnabled} onCheckedChange={setAutoPayoutEnabled} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-3 sm:mt-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Transaction History</CardTitle>
                <CardDescription>Your recent vault activity</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Activity className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No transactions yet</p>
                    <p className="text-sm text-muted-foreground">Start earning to see your history</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                          {getTransactionIcon(tx.transaction_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground capitalize">{tx.transaction_type}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {tx.source || "System"} •{" "}
                            {formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <p className={`font-semibold ${getTransactionColor(tx.transaction_type)}`}>
                          {tx.transaction_type === "earn" ? "+" : "-"}
                          {formatPoints(Number(tx.amount))} BP
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallets Tab */}
          <TabsContent value="wallets" className="mt-3 sm:mt-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Connected Wallets</CardTitle>
                    <CardDescription>Manage your Web3 wallets</CardDescription>
                  </div>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Plus className="mr-1.5 h-4 w-4" />
                    Connect
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {wallets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Wallet className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No wallets connected</p>
                    <p className="text-sm text-muted-foreground">Connect a wallet to withdraw your earnings</p>
                    <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {wallets.map((wallet) => (
                      <div key={wallet.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                          <Wallet className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-sm text-foreground truncate">{wallet.wallet_address}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {wallet.wallet_type} • Connected{" "}
                            {formatDistanceToNow(new Date(wallet.connected_at), { addSuffix: true })}
                          </p>
                        </div>
                        {wallet.is_primary && (
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            Primary
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* QuantumYield Integration */}
            <Card className="mt-4 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  QuantumYield Exchange
                </CardTitle>
                <CardDescription>Transfer points directly to your QuantumYield account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Connect to QuantumYield
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="mt-3 sm:mt-4 space-y-4">
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Referral Program
                </CardTitle>
                <CardDescription>Earn 50 BP for each friend you invite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
                  <div className="flex gap-2">
                    <code className="flex-1 rounded bg-secondary px-3 py-2 text-xs sm:text-sm font-mono truncate">
                      https://qsocial.app/ref/USER123
                    </code>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText("https://qsocial.app/ref/USER123")
                        toast({ title: "Copied!", description: "Referral link copied to clipboard" })
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-bold text-accent">12</p>
                    <p className="text-xs text-muted-foreground mt-1">Friends Joined</p>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-bold text-accent">600</p>
                    <p className="text-xs text-muted-foreground mt-1">BP Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
