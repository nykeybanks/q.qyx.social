"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThreadsFeed } from "@/components/threads/threads-feed"
import { GramFeed } from "@/components/gram/gram-feed"
import { LikedPosts } from "@/components/profile/liked-posts"
import { MessageSquare, ImageIcon, Heart, FileText } from "lucide-react"

interface ProfileTabsProps {
  userId: string
}

export function ProfileTabs({ userId }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-4 sticky top-14 sm:top-[57px] z-10 bg-background/95 backdrop-blur-xl border-b border-border rounded-none h-auto p-0 shadow-sm">
        <TabsTrigger
          value="posts"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent text-xs sm:text-sm py-3 sm:py-4 font-medium transition-colors touch-manipulation flex items-center gap-1 sm:gap-1.5"
        >
          <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>Posts</span>
        </TabsTrigger>
        <TabsTrigger
          value="replies"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent text-xs sm:text-sm py-3 sm:py-4 font-medium transition-colors touch-manipulation flex items-center gap-1 sm:gap-1.5"
        >
          <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>Replies</span>
        </TabsTrigger>
        <TabsTrigger
          value="media"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent text-xs sm:text-sm py-3 sm:py-4 font-medium transition-colors touch-manipulation flex items-center gap-1 sm:gap-1.5"
        >
          <ImageIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>Media</span>
        </TabsTrigger>
        <TabsTrigger
          value="likes"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent text-xs sm:text-sm py-3 sm:py-4 font-medium transition-colors touch-manipulation flex items-center gap-1 sm:gap-1.5"
        >
          <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span>Likes</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="m-0">
        <ThreadsFeed userId={userId} />
      </TabsContent>
      <TabsContent value="replies" className="m-0">
        <ThreadsFeed userId={userId} filterType="replies" />
      </TabsContent>
      <TabsContent value="media" className="m-0">
        <GramFeed userId={userId} />
      </TabsContent>
      <TabsContent value="likes" className="m-0">
        <LikedPosts userId={userId} />
      </TabsContent>
    </Tabs>
  )
}
