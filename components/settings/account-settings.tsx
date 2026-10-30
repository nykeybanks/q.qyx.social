"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Loader2, CheckCircle2 } from "lucide-react"
import { useSupabase } from "@/lib/supabase/client-provider"
import { useToast } from "@/hooks/use-toast"

interface AccountSettingsProps {
  profile: any
  user: any
}

export function AccountSettings({ profile, user }: AccountSettingsProps) {
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [location, setLocation] = useState(profile?.location || "")
  const [website, setWebsite] = useState(profile?.website || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const supabase = useSupabase()
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)
    setIsSaved(false)

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        bio,
        location,
        website,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } else {
      setIsSaved(true)
      toast({
        title: "Success",
        description: "Your profile has been updated successfully!",
      })
      setTimeout(() => setIsSaved(false), 3000)
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-border">
        <CardHeader className="space-y-2 sm:space-y-3 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Profile Picture</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Update your profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          <div className="flex flex-col xs:flex-row items-center gap-3 xs:gap-4">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-2 ring-accent/20">
              <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="text-xl sm:text-2xl bg-accent/10 text-accent">
                {profile?.display_name?.[0] || profile?.username?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full xs:w-auto text-xs sm:text-sm h-9 sm:h-10 bg-transparent">
              <Camera className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="space-y-2 sm:space-y-3 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Profile Information</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Update your public profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xs sm:text-sm">
              Username
            </Label>
            <Input
              id="username"
              value={profile?.username || ""}
              disabled
              className="bg-secondary text-xs sm:text-sm h-9 sm:h-10"
            />
            <p className="text-[10px] xs:text-xs text-muted-foreground">Your username cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-xs sm:text-sm">
              Display Name
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              className="text-xs sm:text-sm h-9 sm:h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-xs sm:text-sm">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              rows={4}
              className="text-xs sm:text-sm min-h-[80px] sm:min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-xs sm:text-sm">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you from?"
              className="text-xs sm:text-sm h-9 sm:h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-xs sm:text-sm">
              Website
            </Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              type="url"
              className="text-xs sm:text-sm h-9 sm:h-10"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isLoading || isSaved}
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105 text-xs sm:text-sm h-9 sm:h-10 min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                Saving...
              </>
            ) : isSaved ? (
              <>
                <CheckCircle2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Saved!
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="space-y-2 sm:space-y-3 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Email Address</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Your account email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              className="bg-secondary text-xs sm:text-sm h-9 sm:h-10"
            />
            <p className="text-[10px] xs:text-xs text-muted-foreground">Email changes require verification</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
