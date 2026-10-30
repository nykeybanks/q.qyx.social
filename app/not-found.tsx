'use client';

import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="relative flex flex-col items-center space-y-6 sm:space-y-8">
        {/* Background blur effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/3 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl animate-pulse" />
        </div>

        {/* 404 Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
          <div className="relative text-7xl sm:text-8xl font-bold text-accent drop-shadow-lg">404</div>
        </div>

        {/* Error Content */}
        <div className="space-y-2 sm:space-y-4 text-center max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-11 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/30 transition-all active:scale-95">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/vibes" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full h-11 border-border hover:bg-secondary/50 transition-all active:scale-95 bg-transparent">
              <Search className="mr-2 h-4 w-4" />
              Explore Vibes
            </Button>
          </Link>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 sm:mt-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  )
}
