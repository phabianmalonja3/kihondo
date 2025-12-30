import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-6 bg-gray-100 p-8 rounded-2xl shadow-md">
        {/* Image Skeleton */}
        <Skeleton className="h-[300px] w-[520px] rounded-2xl bg-gray-300" />

        {/* Text Skeletons */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-[420px] bg-gray-300" />
          <Skeleton className="h-6 w-[360px] bg-gray-300" />
          <Skeleton className="h-6 w-[300px] bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
