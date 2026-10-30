"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Repeat2, Bookmark, Share, BadgeCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ComposeBox } from "./compose-box"
import { PostCard } from "./post-card"
import { useState } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { useToast } from "@/hooks/use-toast"
import { ShareDialog } from "@/components/shared/share-dialog"

interface PostDetailProps {
  post: any
  replies: any[]
}

export function PostDetail({ post, replies }: PostDetailProps) {
  const router = useRouter()
  const supabase = useSupabase()
  const { toast } = useToast()
  const profile = post.profiles

  const [isLiked, setIsLiked] = useState(false)
  const [isReposted, setIsReposted] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.like_count)
  const [repostCount, setRepostCount] = useState(post.repost_count)
  const [loading, setLoading] = useState({ like: false, repost: false, bookmark: false })
  const [showShareDialog, setShowShareDialog] = useState(false)

  const handleLike = async () => {
    if (loading.like) return
    setLoading((prev) => ({ ...prev, like: true }))

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      if (isLiked) {
        await supabase.from("post_likes").delete().eq("post_id", post.id).eq("user_id", user.id)
        setLikeCount((prev) => prev - 1)
        setIsLiked(false)
      } else {
        await supabase.from("post_likes").insert({ post_id: post.id, user_id: user.id })
        setLikeCount((prev) => prev + 1)
        setIsLiked(true)
        toast({ title: "Post liked!" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to like post", variant: "destructive" })
    } finally {
      setLoading((prev) => ({ ...prev, like: false }))
    }
  }

  const handleRepost = async () => {
    if (loading.repost) return
    setLoading((prev) => ({ ...prev, repost: true }))

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      if (isReposted) {
        await supabase.from("reposts").delete().eq("post_id", post.id).eq("user_id", user.id)
        setRepostCount((prev) => prev - 1)
        setIsReposted(false)
      } else {
        await supabase.from("reposts").insert({ post_id: post.id, user_id: user.id })
        setRepostCount((prev) => prev + 1)
        setIsReposted(true)
        toast({ title: "Reposted!" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to repost", variant: "destructive" })
    } finally {
      setLoading((prev) => ({ ...prev, repost: false }))
    }
  }

  const handleBookmark = async () => {
    if (loading.bookmark) return
    setLoading((prev) => ({ ...prev, bookmark: true }))

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      if (isBookmarked) {
        await supabase.from("bookmarks").delete().eq("post_id", post.id).eq("user_id", user.id)
        setIsBookmarked(false)
        toast({ title: "Bookmark removed" })
      } else {
        await supabase.from("bookmarks").insert({ post_id: post.id, user_id: user.id })
        setIsBookmarked(true)
        toast({ title: "Bookmarked!" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to bookmark", variant: "destructive" })
    } finally {
      setLoading((prev) => ({ ...prev, bookmark: false }))
    }
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 flex items-center gap-3 sm:gap-4 border-b border-border bg-background/95 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3">
        <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <h1 className="text-base sm:text-lg font-semibold">Thread</h1>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex gap-2 sm:gap-3">
          <Link href={`/profile/${profile.id}`}>
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src={profile.avatar_url || "/placeholder.svg"} />
              <AvatarFallback>{profile.display_name?.[0] || profile.username[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <Link href={`/profile/${profile.id}`} className="font-semibold hover:underline truncate">
                {profile.display_name || profile.username}
              </Link>
              {profile.verified_human && <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent flex-shrink-0" />}
              <span className="text-muted-foreground text-sm truncate">@{profile.username}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 text-lg sm:text-xl leading-relaxed">{post.content}</div>

        {post.category && (
          <div className="mt-2 sm:mt-3">
            <Badge variant="secondary" className="text-accent text-xs sm:text-sm">
              #{post.category}
            </Badge>
          </div>
        )}

        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
          {new Date(post.created_at).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-4 sm:gap-6 border-y border-border py-2.5 sm:py-3 text-sm">
          <div>
            <span className="font-semibold">{likeCount}</span> <span className="text-muted-foreground">Likes</span>
          </div>
          <div>
            <span className="font-semibold">{repostCount}</span> <span className="text-muted-foreground">Reposts</span>
          </div>
          <div>
            <span className="font-semibold">{post.reply_count}</span>{" "}
            <span className="text-muted-foreground">Replies</span>
          </div>
          <div>
            <span className="font-semibold">{post.view_count}</span>{" "}
            <span className="text-muted-foreground">Views</span>
          </div>
        </div>

        <div className="flex items-center justify-around border-b border-border py-2">
          <Button variant="ghost" size="sm" className="h-10 w-10 sm:h-auto sm:w-auto hover:text-accent">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-10 w-10 sm:h-auto sm:w-auto ${isReposted ? "text-green-500" : "hover:text-green-500"}`}
            onClick={handleRepost}
            disabled={loading.repost}
          >
            <Repeat2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-10 w-10 sm:h-auto sm:w-auto ${isLiked ? "text-red-500" : "hover:text-red-500"}`}
            onClick={handleLike}
            disabled={loading.like}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-10 w-10 sm:h-auto sm:w-auto ${isBookmarked ? "text-accent" : "hover:text-accent"}`}
            onClick={handleBookmark}
            disabled={loading.bookmark}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 sm:h-auto sm:w-auto hover:text-accent"
            onClick={() => setShowShareDialog(true)}
          >
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="border-b border-border p-3 sm:p-4">
        <ComposeBox placeholder="Post your reply..." parentId={post.id} />
      </div>

      <div>
        {replies.length === 0 ? (
          <div className="py-12 text-center text-sm sm:text-base text-muted-foreground px-4">
            No replies yet. Be the first to reply!
          </div>
        ) : (
          replies.map((reply) => <PostCard key={reply.id} post={reply} />)
        )}
      </div>

      <ShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        title={`${profile.display_name || profile.username}'s post`}
        url={`${window.location.origin}/threads/${post.id}`}
        text={post.content}
      />
    </div>
  )
}
