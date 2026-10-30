export interface ConversationUser {
  id: string
  username: string
  display_name: string
  avatar_url?: string
}

export interface Conversation {
  id: string
  user: ConversationUser
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

export interface DatabaseConversation {
  id: string
  participant_1_id: string
  participant_2_id: string
  participant_name?: string
  last_message?: string
  last_message_time?: string
  unread_count?: number
  created_at: string
  updated_at: string
}
