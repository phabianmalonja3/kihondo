import { Skeleton } from "../ui/skeleton";

export default function HeroSkeleton() {
  return (
    <section className="relative h-screen w-full bg-zinc-200 dark:bg-zinc-900 animate-pulse">
      <div className="h-full bg-black/40 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          <Skeleton className="h-12 md:h-16 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-6" />
          <Skeleton className="h-12 w-40 mx-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
}
