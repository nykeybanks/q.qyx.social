import { PostSkeleton } from "@/components/shared/post-skeleton"

export default function Loading() {
  return (
    <div className="divide-y divide-border">
      {[...Array(5)].map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  )
}
