import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.id === userId) {
      return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 })
    }

    // Check if already following
    const { data: existingFollow } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", userId)
      .single()

    if (existingFollow) {
      // Unfollow
      await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", userId)

      return NextResponse.json({ following: false })
    } else {
      // Follow
      await supabase.from("follows").insert({
        follower_id: user.id,
        following_id: userId,
      })

      // Create notification
      await supabase.from("notifications").insert({
        user_id: userId,
        type: "follow",
        title: "New Follower",
        body: "Someone started following you",
        data: { follower_id: user.id },
      })

      return NextResponse.json({ following: true })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle follow" }, { status: 500 })
  }
}
