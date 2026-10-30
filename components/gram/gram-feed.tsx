"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { GramPostModal } from "./gram-post-modal"
import type { GramPost, Profile } from "@/types/database"
import { ImageIcon, Heart, MessageCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface GramFeedProps {
  posts?: (GramPost & { profile: Profile })[]
  userId?: string
  emptyMessage?: string
}

export function GramFeed({ posts: initialPosts, userId, emptyMessage = "No posts yet" }: GramFeedProps) {
  const [selectedPost, setSelectedPost] = useState<(GramPost & { profile: Profile }) | null>(null)
  const [posts, setPosts] = useState(initialPosts || [])
  const [loading, setLoading] = useState(!initialPosts && !!userId)
  const supabase = useSupabase()

  useEffect(() => {
    if (userId && !initialPosts) {
      async function loadUserGramPosts() {
        const { data } = await supabase
          .from("gram_posts")
          .select("*")
          .eq("user_id", userId)
          .eq("is_story", false)
          .order("created_at", { ascending: false })

        setPosts(data || [])
        setLoading(false)
      }

      loadUserGramPosts()
    }
  }, [userId, initialPosts, supabase])

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-1 p-1">
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} className="aspect-square" />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
        <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-secondary">
          <ImageIcon className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground">{emptyMessage}</h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">When there are posts, they'll show up here.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-0.5 sm:gap-1 p-0.5 sm:p-1">
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group relative aspect-square overflow-hidden bg-secondary touch-manipulation active:opacity-80"
          >
            <img
              src={post.media_urls[0] || "/placeholder.svg?height=400&width=400&query=abstract visual content"}
              alt={post.caption || "Post"}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex items-center gap-3 sm:gap-4 text-white text-sm sm:text-base">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  {post.like_count}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  {post.comment_count}
                </span>
              </div>
            </div>
            {post.media_urls.length > 1 && (
              <div className="absolute right-1 top-1 sm:right-2 sm:top-2">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h6v6H4V6zm8 0h6v6h-6V6zM4 14h6v6H4v-6zm8 0h6v6h-6v-6z" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedPost && <GramPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </>
  )
}
