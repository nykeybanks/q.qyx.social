import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { GramPostDetail } from "@/components/gram/gram-post-detail"
import { Skeleton } from "@/components/ui/skeleton"

export default async function GramPostDetailPage({ params }: { params: Promise<{ mediaId: string }> }) {
  const { mediaId } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("gram_posts")
    .select("*, gram_likes (id, user_id)")
    .eq("id", mediaId)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <div className="border-x border-border min-h-screen">
      <Suspense fallback={<Skeleton className="h-screen" />}>
        <GramPostDetail post={post} />
      </Suspense>
    </div>
  )
}
