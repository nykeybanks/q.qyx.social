"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { PostCard } from "@/components/threads/post-card"
import { Skeleton } from "@/components/ui/skeleton"
import { ComposeBox } from "@/components/threads/compose-box"

interface CircleFeedProps {
  circleId: string
}

export function CircleFeed({ circleId }: CircleFeedProps) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useSupabase()

  useEffect(() => {
    async function loadPosts() {
      const { data } = await supabase
        .from("circle_posts")
        .select("*")
        .eq("circle_id", circleId)
        .order("created_at", { ascending: false })

      setPosts(data || [])
      setLoading(false)
    }

    loadPosts()
  }, [circleId, supabase])

  if (loading) {
    return (
      <div className="space-y-4 p-3 sm:p-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    )
  }

  return (
    <div>
      <div className="border-b border-border p-3 sm:p-4">
        <ComposeBox placeholder="Share with this circle..." circleId={circleId} />
      </div>
      {posts.length === 0 ? (
        <div className="py-12 px-4 text-center text-sm sm:text-base text-muted-foreground">
          No posts yet. Be the first to post!
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  )
}
