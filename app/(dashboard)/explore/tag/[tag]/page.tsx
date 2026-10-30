import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { ThreadsFeed } from "@/components/threads/threads-feed"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Hash } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

async function getTagPosts(tag: string) {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("category", tag)
    .eq("visibility", "public")
    .eq("moderation_status", "approved")
    .order("created_at", { ascending: false })
    .limit(50)

  return posts || []
}

function FeedSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const posts = await getTagPosts(tag)

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="flex items-center gap-2 xs:gap-4 px-3 xs:px-4 py-3">
          <Link href="/explore">
            <Button variant="ghost" size="icon" className="h-9 w-9 xs:h-10 xs:w-10">
              <ArrowLeft className="h-4 w-4 xs:h-5 xs:w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 xs:gap-3 min-w-0 flex-1">
            <div className="flex h-8 w-8 xs:h-10 xs:w-10 items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
              <Hash className="h-4 w-4 xs:h-5 xs:w-5 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg xs:text-xl font-bold truncate">#{tag}</h1>
              <p className="text-xs xs:text-sm text-muted-foreground">{posts.length} posts</p>
            </div>
          </div>
        </div>
      </header>

      <Suspense fallback={<FeedSkeleton />}>
        <ThreadsFeed posts={posts} emptyMessage={`No posts found for #${tag}`} />
      </Suspense>
    </div>
  )
}
