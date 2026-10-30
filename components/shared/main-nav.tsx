"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { QLogo, QThreadsIcon, QCirclesIcon, QGramIcon, VaultIcon } from "@/components/icons/q-logo"
import { Button } from "@/components/ui/button"
import { Home, Search, Bell, Mail, User, Settings, LogOut, Wallet, Plus, Bookmark, TrendingUp, Zap, Sparkles, HelpCircle, Share2, Link as LinkIcon, CheckCircle2, Eye, EyeOff } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Profile, VaultBalance } from "@/types/database"
import { useState, useEffect, useRef } from "react"
import { ComposeDialog } from "@/components/shared/compose-dialog"
import { useSupabase } from "@/lib/supabase/client-provider"
import { useToast } from "@/hooks/use-toast"

interface MainNavProps {
  profile: Profile | null
  vaultBalance: VaultBalance | null
  onSignOut: () => void
}

const platformLinks = [
  {
    name: "Vibes",
    href: "/vibes",
    icon: QThreadsIcon,
    description: "Microblogging",
  },
  {
    name: "Circles",
    href: "/circles",
    icon: QCirclesIcon,
    description: "Communities",
  },
  {
    name: "Gram",
    href: "/gram",
    icon: QGramIcon,
    description: "Visual Media",
  },
]

const mainNavLinks = [
  { name: "Home", href: "/vibes", icon: Home, shortcut: "⌘H" },
  { name: "Explore", href: "/explore", icon: Search, shortcut: "⌘/" },
  { name: "Notifications", href: "/notifications", icon: Bell, shortcut: "⌘N" },
  { name: "Messages", href: "/messages", icon: Mail, shortcut: "⌘M" },
]

const secondaryNavLinks = [
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Vault", href: "/vault", icon: VaultIcon },
  { name: "Trending", href: "/trending", icon: TrendingUp },
]

const utilityLinks = [
  { name: "Invite Friends", href: "/invite", icon: Share2 },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
]

