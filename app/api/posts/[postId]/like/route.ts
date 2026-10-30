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

    // Check if already liked
    const { data: existingLike } = await supabase
      .from("post_likes")
      .select("id")
      .eq("user_id", user.id)
      .eq("post_id", postId)
      .single()

    if (existingLike) {
      // Unlike
      await supabase.from("post_likes").delete().eq("user_id", user.id).eq("post_id", postId)

      // Decrement like count
      await supabase.rpc("decrement_post_likes", { post_id: postId })

      return NextResponse.json({ liked: false })
    } else {
      // Like
      await supabase.from("post_likes").insert({
        user_id: user.id,
        post_id: postId,
      })

      // Increment like count
      await supabase.rpc("increment_post_likes", { post_id: postId })

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 })
  }
}
