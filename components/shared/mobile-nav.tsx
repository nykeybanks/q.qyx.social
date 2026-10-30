"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { QThreadsIcon, QCirclesIcon, QGramIcon, VaultIcon } from "@/components/icons/q-logo"
import { Home, Search, Plus, Bell, User, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu } from "lucide-react"
import type { Profile, VaultBalance } from "@/types/database"
import { useState } from "react"

interface MobileNavProps {
  profile: Profile | null
  vaultBalance: VaultBalance | null
  onSignOut: () => void
}

const navItems = [
  { name: "Home", href: "/threads", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Vault", href: "/vault", icon: VaultIcon },
  { name: "Notifications", href: "/notifications", icon: Bell },
]

export function MobileNav({ profile, vaultBalance, onSignOut }: MobileNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isComposePulsing, setIsComposePulsing] = useState(true)

  const formatPoints = (points: number) => {
    if (points >= 1000000) return `${(points / 1000000).toFixed(2)}M`
    if (points >= 1000) return `${(points / 1000).toFixed(1)}K`
    return points.toFixed(2)
  }

  return (
    <>
      {/* Top Mobile Header - Enhanced with safe areas */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-md px-3 sm:px-4 py-3 md:hidden mobile-safe-top">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 touch-ripple">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm bg-sidebar mobile-safe-left">
            <SheetHeader className="text-left">
              <SheetTitle className="text-lg sm:text-xl font-bold text-foreground">Menu</SheetTitle>
              <SheetDescription className="text-xs sm:text-sm text-muted-foreground">
                Navigate through Q Social
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4 sm:space-y-6">
              {/* Profile Section - Enhanced */}
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-3">
                <Avatar className="h-12 w-12 border-2 border-accent">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {profile?.display_name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{profile?.display_name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">@{profile?.username || "username"}</p>
                </div>
              </div>

              {/* Vault Balance - Enhanced with animation */}
              {vaultBalance && (
                <Link href="/vault" onClick={() => setOpen(false)}>
                  <div className="rounded-lg border border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 p-4 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Bitcoin Points</p>
                        <p className="text-2xl font-bold text-accent">
                          {formatPoints(Number(vaultBalance.bitcoin_points))}
                        </p>
                      </div>
                      <VaultIcon className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                </Link>
              )}

              {/* Platform Links - Enhanced touch targets */}
              <div className="space-y-1">
                <p className="mb-2 px-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Platforms
                </p>
                <Link
                  href="/threads"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all hover:bg-secondary touch-ripple"
                >
                  <QThreadsIcon className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Q Threads</span>
                </Link>
                <Link
                  href="/circles"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all hover:bg-secondary touch-ripple"
                >
                  <QCirclesIcon className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Q Circles</span>
                </Link>
                <Link
                  href="/gram"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all hover:bg-secondary touch-ripple"
                >
                  <QGramIcon className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Q Gram</span>
                </Link>
              </div>

              {/* Menu Links - Enhanced */}
              <div className="space-y-1 border-t border-border pt-4">
                <Link
                  href={`/profile/${profile?.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:bg-secondary touch-ripple"
                >
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/bookmarks"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:bg-secondary touch-ripple"
                >
                  <span>Bookmarks</span>
                </Link>
                <Link
                  href="/messages"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:bg-secondary touch-ripple"
                >
                  <span>Messages</span>
                </Link>
                <Link
                  href="/settings/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:bg-secondary touch-ripple"
                >
                  <span>Settings</span>
                </Link>
              </div>

              {/* Sign Out - Enhanced */}
              <Button
                onClick={() => {
                  onSignOut()
                  setOpen(false)
                }}
                variant="destructive"
                className="w-full touch-ripple"
                size="lg"
              >
                Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/threads" className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-bold text-foreground">Q Social</span>
        </Link>

        {/* Profile Avatar */}
        <Link href={`/profile/${profile?.id}`} className="touch-ripple rounded-full">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-muted text-xs text-muted-foreground">
              {profile?.display_name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </header>

      {/* Bottom Mobile Navigation - Enhanced with safe areas */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/98 backdrop-blur-xl md:hidden mobile-safe-bottom">
        <div
          className="absolute bottom-2 h-12 rounded-full transition-all duration-700 ease-out"
          style={{
            width: "60px",
            left: `calc(${(activeIndex * 100) / navItems.length}% + ${100 / navItems.length / 2}% - 30px)`,
            background:
              "linear-gradient(90deg, rgba(201, 184, 118, 0.2), rgba(201, 184, 118, 0.4), rgba(201, 184, 118, 0.2))",
            filter: "blur(16px)",
          }}
        />

        <div className="relative flex items-center justify-around px-2 py-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href)

            if (isActive && activeIndex !== index) {
              setActiveIndex(index)
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 rounded-xl px-4 py-2.5 transition-all duration-300 touch-manipulation min-w-[64px]",
                  "active:scale-90",
                  isActive ? "text-accent scale-105" : "text-muted-foreground hover:text-foreground hover:bg-accent/5",
                )}
                onClick={(e) => {
                  const element = e.currentTarget
                  element.style.transform = "scale(0.85)"
                  element.style.transition = "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)"
                  setTimeout(() => {
                    element.style.transform = ""
                    element.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }, 100)
                }}
              >
                {isActive && (
                  <>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(201,184,118,0.6)]" />
                    <div className="absolute inset-0 rounded-xl bg-accent/5 animate-pulse" />
                  </>
                )}

                {/* Enhanced icon with bounce animation and glow effect */}
                <div className={cn("relative transition-all duration-300", isActive && "animate-bounce-subtle")}>
                  <item.icon
                    className={cn(
                      "h-6 w-6 transition-all duration-300",
                      isActive && "scale-110",
                    )}
                  />

                  {item.name === "Notifications" && (
                    <div className="absolute -top-1 -right-1">
                      <span className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-destructive animate-ping opacity-75" />
                      <span className="relative block h-2 w-2 rounded-full bg-destructive border border-background" />
                    </div>
                  )}
                </div>

                <span
                  className={cn(
                    "text-[10px] font-medium transition-all duration-300",
                    isActive ? "opacity-100 scale-100 font-semibold" : "opacity-70 scale-95",
                  )}
                >
                  {item.name}
                </span>

                <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <span className="absolute inset-0 bg-accent/10 scale-0 rounded-full transition-transform duration-700 ease-out" />
                </span>
              </Link>
            )
          })}
        </div>

        <Link
          href="/threads"
          className="absolute -top-7 left-1/2 -translate-x-1/2 group"
          onMouseEnter={() => setIsComposePulsing(false)}
          onMouseLeave={() => setIsComposePulsing(true)}
          onClick={(e) => {
            const element = e.currentTarget
            element.style.transform = "translate(-50%, 0) scale(0.85)"
            element.style.transition = "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)"
            setTimeout(() => {
              element.style.transform = "translate(-50%, 0) scale(1.05)"
              setTimeout(() => {
                element.style.transform = "translate(-50%, 0)"
              }, 100)
            }, 150)
          }}
        >
          {isComposePulsing && (
            <>
              <div
                className="absolute inset-0 rounded-full bg-accent/20 animate-ping"
                style={{ animationDuration: "2s" }}
              />
              <div
                className="absolute inset-0 rounded-full bg-accent/15 animate-ping"
                style={{ animationDuration: "2.5s", animationDelay: "0.3s" }}
              />
              <div
                className="absolute inset-0 rounded-full bg-accent/10 animate-pulse"
                style={{ animationDuration: "3s" }}
              />
            </>
          )}

          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent via-accent to-accent/80 text-accent-foreground shadow-2xl shadow-accent/50 transition-all duration-300 hover:shadow-accent/70 hover:rotate-90 active:scale-95 ring-4 ring-background group-hover:ring-accent/20">
            <Plus className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90" />

            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_2s_ease-in-out_infinite]" />

            <div
              className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-accent via-white/50 to-accent bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>

          <Sparkles
            className="absolute -top-1 -right-1 h-4 w-4 text-accent opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-300"
            style={{ animationDuration: "2s" }}
          />
          <Sparkles className="absolute -top-1 -left-1 h-3 w-3 text-accent/70 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75" />
          <TrendingUp className="absolute -bottom-1 -left-1 h-3 w-3 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-[-2px]" />
          <TrendingUp className="absolute -bottom-1 -right-1 h-3 w-3 text-accent/70 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
        </Link>
      </nav>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(201, 184, 118, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(201, 184, 118, 0.6);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        /* Touch feedback optimization */
        @media (hover: none) and (pointer: coarse) {
          .touch-manipulation {
            -webkit-tap-highlight-color: rgba(201, 184, 118, 0.1);
            tap-highlight-color: rgba(201, 184, 118, 0.1);
          }
        }
        
        /* Smooth scrolling for iOS */
        @supports (-webkit-touch-callout: none) {
          nav {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </>
  )
}
