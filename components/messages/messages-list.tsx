'use client'

import { useRouter } from "next/navigation"
import { MessageCircle, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import type { Conversation } from "@/types/messages"

interface MessagesListProps {
  conversations: Conversation[]
  filteredConversations: Conversation[]
}

export function MessagesList({ conversations, filteredConversations }: MessagesListProps) {
  const router = useRouter()

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-base sm:text-lg font-semibold mb-2">No messages yet</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Start a conversation to connect with others</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-border">
      {filteredConversations.length > 0 ? (
        filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => router.push(`/messages/${conversation.id}`)}
            className="w-full p-3 sm:p-4 hover:bg-muted/50 cursor-pointer transition-colors active:bg-muted text-left"
          >
            <div className="flex gap-3">
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarImage src={conversation.user.avatar_url || "/placeholder.svg"} alt={conversation.user.display_name} />
                <AvatarFallback>{conversation.user.display_name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm sm:text-base truncate text-foreground">
                    {conversation.user.display_name}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: false })}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground truncate line-clamp-2">
                  {conversation.lastMessage}
                </p>
              </div>

              {conversation.unreadCount > 0 && (
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex-shrink-0">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
          </button>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <Search className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <h3 className="text-base sm:text-lg font-semibold mb-1">No messages yet</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Start a conversation to connect with others</p>
        </div>
      )}
    </div>
  )
}
