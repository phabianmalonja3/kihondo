"use client";

import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious, 
  type CarouselApi 
} from "@/components/ui/carousel";
import { toast } from "sonner";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowUpRight, Compass } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export default function Explore() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const isHovered = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setEvents(data.events || []);
      } catch (error) {
        toast.error("Discovery section failed to load.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));

    const autoScroll = setInterval(() => {
      if (!isHovered.current) api.scrollNext();
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [api]);

  useEffect(() => {
    if (!loading && events.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".event-card", {
          opacity: 0,
          scale: 0.9,
          y: 40,
          stagger: { each: 0.1, from: "start" },
          duration: 1,
          ease: "expo.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, events]);

  if (loading) return <ExploreSkeleton />;
  if (!events.length) return null;

  return (
    <section ref={containerRef} className="py-24 px-6 bg-[#FCFDFD] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">
              <Compass className="w-4 h-4" /> Discovery Guide
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Uncover the Magic of <span className="text-emerald-600">Wild Tanzania</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed italic border-l-2 border-emerald-100 pl-6">
            "Your journey through the cradle of mankind begins with stories that last a lifetime."
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full relative"
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-6">
            {events.map((event) => (
              <CarouselItem 
                key={event.id}
                className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-[30%]"
              >
                <Link href={`/blog/${event.id}`} className="block group">
                  <div className="event-card relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 transition-all duration-500 group-hover:shadow-emerald-900/10">
                    
                    {/* Background Image with Zoom Effect */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={(event?.images?.length > 0) ? event.images[0] : "/placeholder.jpg"} 
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      {/* Sophisticated Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-slate-900/20 to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-12 h-1 bg-emerald-400 mb-6 rounded-full group-hover:w-20 transition-all duration-500" />
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-slate-200/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                      
                      {/* Floating Link Icon */}
                      <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Minimalist Navigation */}
          <div className="absolute -top-24 right-0 flex gap-4">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-slate-200 text-slate-400 hover:bg-emerald-900 hover:text-white transition-all" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-slate-200 text-slate-400 hover:bg-emerald-900 hover:text-white transition-all" />
          </div>
        </Carousel>

        {/* Progress bar pagination */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="text-xs font-mono text-slate-400">0{current + 1}</span>
          <div className="h-[2px] w-48 bg-slate-100 relative overflow-hidden">
             <div 
               className="absolute inset-0 bg-emerald-500 transition-all duration-500 ease-out" 
               style={{ width: `${((current + 1) / count) * 100}%` }}
             />
          </div>
          <span className="text-xs font-mono text-slate-400">0{count}</span>
        </div>
      </div>
    </section>
  );
}

function ExploreSkeleton() {
  return (
    <div className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 bg-slate-100" />
            <Skeleton className="h-12 w-[400px] bg-slate-100" />
          </div>
          <Skeleton className="h-12 w-32 bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[500px] w-full rounded-[2.5rem] bg-slate-50" />
          ))}
        </div>
      </div>
    </div>
  );
}