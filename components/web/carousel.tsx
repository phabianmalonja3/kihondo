"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image"; // Better performance/sharpness
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import { Hero } from "@/lib/heros";
import HeroSkeleton from "@/components/web/heroSkeleton";


export function CarouselPlugin() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  const autoplay = useMemo(() => Autoplay({ delay: 5000, stopOnInteraction: false }), []);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setActive(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    let mounted = true;
    async function fetchHeroes() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch heroes");
        const data = await res.json();
        if (mounted) setHeroes(data?.heroes?.data ?? data ?? []);
      } catch (err) {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchHeroes();
    return () => { mounted = false; };
  }, []);

  if (loading) return <HeroSkeleton />;
  if (error || heroes.length === 0) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-950">
      <Carousel
        setApi={setApi}
        plugins={[autoplay]}
        className="h-full w-full"
        opts={{ loop: true, duration: 30 }} // Smoother transitions
      >
       <CarouselContent className="ml-0 h-screen">
  {heroes.map((slide, index) => (
    <CarouselItem key={slide.id || index} className="relative h-screen w-full pl-0 overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.image_url}
          alt={slide.title}
          fill
          priority={index === 0}
          unoptimized
          quality={100} // High quality for tourism visuals
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-transform duration-[10000ms] ease-out",
            active === index ? "scale-110" : "scale-100" // Subtle Ken Burns effect
          )}
        />
        {/* Gradients often look better than flat overlays for tourism */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* TEXT CONTENT LAYER */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className={cn(
          "max-w-5xl text-center transition-all duration-1000 delay-300",
          active === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
            {slide.title}
          </h1>
          <p className="text-xl md:text-3xl text-white/95 font-medium mb-10 max-w-3xl mx-auto drop-shadow-md">
            {slide.subtitle}
          </p>
          <a
            href="#tours"
            className="inline-flex h-16 items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold px-12 rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            Start Your Journey
          </a>
        </div>
      </div>
      
    </CarouselItem>
  ))}
</CarouselContent>
        <CarouselPrevious className="hidden md:flex left-8 h-12 w-12 bg-white/10 hover:bg-emerald-600 border-none text-white backdrop-blur-md" />
        <CarouselNext className="hidden md:flex right-8 h-12 w-12 bg-white/10 hover:bg-emerald-600 border-none text-white backdrop-blur-md" />
      </Carousel>
    </section>
  );
}