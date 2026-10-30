import { createClient } from "@/lib/supabase/server"
import { ThreadsFeed } from "@/components/threads/threads-feed"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Bookmark } from "lucide-react"

async function getBookmarkedPosts() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data: bookmarks } = await supabase.from("bookmarks").select("post_id").eq("user_id", user.id)

  const postIds = bookmarks?.map((b) => b.post_id) || []

  if (postIds.length === 0) return []

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .in("id", postIds)
    .order("created_at", { ascending: false })

  return posts || []
}

function FeedSkeleton() {
  return (
    <div className="space-y-0">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-border p-4 animate-pulse">
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-20 w-full rounded-lg" />
              <div className="flex gap-2">
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

export default async function BookmarksPage() {
  const bookmarkedPosts = await getBookmarkedPosts()

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Enhanced with gradient and icon */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Bookmark className="h-4 w-4 text-accent" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Bookmarks
          </h1>
          {bookmarkedPosts.length > 0 && (
            <span className="ml-auto text-xs sm:text-sm text-muted-foreground font-medium">
              {bookmarkedPosts.length} saved
            </span>
          )}
        </div>
      </header>

      <Suspense fallback={<FeedSkeleton />}>
        <ThreadsFeed posts={bookmarkedPosts} emptyMessage="No bookmarks yet" />
      </Suspense>
    </div>
  )
}
