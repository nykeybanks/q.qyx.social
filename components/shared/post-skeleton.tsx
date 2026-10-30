import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
  return (
    <div className="border-b border-border p-4">
      <div className="flex gap-3">
        {/* Avatar */}
        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />

        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Actions */}
          <div className="flex gap-8">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function PostListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  )
}
