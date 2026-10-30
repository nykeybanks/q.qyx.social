import { cn } from "@/lib/utils"

interface QMarkBadgeProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

/**
 * Blue Q-Mark verification badge
 * Round badge with blue outer ring and black "Q" centered inside
 * No checkmark - following core-principles.txt identity system
 */
export function QMarkBadge({ className, size = "md" }: QMarkBadgeProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const textSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full flex-shrink-0",
        "bg-gradient-to-br from-accent to-accent/80",
        "ring-2 ring-accent/20",
        sizeClasses[size],
        className
      )}
      title="Q Verified"
    >
      <span className={cn("font-heading font-bold text-background", textSizes[size])}>
        Q
      </span>
    </span>
  )
}
