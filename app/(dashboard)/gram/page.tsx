import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { GramFeed } from "@/components/gram/gram-feed"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Grid3X3, Bookmark } from "lucide-react"
import Link from "next/link"

async function getExplorePosts() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("gram_posts")
    .select("*")
    .eq("moderation_status", "approved")
    .eq("is_story", false)
    .order("created_at", { ascending: false })
    .limit(30)

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
    .from("gram_posts")
    .select("*")
    .in("user_id", followingIds)
    .eq("moderation_status", "approved")
    .eq("is_story", false)
    .order("created_at", { ascending: false })
    .limit(30)

  return posts || []
}

function GramSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} className="aspect-square animate-pulse" />
      ))}
    </div>
  )
}

export default async function GramPage() {
  const explorePosts = await getExplorePosts()
  const followingPosts = await getFollowingPosts()

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Enhanced with gradient and live status */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Q Gram
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground hidden sm:inline">Live</span>
            </div>
          </div>
          <Link href="/gram/upload">
            <Button 
              size="sm" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all active:scale-95 touch-manipulation h-8 sm:h-9 shadow-lg shadow-accent/20"
            >
              <Plus className="mr-0 sm:mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Upload</span>
              <span className="inline xs:hidden sr-only">Upload Media</span>
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="explore"
              className="rounded-none border-b-2 border-transparent py-3 sm:py-4 data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent gap-1.5 sm:gap-2 font-medium transition-colors touch-manipulation"
            >
              <Grid3X3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Explore</span>
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="rounded-none border-b-2 border-transparent py-3 sm:py-4 data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent gap-1.5 sm:gap-2 font-medium transition-colors touch-manipulation"
            >
              <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Following</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Content */}
      <Tabs defaultValue="explore" className="w-full">
        <TabsContent value="explore" className="mt-0">
          <Suspense fallback={<GramSkeleton />}>
            <GramFeed posts={explorePosts} />
          </Suspense>
        </TabsContent>
        <TabsContent value="following" className="mt-0">
          <Suspense fallback={<GramSkeleton />}>
            <GramFeed posts={followingPosts} emptyMessage="Follow creators to see their posts here" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
