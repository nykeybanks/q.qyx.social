import type { SupabaseClient } from "@supabase/supabase-js"
import { generateText } from "ai"

export type SocialPlatform = "twitter" | "instagram" | "facebook" | "youtube" | "linkedin" | "tiktok"

export type ImportedPost = {
  id: string
  platform: SocialPlatform
  externalId: string
  content: string
  mediaUrls: string[]
  author: string
  authorUsername: string
  authorAvatar?: string
  likes: number
  comments: number
  shares: number
  views?: number
  publishedAt: Date
  importedAt: Date
  metadata: Record<string, any>
}

export type SyncConfig = {
  platform: SocialPlatform
  accessToken: string
  refreshToken?: string
  lastSyncAt?: Date
  syncInterval?: number // in hours
  autoSync: boolean
}

export class ContentAggregator {
  constructor(private supabase: SupabaseClient) {}

  async importFromTwitter(config: SyncConfig): Promise<ImportedPost[]> {
    // Would call Twitter API v2 with bearer token
    // Example implementation structure:
    // const response = await fetch('https://api.twitter.com/2/users/me/tweets', {
    //   headers: { 'Authorization': `Bearer ${config.accessToken}` }
    // })
    // const tweets = await response.json()
    // Parse and return imported posts
    
    // For now, return empty array - production requires Twitter API credentials
    console.log("[v0] Twitter import method - awaiting API credentials configuration")
    return []
  }

  async importFromInstagram(config: SyncConfig): Promise<ImportedPost[]> {
    // Would call Instagram Graph API
    // const response = await fetch(`https://graph.instagram.com/me/media?fields=...&access_token=${config.accessToken}`)
    // Parse response and return imported posts
    
    console.log("[v0] Instagram import method - awaiting API credentials configuration")
    return []
  }

  async importFromFacebook(config: SyncConfig): Promise<ImportedPost[]> {
    // Would call Facebook Graph API
    // const response = await fetch(`https://graph.facebook.com/me/feed?access_token=${config.accessToken}`)
    // Parse response and return imported posts
    
    console.log("[v0] Facebook import method - awaiting API credentials configuration")
    return []
  }

  async importFromYouTube(config: SyncConfig): Promise<ImportedPost[]> {
    // Would call YouTube Data API v3
    // const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=${config.accessToken}`)
    // Parse response and return imported videos as posts
    
    console.log("[v0] YouTube import method - awaiting API credentials configuration")
    return []
  }

  async importFromLinkedIn(config: SyncConfig): Promise<ImportedPost[]> {
    // Would call LinkedIn API v2
    // const response = await fetch('https://api.linkedin.com/v2/me', {
    //   headers: { 'Authorization': `Bearer ${config.accessToken}` }
    // })
    // Parse response and return imported posts
    
    console.log("[v0] LinkedIn import method - awaiting API credentials configuration")
    return []
  }

  async aggregateContent(userId: string, platforms: SocialPlatform[]): Promise<ImportedPost[]> {
    // Fetch all imported posts from specified platforms
    const { data, error } = await this.supabase
      .from("imported_posts")
      .select("*")
      .eq("user_id", userId)
      .in("platform", platforms)
      .order("published_at", { ascending: false })
      .limit(100)

    if (error) throw error
    return data || []
  }

  async generateAIContent(posts: ImportedPost[], style: "creative" | "professional" | "casual"): Promise<string[]> {
    // Generate new content using AI based on imported posts
    const generatedContent: string[] = []

    try {
      for (const post of posts.slice(0, 5)) {
        // Generate one new post per imported post (max 5)
        const { text } = await generateText({
          model: "openai/gpt-4o-mini",
          prompt: `You are a ${style} social media content creator. Based on this ${post.platform} post: "${post.content}", generate a new engaging post for Q Social. Keep it under 280 characters. Make it ${style} in tone. Don't use hashtags unless the original had them. Just return the post text, nothing else.`,
        })
        generatedContent.push(text)
      }
    } catch (error) {
      console.error("[v0] AI content generation error:", error)
      // Continue without generated content if AI fails
    }

    return generatedContent
  }

  async scheduleSync(userId: string, config: SyncConfig): Promise<void> {
    // Store sync configuration
    await this.supabase.from("sync_configs").upsert({
      user_id: userId,
      platform: config.platform,
      access_token: config.accessToken,
      refresh_token: config.refreshToken,
      last_sync_at: config.lastSyncAt,
      sync_interval: config.syncInterval,
      auto_sync: config.autoSync,
      updated_at: new Date().toISOString(),
    })
  }

  async getContentInsights(userId: string) {
    const { data, error } = await this.supabase
      .from("imported_posts")
      .select("platform, likes, comments, shares, views")
      .eq("user_id", userId)

    if (error) throw error

    // Calculate aggregated insights
    const insights = {
      totalEngagement: 0,
      platformBreakdown: {} as Record<string, number>,
      avgLikes: 0,
      avgComments: 0,
      avgShares: 0,
      topPlatform: "" as SocialPlatform,
    }

    data?.forEach((post) => {
      insights.totalEngagement += post.likes + post.comments + post.shares + (post.views || 0)
      insights.platformBreakdown[post.platform] = (insights.platformBreakdown[post.platform] || 0) + 1
    })

    return insights
  }
}

export async function createContentAggregator(supabase: SupabaseClient) {
  return new ContentAggregator(supabase)
}
