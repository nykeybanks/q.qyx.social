import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="divide-y divide-border">
      {/* Search bar skeleton */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/98 backdrop-blur-md p-3 sm:p-4">
        <Skeleton className="h-9 sm:h-10 w-full rounded-lg" />
      </div>

      {/* Explore content skeletons */}
      <div className="space-y-4 p-3 sm:p-4">
        {/* Section header */}
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid gap-3 sm:gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>

        {/* Another section */}
        <div className="mt-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
