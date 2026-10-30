import { format, formatDistance, formatDistanceToNow } from "date-fns"

export { format, formatDistance, formatDistanceToNow }

export function formatPostDate(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInHours = (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return formatDistanceToNow(dateObj, { addSuffix: true })
  } else if (diffInHours < 168) {
    // Less than a week
    return format(dateObj, "MMM d")
  } else {
    return format(dateObj, "MMM d, yyyy")
  }
}

export function formatVaultDate(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, "MMM d, yyyy 'at' h:mm a")
}
