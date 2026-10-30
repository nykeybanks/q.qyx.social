"use client"

import { Bitcoin, TrendingUp, Wallet, ArrowUpRight, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface VaultStatsProps {
  bitcoinPoints: number
  miningCredits: number
  totalEarned: number
  totalWithdrawn: number
  lastPayoutAt?: string
}

export function VaultStats({
  bitcoinPoints,
  miningCredits,
  totalEarned,
  totalWithdrawn,
  lastPayoutAt,
}: VaultStatsProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(num)
  }

  const stats = [
    {
      icon: Bitcoin,
      label: "Bitcoin Points",
      value: formatNumber(bitcoinPoints),
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: TrendingUp,
      label: "Mining Credits",
      value: formatNumber(miningCredits),
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: ArrowUpRight,
      label: "Total Earned",
      value: formatNumber(totalEarned),
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Wallet,
      label: "Total Withdrawn",
      value: formatNumber(totalWithdrawn),
      color: "text-champagne",
      bgColor: "bg-champagne/10",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Balance Card */}
      <Card className="relative overflow-hidden border-accent/20 bg-gradient-to-br from-accent/5 to-background p-6 sm:p-8">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">Available Balance</p>
          <div className="flex items-baseline gap-2">
            <Bitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            <span className="text-3xl sm:text-5xl font-bold text-foreground">{formatNumber(bitcoinPoints)}</span>
            <span className="text-base sm:text-xl text-muted-foreground">BTC-P</span>
          </div>
          {lastPayoutAt && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-4">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Last payout: {new Date(lastPayoutAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 sm:p-6 hover:border-accent/30 transition-colors">
            <div className="space-y-2 sm:space-y-3">
              <div className={`inline-flex p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Button variant="outline" className="w-full h-12 sm:h-14 bg-transparent" asChild>
          <Link href="/vault/withdraw">
            <Wallet className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Withdraw
          </Link>
        </Button>
        <Button variant="outline" className="w-full h-12 sm:h-14 bg-transparent" asChild>
          <Link href="/vault/history">
            <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            View History
          </Link>
        </Button>
      </div>
    </div>
  )
}
