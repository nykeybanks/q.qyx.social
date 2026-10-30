"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, MapPin, LinkIcon, Calendar, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"
import { useSupabase } from "@/lib/supabase/client-provider"

interface ProfileHeaderProps {
  profile: any
  followerCount: number
  followingCount: number
  postCount: number
  isOwnProfile: boolean
}

export function ProfileHeader({ profile, followerCount, followingCount, postCount, isOwnProfile }: ProfileHeaderProps) {
  const router = useRouter()
  const supabase = useSupabase()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isFollowLoading, setIsFollowLoading] = useState(false)
  const [currentFollowerCount, setCurrentFollowerCount] = useState(followerCount)

  const handleFollow = async () => {
    setIsFollowLoading(true)
    try {
      const response = await fetch(`/api/users/${profile.id}/follow`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to toggle follow")

      const data = await response.json()
      setIsFollowing(data.following)
      setCurrentFollowerCount((prev) => (data.following ? prev + 1 : prev - 1))

      toast({
        title: data.following ? "Followed" : "Unfollowed",
        description: data.following
          ? `You are now following @${profile.username}`
          : `You unfollowed @${profile.username}`,
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      })
    } finally {
      setIsFollowLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-2 xs:gap-3 sm:gap-4 border-b border-border bg-background/80 backdrop-blur-md px-3 xs:px-4 py-2 xs:py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 xs:h-5 xs:w-5" />
        </Button>
        <div>
          <h1 className="text-base xs:text-lg font-semibold line-clamp-1">
            {profile.display_name || profile.username}
          </h1>
          <p className="text-xs xs:text-sm text-muted-foreground">{postCount} posts</p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-32 xs:h-40 sm:h-48 bg-muted relative">
        {profile.cover_url && (
          <img src={profile.cover_url || "/placeholder.svg"} alt="Cover" className="h-full w-full object-cover" />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-3 xs:px-4 pb-4">
        <div className="flex items-start justify-between -mt-12 xs:-mt-14 sm:-mt-16 mb-3 xs:mb-4">
          <Avatar className="h-24 w-24 xs:h-28 xs:w-28 sm:h-32 sm:w-32 border-2 xs:border-4 border-background">
            <AvatarImage src={profile.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="text-xl xs:text-2xl sm:text-3xl">
              {profile.display_name?.[0] || profile.username[0]}
            </AvatarFallback>
          </Avatar>
          {isOwnProfile ? (
            <Link href="/settings">
              <Button
                variant="outline"
                className="mt-12 xs:mt-14 sm:mt-16 bg-transparent text-xs xs:text-sm h-8 xs:h-9 sm:h-10 px-3 xs:px-4"
              >
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleFollow}
              disabled={isFollowLoading}
              className="mt-12 xs:mt-14 sm:mt-16 bg-accent text-accent-foreground hover:bg-accent/90 text-xs xs:text-sm h-8 xs:h-9 sm:h-10 px-3 xs:px-4"
            >
              {isFollowLoading ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  {isFollowing ? "Unfollowing..." : "Following..."}
                </>
              ) : isFollowing ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold line-clamp-1">
            {profile.display_name || profile.username}
          </h2>
          {profile.verified_human && (
            <BadgeCheck className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-accent flex-shrink-0" />
          )}
          {profile.verification_level > 0 && (
            <Badge variant="secondary" className="text-accent text-[10px] xs:text-xs">
              Level {profile.verification_level}
            </Badge>
          )}
        </div>

        <p className="text-sm xs:text-base text-muted-foreground mb-2 xs:mb-3">@{profile.username}</p>

        {profile.bio && <p className="text-sm xs:text-base mb-2 xs:mb-3">{profile.bio}</p>}

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4 mb-2 xs:mb-3 text-xs xs:text-sm text-muted-foreground">
          {profile.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
              <span className="line-clamp-1">{profile.location}</span>
            </div>
          )}
          {profile.website && (
            <div className="flex items-center gap-1 min-w-0">
              <LinkIcon className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline truncate"
              >
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
            Joined {format(new Date(profile.created_at), "MMM yyyy")}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 xs:gap-4 sm:gap-6 text-xs xs:text-sm">
          <div>
            <span className="font-semibold">{followingCount}</span>{" "}
            <span className="text-muted-foreground">Following</span>
          </div>
          <div>
            <span className="font-semibold">{currentFollowerCount}</span>{" "}
            <span className="text-muted-foreground">Followers</span>
          </div>
          {profile.vault_balances && (
            <div className="hidden xs:flex">
              <span className="font-semibold text-accent">{profile.vault_balances.bitcoin_points.toFixed(2)}</span>{" "}
              <span className="text-muted-foreground ml-1">BTC Points</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
