"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg" | "xl"
  text?: string
  className?: string
  fullScreen?: boolean
}

export function LoadingIndicator({ size = "md", text, className, fullScreen = false }: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className={cn("animate-spin text-accent", sizeClasses[size])} />
          {text && <p className={cn("text-muted-foreground font-medium", textSizes[size])}>{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Loader2 className={cn("animate-spin text-accent", sizeClasses[size])} />
      {text && <p className={cn("text-muted-foreground font-medium", textSizes[size])}>{text}</p>}
    </div>
  )
}

export function PageLoadingSkeleton() {
  return (
    <div className="space-y-4 p-4 sm:p-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex gap-3 sm:gap-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-muted animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-32 sm:w-40 bg-muted animate-pulse rounded" />
              <div className="h-20 sm:h-24 w-full bg-muted animate-pulse rounded" />
              <div className="flex gap-2">
                <div className="h-8 w-16 sm:w-20 bg-muted animate-pulse rounded" />
                <div className="h-8 w-16 sm:w-20 bg-muted animate-pulse rounded" />
                <div className="h-8 w-16 sm:w-20 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
