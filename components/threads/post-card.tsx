"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark, Flag, UserMinus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Post, Profile } from "@/types/database"
import { QMarkBadge } from "@/components/shared/q-mark-badge"

interface PostCardProps {
  post: Post & { profile?: Profile }
}

export function PostCard({ post }: PostCardProps) {
  const [profile, setProfile] = useState<Profile | null>(post.profile || null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.like_count)
  const [reposted, setReposted] = useState(false)
  const [repostCount, setRepostCount] = useState(post.repost_count)
  const [bookmarked, setBookmarked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [isReposting, setIsReposting] = useState(false)
  const supabase = useSupabase()

  // Fetch profile if not provided
  useEffect(() => {
    if (!post.profile && post.user_id) {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", post.user_id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data)
        })
    }
  }, [post.profile, post.user_id, supabase])

  const handleLike = async () => {
    if (isLiking) return

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    setIsLiking(true)
    const wasLiked = liked
    const previousCount = likeCount

    setLiked(!liked)
    setLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1))

    try {
      if (wasLiked) {
        await supabase.from("post_likes").delete().match({ user_id: user.id, post_id: post.id })
      } else {
        await supabase.from("post_likes").insert({ user_id: user.id, post_id: post.id })
      }
    } catch (error) {
      setLiked(wasLiked)
      setLikeCount(previousCount)
    } finally {
      setIsLiking(false)
    }
  }

  const handleRepost = async () => {
    if (isReposting) return

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    setIsReposting(true)
    const wasReposted = reposted
    const previousCount = repostCount

    setReposted(!reposted)
    setRepostCount((prev) => (wasReposted ? prev - 1 : prev + 1))

    try {
      if (wasReposted) {
        await supabase.from("reposts").delete().match({ user_id: user.id, post_id: post.id })
      } else {
        await supabase.from("reposts").insert({ user_id: user.id, post_id: post.id })
      }
    } catch (error) {
      setReposted(wasReposted)
      setRepostCount(previousCount)
    } finally {
      setIsReposting(false)
    }
  }

  const handleBookmark = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    if (bookmarked) {
      await supabase.from("bookmarks").delete().match({ user_id: user.id, post_id: post.id })
    } else {
      await supabase.from("bookmarks").insert({ user_id: user.id, post_id: post.id })
    }
    setBookmarked(!bookmarked)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post by @${profile?.username}`,
          text: post.content || "",
          url: `${window.location.origin}/vibes/${post.id}`,
        })
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/vibes/${post.id}`)
    }
  }

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  return (
    <article className="border-b border-border/50 p-3 sm:p-4 transition-all hover:bg-card/50 active:bg-card">
      <div className="flex gap-2 sm:gap-3">
        {/* Avatar - Touch optimized */}
        <Link 
          href={`/profile/${post.user_id}`} 
          className="flex-shrink-0 touch-manipulation active:scale-95 transition-transform"
        >
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-border hover:ring-accent/30 transition-all">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-accent/20 to-accent/10 text-accent font-semibold font-heading">
              {profile?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
              <Link href={`/profile/${post.user_id}`} className="flex items-center gap-1.5 hover:underline group">
                <span className="font-semibold text-foreground truncate max-w-[150px] group-hover:text-accent transition-colors">
                  {profile?.display_name || profile?.username}
                </span>
                {profile?.verified_human && (
                  <QMarkBadge size="sm" />
                )}
              </Link>
              <span className="text-muted-foreground/60 flex-shrink-0">·</span>
              <span className="text-sm text-muted-foreground/80 truncate">@{profile?.username}</span>
              <span className="text-muted-foreground/60 flex-shrink-0 hidden sm:inline">·</span>
              <time className="text-sm text-muted-foreground/80 flex-shrink-0 hidden sm:inline">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: false })}
              </time>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-foreground -mr-2"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleBookmark}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  {bookmarked ? "Remove bookmark" : "Bookmark"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserMinus className="mr-2 h-4 w-4" />
                  Mute @{profile?.username}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Flag className="mr-2 h-4 w-4" />
                  Report post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile timestamp */}
          <time className="text-xs text-muted-foreground sm:hidden">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </time>

          {/* Content */}
          <Link href={`/vibes/${post.id}`} className="block">
            <p className="mt-2 whitespace-pre-wrap break-words text-foreground leading-relaxed">{post.content}</p>
          </Link>

          {/* Media */}
          {post.media_urls && post.media_urls.length > 0 && !imageError && (
            <Link href={`/vibes/${post.id}`} className="mt-3 block">
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-muted">
                <img
                  src={post.media_urls[0] || "/placeholder.svg"}
                  alt="Post media"
                  className="w-full object-cover"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              </div>
            </Link>
          )}

          {/* Actions - Enhanced for mobile with larger touch targets */}
          <div className="mt-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 min-w-[60px] h-9"
              asChild
            >
              <Link href={`/vibes/${post.id}`}>
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">{formatCount(post.reply_count)}</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRepost}
              disabled={isReposting}
              className={cn(
                "gap-1.5 hover:text-green-500 hover:bg-green-500/10 min-w-[60px] h-9 transition-all",
                reposted ? "text-green-500" : "text-muted-foreground",
                isReposting && "opacity-50 cursor-not-allowed",
              )}
            >
              <Repeat2 className={cn("h-5 w-5", isReposting && "animate-spin")} />
              <span className="text-sm">{formatCount(repostCount)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isLiking}
              className={cn(
                "gap-1.5 hover:text-pink-500 hover:bg-pink-500/10 min-w-[60px] h-9 transition-all",
                liked ? "text-pink-500" : "text-muted-foreground",
                isLiking && "opacity-50 cursor-not-allowed",
              )}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-current", isLiking && "animate-pulse")} />
              <span className="text-sm">{formatCount(likeCount)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="gap-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 h-9"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
