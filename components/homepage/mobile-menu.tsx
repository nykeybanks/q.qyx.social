"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ArrowRight, Zap, Shield, Users, Sparkles, Bitcoin, Star, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { label: "Platforms", href: "#platforms", icon: Zap, color: "text-accent" },
    { label: "Features", href: "#features", icon: Sparkles, color: "text-accent" },
    { label: "About", href: "#about", icon: Shield, color: "text-green-500" },
    { label: "Community", href: "#community", icon: Users, color: "text-champagne" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden h-9 w-9 touch-manipulation active:scale-90 transition-transform hover:bg-accent/5"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm bg-background/98 backdrop-blur-xl border-border mobile-safe-right">
        <SheetHeader className="text-left mb-8">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Q Social
          </SheetTitle>
          <p className="text-sm text-muted-foreground">Web3-native social ecosystem</p>
        </SheetHeader>

        <nav className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Navigation Links */}
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-4 py-3.5",
                  "text-base font-medium transition-all duration-200",
                  "hover:bg-accent/10 hover:text-accent hover:scale-[1.02]",
                  "active:scale-95 touch-manipulation",
                  "border border-transparent hover:border-accent/20"
                )}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: "slideInFromBottom 0.3s ease-out both"
                }}
              >
                <item.icon className={cn("h-5 w-5 transition-transform", item.color)} />
                <span className="flex-1">{item.label}</span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all active:scale-95 touch-manipulation h-12 text-base font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/30"
                size="lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button 
                variant="outline" 
                className="w-full touch-manipulation h-12 text-base font-medium hover:bg-accent/5 hover:border-accent/50 transition-all active:scale-95 bg-transparent"
                size="lg"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Platform Badges */}
          <div className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-accent" />
              Platforms
            </p>
            <div className="flex flex-wrap gap-2">
              {["Q-Vibes", "Q-Circles", "Q-Gram", "QNEKTn"].map((platform) => (
                <div
                  key={platform}
                  className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>

          {/* Welcome Bonus Badge */}
          <div className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Star className="h-5 w-5 text-accent animate-pulse" />
              <p className="font-semibold text-foreground">Welcome Bonus</p>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Get 100 Quantum Bit Points (QBP) when you join
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Start earning immediately</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-accent" />
              <span>Verified human community</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Bitcoin className="h-4 w-4 text-accent" />
              <span>Earn crypto rewards daily</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>100% free to join</span>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
