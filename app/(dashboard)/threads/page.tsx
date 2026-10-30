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
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function ThreadsPage() {
  const forYouPosts = await getForYouPosts()
  const followingPosts = await getFollowingPosts()

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Sticky with better mobile spacing */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <h1 className="px-4 py-4 text-xl font-bold md:py-3">Q Threads</h1>
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
            <TabsTrigger
              value="for-you"
              className="rounded-none border-b-2 border-transparent py-4 data-[state=active]:border-accent data-[state=active]:bg-transparent md:py-3"
            >
              For You
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="rounded-none border-b-2 border-transparent py-4 data-[state=active]:border-accent data-[state=active]:bg-transparent md:py-3"
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
