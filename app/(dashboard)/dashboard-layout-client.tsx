"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/client-provider"
import { MainNav } from "@/components/shared/main-nav"
import { MobileNav } from "@/components/shared/mobile-nav"
import { RightSidebar } from "@/components/shared/right-sidebar"
import type { Profile, VaultBalance } from "@/types/database"

interface DashboardLayoutClientProps {
  children: React.ReactNode
  profile: Profile | null
  vaultBalance: VaultBalance | null
}

export function DashboardLayoutClient({ children, profile, vaultBalance }: DashboardLayoutClientProps) {
  const router = useRouter()
  const supabase = useSupabase()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <MainNav profile={profile} vaultBalance={vaultBalance} onSignOut={handleSignOut} />
      </div>

      {/* Mobile Navigation */}
      <MobileNav profile={profile} vaultBalance={vaultBalance} onSignOut={handleSignOut} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden md:ml-64 xl:mr-80">
        {/* Content Container with proper responsive spacing */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
            {/* Top spacing for mobile navigation */}
            <div className="md:hidden h-2" />
            
            {/* Main content */}
            {children}
            
            {/* Bottom spacing for mobile navigation and content */}
            <div className="h-4 sm:h-6" />
          </div>
        </div>
      </main>

      {/* Right Sidebar - Desktop only */}
      <RightSidebar />
    </div>
  )
}
