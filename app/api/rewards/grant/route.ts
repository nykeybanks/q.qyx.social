import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId, amount, source, referenceId } = await request.json()

    const supabase = await createClient()

    // Get current user to verify authorization
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get or create vault balance
    const { data: vault } = await supabase.from("vault_balances").select("*").eq("user_id", userId).single()

    if (!vault) {
      // Create new vault
      await supabase.from("vault_balances").insert({
        user_id: userId,
        bitcoin_points: amount,
        mining_credits: 0,
        total_earned: amount,
        total_withdrawn: 0,
      })
    } else {
      // Update existing vault
      await supabase
        .from("vault_balances")
        .update({
          bitcoin_points: Number(vault.bitcoin_points) + amount,
          total_earned: Number(vault.total_earned) + amount,
        })
        .eq("user_id", userId)
    }

    // Record transaction
    await supabase.from("vault_transactions").insert({
      user_id: userId,
      transaction_type: "earn",
      amount,
      source,
      reference_id: referenceId,
      status: "completed",
      metadata: { timestamp: new Date().toISOString() },
    })

    return NextResponse.json({ success: true, amount })
  } catch (error) {
    console.error("Error granting rewards:", error)
    return NextResponse.json({ error: "Failed to grant rewards" }, { status: 500 })
  }
}
