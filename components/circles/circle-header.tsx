"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Globe, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { useToast } from "@/hooks/use-toast"

interface CircleHeaderProps {
  circle: any
  isMember: boolean
}

export function CircleHeader({ circle, isMember }: CircleHeaderProps) {
  const router = useRouter()
  const supabase = useSupabase()
  const { toast } = useToast()

  const [memberStatus, setMemberStatus] = useState(isMember)
  const [loading, setLoading] = useState(false)

  const handleJoinLeave = async () => {
    if (loading) return
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      if (memberStatus) {
        // Leave circle
        await supabase.from("circle_memberships").delete().eq("circle_id", circle.id).eq("user_id", user.id)
        setMemberStatus(false)
        toast({ title: "Left circle" })
      } else {
        // Join circle
        await supabase.from("circle_memberships").insert({ circle_id: circle.id, user_id: user.id, role: "member" })
        setMemberStatus(true)
        toast({ title: "Joined circle!" })
      }
      router.refresh()
    } catch (error) {
      toast({ title: "Error", description: "Failed to update membership", variant: "destructive" })
    } finally {
      setLoading(false)
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
        <h1 className="text-base xs:text-lg font-semibold line-clamp-1">{circle.name}</h1>
      </div>

      {/* Cover */}
      <div className="h-32 xs:h-40 sm:h-48 bg-muted relative">
        {circle.cover_url && (
          <img src={circle.cover_url || "/placeholder.svg"} alt="Cover" className="h-full w-full object-cover" />
        )}
      </div>

      {/* Info */}
      <div className="px-3 xs:px-4 pb-4">
        <div className="flex items-start justify-between -mt-12 xs:-mt-14 sm:-mt-16 mb-3 xs:mb-4">
          <Avatar className="h-24 w-24 xs:h-28 xs:w-28 sm:h-32 sm:w-32 border-2 xs:border-4 border-background">
            <AvatarImage src={circle.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="text-xl xs:text-2xl sm:text-3xl">{circle.name[0]}</AvatarFallback>
          </Avatar>
          {memberStatus ? (
            <Button
              variant="outline"
              className="mt-12 xs:mt-14 sm:mt-16 bg-transparent text-xs xs:text-sm h-8 xs:h-9 sm:h-10 px-3 xs:px-4"
              onClick={handleJoinLeave}
              disabled={loading}
            >
              {loading ? "..." : "Joined"}
            </Button>
          ) : (
            <Button
              className="mt-12 xs:mt-14 sm:mt-16 bg-accent text-accent-foreground hover:bg-accent/90 text-xs xs:text-sm h-8 xs:h-9 sm:h-10 px-3 xs:px-4"
              onClick={handleJoinLeave}
              disabled={loading}
            >
              {loading ? "..." : "Join Circle"}
            </Button>
          )}
        </div>

        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 line-clamp-2">{circle.name}</h2>

        <div className="flex items-center gap-2 mb-2 xs:mb-3 text-xs xs:text-sm text-muted-foreground">
          {circle.privacy === "private" ? (
            <>
              <Lock className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
              Private
            </>
          ) : (
            <>
              <Globe className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
              Public
            </>
          )}
          {circle.category && (
            <Badge variant="secondary" className="text-[10px] xs:text-xs">
              #{circle.category}
            </Badge>
          )}
        </div>

        {circle.description && <p className="mb-2 xs:mb-3 text-sm xs:text-base">{circle.description}</p>}

        <div className="flex gap-3 xs:gap-4 sm:gap-6 text-xs xs:text-sm">
          <div>
            <span className="font-semibold">{circle.member_count}</span>{" "}
            <span className="text-muted-foreground">Members</span>
          </div>
          <div>
            <span className="font-semibold">{circle.post_count}</span>{" "}
            <span className="text-muted-foreground">Posts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
