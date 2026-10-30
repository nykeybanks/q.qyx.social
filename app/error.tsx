"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Global error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="relative flex flex-col items-center space-y-6 sm:space-y-8">
        {/* Background blur effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/3 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-destructive/5 blur-3xl animate-pulse" />
        </div>

        {/* Error Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl" />
          <AlertCircle className="relative h-20 w-20 sm:h-24 sm:w-24 text-destructive drop-shadow-lg" />
        </div>

        {/* Error Content */}
        <div className="space-y-2 sm:space-y-4 text-center max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          {error.digest && <p className="text-xs sm:text-sm text-muted-foreground/60 font-mono">Error ID: {error.digest}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Button
            onClick={reset}
            className="w-full sm:w-auto h-11 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/30 transition-all active:scale-95 group"
          >
            <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
            Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full h-11 border-border hover:bg-secondary/50 transition-all active:scale-95 bg-transparent"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-6 sm:mt-8 w-full max-w-2xl">
            <details className="group rounded-lg border border-border/50 bg-secondary/30 p-4 cursor-pointer hover:bg-secondary/50 transition-all">
              <summary className="flex items-center gap-2 font-semibold text-foreground select-none">
                <span className="transition-transform group-open:rotate-90">▶</span>
                Error Details
              </summary>
              <div className="mt-4 text-xs sm:text-sm text-muted-foreground font-mono overflow-auto max-h-32 sm:max-h-48 whitespace-pre-wrap break-words">
                {error.stack}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}
