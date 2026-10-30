import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { platform } = await request.json()
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate OAuth URL for the platform
    const oauthUrls: Record<string, string> = {
      twitter: `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.TWITTER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/api/sync/callback/twitter&scope=tweet.read%20users.read&state=${user.id}`,
      instagram: `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/api/sync/callback/instagram&scope=user_profile,user_media&response_type=code&state=${user.id}`,
      facebook: `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/api/sync/callback/facebook&state=${user.id}&scope=pages_read_engagement,pages_read_user_content`,
      youtube: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/api/sync/callback/youtube&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly&state=${user.id}`,
      linkedin: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/api/sync/callback/linkedin&state=${user.id}&scope=r_liteprofile%20r_emailaddress%20w_member_social`,
    }

    const authUrl = oauthUrls[platform as keyof typeof oauthUrls]
    if (!authUrl) {
      return NextResponse.json({ error: "Unsupported platform" }, { status: 400 })
    }

    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error("[v0] Sync connect error:", error)
    return NextResponse.json({ error: "Failed to initiate connection" }, { status: 500 })
  }
}
