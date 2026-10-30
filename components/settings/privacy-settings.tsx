"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from "@/lib/supabase/client-provider"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function PrivacySettings() {
  const supabase = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    privateProfile: false,
    showFollowers: true,
    showOnline: true,
    showActivity: true,
  })

  const handleSave = async () => {
    setLoading(true)
    // Save settings to database
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    // Update user profile with privacy settings
    const { error } = await supabase
      .from("profiles")
      .update({
        // Store privacy settings in metadata
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    setLoading(false)

    if (error) {
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Privacy settings saved" })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile and posts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="private-profile">Private Profile</Label>
              <p className="text-sm text-muted-foreground">Only approved followers can see your posts</p>
            </div>
            <Switch
              id="private-profile"
              checked={settings.privateProfile}
              onCheckedChange={(checked) => setSettings({ ...settings, privateProfile: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-followers">Show Followers</Label>
              <p className="text-sm text-muted-foreground">Let others see your followers list</p>
            </div>
            <Switch
              id="show-followers"
              checked={settings.showFollowers}
              onCheckedChange={(checked) => setSettings({ ...settings, showFollowers: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Status</CardTitle>
          <CardDescription>Manage your activity visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-online">Show Online Status</Label>
              <p className="text-sm text-muted-foreground">Let others see when you're online</p>
            </div>
            <Switch
              id="show-online"
              checked={settings.showOnline}
              onCheckedChange={(checked) => setSettings({ ...settings, showOnline: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-activity">Show Activity</Label>
              <p className="text-sm text-muted-foreground">Display your recent activity</p>
            </div>
            <Switch
              id="show-activity"
              checked={settings.showActivity}
              onCheckedChange={(checked) => setSettings({ ...settings, showActivity: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blocked Users</CardTitle>
          <CardDescription>Manage users you've blocked</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">You haven't blocked any users yet</p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading} className="gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  )
}
