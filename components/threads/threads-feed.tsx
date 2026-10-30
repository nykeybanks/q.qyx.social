"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { PostCard } from "./post-card"
import type { Post } from "@/types/database"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { FileText, MessageSquare } from "lucide-react"

interface ThreadsFeedProps {
  posts?: (Post & { profile: any })[]
  userId?: string
  emptyMessage?: string
  filterType?: "posts" | "replies"
}

export function ThreadsFeed({
  posts: initialPosts,
  userId,
  emptyMessage = "No posts yet",
  filterType = "posts",
}: ThreadsFeedProps) {
  const [posts, setPosts] = useState(initialPosts || [])
  const [loading, setLoading] = useState(!initialPosts && !!userId)
  const supabase = useSupabase()

  useEffect(() => {
    if (userId && !initialPosts) {
      async function loadUserPosts() {
        let query = supabase
          .from("posts")
          .select("*")
          .eq("user_id", userId)
          .eq("visibility", "public")
          .order("created_at", { ascending: false })

        if (filterType === "replies") {
          query = query.not("parent_id", "is", null)
        } else {
          query = query.is("parent_id", null)
        }

        const { data } = await query

        setPosts(data || [])
        setLoading(false)
      }

      loadUserPosts()
    }
  }, [userId, initialPosts, supabase, filterType])

  if (loading) {
    return (
      <div className="space-y-0">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b border-border p-4 animate-pulse">
            <div className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0 sm:h-12 sm:w-12" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full rounded-lg" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16 rounded-full" />
                  <Skeleton className="h-8 w-16 rounded-full" />
                  <Skeleton className="h-8 w-16 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-6">
        <EmptyState
          icon={filterType === "replies" ? MessageSquare : FileText}
          title={emptyMessage}
          description={
            filterType === "replies" ? "Replies to posts will appear here" : "When there are posts, they'll show up here."
          }
        />
      </div>
    )
  }

  return (
    <div className="divide-y divide-border">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
