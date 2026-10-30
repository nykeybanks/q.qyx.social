"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Save, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NotificationPreferences {
  likes: boolean
  comments: boolean
  follows: boolean
  mentions: boolean
  emailDigest: boolean
  emailMarketing: boolean
  rewardsEarned: boolean
  autoPayout: boolean
}

export function NotificationSettings() {
  const supabase = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    emailDigest: true,
    emailMarketing: false,
    rewardsEarned: true,
    autoPayout: true,
  })

  useEffect(() => {
    loadPreferences()
  }, [])

  const loadPreferences = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("profiles")
      .select("notification_preferences")
      .eq("id", user.id)
      .single()

    if (!error && data?.notification_preferences) {
      setPreferences(data.notification_preferences)
    }
  }

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from("profiles")
      .update({ notification_preferences: preferences })
      .eq("id", user.id)

    setLoading(false)

    if (error) {
      toast({ title: "Error", description: "Failed to save preferences", variant: "destructive" })
    } else {
      setSaved(true)
      toast({ title: "Success", description: "Notification preferences saved" })
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Push Notifications</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage your push notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="likes" className="text-sm">
                Likes
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">When someone likes your post</p>
            </div>
            <Switch id="likes" checked={preferences.likes} onCheckedChange={() => handleToggle("likes")} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="comments" className="text-sm">
                Comments
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">When someone comments on your post</p>
            </div>
            <Switch id="comments" checked={preferences.comments} onCheckedChange={() => handleToggle("comments")} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="follows" className="text-sm">
                New Followers
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">When someone follows you</p>
            </div>
            <Switch id="follows" checked={preferences.follows} onCheckedChange={() => handleToggle("follows")} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="mentions" className="text-sm">
                Mentions
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">When someone mentions you</p>
            </div>
            <Switch id="mentions" checked={preferences.mentions} onCheckedChange={() => handleToggle("mentions")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Email Notifications</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Choose which emails you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="email-digest" className="text-sm">
                Daily Digest
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">Receive a daily summary of activity</p>
            </div>
            <Switch
              id="email-digest"
              checked={preferences.emailDigest}
              onCheckedChange={() => handleToggle("emailDigest")}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="email-marketing" className="text-sm">
                Marketing Emails
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">Receive news and updates about Q Social</p>
            </div>
            <Switch
              id="email-marketing"
              checked={preferences.emailMarketing}
              onCheckedChange={() => handleToggle("emailMarketing")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Vault Notifications</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Bitcoin Points and reward notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="rewards-earned" className="text-sm">
                Rewards Earned
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">When you earn Bitcoin Points</p>
            </div>
            <Switch
              id="rewards-earned"
              checked={preferences.rewardsEarned}
              onCheckedChange={() => handleToggle("rewardsEarned")}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="auto-payout" className="text-sm">
                Auto-Payout Success
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">When your daily payout completes</p>
            </div>
            <Switch
              id="auto-payout"
              checked={preferences.autoPayout}
              onCheckedChange={() => handleToggle("autoPayout")}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading || saved} className="min-w-[120px] gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {saved && <CheckCircle2 className="h-4 w-4" />}
          {!loading && !saved && <Save className="h-4 w-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
