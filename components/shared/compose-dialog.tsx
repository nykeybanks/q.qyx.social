"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ComposeBox } from "@/components/threads/compose-box"
import { Sparkles } from "lucide-react"
import type { Profile } from "@/types/database"

interface ComposeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: Profile | null
}

export function ComposeDialog({ open, onOpenChange, profile }: ComposeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 sm:max-w-3xl">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <div>
              <DialogTitle className="text-lg sm:text-xl font-bold">Create Q-Bit</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Share your thoughts with the Q Social community
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="px-4 sm:px-6 py-4">
          <ComposeBox profile={profile} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
