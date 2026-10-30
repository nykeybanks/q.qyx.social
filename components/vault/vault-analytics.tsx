"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Award, Target } from "lucide-react"

interface VaultAnalyticsProps {
  totalEarned: number
  thisWeekEarned: number
  thisMonthEarned: number
  averageDaily: number
  topSource: string
  streak: number
}

export function VaultAnalytics({
  totalEarned,
  thisWeekEarned,
  thisMonthEarned,
  averageDaily,
  topSource,
  streak,
}: VaultAnalyticsProps) {
  return (
    <Card className="border-border bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          Earning Analytics
        </CardTitle>
        <CardDescription>Your earning insights and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-secondary/50 p-3 xs:p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs xs:text-sm">This Week</span>
            </div>
            <p className="text-lg xs:text-xl font-bold text-green-500">+{thisWeekEarned.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {((thisWeekEarned / totalEarned) * 100).toFixed(1)}% of total
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/50 p-3 xs:p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs xs:text-sm">This Month</span>
            </div>
            <p className="text-lg xs:text-xl font-bold text-accent">+{thisMonthEarned.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {((thisMonthEarned / totalEarned) * 100).toFixed(1)}% of total
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/50 p-3 xs:p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs xs:text-sm">Daily Avg</span>
            </div>
            <p className="text-lg xs:text-xl font-bold text-accent">{averageDaily.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Bitcoin Points/day</p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/50 p-3 xs:p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Award className="h-4 w-4" />
              <span className="text-xs xs:text-sm">Top Source</span>
            </div>
            <p className="text-lg xs:text-xl font-bold text-accent capitalize">{topSource}</p>
            <p className="text-xs text-muted-foreground mt-1">Main earning method</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
