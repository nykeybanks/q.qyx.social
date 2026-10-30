"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSupabase } from "@/lib/supabase/client-provider"
import { MessagesList } from "@/components/messages/messages-list"
import { Skeleton } from "@/components/ui/skeleton"
import type { Conversation, DatabaseConversation } from "@/types/messages"

export default function MessagesPage() {
  const supabase = useSupabase()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      // Fetch conversations for current user
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
        .order("updated_at", { ascending: false })

      if (error) throw error
      
      // Transform database conversations to component format
      const transformed = (data || []).map((conv: DatabaseConversation) => ({
        id: conv.id,
        user: {
          id: conv.participant_1_id === user.id ? conv.participant_2_id : conv.participant_1_id,
          username: conv.participant_name || "User",
          display_name: conv.participant_name || "User",
          avatar_url: undefined,
        },
        lastMessage: conv.last_message || "No messages yet",
        lastMessageTime: conv.last_message_time ? new Date(conv.last_message_time) : new Date(conv.updated_at),
        unreadCount: conv.unread_count || 0,
      }))
      
      setConversations(transformed)
    } catch (error) {
      console.error("[v0] Error loading conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredConversations = conversations.filter((conv) => {
    const searchTerm = searchQuery.toLowerCase()
    return conv.user.display_name.toLowerCase().includes(searchTerm)
  })

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Enhanced with gradient and live indicator */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Q-Direct
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground hidden sm:inline">Live</span>
            </div>
          </div>
          <Button 
            size="sm" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all active:scale-95 touch-manipulation h-8 sm:h-9"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-0 sm:mr-1.5" />
            <span className="hidden xs:inline">New Message</span>
            <span className="inline xs:hidden sr-only">New</span>
          </Button>
        </div>
      </header>

      {/* Search - Enhanced with better focus states */}
      <div className="sticky top-[57px] sm:top-[65px] z-20 border-b border-border bg-background/98 backdrop-blur-md p-3 sm:p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 sm:h-10 bg-secondary/50 focus-visible:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : conversations.length === 0 ? (
        // Empty State - Enhanced with gradient and animation
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4 animate-fade-in-up">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20">
              <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Welcome to Q-Direct!</h3>
          <p className="mt-2 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
            Drop a line, share posts and more with private conversations between you and others on Q Social.
          </p>
          <Button className="mt-6 sm:mt-8 bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/25">
            <Plus className="h-4 w-4 mr-2" />
            Write your first message
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            End-to-end encrypted conversations
          </p>
        </div>
      ) : (
        <MessagesList conversations={filteredConversations} />
      )}
    </div>
  )
}
