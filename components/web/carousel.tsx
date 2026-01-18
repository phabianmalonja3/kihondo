"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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

  const autoplay = useMemo(
    () => Autoplay({ delay: 7000, stopOnInteraction: false }),
    []
  );

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setActive(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    let mounted = true;

    async function fetchHeroes() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/heroes`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch heroes");

        const data = await res.json();
        if (mounted) setHeroes(data?.heroes?.data ?? data ?? []);
      } catch {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchHeroes();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <HeroSkeleton />;
  if (error || heroes.length === 0) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Carousel
        setApi={setApi}
        plugins={[autoplay]}
        opts={{ loop: true, duration: 40 }}
        className="h-full w-full"
      >
        <CarouselContent className="ml-0 h-screen">
          {heroes.map((slide, index) => (
            <CarouselItem
              key={slide.id || index}
              className="relative h-screen w-full pl-0"
            >
              {/* IMAGE */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={slide.image_url}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  unoptimized
                  quality={90}
                  className={cn(
                    "object-cover object-center transition-transform ease-out duration-[20000ms]",
                    active === index ? "scale-105" : "scale-100"
                  )}
                />

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex h-full items-end px-6 md:px-20 pb-24">
                <div
                  className={cn(
                    "max-w-xl space-y-4 transition-all duration-1000",
                    active === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                >
                  <span className="block text-xs uppercase tracking-widest text-white/80">
                    Discover Tanzania
                  </span>

                  <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white">
                    {slide.title}
                  </h1>

                  <p className="text-lg text-white/90">
                    {slide.subtitle}
                  </p>

                  <a
                    href="#tours"
                    className="inline-block mt-6 border border-white/50 px-8 py-3 text-sm uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
                  >
                    Explore Tours
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* NAVIGATION */}
        <CarouselPrevious className="hidden md:flex left-8 h-12 w-12 border border-white/40 bg-black/30 text-white backdrop-blur hover:bg-white hover:text-black transition" />
        <CarouselNext className="hidden md:flex right-8 h-12 w-12 border border-white/40 bg-black/30 text-white backdrop-blur hover:bg-white hover:text-black transition" />
      </Carousel>
    </section>
  );
}
