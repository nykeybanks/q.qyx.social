"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Bookmark, Share, BadgeCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { useToast } from "@/hooks/use-toast"
import { ShareDialog } from "@/components/shared/share-dialog"

interface GramPostDetailProps {
  post: any
}

export function GramPostDetail({ post }: GramPostDetailProps) {
  const router = useRouter()
  const profile = post.profiles
  const supabase = useSupabase()
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.like_count || 0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showShare, setShowShare] = useState(false)

  const handleLike = async () => {
    if (isLoading) return
    setIsLoading(true)

    const optimisticLiked = !isLiked
    const optimisticCount = likeCount + (optimisticLiked ? 1 : -1)

    setIsLiked(optimisticLiked)
    setLikeCount(optimisticCount)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      if (optimisticLiked) {
        await supabase.from("gram_likes").insert({ user_id: user.id, gram_post_id: post.id })
        await supabase.from("gram_posts").update({ like_count: optimisticCount }).eq("id", post.id)
      } else {
        await supabase.from("gram_likes").delete().eq("user_id", user.id).eq("gram_post_id", post.id)
        await supabase.from("gram_posts").update({ like_count: optimisticCount }).eq("id", post.id)
      }
    } catch (error) {
      setIsLiked(!optimisticLiked)
      setLikeCount(likeCount)
      toast({ title: "Error", description: "Failed to update like", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookmark = async () => {
    if (isLoading) return
    setIsLoading(true)

    const optimisticBookmarked = !isBookmarked
    setIsBookmarked(optimisticBookmarked)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      if (optimisticBookmarked) {
        await supabase.from("bookmarks").insert({ user_id: user.id, post_id: post.id })
        toast({ title: "Saved", description: "Post added to bookmarks" })
      } else {
        await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("post_id", post.id)
        toast({ title: "Removed", description: "Post removed from bookmarks" })
      }
    } catch (error) {
      setIsBookmarked(!optimisticBookmarked)
      toast({ title: "Error", description: "Failed to update bookmark", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollow = async () => {
    if (isLoading) return
    setIsLoading(true)

    const optimisticFollowing = !isFollowing
    setIsFollowing(optimisticFollowing)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      if (optimisticFollowing) {
        await supabase.from("follows").insert({ follower_id: user.id, following_id: profile.id })
        toast({ title: "Following", description: `Now following @${profile.username}` })
      } else {
        await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", profile.id)
        toast({ title: "Unfollowed", description: `Unfollowed @${profile.username}` })
      }
    } catch (error) {
      setIsFollowing(!optimisticFollowing)
      toast({ title: "Error", description: "Failed to update follow status", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Media Section */}
      <div className="flex-1 bg-black flex items-center justify-center min-h-[50vh] md:min-h-full">
        {post.media_urls && post.media_urls.length > 0 && (
          <img
            src={post.media_urls[0] || "/placeholder.svg"}
            alt="Post"
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-96 border-l border-border flex flex-col max-h-[50vh] md:max-h-full">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 border-b border-border bg-background px-3 sm:px-4 py-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <h1 className="text-base sm:text-lg font-semibold">Post</h1>
        </div>

        {/* User Info */}
        <div className="flex items-start gap-2 sm:gap-3 border-b border-border p-3 sm:p-4">
          <Link href={`/profile/${profile.id}`}>
            <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
              <AvatarImage src={profile.avatar_url || "/placeholder.svg"} />
              <AvatarFallback>{profile.display_name?.[0] || profile.username[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${profile.id}`}
                className="font-semibold hover:underline text-sm sm:text-base truncate"
              >
                {profile.display_name || profile.username}
              </Link>
              {profile.verified_human && <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent flex-shrink-0" />}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">@{profile.username}</p>
          </div>
          <Button
            size="sm"
            onClick={handleFollow}
            disabled={isLoading}
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs sm:text-sm flex-shrink-0"
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Caption & Details */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {post.caption && <p className="mb-3 sm:mb-4 text-sm sm:text-base">{post.caption}</p>}
          {post.location && <p className="text-xs sm:text-sm text-muted-foreground mb-2">📍 {post.location}</p>}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/explore?tag=${tag}`} className="text-accent hover:underline text-xs sm:text-sm">
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          <p className="text-xs sm:text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>

        {/* Stats & Actions */}
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-border">
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <div>
                <span className="font-semibold">{likeCount}</span> <span className="text-muted-foreground">likes</span>
              </div>
              <div>
                <span className="font-semibold">{post.comment_count}</span>{" "}
                <span className="text-muted-foreground">comments</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around px-3 sm:px-4 py-2 sm:py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              disabled={isLoading}
              className="h-10 w-10 sm:h-11 sm:w-11"
            >
              <Heart className={`h-5 w-5 sm:h-6 sm:w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-11 sm:w-11">
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowShare(true)}
              className="h-10 w-10 sm:h-11 sm:w-11"
            >
              <Share className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              disabled={isLoading}
              className="h-10 w-10 sm:h-11 sm:w-11"
            >
              <Bookmark className={`h-5 w-5 sm:h-6 sm:w-6 ${isBookmarked ? "fill-accent text-accent" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog
        open={showShare}
        onOpenChange={setShowShare}
        url={typeof window !== "undefined" ? window.location.href : ""}
        title={post.caption || "Check out this post"}
      />
    </div>
  )
}
