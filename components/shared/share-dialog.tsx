"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Check, Copy, Facebook, Twitter, Link2, Mail, MessageCircle } from "lucide-react"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  url: string
  title: string
  text?: string
}

export function ShareDialog({ open, onOpenChange, url, title, text }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || title,
          url: fullUrl,
        })
      } catch (error) {
        // User cancelled or error occurred
      }
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    toast.success("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text || title)}&url=${encodeURIComponent(fullUrl)}`,
      color: "hover:bg-accent/10 hover:text-accent",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      color: "hover:bg-accent/10 hover:text-accent",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`${text || title} ${fullUrl}`)}`,
      color: "hover:bg-green-500/10 hover:text-green-500",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text || ""}\n\n${fullUrl}`)}`,
      color: "hover:bg-orange-500/10 hover:text-orange-500",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="xs:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Native share button (mobile only) */}
          {typeof navigator !== "undefined" && navigator.share && (
            <Button onClick={handleNativeShare} className="w-full bg-transparent" variant="outline">
              <Link2 className="mr-2 h-4 w-4" />
              Share via...
            </Button>
          )}

          {/* Social media options */}
          <div className="grid grid-cols-2 gap-2">
            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-lg border border-border p-3 transition-colors ${option.color}`}
              >
                <option.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{option.name}</span>
              </a>
            ))}
          </div>

          {/* Copy link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Copy link</label>
            <div className="flex gap-2">
              <Input value={fullUrl} readOnly className="flex-1" />
              <Button onClick={handleCopy} size="icon" variant="outline">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
