// components/RelatedEventsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export function RelatedEventsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      {[1, 2].map((i) => (
        <div key={i} className="flex flex-col">
          <Skeleton className="h-64 w-full rounded-3xl mb-6" />
          <Skeleton className="h-7 w-3/4 mb-3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  )
}