"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ImageIcon,
  Film,
  BarChart3,
  Smile,
  MapPin,
  Loader2,
  Calendar,
  Link2,
  Hash,
  AtSign,
  Sparkles,
  X,
  Plus,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const MAX_CHARACTERS = 280

interface ComposeBoxProps {
  placeholder?: string
  parentId?: string
  circleId?: string
  profile?: any
}

export function ComposeBox({ placeholder = "What's happening?", parentId, circleId, profile }: ComposeBoxProps) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [showPollDialog, setShowPollDialog] = useState(false)
  const [pollOptions, setPollOptions] = useState(["", ""])
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  const [location, setLocation] = useState("")
  const [linkPreview, setLinkPreview] = useState("")
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false)
  const [mentionQuery, setMentionQuery] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = useSupabase()
  const { toast } = useToast()

  const charactersRemaining = MAX_CHARACTERS - content.length
  const isOverLimit = charactersRemaining < 0
  const isNearLimit = charactersRemaining <= 20 && charactersRemaining > 0

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

  useEffect(() => {
    const atPosition = content.lastIndexOf("@", cursorPosition)
    if (atPosition !== -1 && atPosition < cursorPosition) {
      const query = content.substring(atPosition + 1, cursorPosition)
      if (query.length > 0 && !query.includes(" ")) {
        setMentionQuery(query)
        setShowMentionSuggestions(true)
      } else {
        setShowMentionSuggestions(false)
      }
    } else {
      setShowMentionSuggestions(false)
    }
  }, [content, cursorPosition])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newImages = [...selectedImages, ...files].slice(0, 4)
    setSelectedImages(newImages)

    const urls = newImages.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const videoFile = files[0]
    if (videoFile.size > 100 * 1024 * 1024) {
      // 100MB limit
      toast({
        title: "Video too large",
        description: "Please upload a video under 100MB",
        variant: "destructive",
      })
      return
    }

    setSelectedImages([videoFile])
    setPreviewUrls([URL.createObjectURL(videoFile)])
  }

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    const newUrls = previewUrls.filter((_, i) => i !== index)
    setSelectedImages(newImages)
    setPreviewUrls(newUrls)
  }

  const insertEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""])
    }
  }

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index))
    }
  }

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const insertHashtag = () => {
    const hashtag = prompt("Enter hashtag (without #):")
    if (hashtag) {
      setContent((prev) => prev + ` #${hashtag.replace(/\s+/g, "")}`)
    }
  }

  const insertMention = (username: string) => {
    const beforeAt = content.substring(0, content.lastIndexOf("@", cursorPosition))
    const afterCursor = content.substring(cursorPosition)
    setContent(beforeAt + `@${username} ` + afterCursor)
    setShowMentionSuggestions(false)
  }

  const extractLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const matches = text.match(urlRegex)
    if (matches && matches.length > 0) {
      setLinkPreview(matches[0])
    } else {
      setLinkPreview("")
    }
  }

  useEffect(() => {
    extractLinks(content)
  }, [content])

  const handleAIGenerate = async () => {
    if (!content.trim()) {
      toast({
        title: "Add a prompt",
        description: "Type something to help AI generate content",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingAI(true)
    try {
      const response = await fetch("/api/sync/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: content,
          style: "engaging",
          maxLength: 280,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate content")

      const data = await response.json()
      setContent(data.content)

      toast({
        title: "AI Generated",
        description: "Content generated successfully",
      })
    } catch (error) {
      toast({
        title: "AI Error",
        description: "Failed to generate content",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingAI(false)
    }
  }

  const handleSubmit = async () => {
    if (!content.trim() || isOverLimit) return

    setIsLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setIsLoading(false)
      return
    }

    try {
      let mediaUrls: string[] = []
      if (selectedImages.length > 0) {
        mediaUrls = selectedImages.map((_, i) => `/placeholder.svg?height=600&width=800&query=post image ${i + 1}`)
      }

      const postData: any = {
        user_id: user.id,
        content: content.trim(),
        post_type: parentId ? "reply" : "post",
        parent_id: parentId || null,
        visibility: "public",
        media_urls: mediaUrls.length > 0 ? mediaUrls : null,
      }

      if (location) {
        postData.metadata = { location }
      }

      if (circleId) {
        await supabase.from("circle_posts").insert({
          circle_id: circleId,
          ...postData,
        })
      } else {
        await supabase.from("posts").insert(postData)
      }

      setContent("")
      setSelectedImages([])
      setPreviewUrls([])
      setIsExpanded(false)
      setLocation("")
      setLinkPreview("")
      router.refresh()

      toast({
        title: "Posted successfully",
        description: "Your post has been published",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "border-b border-border transition-all",
        isFocused || isExpanded ? "bg-card/50 p-3 sm:p-4" : "p-3 sm:p-4",
      )}
    >
      <div className="flex gap-2 sm:gap-3">
        <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-border flex-shrink-0">
          <AvatarImage src={profile?.avatar_url || undefined} />
          <AvatarFallback className="bg-muted text-muted-foreground text-sm">
            {profile?.display_name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <Textarea
            ref={textareaRef}
            placeholder={placeholder}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setCursorPosition(e.target.selectionStart)
            }}
            onFocus={() => {
              setIsFocused(true)
              setIsExpanded(true)
            }}
            onBlur={() => setIsFocused(false)}
            onClick={(e) => setCursorPosition(e.currentTarget.selectionStart)}
            onKeyUp={(e) => setCursorPosition(e.currentTarget.selectionStart)}
            className={cn(
              "resize-none border-0 bg-transparent p-0 placeholder:text-muted-foreground focus-visible:ring-0 text-sm sm:text-base",
              isExpanded ? "min-h-[80px] sm:min-h-[100px]" : "min-h-[50px] sm:min-h-[60px]",
            )}
            rows={isExpanded ? 4 : 2}
          />

          {showMentionSuggestions && (
            <div className="mt-2 border border-border rounded-lg bg-card p-2 shadow-lg">
              <div className="text-xs text-muted-foreground mb-1">Suggestions:</div>
              {["@alice", "@bob", "@charlie"]
                .filter((u) => u.includes(mentionQuery))
                .map((username) => (
                  <button
                    key={username}
                    type="button"
                    onClick={() => insertMention(username.substring(1))}
                    className="block w-full text-left px-2 py-1.5 text-sm hover:bg-accent/10 rounded transition-colors"
                  >
                    {username}
                  </button>
                ))}
            </div>
          )}

          {location && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-xs text-accent">
              <MapPin className="h-3 w-3" />
              {location}
              <button
                type="button"
                onClick={() => setLocation("")}
                className="ml-1 hover:bg-accent/20 rounded-full p-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </div>
          )}

          {linkPreview && (
            <div className="mt-2 p-2 border border-border rounded-lg bg-muted/50 text-xs">
              <div className="flex items-center gap-2">
                <Link2 className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="truncate text-accent">{linkPreview}</span>
              </div>
            </div>
          )}

          {previewUrls.length > 0 && (
            <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
              {previewUrls.map((url, index) => (
                <div
                  key={index}
                  className="group relative aspect-video rounded-lg overflow-hidden border border-border"
                >
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-1 top-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {(isExpanded || content.length > 0) && (
            <div className="mt-2 sm:mt-3 flex flex-col gap-2 sm:gap-3">
              <div className="flex gap-0.5 sm:gap-1 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="Add image"
                >
                  <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => videoInputRef.current?.click()}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="Add video"
                >
                  <Film className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPollDialog(true)}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="Create poll"
                >
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="Add emoji"
                >
                  <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLocationDialog(true)}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="Add location"
                >
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowScheduleDialog(true)}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="Schedule post"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={insertHashtag}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="Add hashtag"
                >
                  <Hash className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setContent((c) => c + "@")}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="Mention user"
                >
                  <AtSign className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleAIGenerate}
                  disabled={isGeneratingAI}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-accent hover:bg-accent/10"
                  title="AI assist"
                >
                  {isGeneratingAI ? (
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </Button>
              </div>

              {showEmojiPicker && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 p-2 sm:p-3 border border-border rounded-lg bg-card">
                  {["😀", "😂", "❤️", "🔥", "👍", "🎉", "💯", "🚀", "💰", "⚡", "✨", "🎯"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => insertEmoji(emoji)}
                      className="text-xl sm:text-2xl hover:scale-125 transition-transform p-1"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                {content.length > 0 && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div
                      className={cn(
                        "h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 flex-shrink-0",
                        isOverLimit ? "border-destructive" : isNearLimit ? "border-yellow-500" : "border-accent",
                      )}
                      style={{
                        background: `conic-gradient(
                          ${isOverLimit ? "var(--destructive)" : isNearLimit ? "#eab308" : "var(--accent)"} ${Math.min((content.length / MAX_CHARACTERS) * 100, 100)}%, 
                          transparent 0%
                        )`,
                      }}
                    >
                      <div className="m-0.5 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-background" />
                    </div>
                    {isNearLimit && (
                      <span
                        className={cn(
                          "text-xs sm:text-sm font-medium",
                          isOverLimit ? "text-destructive" : "text-yellow-500",
                        )}
                      >
                        {charactersRemaining}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                  {content.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setContent("")
                        setSelectedImages([])
                        setPreviewUrls([])
                        setIsExpanded(false)
                        setLocation("")
                      }}
                      className="h-7 sm:h-9 text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={handleSubmit}
                    disabled={!content.trim() || isOverLimit || isLoading}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 h-7 sm:h-9 min-w-[60px] sm:min-w-[80px] text-xs sm:text-sm"
                  >
                    {isLoading ? <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> : "Post"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showPollDialog} onOpenChange={setShowPollDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Poll</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {pollOptions.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updatePollOption(index, e.target.value)}
                  className="flex-1"
                />
                {pollOptions.length > 2 && (
                  <Button variant="ghost" size="icon" onClick={() => removePollOption(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {pollOptions.length < 4 && (
              <Button variant="outline" size="sm" onClick={addPollOption} className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            )}
            <Button
              onClick={() => {
                setContent((c) => c + `\n\nPoll: ${pollOptions.filter((o) => o).join(" | ")}`)
                setShowPollDialog(false)
              }}
              className="w-full"
            >
              Add Poll
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Date</Label>
              <Input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
            </div>
            <div>
              <Label>Time</Label>
              <Input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
            </div>
            <Button
              onClick={() => {
                toast({
                  title: "Scheduled",
                  description: `Post will be published on ${scheduledDate} at ${scheduledTime}`,
                })
                setShowScheduleDialog(false)
              }}
              className="w-full"
            >
              Schedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Enter location..." value={location} onChange={(e) => setLocation(e.target.value)} />
            <Button onClick={() => setShowLocationDialog(false)} className="w-full">
              Add Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
