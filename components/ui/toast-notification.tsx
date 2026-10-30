"use client"

import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastNotificationProps {
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  onClose?: () => void
}

export function ToastNotification({ type, title, message, onClose }: ToastNotificationProps) {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: "bg-green-500/10 border-green-500/20 text-green-500",
    error: "bg-destructive/10 border-destructive/20 text-destructive",
    warning: "bg-orange-500/10 border-orange-500/20 text-orange-500",
    info: "bg-accent/10 border-accent/20 text-accent",
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        "pointer-events-auto flex w-full max-w-sm rounded-lg border shadow-lg backdrop-blur-sm animate-slide-in-right",
        colors[type],
        "bg-card/95"
      )}
    >
      <div className="flex-1 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            {message && <p className="mt-1 text-xs text-muted-foreground">{message}</p>}
          </div>
        </div>
      </div>
      {onClose && (
        <div className="flex border-l border-border">
          <button
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-r-lg px-4 hover:bg-muted/50 transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  )
}
