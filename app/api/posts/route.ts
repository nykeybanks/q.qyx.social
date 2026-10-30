import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { content, media_urls, category, visibility = "public", parent_id, quote_id } = body

    if (!content && (!media_urls || media_urls.length === 0)) {
      return NextResponse.json({ error: "Content or media required" }, { status: 400 })
    }

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        content,
        media_urls,
        category,
        visibility,
        parent_id,
        quote_id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Grant rewards for creating content
    if (!parent_id) {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/rewards/grant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          action: "create_post",
          referenceId: post.id,
        }),
      })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("[v0] Error creating post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
