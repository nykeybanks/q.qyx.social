import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { CirclesList } from "@/components/circles/circles-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

async function getDiscoverCircles() {
  const supabase = await createClient()

  const { data: circles } = await supabase
    .from("circles")
    .select("*")
    .eq("privacy", "public")
    .order("member_count", { ascending: false })
    .limit(20)

  return circles || []
}

async function getMyCircles() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data: memberships } = await supabase.from("circle_memberships").select("circle_id").eq("user_id", user.id)

  const circleIds = memberships?.map((m) => m.circle_id) || []

  if (circleIds.length === 0) return []

  const { data: circles } = await supabase
    .from("circles")
    .select("*")
    .in("id", circleIds)
    .order("updated_at", { ascending: false })

  return circles || []
}

function CirclesSkeleton() {
  return (
    <div className="grid gap-3 sm:gap-4 p-3 sm:p-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl border border-border p-4 sm:p-5 animate-pulse">
          <Skeleton className="h-20 sm:h-24 w-full rounded-lg" />
          <Skeleton className="mt-3 h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-full" />
          <div className="flex items-center gap-2 mt-3">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function CirclesPage() {
  const discoverCircles = await getDiscoverCircles()
  const myCircles = await getMyCircles()

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Enhanced with gradient and live status */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Q Circles
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground hidden sm:inline">Live</span>
            </div>
          </div>
          <Link href="/circles/create">
            <Button 
              size="sm" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all active:scale-95 touch-manipulation h-8 sm:h-9"
            >
              <Plus className="mr-0 sm:mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Create</span>
              <span className="inline xs:hidden sr-only">Create Circle</span>
            </Button>
          </Link>
        </div>

        {/* Search - Enhanced with better focus states */}
        <div className="px-3 sm:px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search circles..." 
              className="bg-secondary/50 pl-10 border-border h-9 sm:h-10 focus-visible:bg-background transition-colors" 
            />
          </div>
        </div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="discover"
              className="rounded-none border-b-2 border-transparent py-3 sm:py-4 data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent font-medium transition-colors touch-manipulation"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="my-circles"
              className="rounded-none border-b-2 border-transparent py-3 sm:py-4 data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent font-medium transition-colors touch-manipulation"
            >
              <span className="hidden xs:inline">My Circles</span>
              <span className="inline xs:hidden">Mine</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Content */}
      <Tabs defaultValue="discover" className="w-full">
        <TabsContent value="discover" className="mt-0">
          <Suspense fallback={<CirclesSkeleton />}>
            <CirclesList circles={discoverCircles} emptyMessage="No circles to discover yet" />
          </Suspense>
        </TabsContent>
        <TabsContent value="my-circles" className="mt-0">
          <Suspense fallback={<CirclesSkeleton />}>
            <CirclesList circles={myCircles} emptyMessage="You haven't joined any circles yet" showJoinButton={false} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
