"use client";

import React, { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { toast } from "sonner";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import gsap from "gsap"; // 1. Import GSAP

interface Event {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export default function Explore() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  
  // Ref to track if the user is hovering (to pause auto-play)
  const isHovered = React.useRef(false);

  // 2. Fetch Events
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

  // 3. Handle Carousel API & GSAP Auto-sliding
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // GSAP Ticker for Auto-sliding
    // This acts like a high-performance setInterval
    const autoScroll = setInterval(() => {
      if (!isHovered.current) {
        api.scrollNext();
      }
    }, 4000);

    return () => clearInterval(autoScroll);
  }, [api]);

  // 4. GSAP Animation for Card Entry
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (!loading && events.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".event-card", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, events]);

  if (loading) return <ExploreSkeleton />;
  if (!events.length) return null;

  return (
    <section ref={containerRef} className="py-20 px-4 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-emerald-950 mb-4">
            Why Explore Tanzania?
          </h2>
          <div className="h-1 w-20 bg-emerald-500 rounded-full" />
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
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
                <div className="event-card h-full transition-transform duration-300 hover:-translate-y-2">
                  <Link href={`/blog/${event.id}`}>
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
          
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 bg-white hover:bg-emerald-50 text-emerald-900" />
            <CarouselNext className="-right-12 bg-white hover:bg-emerald-50 text-emerald-900" />
          </div>
        </Carousel>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                current === index 
                  ? "bg-emerald-500 w-6" 
                  : "bg-emerald-200 hover:bg-emerald-300"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



 function ExploreSkeleton() {
  const skeletonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a subtle entrance for the skeleton loader
      gsap.from(".skeleton-card", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }, skeletonRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={skeletonRef} className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title & Underline Skeleton */}
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-10 w-64 mb-4 bg-slate-200" />
          <Skeleton className="h-1 w-20 rounded-full bg-emerald-200" />
        </div>

        {/* Carousel Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="skeleton-card bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
            >
              {/* Image area */}
              <Skeleton className="aspect-[4/3] w-full rounded-none bg-slate-200" />
              
              {/* Content area */}
              <div className="p-6 space-y-4">
                {/* Title line */}
                <Skeleton className="h-6 w-3/4 bg-slate-200" />
                
                {/* Description lines */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full bg-slate-100" />
                  <Skeleton className="h-3 w-full bg-slate-100" />
                  <Skeleton className="h-3 w-2/3 bg-slate-100" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators Skeleton (the dots at the bottom) */}
        <div className="flex justify-center gap-2 mt-12">
          <Skeleton className="h-2 w-8 rounded-full bg-emerald-200" />
          <Skeleton className="h-2 w-2 rounded-full bg-slate-200" />
          <Skeleton className="h-2 w-2 rounded-full bg-slate-200" />
          <Skeleton className="h-2 w-2 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}