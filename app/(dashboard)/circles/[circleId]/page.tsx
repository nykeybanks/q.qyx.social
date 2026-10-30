import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { CircleHeader } from "@/components/circles/circle-header"
import { CircleFeed } from "@/components/circles/circle-feed"
import { Skeleton } from "@/components/ui/skeleton"

export default async function CircleDetailPage({ params }: { params: Promise<{ circleId: string }> }) {
  const { circleId } = await params
  const supabase = await createClient()

  const { data: circle } = await supabase.from("circles").select("*").eq("id", circleId).single()

  if (!circle) {
    notFound()
  }

  const { data: currentUser } = await supabase.auth.getUser()
  const { data: membership } = await supabase
    .from("circle_memberships")
    .select("*")
    .eq("circle_id", circleId)
    .eq("user_id", currentUser.user?.id || "")
    .single()

  return (
    <div className="border-x border-border min-h-screen">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <CircleHeader circle={circle} isMember={!!membership} />
        <CircleFeed circleId={circleId} />
      </Suspense>
    </div>
  )
}
