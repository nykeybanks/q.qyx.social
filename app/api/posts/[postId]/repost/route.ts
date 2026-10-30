import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if already reposted
    const { data: existingRepost } = await supabase
      .from("reposts")
      .select("id")
      .eq("user_id", user.id)
      .eq("post_id", postId)
      .single()

    if (existingRepost) {
      // Unrepost
      await supabase.from("reposts").delete().eq("user_id", user.id).eq("post_id", postId)

      // Decrement repost count
      await supabase.rpc("decrement_post_reposts", { post_id: postId })

      return NextResponse.json({ reposted: false })
    } else {
      // Repost
      await supabase.from("reposts").insert({
        user_id: user.id,
        post_id: postId,
      })

      // Increment repost count
      await supabase.rpc("increment_post_reposts", { post_id: postId })

      return NextResponse.json({ reposted: true })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle repost" }, { status: 500 })
  }
}
