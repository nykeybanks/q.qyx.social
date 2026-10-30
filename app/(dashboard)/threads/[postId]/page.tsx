import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { PostDetail } from "@/components/threads/post-detail"
import { Skeleton } from "@/components/ui/skeleton"

export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("posts")
    .select("*, post_likes (id, user_id), reposts (id, user_id)")
    .eq("id", postId)
    .single()

  if (!post) {
    notFound()
  }

  const { data: replies } = await supabase
    .from("posts")
    .select("*, post_likes (id, user_id), reposts (id, user_id)")
    .eq("parent_id", postId)
    .order("created_at", { ascending: true })

  return (
    <div className="border-x border-border min-h-screen">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <PostDetail post={post} replies={replies || []} />
      </Suspense>
    </div>
  )
}
