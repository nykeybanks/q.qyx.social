export type Profile = {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  cover_url: string | null
  location: string | null
  website: string | null
  verified_human: boolean
  verification_level: number
  created_at: string
  updated_at: string
}

export type Post = {
  id: string
  user_id: string
  content: string | null
  media_urls: string[] | null
  post_type: "post" | "reply" | "quote"
  parent_id: string | null
  quote_id: string | null
  category: string | null
  visibility: "public" | "private" | "followers"
  is_pinned: boolean
  like_count: number
  repost_count: number
  reply_count: number
  view_count: number
  moderation_status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
  profile?: Profile
}

export type Circle = {
  id: string
  name: string
  slug: string
  description: string | null
  avatar_url: string | null
  cover_url: string | null
  category: string | null
  privacy: "public" | "private" | "invite"
  owner_id: string
  member_count: number
  post_count: number
  rules: Record<string, unknown> | null
  settings: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export type GramPost = {
  id: string
  user_id: string
  caption: string | null
  media_urls: string[]
  media_type: "image" | "video" | "carousel"
  aspect_ratio: string
  location: string | null
  tags: string[] | null
  like_count: number
  comment_count: number
  view_count: number
  is_story: boolean
  story_expires_at: string | null
  moderation_status: "pending" | "approved" | "rejected"
  created_at: string
  profile?: Profile
}

export type VaultBalance = {
  id: string
  user_id: string
  bitcoin_points: number
  mining_credits: number
  total_earned: number
  total_withdrawn: number
  last_payout_at: string | null
  auto_payout_enabled: boolean
  auto_payout_time: string
  updated_at: string
}

export type VaultTransaction = {
  id: string
  user_id: string
  transaction_type: "earn" | "spend" | "withdraw" | "transfer"
  amount: number
  source: string | null
  reference_id: string | null
  status: "pending" | "completed" | "failed"
  metadata: Record<string, unknown> | null
  created_at: string
}

export type Wallet = {
  id: string
  user_id: string
  wallet_address: string
  wallet_type: "evm" | "solana" | "bitcoin"
  is_primary: boolean
  connected_at: string
}

export type Notification = {
  id: string
  user_id: string
  type: "like" | "follow" | "reply" | "mention" | "repost" | "reward" | "system"
  title: string | null
  body: string | null
  data: Record<string, unknown> | null
  read: boolean
  created_at: string
}
