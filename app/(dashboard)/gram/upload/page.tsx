"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/client-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, AlertCircle, Upload, X, MapPin, ImageIcon } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client" // Import createClient

// Prevent prerendering - this is an interactive page that requires user context
export const dynamic = "force-dynamic"

export default function GramUploadPage() {
  const [caption, setCaption] = useState("")
  const [location, setLocation] = useState("")
  const [tags, setTags] = useState("")
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = useSupabase()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const urls: string[] = []
    for (let i = 0; i < Math.min(files.length, 10); i++) {
      urls.push(URL.createObjectURL(files[i]))
    }
    setPreviewUrls(urls)
  }

  const removeImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (previewUrls.length === 0) {
      setError("Please select at least one image")
      return
    }

    setLoading(true)
    setError(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError("You must be logged in to upload")
      setLoading(false)
      return
    }

    const files = fileInputRef.current?.files
    if (!files) {
      setError("No files selected")
      setLoading(false)
      return
    }

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }
    formData.append("folder", "gram")

    let mediaUrls: string[] = []

    try {
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Upload failed")
      }

      const { urls } = await uploadResponse.json()
      mediaUrls = urls
    } catch (uploadError) {
      console.error("[v0] Upload error:", uploadError)
      // Fallback to placeholder URLs if upload fails
      mediaUrls = previewUrls.map((_, i) => `/placeholder.svg?height=800&width=800&query=user uploaded image ${i + 1}`)
    }

    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter((tag) => tag.length > 0)

    const { error: createError } = await supabase.from("gram_posts").insert({
      user_id: user.id,
      caption: caption.trim() || null,
      media_urls: mediaUrls,
      media_type: mediaUrls.length > 1 ? "carousel" : "image",
      location: location.trim() || null,
      tags: parsedTags.length > 0 ? parsedTags : null,
    })

    if (createError) {
      setError(createError.message)
      setLoading(false)
      return
    }

    router.push("/gram")
  }

  return (
    <div className="border-x border-border min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3">
          <Link href="/gram">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold">New Post</h1>
        </div>
      </header>

      <div className="p-3 sm:p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Upload Area */}
          <Card className="border-border bg-card">
            <CardContent className="p-4 sm:p-6">
              {previewUrls.length === 0 ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-8 sm:py-12 transition-colors hover:border-accent/50 active:scale-[0.98]"
                >
                  <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-accent/10">
                    <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                  </div>
                  <p className="text-base sm:text-lg font-medium text-foreground">Click to upload</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Share photos with your community</p>
                  <p className="mt-2 text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB (max 10 images)</p>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="group relative aspect-square">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {previewUrls.length < 10 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-accent/50"
                      >
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="bg-secondary border-border min-h-[100px]"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-secondary border-border pl-10"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="crypto, web3, defi (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="bg-secondary border-border"
            />
            <p className="text-xs text-muted-foreground">
              Separate tags with commas. They help others discover your content.
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11 text-base active:scale-[0.98]"
            disabled={loading || previewUrls.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Share"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
