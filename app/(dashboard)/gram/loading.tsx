import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} className="aspect-square" />
      ))}
    </div>
  )
}
