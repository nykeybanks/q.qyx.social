"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Palette, Wallet, Camera, Loader2, Check } from "lucide-react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const supabase = useSupabase()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    bio: "",
    location: "",
    website: "",
    avatarUrl: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profile) {
        setFormData({
          displayName: profile.display_name || "",
          username: profile.username || "",
          bio: profile.bio || "",
          location: profile.location || "",
          website: profile.website || "",
          avatarUrl: profile.avatar_url || "",
        })
      }
    } catch (error) {
      console.error("Failed to load profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: formData.displayName,
          username: formData.username,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header - Enhanced with gradient */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <User className="h-4 w-4 text-accent" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Settings
            </h1>
          </div>
          <Button
            onClick={handleSave}
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all active:scale-95 h-8 sm:h-9"
            disabled={loading || saving}
            size="sm"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" /> : <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            <span className="ml-1.5 hidden xs:inline">Save</span>
          </Button>
        </div>
      </header>

      <div className="p-3 sm:p-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-secondary mb-4 sm:mb-6 h-auto">
            <TabsTrigger
              value="profile"
              className="gap-1 sm:gap-1.5 flex-col sm:flex-row py-2 sm:py-2.5 text-xs sm:text-sm"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
              <span className="inline sm:hidden text-[10px]">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="gap-1 sm:gap-1.5 flex-col sm:flex-row py-2 sm:py-2.5 text-xs sm:text-sm"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="inline sm:hidden text-[10px]">Notifs</span>
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="gap-1 sm:gap-1.5 flex-col sm:flex-row py-2 sm:py-2.5 text-xs sm:text-sm"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
              <span className="inline sm:hidden text-[10px]">Privacy</span>
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="gap-1 sm:gap-1.5 flex-col sm:flex-row py-2 sm:py-2.5 text-xs sm:text-sm"
            >
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Theme</span>
              <span className="inline sm:hidden text-[10px]">Theme</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 sm:space-y-6">
            <Card className="border-border bg-card hover:border-accent/30 transition-all">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-accent" />
                  <CardTitle className="text-base sm:text-lg">Profile Picture</CardTitle>
                </div>
                <CardDescription>Update your profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-accent/20 ring-2 ring-accent/10">
                  <AvatarImage src={formData.avatarUrl || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-accent/20 to-accent/10 text-accent text-2xl font-bold">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center sm:text-left">
                  <Button variant="outline" className="bg-transparent hover:bg-accent/5 touch-manipulation">
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:border-accent/30 transition-all">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-accent" />
                  <CardTitle className="text-base sm:text-lg">Profile Information</CardTitle>
                </div>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
                    <Input
                      id="displayName"
                      placeholder="Your name"
                      className="bg-secondary/50 border-border focus-visible:bg-background transition-colors h-10"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                    <Input
                      id="username"
                      placeholder="username"
                      className="bg-secondary/50 border-border focus-visible:bg-background transition-colors h-10"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="bg-secondary/50 border-border focus-visible:bg-background transition-colors min-h-[100px] resize-none"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">{formData.bio.length}/160 characters</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      className="bg-secondary/50 border-border focus-visible:bg-background transition-colors h-10"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://"
                      className="bg-secondary/50 border-border focus-visible:bg-background transition-colors h-10"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "likes", label: "Likes", description: "When someone likes your post" },
                  { id: "comments", label: "Comments", description: "When someone comments on your post" },
                  { id: "follows", label: "New Followers", description: "When someone follows you" },
                  { id: "mentions", label: "Mentions", description: "When someone mentions you" },
                  { id: "rewards", label: "Rewards", description: "When you earn Bitcoin Points" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Private Account</p>
                    <p className="text-sm text-muted-foreground">Only followers can see your posts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Show Online Status</p>
                    <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Allow Messages</p>
                    <p className="text-sm text-muted-foreground">Receive messages from anyone</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Data & Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <Shield className="mr-2 h-4 w-4" />
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connected Wallets
                </Button>
                <Button variant="outline" className="w-full bg-transparent text-destructive hover:text-destructive">
                  Download Your Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4 sm:space-y-6">
            <Card className="border-border bg-card hover:border-accent/30 transition-all">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-accent" />
                  <CardTitle className="text-base sm:text-lg">Theme</CardTitle>
                </div>
                <CardDescription>Customize your Q Social experience. Changes are saved automatically.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {!mounted ? (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 animate-pulse">
                    <div className="h-24 sm:h-28 rounded-lg bg-muted" />
                    <div className="h-24 sm:h-28 rounded-lg bg-muted" />
                    <div className="h-24 sm:h-28 rounded-lg bg-muted" />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {/* Dark Mode Button */}
                    <button
                      onClick={() => {
                        setTheme("dark")
                        setTimeout(() => {
                          toast({
                            title: "Theme Updated",
                            description: "Dark mode activated",
                          })
                        }, 50)
                      }}
                      className={cn(
                        "group relative flex flex-col items-center gap-2 sm:gap-3 rounded-xl border-2 p-4 sm:p-5 transition-all active:scale-95 touch-manipulation",
                        theme === "dark" 
                          ? "border-accent bg-accent/10 shadow-lg shadow-accent/20" 
                          : "border-border hover:border-accent/50 hover:bg-accent/5"
                      )}
                    >
                      {theme === "dark" && (
                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-lg">
                          <Check className="h-4 w-4 text-accent-foreground" />
                        </div>
                      )}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-2 h-8 bg-gray-700 rounded-sm" />
                            <div className="w-2 h-8 bg-gray-600 rounded-sm" />
                            <div className="w-2 h-8 bg-gray-500 rounded-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-bold text-foreground">Dark</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Pure black background</p>
                      </div>
                    </button>

                    {/* Light Mode Button */}
                    <button
                      onClick={() => {
                        setTheme("light")
                        setTimeout(() => {
                          toast({
                            title: "Theme Updated",
                            description: "Light mode activated",
                          })
                        }, 50)
                      }}
                      className={cn(
                        "group relative flex flex-col items-center gap-2 sm:gap-3 rounded-xl border-2 p-4 sm:p-5 transition-all active:scale-95 touch-manipulation",
                        theme === "light" 
                          ? "border-accent bg-accent/10 shadow-lg shadow-accent/20" 
                          : "border-border hover:border-accent/50 hover:bg-accent/5"
                      )}
                    >
                      {theme === "light" && (
                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-lg">
                          <Check className="h-4 w-4 text-accent-foreground" />
                        </div>
                      )}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shadow-lg border border-gray-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-2 h-8 bg-gray-300 rounded-sm" />
                            <div className="w-2 h-8 bg-gray-400 rounded-sm" />
                            <div className="w-2 h-8 bg-gray-500 rounded-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-bold text-foreground">Light</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Bright white background</p>
                      </div>
                    </button>

                    {/* System Default (Dark) Button */}
                    <button
                      onClick={() => {
                        setTheme("system")
                        setTimeout(() => {
                          toast({
                            title: "Theme Updated",
                            description: "System theme activated (Dark default)",
                          })
                        }, 50)
                      }}
                      className={cn(
                        "group relative flex flex-col items-center gap-2 sm:gap-3 rounded-xl border-2 p-4 sm:p-5 transition-all active:scale-95 touch-manipulation",
                        theme === "system" 
                          ? "border-accent bg-accent/10 shadow-lg shadow-accent/20" 
                          : "border-border hover:border-accent/50 hover:bg-accent/5"
                      )}
                    >
                      {theme === "system" && (
                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-lg">
                          <Check className="h-4 w-4 text-accent-foreground" />
                        </div>
                      )}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shadow-lg border border-gray-500">
                        <div className="absolute inset-0 flex">
                          <div className="w-1/2 bg-gradient-to-b from-gray-950 to-gray-900" />
                          <div className="w-1/2 bg-gradient-to-b from-white to-gray-50" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex gap-1 drop-shadow-lg">
                            <div className="w-2 h-8 bg-gray-500 rounded-sm" />
                            <div className="w-2 h-8 bg-gray-400 rounded-sm" />
                            <div className="w-2 h-8 bg-gray-300 rounded-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-bold text-foreground">System</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Defaults to Dark</p>
                      </div>
                    </button>
                  </div>
                )}
                <div className="rounded-lg bg-accent/5 border border-accent/20 p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">
                    Choose your preferred theme. System follows your device settings. Your preference is saved automatically.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
