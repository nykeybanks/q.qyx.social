import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayoutClient } from "./dashboard-layout-client"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch vault balance
  const { data: vaultBalance } = await supabase.from("vault_balances").select("*").eq("user_id", user.id).single()

  return (
    <DashboardLayoutClient profile={profile} vaultBalance={vaultBalance}>
      {children}
    </DashboardLayoutClient>
  )
}