export function MainNav({ profile, vaultBalance, onSignOut }: MainNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = useSupabase()
  const { toast } = useToast()
  const [composeOpen, setComposeOpen] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [isOnline, setIsOnline] = useState(true)
  const [realtimeVaultBalance, setRealtimeVaultBalance] = useState(vaultBalance)
  const keyPressTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastKeyRef = useRef<string>("")

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for compose
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setComposeOpen(true)
        return
      }

      // Cmd/Ctrl + / for search
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault()
        router.push("/explore")
        return
      }

      // Cmd/Ctrl + H for home
      if ((e.metaKey || e.ctrlKey) && e.key === "h") {
        e.preventDefault()
        router.push("/vibes")
        return
      }

      // Cmd/Ctrl + N for notifications
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault()
        router.push("/notifications")
        return
      }

      // Cmd/Ctrl + M for messages
      if ((e.metaKey || e.ctrlKey) && e.key === "m") {
        e.preventDefault()
        router.push("/messages")
        return
      }

      // G + H for home (vim-style)
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        lastKeyRef.current = "g"
        if (keyPressTimeoutRef.current) {
          clearTimeout(keyPressTimeoutRef.current)
        }
        keyPressTimeoutRef.current = setTimeout(() => {
          lastKeyRef.current = ""
        }, 1000)
        return
      }

      if (lastKeyRef.current === "g" && !e.metaKey && !e.ctrlKey) {
        if (keyPressTimeoutRef.current) {
          clearTimeout(keyPressTimeoutRef.current)
        }
        if (e.key === "h") {
          router.push("/vibes")
        } else if (e.key === "n") {
          router.push("/notifications")
        } else if (e.key === "m") {
          router.push("/messages")
        } else if (e.key === "e") {
          router.push("/explore")
        }
        lastKeyRef.current = ""
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      if (keyPressTimeoutRef.current) {
        clearTimeout(keyPressTimeoutRef.current)
      }
    }
  }, [router])

  // Fetch unread counts and setup realtime subscriptions
  useEffect(() => {
    if (!profile?.id) return

    const fetchUnreadCounts = async () => {
      try {
        const { count: notificationCount } = await supabase
          .from("notifications")
          .select("id", { count: "exact" })
          .eq("user_id", profile.id)
          .eq("read", false)

        const { count: messageCount } = await supabase
          .from("messages")
          .select("id", { count: "exact" })
          .eq("recipient_id", profile.id)
          .eq("read", false)

        setUnreadNotifications(notificationCount || 0)
        setUnreadMessages(messageCount || 0)
      } catch (error) {
        console.error("[v0] Error fetching unread counts:", error)
      }
    }

    fetchUnreadCounts()

    // Setup realtime subscriptions for notifications
    const notificationChannel = supabase
      .channel(`notifications:${profile.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${profile.id}`,
        },
        () => {
          fetchUnreadCounts()
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error("[v0] Notification channel error")
        }
      })

    // Setup realtime subscription for vault updates
    const vaultChannel = supabase
      .channel(`vault:${profile.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "vault_balances",
          filter: `user_id=eq.${profile.id}`,
        },
        (payload) => {
          const newBalance = payload.new as VaultBalance
          setRealtimeVaultBalance(newBalance)
          const oldPoints = Number(vaultBalance?.bitcoin_points || 0)
          const newPoints = Number(newBalance.bitcoin_points)
          if (newPoints > oldPoints) {
            const earned = (newPoints - oldPoints).toFixed(2)
            toast({
              title: "QBP Earned! 🎉",
              description: `+${earned} Quantum Bit Points`,
              duration: 3000,
            })
          }
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error("[v0] Vault channel error")
        }
      })

    // Setup realtime subscription for messages
    const messageChannel = supabase
      .channel(`messages:${profile.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `recipient_id=eq.${profile.id}`,
        },
        () => {
          fetchUnreadCounts()
          toast({
            title: "New Message",
            description: "You have a new message",
            duration: 2000,
          })
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error("[v0] Message channel error")
        }
      })

    return () => {
      notificationChannel.unsubscribe()
      vaultChannel.unsubscribe()
      messageChannel.unsubscribe()
    }
  }, [profile?.id, supabase, vaultBalance, toast])

  // Online status monitoring
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)
    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  const formatPoints = (points: number) => {
    if (points >= 1000000) return `${(points / 1000000).toFixed(2)}M`
    if (points >= 1000) return `${(points / 1000).toFixed(1)}K`
    return points.toFixed(2)
  }

  const renderNavLink = (link: typeof mainNavLinks[0] | typeof secondaryNavLinks[0], showBadge = false, badgeCount = 0) => {
    const isActive = pathname === link.href || pathname.startsWith(link.href)
    const showNotificationBadge = (link.name === "Notifications" || link.name === "Messages") && badgeCount > 0

    return (
      <Link
        key={link.name}
        href={link.href}
        className={cn(
          "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95",
          isActive
            ? "bg-accent/10 text-accent shadow-sm border border-accent/20"
            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
        )}
        title={link.shortcut ? `${link.name} (${link.shortcut})` : link.name}
      >
        <div className="relative">
          <link.icon className={cn("h-5 w-5 transition-all", isActive && "scale-110")} />
          {showNotificationBadge && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-[9px] font-bold animate-pulse shadow-lg">
              {badgeCount > 9 ? "9+" : badgeCount}
            </Badge>
          )}
        </div>
        <span className="flex-1">{link.name}</span>
        {"shortcut" in link && link.shortcut && (
          <span className="hidden lg:inline text-xs text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors">
            {link.shortcut}
          </span>
        )}
        {link.name === "Vault" && realtimeVaultBalance && (
          <div className="flex items-center gap-1.5 ml-2">
            <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-bold text-accent transition-all group-hover:bg-accent/30">
              {formatPoints(Number(realtimeVaultBalance.bitcoin_points))}
            </span>
            <Zap className="h-3.5 w-3.5 text-accent animate-pulse" />
          </div>
        )}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full gradient-primary" />
        )}
      </Link>
    )
  }

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-border/50 bg-sidebar p-4 md:flex overflow-y-auto">
        {/* Logo Section */}
        <Link href="/vibes" className="mb-8 flex items-center gap-2.5 group hover:opacity-80 transition-opacity">
          <div className="relative">
            <div className="absolute inset-0 gradient-primary rounded-xl blur group-hover:blur-md transition-all opacity-20" />
            <QLogo className="relative h-9 w-9 text-accent drop-shadow-sm" />
          </div>
          <span className="text-xl font-bold text-foreground font-heading group-hover:gradient-text transition-all">Q Social</span>
        </Link>

        {/* Platform Switcher - Enhanced */}
        <div className="mb-6 space-y-2">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/70 mb-3 font-heading">Platforms</p>
          <div className="space-y-2">
            {platformLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-200 hover:scale-[1.02]",
                    isActive
                      ? "bg-accent/20 text-accent border border-accent/30 shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <link.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold font-heading">{link.name}</p>
                    <p className="text-xs text-muted-foreground/80">{link.description}</p>
                  </div>
                  {isActive && <Sparkles className="h-4 w-4 text-accent" />}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="mb-6 space-y-2">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/70 mb-3 font-heading">Main</p>
          <div className="space-y-1">
            {mainNavLinks.map((link) => renderNavLink(link, false, link.name === "Notifications" ? unreadNotifications : link.name === "Messages" ? unreadMessages : 0))}
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="mb-6 space-y-2 border-t border-border/30 pt-4">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/70 mb-3 font-heading">Discover</p>
          <div className="space-y-1">
            {secondaryNavLinks.map((link) => renderNavLink(link))}
          </div>
        </div>

        {/* Compose Button - Primary gradient deep blue → violet */}
        <Button
          onClick={() => setComposeOpen(true)}
          className="mb-6 w-full h-11 gradient-primary text-primary-foreground hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 active:scale-95 font-semibold rounded-2xl group/cta"
        >
          <Plus className="mr-2 h-5 w-5 group-hover/cta:rotate-90 transition-transform" />
          New Post
        </Button>

        {/* Utility Links */}
        <div className="mb-6 space-y-1 border-t border-border/30 pt-4">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/70 mb-3 font-heading">Tools</p>
          {utilityLinks.map((link) => renderNavLink(link))}
        </div>

        {/* User Profile Section - Enhanced */}
        <div className="mt-auto border-t border-border/30 pt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group w-full rounded-2xl p-3 transition-all duration-200 hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-border transition-all group-hover:border-accent shadow-sm">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-accent/20 text-accent font-bold font-heading">
                        {profile?.display_name?.[0] || profile?.username?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online Status Indicator */}
                    <div
                      className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar transition-all",
                        isOnline ? "bg-green-500 shadow-lg shadow-green-500/50" : "bg-muted-foreground"
                      )}
                      title={isOnline ? "Online" : "Offline"}
                    />
                  </div>
                  <div className="flex-1 overflow-hidden text-left">
                    <p className="truncate text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {profile?.display_name || profile?.username || "User"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">@{profile?.username || "username"}</p>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <TrendingUp className="h-4 w-4 text-accent" />
                  </div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-2">
                  <span>My Account</span>
                  {realtimeVaultBalance && (
                    <Badge variant="outline" className="w-fit text-xs font-bold">
                      <Zap className="h-3 w-3 mr-1" />
                      {formatPoints(Number(realtimeVaultBalance.bitcoin_points))} QBP
                    </Badge>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/profile/${profile?.id}`} className="cursor-pointer flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/vault" className="cursor-pointer flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Vault & Rewards</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} className="text-destructive cursor-pointer flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Compose Dialog */}
      <ComposeDialog open={composeOpen} onOpenChange={setComposeOpen} profile={profile} />
    </>
  )
}
