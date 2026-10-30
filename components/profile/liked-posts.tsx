"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { PostCard } from "@/components/threads/post-card"
import { PostSkeleton } from "@/components/shared/post-skeleton"
import { Heart } from "lucide-react"

interface LikedPostsProps {
  userId: string
}

export function LikedPosts({ userId }: LikedPostsProps) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useSupabase()

  useEffect(() => {
    async function loadLikedPosts() {
      const { data: likes } = await supabase
        .from("post_likes")
        .select(
          `
          post_id,
          posts!inner (
            *
          )
        `,
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      const likedPosts = likes?.map((like: any) => like.posts) || []
      setPosts(likedPosts)
      setLoading(false)
    }

    loadLikedPosts()
  }, [userId, supabase])

  if (loading) {
    return (
      <div className="divide-y divide-border">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <Heart className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No liked posts yet</h3>
        <p className="mt-2 text-center text-sm text-muted-foreground max-w-sm">Posts you like will appear here</p>
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
