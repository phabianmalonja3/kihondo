"use client";

import Image from "next/image";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export default function Explore() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Setup Autoplay plugin
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEvents(data.events || []);
      } catch (error) {
        toast.error("Could not load Tanzanian destinations");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) return <ExploreSkeleton />;

  if (!events.length) return null;

  return (
    <section className="py-20 px-4 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-emerald-950 mb-4">
            Why Explore Tanzania?
          </h2>
          <div className="h-1 w-20 bg-emerald-500 rounded-full" />
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {events.map((event) => (
              <CarouselItem 
                key={event.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="h-full transition-transform duration-300 hover:-translate-y-2">
              <Link href={`/blog/${event.id}`}  >
              
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-shadow h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={(event?.images && event.images.length > 0) ? event.images[0] : "/placeholder.jpg"} 
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-emerald-900 mb-2 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
              </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Controls positioned for better UX */}
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 bg-white hover:bg-emerald-50 text-emerald-900" />
            <CarouselNext className="-right-12 bg-white hover:bg-emerald-50 text-emerald-900" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function ExploreSkeleton() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4">
      <Skeleton className="h-10 w-64 mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}