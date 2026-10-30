"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-16 w-16 xs:h-20 xs:w-20 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 xs:h-10 xs:w-10 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg xs:text-xl font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-sm text-sm xs:text-base text-muted-foreground">{description}</p>
      {actionLabel && (actionHref || onAction) && (
        <Button onClick={onAction} asChild={!!actionHref} variant="default" className="min-w-[120px]">
          {actionHref ? <a href={actionHref}>{actionLabel}</a> : <span>{actionLabel}</span>}
        </Button>
      )}
    </div>
  )
}
