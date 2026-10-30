"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/client-provider"
import { PostCard } from "./post-card"
import { PullToRefresh } from "@/components/shared/pull-to-refresh"
import { PostSkeleton } from "@/components/shared/post-skeleton"
import type { Post } from "@/types/database"
import { FileText } from "lucide-react"
import { useInView } from "react-intersection-observer"

interface ThreadsFeedClientProps {
  posts: (Post & { profile: any })[]
  emptyMessage?: string
  category?: string
}

export function ThreadsFeedClient({
  posts: initialPosts,
  emptyMessage = "No posts yet",
  category,
}: ThreadsFeedClientProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialPosts.length >= 10)
  const [page, setPage] = useState(1)
  const router = useRouter()
  const supabase = useSupabase()
  const { ref, inView } = useInView()

  // Load more posts when scrolling to bottom
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMorePosts()
    }
  }, [inView, hasMore, loading])

  const loadMorePosts = async () => {
    setLoading(true)
    const from = page * 10
    const to = from + 9

    let query = supabase
      .from("posts")
      .select("*")
      .eq("visibility", "public")
      .is("parent_id", null)
      .order("created_at", { ascending: false })
      .range(from, to)

    if (category) {
      query = query.eq("category", category)
    }

    const { data } = await query

    if (data && data.length > 0) {
      setPosts((prev) => [...prev, ...data])
      setPage((p) => p + 1)
      setHasMore(data.length === 10)
    } else {
      setHasMore(false)
    }

    setLoading(false)
  }

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.refresh()
    setPage(1)
    setHasMore(true)
  }

  if (posts.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{emptyMessage}</h3>
        <p className="mt-1 text-sm text-muted-foreground">When there are posts, they'll show up here.</p>
      </div>
    )
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* Infinite scroll trigger */}
        {hasMore && (
          <div ref={ref} className="py-4">
            <PostSkeleton />
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">You've reached the end</div>
        )}
      </div>
    </PullToRefresh>
  )
}
