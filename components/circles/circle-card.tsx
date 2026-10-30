"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Lock, Globe, Loader2 } from "lucide-react"
import type { Circle } from "@/types/database"

interface CircleCardProps {
  circle: Circle
  showJoinButton?: boolean
}

export function CircleCard({ circle, showJoinButton = true }: CircleCardProps) {
  const [joining, setJoining] = useState(false)
  const [joined, setJoined] = useState(false)

  const handleJoin = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setJoining(true)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setJoining(false)
      return
    }

    const { error } = await supabase.from("circle_memberships").insert({
      circle_id: circle.id,
      user_id: user.id,
      role: "member",
    })

    if (!error) {
      setJoined(true)
    }

    setJoining(false)
  }

  return (
    <Link href={`/circles/${circle.slug}`}>
      <Card className="group border-border bg-card transition-all duration-200 hover:border-accent/40 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 active:scale-98 touch-manipulation">
        {/* Cover Image - Enhanced with overlay */}
        <div className="relative h-20 xs:h-24 overflow-hidden rounded-t-xl bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5">
          {circle.cover_url && (
            <img
              src={circle.cover_url || "/placeholder.svg"}
              alt={circle.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        <CardContent className="relative -mt-6 p-3 xs:p-4">
          {/* Avatar */}
          <Avatar className="h-10 w-10 xs:h-12 xs:w-12 border-2 border-card shadow-lg">
            <AvatarImage src={circle.avatar_url || undefined} />
            <AvatarFallback className="bg-accent text-accent-foreground text-base xs:text-lg">
              {circle.name[0]}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="mt-2 xs:mt-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm xs:text-base text-foreground truncate flex-1">{circle.name}</h3>
              {circle.privacy === "private" ? (
                <Lock className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-muted-foreground flex-shrink-0" />
              ) : (
                <Globe className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-muted-foreground flex-shrink-0" />
              )}
            </div>
            <p className="mt-1 text-xs xs:text-sm text-muted-foreground line-clamp-2">
              {circle.description || "No description"}
            </p>
          </div>

          {/* Stats & Action */}
          <div className="mt-3 xs:mt-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-xs xs:text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5 xs:h-4 xs:w-4" />
              <span>{circle.member_count.toLocaleString()}</span>
              <span className="hidden xs:inline">members</span>
            </div>

            {showJoinButton && (
              <Button
                size="sm"
                variant={joined ? "secondary" : "default"}
                onClick={handleJoin}
                disabled={joining || joined}
                className={
                  joined
                    ? "text-xs xs:text-sm touch-manipulation"
                    : "bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all text-xs xs:text-sm shadow-sm shadow-accent/20 touch-manipulation"
                }
              >
                {joining ? (
                  <Loader2 className="h-3.5 w-3.5 xs:h-4 xs:w-4 animate-spin" />
                ) : joined ? (
                  "Joined"
                ) : (
                  "Join"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
