import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-x border-border min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 sm:gap-4 border-b border-border bg-background/80 backdrop-blur-md px-3 sm:px-4 py-3">
        <Link href="/threads">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
        <h1 className="text-base sm:text-lg font-semibold">Settings</h1>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-border overflow-x-auto">
        <Link
          href="/settings/account"
          className="flex-shrink-0 px-4 py-3 text-center text-xs sm:text-sm font-medium hover:bg-muted transition-colors border-b-2 border-transparent hover:border-accent whitespace-nowrap"
        >
          Account
        </Link>
        <Link
          href="/settings/privacy"
          className="flex-shrink-0 px-4 py-3 text-center text-xs sm:text-sm font-medium hover:bg-muted transition-colors border-b-2 border-transparent hover:border-accent whitespace-nowrap"
        >
          Privacy
        </Link>
        <Link
          href="/settings/notifications"
          className="flex-shrink-0 px-4 py-3 text-center text-xs sm:text-sm font-medium hover:bg-muted transition-colors border-b-2 border-transparent hover:border-accent whitespace-nowrap"
        >
          Notifications
        </Link>
        <Link
          href="/settings/sync"
          className="flex-shrink-0 px-4 py-3 text-center text-xs sm:text-sm font-medium hover:bg-muted transition-colors border-b-2 border-transparent hover:border-accent whitespace-nowrap"
        >
          Sync & Import
        </Link>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6">{children}</div>
    </div>
  )
}
