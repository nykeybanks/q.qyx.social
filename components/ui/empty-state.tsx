"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Type as type, LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 sm:p-12 text-center", className)}>
      {Icon && (
        <div className="mb-4 rounded-full bg-muted p-4 sm:p-6">
          <Icon className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-6">{description}</p>}
      {action && (
        <Button onClick={action.onClick} className="touch-manipulation">
          {action.label}
        </Button>
      )}
    </div>
  )
}
