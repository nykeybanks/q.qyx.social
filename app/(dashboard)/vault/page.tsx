import { createClient } from "@/lib/supabase/server"
import { VaultDashboard } from "@/components/vault/vault-dashboard"
import { redirect } from "next/navigation"

async function getVaultData() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: balance } = await supabase.from("vault_balances").select("*").eq("user_id", user.id).single()

  const { data: transactions } = await supabase
    .from("vault_transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20)

  const { data: wallets } = await supabase.from("wallets").select("*").eq("user_id", user.id)

  return {
    balance,
    transactions: transactions || [],
    wallets: wallets || [],
  }
}

export default async function VaultPage() {
  const vaultData = await getVaultData()

  if (!vaultData) {
    redirect("/login")
  }

  return <VaultDashboard {...vaultData} />
}
