import { createClient } from "@/lib/supabase/server"
import { NotificationsList } from "@/components/notifications/notifications-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function getNotifications() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  return notifications || []
}

export default async function NotificationsPage() {
  const notifications = await getNotifications()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Enhanced with gradient and better mobile spacing */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent text-[10px] sm:text-xs font-bold text-accent-foreground animate-pulse shadow-lg shadow-accent/25">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground hidden sm:inline">Live</span>
          </div>
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors touch-manipulation"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors touch-manipulation"
          >
            <span className="hidden xs:inline">Unread ({unreadCount})</span>
            <span className="inline xs:hidden">Unread</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0">
          <NotificationsList notifications={notifications} showMarkAsRead />
        </TabsContent>
        <TabsContent value="unread" className="mt-0">
          <NotificationsList notifications={notifications.filter((n) => !n.read)} showMarkAsRead />
        </TabsContent>
      </Tabs>
    </div>
  )
}
