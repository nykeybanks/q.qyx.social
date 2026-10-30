"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingActionButtonProps {
  onClick?: () => void
  icon?: React.ReactNode
  label?: string
  className?: string
}

export function FloatingActionButton({
  onClick,
  icon = <Plus className="h-5 w-5" />,
  label,
  className,
}: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 h-14 w-14 rounded-full shadow-2xl shadow-accent/30",
        "bg-accent text-accent-foreground hover:bg-accent/90",
        "transition-all duration-300 hover:scale-110 active:scale-95",
        "touch-manipulation",
        label && "w-auto px-4 gap-2",
        className
      )}
      aria-label={label || "Action button"}
    >
      {icon}
      {label && <span className="font-semibold">{label}</span>}
    </Button>
  )
}
