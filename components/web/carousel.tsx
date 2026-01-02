"use client";

import { useRef, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
 // Import the skeleton
import { Hero } from "@/lib/heros";
import { Skeleton } from "../ui/skeleton";

export function CarouselPlugin() {
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes`, {
          cache: "no-store",
        });
        const data = await res.json();
        setHeroes(data.heroes.data ?? data);
      } catch (error) {
        console.error("Failed to fetch heroes:", error);
      } finally {
        setLoading(false); // Stop loading regardless of success/fail
      }
    };

    fetchImages();
  }, []);

  // Show Skeleton if loading or if we have no data yet
  if (loading || !heroes) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative h-screen w-full">
      <Carousel
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        className="h-full"
      >
        <CarouselContent className="h-full">
          {heroes.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div
                className="h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image_url})` }}
              >
                <div className="h-full bg-black/50 flex items-center justify-center text-center px-6">
                  <div className="max-w-3xl text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                      {slide.subtitle}
                    </p>
                    <a
                      href="#tours"
                      className="inline-block bg-emerald-900 hover:bg-emerald-700 transition px-6 py-3 rounded-lg text-white text-lg"
                    >
                      Explore Tours
                    </a>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 " />
        <CarouselNext className="right-6 " />
      </Carousel>
    </section>
  );

 
}

 export function HeroSkeleton() {
  return (
    <section className="relative h-screen w-full bg-zinc-200 dark:bg-zinc-900 animate-pulse">
      {/* Background Simulation */}
      <div className="h-full bg-black/40 flex items-center justify-center text-center px-6">
        <div className="max-w-3xl w-full flex flex-col items-center">
          {/* Title Placeholder */}
          <Skeleton className="h-12 md:h-16 w-3/4 mb-4 bg-white/20" />
          {/* Subtitle Placeholder */}
          <Skeleton className="h-6 w-1/2 mb-6 bg-white/20" />
          {/* Button Placeholder */}
          <Skeleton className="h-12 w-40 rounded-lg bg-emerald-900/30" />
        </div>
      </div>
    </section>
  )}