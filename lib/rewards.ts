import { createClient } from "@/lib/supabase/client"

export const REWARD_AMOUNTS = {
  POST_CREATE: 10,
  POST_LIKE_RECEIVED: 1,
  POST_REPLY_RECEIVED: 2,
  POST_REPOST_RECEIVED: 3,
  CIRCLE_CREATE: 25,
  CIRCLE_JOIN: 5,
  GRAM_POST_CREATE: 15,
  GRAM_LIKE_RECEIVED: 1,
  DAILY_LOGIN: 5,
  PROFILE_COMPLETE: 50,
  VERIFICATION_COMPLETE: 100,
  REFERRAL: 200,
} as const

export async function grantReward(
  userId: string,
  amount: number,
  source: string,
  referenceId?: string,
): Promise<boolean> {
  try {
    const response = await fetch("/api/rewards/grant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, source, referenceId }),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to grant reward:", error)
    return false
  }
}

export async function getUserVaultBalance(userId: string) {
  const supabase = createClient()
  const { data } = await supabase.from("vault_balances").select("*").eq("user_id", userId).single()
  return data
}

export async function getUserTransactions(userId: string, limit = 50) {
  const supabase = createClient()
  const { data } = await supabase
    .from("vault_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  return data || []
}
