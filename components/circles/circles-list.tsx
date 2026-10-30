"use client"

import Link from "next/link"
import { CircleCard } from "./circle-card"
import type { Circle } from "@/types/database"
import { Users } from "lucide-react"

interface CirclesListProps {
  circles: Circle[]
  emptyMessage?: string
  showJoinButton?: boolean
}

export function CirclesList({ circles, emptyMessage = "No circles found", showJoinButton = true }: CirclesListProps) {
  if (circles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
        <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-secondary">
          <Users className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground">{emptyMessage}</h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-md">
          Create a new circle or explore existing ones.
        </p>
        <Link href="/circles/create" className="mt-4 text-xs sm:text-sm font-medium text-accent hover:underline">
          Create a Circle
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:gap-4 p-3 sm:p-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
      {circles.map((circle) => (
        <CircleCard key={circle.id} circle={circle} showJoinButton={showJoinButton} />
      ))}
    </div>
  )
}
