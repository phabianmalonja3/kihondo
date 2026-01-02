import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* 1. Hero Image Skeleton */}
      <Skeleton className="w-full h-[60vh] min-h-[400px] rounded-none bg-zinc-200 dark:bg-zinc-800" />

      {/* 2. Grid Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side: Title and Description */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
            {/* Title */}
            <Skeleton className="h-10 w-2/3 bg-zinc-200 dark:bg-zinc-800" />
            {/* Location line */}
            <Skeleton className="h-4 w-1/4 bg-zinc-200 dark:bg-zinc-800" />
            
            <div className="pt-6 space-y-3">
              {/* Paragraph lines */}
              <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-4/6 bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>

          {/* Highlights Skeletons */}
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-24 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-24 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

        {/* Right Side: Sidebar Card */}
        <aside>
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800 space-y-6">
            <Skeleton className="h-6 w-1/2 bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-20 w-full rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
            <Skeleton className="h-14 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </aside>
      </div>
    </div>
  );
}