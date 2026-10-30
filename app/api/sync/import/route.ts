import { createClient } from "@/lib/supabase/server"
import { ContentAggregator } from "@/lib/sync/content-aggregator"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { platform, limit = 50 } = await request.json()
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get sync config for platform
    const { data: config } = await supabase
      .from("sync_configs")
      .select("*")
      .eq("user_id", user.id)
      .eq("platform", platform)
      .single()

    if (!config) {
      return NextResponse.json({ error: "Platform not connected" }, { status: 400 })
    }

    const aggregator = new ContentAggregator(supabase)
    let importedPosts = []

    // Import based on platform
    switch (platform) {
      case "twitter":
        importedPosts = await aggregator.importFromTwitter(config)
        break
      case "instagram":
        importedPosts = await aggregator.importFromInstagram(config)
        break
      case "facebook":
        importedPosts = await aggregator.importFromFacebook(config)
        break
      case "youtube":
        importedPosts = await aggregator.importFromYouTube(config)
        break
      case "linkedin":
        importedPosts = await aggregator.importFromLinkedIn(config)
        break
      default:
        return NextResponse.json({ error: "Unsupported platform" }, { status: 400 })
    }

    // Store imported posts in database
    if (importedPosts && importedPosts.length > 0) {
      const { error: insertError } = await supabase
        .from("imported_posts")
        .insert(
          importedPosts.map((post) => ({
            user_id: user.id,
            platform: platform,
            external_id: post.externalId,
            content: post.content,
            media_urls: post.mediaUrls,
            author: post.author,
            author_username: post.authorUsername,
            author_avatar: post.authorAvatar,
            likes: post.likes,
            comments: post.comments,
            shares: post.shares,
            views: post.views,
            published_at: post.publishedAt.toISOString(),
            metadata: post.metadata,
          })),
        )

      if (insertError) throw insertError

      // Update last sync time
      await supabase.from("sync_configs").update({ last_sync_at: new Date().toISOString() }).eq("id", config.id)
    }

    return NextResponse.json({
      success: true,
      imported: importedPosts.length,
      posts: importedPosts,
    })
  } catch (error) {
    console.error("[v0] Content import error:", error)
    return NextResponse.json({ error: "Failed to import content" }, { status: 500 })
  }
}
