"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Users, Hash, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"

async function getTrendingTopics() {
  return [
    { tag: "Bitcoin", posts: "125K" },
    { tag: "Web3", posts: "89.2K" },
    { tag: "DeFi", posts: "54.1K" },
    { tag: "NFTs", posts: "42.8K" },
    { tag: "Ethereum", posts: "38.5K" },
    { tag: "Crypto", posts: "35.2K" },
  ]
}

async function getSuggestedUsers() {
  const supabase = createClient()

  const { data: users } = await supabase.from("profiles").select("*").eq("verified_human", true).limit(5)

  return users || []
}

async function getPopularCircles() {
  const supabase = createClient()

  const { data: circles } = await supabase
    .from("circles")
    .select("*")
    .eq("privacy", "public")
    .order("member_count", { ascending: false })
    .limit(5)

  return circles || []
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [trendingTopics, setTrendingTopics] = useState<any[]>([])
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([])
  const [popularCircles, setPopularCircles] = useState<any[]>([])
  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    const supabase = createClient()

    const [usersData, circlesData] = await Promise.all([
      supabase.from("profiles").select("*").eq("verified_human", true).limit(5),
      supabase.from("circles").select("*").eq("privacy", "public").order("member_count", { ascending: false }).limit(5),
    ])

    setSuggestedUsers(usersData.data || [])
    setPopularCircles(circlesData.data || [])
    setTrendingTopics([
      { tag: "Bitcoin", posts: "125K" },
      { tag: "Web3", posts: "89.2K" },
      { tag: "DeFi", posts: "54.1K" },
      { tag: "NFTs", posts: "42.8K" },
      { tag: "Ethereum", posts: "38.5K" },
      { tag: "Crypto", posts: "35.2K" },
    ])
  }

  useEffect(() => {
    if (debouncedSearch.trim()) {
      performSearch(debouncedSearch)
    } else {
      setSearchResults([])
    }
  }, [debouncedSearch])

  const performSearch = async (query: string) => {
    setIsSearching(true)
    const supabase = createClient()

    const [postsData, usersData, circlesData] = await Promise.all([
      supabase.from("posts").select("*").ilike("content", `%${query}%`).limit(5),
      supabase.from("profiles").select("*").or(`username.ilike.%${query}%,display_name.ilike.%${query}%`).limit(5),
      supabase.from("circles").select("*").or(`name.ilike.%${query}%,description.ilike.%${query}%`).limit(5),
    ])

    setSearchResults([
      ...(postsData.data || []).map((p) => ({ type: "post", data: p })),
      ...(usersData.data || []).map((u) => ({ type: "user", data: u })),
      ...(circlesData.data || []).map((c) => ({ type: "circle", data: c })),
    ])
    setIsSearching(false)
  }

  return (
    <div className="border-x border-border min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Explore Q Social
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground hidden sm:inline">Live</span>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors" />
            <Input
              placeholder="Search users, posts, circles..."
              className="bg-secondary/50 pl-10 border-border text-sm pr-10 h-10 sm:h-11 focus-visible:bg-background transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-accent" />
            )}
          </div>
        </div>
      </header>

      <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        {searchQuery.trim() && (
          <Card className="border-border bg-card">
            <CardHeader className="pb-3 p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                Search Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {searchResults.length === 0 && !isSearching ? (
                <p className="text-center text-xs sm:text-sm text-muted-foreground py-4">No results found</p>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors"
                    >
                      {result.type === "user" && (
                        <Link href={`/profile/${result.data.id}`} className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={result.data.avatar_url || undefined} />
                            <AvatarFallback className="bg-muted">{result.data.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{result.data.display_name || result.data.username}</p>
                            <p className="text-xs text-muted-foreground">@{result.data.username}</p>
                          </div>
                        </Link>
                      )}
                      {result.type === "post" && (
                        <Link href={`/threads/${result.data.id}`}>
                          <p className="text-sm line-clamp-2">{result.data.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            by @{result.data.profiles?.username || "unknown"}
                          </p>
                        </Link>
                      )}
                      {result.type === "circle" && (
                        <Link href={`/circles/${result.data.slug}`} className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarFallback className="bg-accent text-accent-foreground">
                              {result.data.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{result.data.name}</p>
                            <p className="text-xs text-muted-foreground">{result.data.member_count} members</p>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="border-border bg-card">
          <CardHeader className="pb-3 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-2 sm:space-y-3">
              {trendingTopics.map((topic, index) => (
                <Link
                  key={index}
                  href={`/explore/tag/${topic.tag.toLowerCase()}`}
                  className="flex items-center justify-between rounded-lg p-2 sm:p-3 transition-colors hover:bg-secondary active:bg-secondary/80 touch-manipulation"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-accent/10">
                      <Hash className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm sm:text-base">#{topic.tag}</p>
                      <p className="text-[10px] xs:text-xs text-muted-foreground">{topic.posts} posts</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">#{index + 1}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Suggested for You
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {suggestedUsers.length === 0 ? (
              <p className="text-center text-xs sm:text-sm text-muted-foreground py-4">No suggestions available yet</p>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2 sm:gap-3">
                    <Link href={`/profile/${user.id}`}>
                      <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-border">
                        <AvatarImage src={user.avatar_url || undefined} />
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs sm:text-sm">
                          {user.display_name?.[0] || user.username[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/profile/${user.id}`}
                        className="font-medium text-foreground hover:underline truncate block text-sm sm:text-base"
                      >
                        {user.display_name || user.username}
                        {user.verified_human && (
                          <span className="ml-1 inline-block h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-accent text-center text-[8px] sm:text-[10px] leading-3 sm:leading-4 text-accent-foreground">
                            ✓
                          </span>
                        )}
                      </Link>
                      <p className="text-[10px] xs:text-xs text-muted-foreground truncate">@{user.username}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent text-xs h-7 sm:h-8"
                    >
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Popular Circles
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {popularCircles.length === 0 ? (
              <p className="text-center text-xs sm:text-sm text-muted-foreground py-4">No circles available yet</p>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {popularCircles.map((circle) => (
                  <Link
                    key={circle.id}
                    href={`/circles/${circle.slug}`}
                    className="flex items-center gap-2 sm:gap-3 rounded-lg p-2 sm:p-3 transition-colors hover:bg-secondary active:bg-secondary/80 touch-manipulation"
                  >
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-border">
                      <AvatarImage src={circle.avatar_url || undefined} />
                      <AvatarFallback className="bg-accent text-accent-foreground text-xs sm:text-sm">
                        {circle.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate text-sm sm:text-base">{circle.name}</p>
                      <p className="text-[10px] xs:text-xs text-muted-foreground">
                        {circle.member_count.toLocaleString()} members
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent text-xs h-7 sm:h-8"
                    >
                      Join
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
