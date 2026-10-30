import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { QProfileHeader } from "@/components/profile/q-profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (!profile) {
    notFound()
  }

  const { data: currentUser } = await supabase.auth.getUser()
  const isOwnProfile = currentUser.user?.id === userId

  // Fetch vault balance separately
  const { data: vaultBalance } = await supabase
    .from("vault_balances")
    .select("bitcoin_points, mining_credits")
    .eq("user_id", userId)
    .single()

  // Attach vault balance to profile for component compatibility
  const profileWithVault = {
    ...profile,
    vault_balances: vaultBalance ? [vaultBalance] : [{ bitcoin_points: 0, mining_credits: 0 }],
  }

  // Get follower/following counts
  const { count: followerCount } = await supabase
    .from("follows")
    .select("*", { count: "exact" })
    .eq("following_id", userId)

  const { count: followingCount } = await supabase
    .from("follows")
    .select("*", { count: "exact" })
    .eq("follower_id", userId)

  // Get post count
  const { count: postCount } = await supabase.from("posts").select("*", { count: "exact" }).eq("user_id", userId)

  // Calculate Q-Score (0-100) based on verification, longevity, engagement, and trust
  const calculateQScore = () => {
    let score = 0

    // Verification level contributes 30 points
    score += profile.verification_level * 10

    // Account age contributes 20 points
    const accountAgeInDays = Math.floor(
      (Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24),
    )
    score += Math.min(accountAgeInDays / 180, 1) * 20 // Max 20 points after 180 days

    // Engagement contributes 25 points
    const engagementMetric = Math.min(((followerCount || 0) + (postCount || 0)) / 100, 1) * 25
    score += engagementMetric

    // Verified human adds 25 points
    score += profile.verified_human ? 25 : 0

    return Math.min(Math.round(score), 100)
  }

  const qScore = calculateQScore()

  // Determine active platforms (all active by default - can be enhanced with usage data)
  const activePlatforms: Array<"vibes" | "circles" | "gram" | "qnektn"> = ["vibes", "circles", "gram", "qnektn"]

  // Calculate engagement score
  const engagementScore =
    followerCount && followerCount > 0 ? Math.min(Math.round(((postCount || 0) / followerCount) * 100), 100) : 75

  return (
    <div className="border-x border-border min-h-screen">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <QProfileHeader
          profile={profileWithVault}
          followerCount={followerCount || 0}
          followingCount={followingCount || 0}
          postCount={postCount || 0}
          engagementScore={engagementScore}
          qScore={qScore}
          isVerified={profile.verified_human}
          verificationLevel={profile.verification_level as 1 | 2 | 3}
          activePlatforms={activePlatforms}
          isOwnProfile={isOwnProfile}
        />
        <ProfileTabs userId={userId} />
      </Suspense>
    </div>
  )
}
