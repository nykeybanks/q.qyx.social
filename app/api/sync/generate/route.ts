import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { postIds, style = "creative", count = 5 } = await request.json()
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch the imported posts
    const { data: posts, error } = await supabase
      .from("imported_posts")
      .select("*")
      .in("id", postIds)
      .eq("user_id", user.id)

    if (error) throw error

    if (!posts || posts.length === 0) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 })
    }

    // Generate AI content based on imported posts
    const generatedPosts = []

    for (let i = 0; i < Math.min(count, posts.length); i++) {
      const post = posts[i]

      const { text } = await generateText({
        model: "openai/gpt-4o-mini",
        prompt: `You are a ${style} social media content creator. Based on this ${post.platform} post: "${post.content}", create a new engaging post for Q Social (a Twitter/X-like platform). Keep it under 280 characters. Make it ${style} in tone. Don't use hashtags unless the original had them. Just return the post text, nothing else.`,
      })

      generatedPosts.push({
        originalPlatform: post.platform,
        originalContent: post.content,
        generatedContent: text,
        style,
      })
    }

    return NextResponse.json({
      success: true,
      generated: generatedPosts,
    })
  } catch (error) {
    console.error("[v0] AI generation error:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
