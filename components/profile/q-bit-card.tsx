"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Repeat2, Share, CheckCircle, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Post, Profile } from "@/types/database"
import { formatDistanceToNow } from "date-fns"

interface QBitCardProps {
  post: Post & { profile?: Profile }
  hasQualityMode?: boolean
}

export function QBitCard({ post, hasQualityMode = false }: QBitCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.like_count || 0)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <Card className="relative border-border bg-card hover:bg-card/80 transition-colors p-4 sm:p-6">
      {/* Green Q-Mark for Quality Mode */}
      {hasQualityMode && (
        <div
          className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shadow-lg"
          title="Quality Mode - Verified Content"
        >
          <CheckCircle className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Author Info */}
      <div className="flex items-start gap-3 mb-4">
        <Link href={`/profile/${post.user_id}`}>
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border border-border hover:ring-2 hover:ring-accent transition-all">
            <AvatarImage src={post.profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-accent/10 text-accent">
              {post.profile?.display_name?.charAt(0) || "Q"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/profile/${post.user_id}`}
              className="font-semibold text-foreground hover:text-accent transition-colors"
            >
              {post.profile?.display_name || post.profile?.username}
            </Link>
            {post.profile?.verified_human && (
              <div
                className="flex h-4 w-4 items-center justify-center rounded-full bg-accent"
                title="Verified via Q-Scan"
              >
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
            <span className="text-sm text-muted-foreground">@{post.profile?.username}.qid</span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <Link href={`/vibes/${post.id}`} className="block mb-4">
        <p className="text-sm sm:text-base text-foreground whitespace-pre-wrap break-words">{post.content}</p>

        {/* Media Preview */}
        {post.media_urls && post.media_urls.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {post.media_urls.slice(0, 4).map((url, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square bg-secondary",
                  post.media_urls?.length === 1 && "col-span-2 aspect-video",
                )}
              >
                <img src={url || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Category Badge */}
        {post.category && (
          <Badge variant="outline" className="mt-3 text-xs border-accent/30 bg-accent/10 text-accent">
            #{post.category}
          </Badge>
        )}
      </Link>

      {/* Engagement Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 hover:bg-red-500/10 hover:text-red-500 transition-colors",
            liked && "text-red-500",
          )}
          onClick={handleLike}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
          <span className="text-sm">{likeCount}</span>
        </Button>

        <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/10 hover:text-accent transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{post.reply_count || 0}</span>
        </Button>

        <Button variant="ghost" size="sm" className="gap-2 hover:bg-green-500/10 hover:text-green-500 transition-colors">
          <Repeat2 className="h-4 w-4" />
          <span className="text-sm">{post.repost_count || 0}</span>
        </Button>

        <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/10 hover:text-accent transition-colors">
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
