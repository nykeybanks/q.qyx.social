"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp, Flame, User, Sparkles, Award, Zap, Target } from "lucide-react"

export function InteractiveDemo() {
  const [vaultBalance, setVaultBalance] = useState(2547.89)
  const [dailyEarnings, setDailyEarnings] = useState(125.5)
  const [streak, setStreak] = useState(7)
  const [showReward, setShowReward] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [progress, setProgress] = useState(75)
  const [achievements, setAchievements] = useState<string[]>([])

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVaultBalance((prev) => prev + Math.random() * 0.5)
      setDailyEarnings((prev) => prev + Math.random() * 0.1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleEarnClick = () => {
    const earnAmount = Math.random() * 10 + 5
    setVaultBalance((prev) => prev + earnAmount)
    setDailyEarnings((prev) => prev + earnAmount)
    setClicks((prev) => prev + 1)
    setProgress((prev) => Math.min(100, prev + 5))

    setShowReward(true)
    setTimeout(() => setShowReward(false), 1500)

    // Unlock achievements
    if (clicks === 4 && !achievements.includes("first-5")) {
      setAchievements((prev) => [...prev, "first-5"])
    }
    if (clicks === 9 && !achievements.includes("first-10")) {
      setAchievements((prev) => [...prev, "first-10"])
    }
    if (progress >= 100 && !achievements.includes("goal-reached")) {
      setAchievements((prev) => [...prev, "goal-reached"])
    }
  }

  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      {/* Interactive Vault Demo */}
      <div className="group relative rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8 overflow-hidden transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Real-Time Vault</h3>
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-green-500 font-medium">Live</span>
            </div>
          </div>

          {/* Animated vault balance */}
          <div className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 p-4 sm:p-6 border border-accent/20 relative overflow-hidden group/card">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm text-muted-foreground">Bitcoin Points</span>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span className="text-xs text-green-500">+{dailyEarnings.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 relative">
                <span className="tabular-nums">{vaultBalance.toFixed(2)}</span>
                {showReward && (
                  <div className="absolute -top-6 right-0 animate-float-up">
                    <span className="text-lg font-bold text-accent">+{Math.floor(Math.random() * 10 + 5)}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border/50 space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Daily Streak</span>
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 animate-pulse" />
                    <span className="font-semibold">{streak} days</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Next Payout</span>
                  <span className="font-semibold text-accent">5:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Total Clicks</span>
                  <span className="font-semibold text-accent">{clicks}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Daily Goal
                  </span>
                  <span className="font-semibold text-accent">{progress}%</span>
                </div>
                <div className="h-2 bg-accent/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>

              {/* Interactive Button */}
              <Button
                onClick={handleEarnClick}
                className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/20 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4 transition-transform" />
                  Click to Earn
                  <Sparkles className="h-4 w-4 group-hover:rotate-[-12deg] transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </Button>

              {/* Achievements */}
              {achievements.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs animate-in zoom-in-95"
                    >
                      <Award className="h-3 w-3 text-accent" />
                      <span className="text-accent font-medium">
                        {achievement === "first-5" && "5 Clicks!"}
                        {achievement === "first-10" && "10 Clicks!"}
                        {achievement === "goal-reached" && "Goal Reached!"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Feed Demo */}
      <div className="group relative rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8 overflow-hidden transition-all hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Infinite Scroll Feed</h3>

          {/* Simulated feed posts with staggered animations */}
          <div className="space-y-3 max-h-64 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card/50 p-3 sm:p-4 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 cursor-pointer group/post animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${i * 100}ms`, animationDuration: "500ms" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center group-hover/post:scale-110 transition-transform">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="h-3 bg-muted rounded w-20 sm:w-24 mb-1 animate-pulse" />
                    <div
                      className="h-2 bg-muted/50 rounded w-12 sm:w-16 animate-pulse"
                      style={{ animationDelay: "200ms" }}
                    />
                  </div>
                  <div className="opacity-0 group-hover/post:opacity-100 transition-opacity">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-muted/50 rounded w-full animate-pulse" style={{ animationDelay: "400ms" }} />
                  <div className="h-2 bg-muted/50 rounded w-4/5 animate-pulse" style={{ animationDelay: "600ms" }} />
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="hover:text-accent transition-colors">❤️ Like</button>
                  <button className="hover:text-accent transition-colors">💬 Reply</button>
                  <button className="hover:text-accent transition-colors">🔁 Repost</button>
                </div>
              </div>
            ))}
            <div className="text-center py-3">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-4 w-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <span>Loading more posts...</span>
              </div>
            </div>
          </div>

          {/* Interaction hint */}
          <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-xs text-center text-muted-foreground">
              <span className="font-medium text-accent">💡 Try hovering</span> over the posts to see interactions!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
