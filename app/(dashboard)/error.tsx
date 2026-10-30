"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error("[v0] Dashboard error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 rounded-xl border border-destructive/20 bg-gradient-to-b from-destructive/5 to-destructive/2 p-6 sm:p-8">
      <div className="relative">
        <div className="absolute inset-0 bg-destructive/20 rounded-full blur-lg" />
        <AlertTriangle className="relative h-12 w-12 sm:h-14 sm:w-14 text-destructive drop-shadow-lg" />
      </div>

      <div className="space-y-2 sm:space-y-3 text-center max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Something went wrong</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {error.message || "Failed to load this section. Please try again."}
        </p>
        {error.digest && <p className="text-xs text-muted-foreground/60 font-mono">Error ID: {error.digest}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <Button
          onClick={reset}
          className="w-full sm:w-auto h-10 sm:h-11 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/30 transition-all active:scale-95 group"
        >
          <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
          Try Again
        </Button>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="w-full sm:w-auto h-10 sm:h-11 border-border hover:bg-secondary/50 transition-all active:scale-95"
        >
          Go Back
        </Button>
      </div>

      <Link href="/vibes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        <Button variant="ghost" className="gap-2">
          <Home className="h-4 w-4" />
          Return to Home
        </Button>
      </Link>
    </div>
  )
}
