"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GramPost, Profile } from "@/types/database"

interface GramPostModalProps {
  post: GramPost & { profile: Profile }
  onClose: () => void
}

export function GramPostModal({ post, onClose }: GramPostModalProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.like_count)
  const [bookmarked, setBookmarked] = useState(false)
  const [comment, setComment] = useState("")

  const handleLike = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    if (liked) {
      await supabase.from("gram_likes").delete().match({ user_id: user.id, gram_post_id: post.id })
      setLikeCount((prev) => prev - 1)
    } else {
      await supabase.from("gram_likes").insert({ user_id: user.id, gram_post_id: post.id })
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4">
      <button onClick={onClose} className="absolute right-2 sm:right-4 top-2 sm:top-4 text-white hover:text-white/80">
        <X className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      <div className="flex flex-col sm:flex-row max-h-[95vh] sm:max-h-[90vh] w-full sm:max-w-5xl overflow-hidden rounded-lg bg-card">
        {/* Image */}
        <div className="relative flex aspect-square w-full sm:w-[500px] items-center justify-center bg-black">
          <img
            src={post.media_urls[0] || "/placeholder.svg?height=500&width=500&query=visual content"}
            alt={post.caption || "Post"}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex w-full sm:w-[340px] flex-col border-l border-border max-h-[50vh] sm:max-h-none">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={post.profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {post.profile?.username?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                {post.profile?.username}
                {post.profile?.verified_human && (
                  <span className="ml-1 inline-block h-4 w-4 rounded-full bg-accent text-center text-[10px] leading-4 text-accent-foreground">
                    ✓
                  </span>
                )}
              </p>
              {post.location && <p className="text-xs text-muted-foreground">{post.location}</p>}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Caption & Comments */}
          <div className="flex-1 overflow-y-auto p-4">
            {post.caption && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0 border border-border">
                  <AvatarImage src={post.profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {post.profile?.username?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">{post.profile?.username}</span>{" "}
                    <span className="text-foreground">{post.caption}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-accent">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLike}
                  className={cn("h-9 w-9", liked && "text-pink-500")}
                >
                  <Heart className={cn("h-6 w-6", liked && "fill-current")} />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Send className="h-6 w-6" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setBookmarked(!bookmarked)}
                className={cn("h-9 w-9", bookmarked && "text-accent")}
              >
                <Bookmark className={cn("h-6 w-6", bookmarked && "fill-current")} />
              </Button>
            </div>

            <p className="mt-2 text-sm font-semibold text-foreground">{likeCount.toLocaleString()} likes</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>

          {/* Comment Input */}
          <div className="flex items-center gap-2 border-t border-border p-4">
            <Input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-transparent border-0 focus-visible:ring-0"
            />
            <Button variant="ghost" size="sm" disabled={!comment.trim()} className="text-accent hover:text-accent/80">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
