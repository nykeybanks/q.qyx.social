"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Repeat2, UserPlus, Coins, Bell, AtSign, Check } from "lucide-react"
import type { Notification } from "@/types/database"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface NotificationsListProps {
  notifications: Notification[]
  showMarkAsRead?: boolean
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="h-4 w-4 text-pink-500" />
    case "reply":
      return <MessageCircle className="h-4 w-4 text-accent" />
    case "repost":
      return <Repeat2 className="h-4 w-4 text-green-500" />
    case "follow":
      return <UserPlus className="h-4 w-4 text-accent" />
    case "mention":
      return <AtSign className="h-4 w-4 text-champagne" />
    case "reward":
      return <Coins className="h-4 w-4 text-accent" />
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />
  }
}

export function NotificationsList({ notifications, showMarkAsRead = false }: NotificationsListProps) {
  const [isMarkingRead, setIsMarkingRead] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const handleMarkAllAsRead = async () => {
    setIsMarkingRead(true)
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id)

    if (unreadIds.length === 0) {
      toast({
        title: "All caught up!",
        description: "You have no unread notifications.",
      })
      setIsMarkingRead(false)
      return
    }

    const { error } = await supabase.from("notifications").update({ read: true }).in("id", unreadIds)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Marked ${unreadIds.length} notifications as read.`,
      })
      window.location.reload()
    }
    setIsMarkingRead(false)
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No notifications yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">When you get notifications, they'll show up here.</p>
      </div>
    )
  }

  return (
    <div>
      {showMarkAsRead && notifications.some((n) => !n.read) && (
        <div className="border-b border-border p-3 sm:p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={isMarkingRead}
            className="w-full sm:w-auto bg-transparent"
          >
            {isMarkingRead ? (
              <>
                <Check className="mr-2 h-4 w-4 animate-pulse" />
                Marking as read...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Mark all as read
              </>
            )}
          </Button>
        </div>
      )}

      <div className="divide-y divide-border">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-3 p-3 sm:p-4 transition-colors hover:bg-card/50 ${
              !notification.read ? "bg-accent/5" : ""
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{notification.title}</span>
              </p>
              {notification.body && (
                <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{notification.body}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
              </p>
            </div>
            {!notification.read && <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  )
}
