import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { ThreadsFeed } from "@/components/threads/threads-feed"
import { ComposeBox } from "@/components/threads/compose-box"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

async function getForYouPosts() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("visibility", "public")
    .eq("moderation_status", "approved")
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .limit(50)

  return posts || []
}

async function getFollowingPosts() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data: following } = await supabase.from("follows").select("following_id").eq("follower_id", user.id)

  const followingIds = following?.map((f) => f.following_id) || []

  if (followingIds.length === 0) return []

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .in("user_id", followingIds)
    .eq("visibility", "public")
    .eq("moderation_status", "approved")
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .limit(50)

  return posts || []
}

function FeedSkeleton() {
  return (
    <div className="space-y-0">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-border p-4 animate-pulse">
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0 sm:h-12 sm:w-12" />
            <div className="flex-1 space-y-3">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32 sm:w-40" />
                <Skeleton className="h-3 w-24 sm:w-32" />
              </div>
              <Skeleton className="h-20 w-full sm:h-24 rounded-lg" />
              <div className="flex gap-2 sm:gap-3">
                <Skeleton className="h-8 w-16 rounded-full sm:w-20" />
                <Skeleton className="h-8 w-16 rounded-full sm:w-20" />
                <Skeleton className="h-8 w-16 rounded-full sm:w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function VibesPage() {
  const forYouPosts = await getForYouPosts()
  const followingPosts = await getFollowingPosts()

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Sticky with better mobile spacing and touch targets */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 sm:py-4">
          <h1 className="text-xl font-bold sm:text-2xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Q Vibes
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground hidden sm:inline">Live</span>
          </div>
        </div>
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="for-you"
              className="rounded-none border-b-2 border-transparent py-3 sm:py-4 data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent font-medium touch-manipulation transition-colors"
            >
              For You
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="rounded-none border-b-2 border-transparent py-3 sm:py-4 data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent font-medium touch-manipulation transition-colors"
            >
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Compose Box */}
      <ComposeBox />

      {/* Feed */}
      <Tabs defaultValue="for-you" className="w-full">
        <TabsContent value="for-you" className="mt-0">
          <Suspense fallback={<FeedSkeleton />}>
            <ThreadsFeed posts={forYouPosts} />
          </Suspense>
        </TabsContent>
        <TabsContent value="following" className="mt-0">
          <Suspense fallback={<FeedSkeleton />}>
            <ThreadsFeed posts={followingPosts} emptyMessage="Follow people to see their posts here" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
