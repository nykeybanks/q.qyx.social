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

    // Check if already bookmarked
    const { data: existingBookmark } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", user.id)
      .eq("post_id", postId)
      .single()

    if (existingBookmark) {
      // Remove bookmark
      await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("post_id", postId)

      return NextResponse.json({ bookmarked: false })
    } else {
      // Add bookmark
      await supabase.from("bookmarks").insert({
        user_id: user.id,
        post_id: postId,
      })

      return NextResponse.json({ bookmarked: true })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle bookmark" }, { status: 500 })
  }
}
