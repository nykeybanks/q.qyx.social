"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, AlertCircle, Globe, Lock, UserPlus } from "lucide-react"
import Link from "next/link"

// Prevent prerendering - this is an interactive page that requires user context
export const dynamic = "force-dynamic"

const categories = [
  "Technology",
  "Crypto & Web3",
  "Finance",
  "Art & Design",
  "Gaming",
  "Music",
  "Sports",
  "Education",
  "Business",
  "Lifestyle",
  "Other",
]

export default function CreateCirclePage() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [privacy, setPrivacy] = useState<"public" | "private" | "invite">("public")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = useSupabase()

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (value: string) => {
    setName(value)
    setSlug(generateSlug(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !slug.trim()) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError("You must be logged in to create a circle")
      setLoading(false)
      return
    }

    // Create the circle
    const { data: circle, error: createError } = await supabase
      .from("circles")
      .insert({
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
        category: category || null,
        privacy,
        owner_id: user.id,
        member_count: 1,
      })
      .select()
      .single()

    if (createError) {
      if (createError.code === "23505") {
        setError("A circle with this name already exists")
      } else {
        setError(createError.message)
      }
      setLoading(false)
      return
    }

    // Add owner as member
    await supabase.from("circle_memberships").insert({
      circle_id: circle.id,
      user_id: user.id,
      role: "owner",
    })

    router.push(`/circles/${circle.slug}`)
  }

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3">
          <Link href="/circles">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold">Create Circle</h1>
        </div>
      </header>

      <div className="p-3 sm:p-4 md:p-6">
        <Card className="border-border bg-card">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl">New Circle</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Create a community for people to connect and share
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Circle Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Crypto Traders"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-1">/circles/</span>
                  <Input
                    id="slug"
                    placeholder="crypto-traders"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    required
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What's your circle about?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-secondary border-border min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Privacy</Label>
                <div className="grid gap-2 sm:gap-3 grid-cols-1 xs:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setPrivacy("public")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      privacy === "public" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <Globe className={`h-5 w-5 ${privacy === "public" ? "text-accent" : "text-muted-foreground"}`} />
                    <span className="text-sm font-medium">Public</span>
                    <span className="text-xs text-muted-foreground text-center">Anyone can join</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrivacy("private")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      privacy === "private" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <Lock className={`h-5 w-5 ${privacy === "private" ? "text-accent" : "text-muted-foreground"}`} />
                    <span className="text-sm font-medium">Private</span>
                    <span className="text-xs text-muted-foreground text-center">Request to join</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrivacy("invite")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      privacy === "invite" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <UserPlus className={`h-5 w-5 ${privacy === "invite" ? "text-accent" : "text-muted-foreground"}`} />
                    <span className="text-sm font-medium">Invite Only</span>
                    <span className="text-xs text-muted-foreground text-center">By invitation</span>
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11 text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Circle"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
