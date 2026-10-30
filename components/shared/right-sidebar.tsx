import { TrendingUp, Users, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface TrendingTopic {
  category: string
  topic: string
  posts: string
}

interface SuggestedUser {
  username: string
  displayName: string
  avatar?: string
  verified: boolean
  mutualFollowers: number
}

interface RightSidebarProps {
  trending?: TrendingTopic[]
  suggestions?: SuggestedUser[]
}

const defaultTrending: TrendingTopic[] = [
  { category: "Crypto", topic: "Bitcoin Halving", posts: "125K" },
  { category: "Technology", topic: "AI Revolution", posts: "89.2K" },
  { category: "Web3", topic: "DeFi Summer", posts: "54.1K" },
  { category: "Finance", topic: "Market Rally", posts: "42.8K" },
]

const defaultSuggestions: SuggestedUser[] = [
  { username: "satoshi_nakamoto", displayName: "Satoshi Nakamoto", verified: true, mutualFollowers: 12 },
  { username: "vitalik_eth", displayName: "Vitalik Buterin", verified: true, mutualFollowers: 8 },
  { username: "crypto_whale", displayName: "Crypto Whale", verified: false, mutualFollowers: 5 },
]

export function RightSidebar({ trending = defaultTrending, suggestions = defaultSuggestions }: RightSidebarProps) {
  return (
    <aside className="fixed right-0 top-0 z-40 hidden h-screen w-80 border-l border-border bg-sidebar p-4 overflow-y-auto xl:block">
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search Q Social"
          className="bg-secondary pl-10 border-border focus:border-accent transition-colors"
        />
      </div>

      <Card className="mb-6 border-accent/30 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent animate-pulse" />
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            Earn Bitcoin Points
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="mb-3 text-xs text-muted-foreground">
            Create content, engage with the community, and earn rewards in the Q Social ecosystem.
          </p>
          <Button
            size="sm"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all"
          >
            Learn More
          </Button>
        </CardContent>
      </Card>

      {/* Trending */}
      <Card className="mb-6 border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4 text-accent" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {trending.map((item, index) => (
            <button
              key={index}
              className="block w-full text-left transition-all hover:bg-accent/5 hover:border-l-2 hover:border-accent -mx-2 px-2 py-2 rounded group"
            >
              <p className="text-xs text-muted-foreground group-hover:text-accent transition-colors">{item.category}</p>
              <p className="font-medium text-foreground text-sm">{item.topic}</p>
              <p className="text-xs text-muted-foreground">{item.posts} posts</p>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Who to Follow */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4 text-accent" />
            Who to Follow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {suggestions.map((user, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <Avatar className="h-10 w-10 border border-border group-hover:border-accent transition-colors">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-muted text-muted-foreground">{user.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {user.displayName}
                  {user.verified && (
                    <span className="ml-1 inline-block h-4 w-4 rounded-full bg-accent text-center text-[10px] leading-4 text-accent-foreground">
                      ✓
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-muted-foreground">@{user.username}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent hover:scale-105 transition-all"
              >
                Follow
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <a href="#" className="hover:underline hover:text-accent transition-colors">
          Terms
        </a>
        <span>·</span>
        <a href="#" className="hover:underline hover:text-accent transition-colors">
          Privacy
        </a>
        <span>·</span>
        <a href="#" className="hover:underline hover:text-accent transition-colors">
          Cookies
        </a>
        <span>·</span>
        <a href="#" className="hover:underline hover:text-accent transition-colors">
          About
        </a>
        <p className="w-full mt-2">© 2026 QuantumYield</p>
      </div>
    </aside>
  )
}
