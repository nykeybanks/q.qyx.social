import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="border-x border-border min-h-screen">
      {/* Header skeleton */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      {/* Search skeleton */}
      <div className="sticky top-[57px] sm:top-[65px] z-20 border-b border-border bg-background/98 backdrop-blur-md p-3 sm:p-4">
        <Skeleton className="h-9 sm:h-10 w-full rounded-lg" />
      </div>

      {/* Conversations list skeleton */}
      <div className="p-4 space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex gap-3 pb-4 border-b border-border">
            <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
