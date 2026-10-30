"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const PULL_THRESHOLD = 80

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let touchStart = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        touchStart = e.touches[0].clientY
        startY.current = touchStart
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY !== 0 || isRefreshing) return

      const touchY = e.touches[0].clientY
      const distance = touchY - touchStart

      if (distance > 0) {
        setIsPulling(true)
        setPullDistance(Math.min(distance, PULL_THRESHOLD * 1.5))

        // Prevent default scroll if pulling
        if (distance > 10) {
          e.preventDefault()
        }
      }
    }

    const handleTouchEnd = async () => {
      if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
        setIsRefreshing(true)
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
        }
      }
      setIsPulling(false)
      setPullDistance(0)
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [pullDistance, isRefreshing, onRefresh])

  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1)
  const showIndicator = isPulling || isRefreshing

  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <div
        className={cn(
          "absolute left-0 right-0 top-0 z-50 flex items-center justify-center transition-all",
          showIndicator ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        style={{
          transform: `translateY(${pullDistance > 0 ? Math.min(pullDistance - 40, 40) : -40}px)`,
        }}
      >
        <div className="rounded-full bg-background border border-border p-2 shadow-lg">
          <Loader2
            className={cn("h-5 w-5 text-accent", isRefreshing ? "animate-spin" : "")}
            style={{
              transform: `rotate(${progress * 360}deg)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          transform: isPulling && !isRefreshing ? `translateY(${Math.min(pullDistance / 2, 40)}px)` : "none",
          transition: isPulling ? "none" : "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}
