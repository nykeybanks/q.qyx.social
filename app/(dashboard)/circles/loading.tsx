import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-4 p-3 sm:p-4">
      {/* Search/Header skeleton */}
      <div className="sticky top-0 z-20 bg-background/98 backdrop-blur-md p-3 sm:p-4 -m-3 sm:-m-4 mb-4 sm:mb-6">
        <Skeleton className="h-9 sm:h-10 w-full rounded-lg" />
      </div>

      {/* Circle cards grid skeleton */}
      <div className="grid gap-3 sm:gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-24 sm:h-28 bg-muted" />
            <CardHeader className="pb-2 sm:pb-3">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
