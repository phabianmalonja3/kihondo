"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

// shadcn components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsSection() {
  const stats = [
    { label: "Happy Clients", value: "2000+" },
    { label: "Tours Completed", value: "150+" },
    { label: "Destinations", value: "20+" },
    { label: "Years Experience", value: "10+" },
  ];

  const testimonials = [
    {
      name: "Alice M.",
      location: "United Kingdom",
      text: "Exploring Tanzania with this team was an unforgettable experience. The attention to detail on our safari was world-class!",
      image: "/images/client1.jpg",
      rating: 5,
    },
    {
      name: "John D.",
      location: "USA",
      text: "Amazing safari and beautiful beaches! Everything was perfectly organized from the moment we landed in Arusha.",
      image: "/images/client2.jpg",
      rating: 5,
    },
    {
      name: "Fatima S.",
      location: "UAE",
      text: "Professional and friendly guides. They knew exactly where to find the Big Five. Loved every moment of our adventure.",
      image: "/images/client3.jpg",
      rating: 5,
    },
    {
      name: "Fatima S.",
      location: "UAE",
      text: "Professional and friendly guides. They knew exactly where to find the Big Five. Loved every moment of our adventure.",
      image: "/images/client3.jpg",
      rating: 5,
    },
    {
      name: "Fatima S.",
      location: "UAE",
      text: "Professional and friendly guides. They knew exactly where to find the Big Five. Loved every moment of our adventure.",
      image: "/images/client3.jpg",
      rating: 5,
    },
    {
      name: "Fatima S.",
      location: "UAE",
      text: "Professional and friendly guides. They knew exactly where to find the Big Five. Loved every moment of our adventure.",
      image: "/images/client3.jpg",
      rating: 5,
    },
    {
      name: "Fatima S.",
      location: "UAE",
      text: "Professional and friendly guides. They knew exactly where to find the Big Five. Loved every moment of our adventure.",
      image: "/images/client3.jpg",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* STATS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center shadow-sm hover:shadow-xl transition-all"
            >
              <h4 className="text-4xl md:text-5xl font-black text-emerald-600 mb-2">
                {stat.value}
              </h4>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-widest text-xs">
                {stat.label}
              </p>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/10 rounded-3xl transition-all" />
            </motion.div>
          ))}
        </div>

        {/* TESTIMONIALS HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4">
            Voices of Adventure
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg">
            Don't just take our word for it. Here is what our global community has to say.
          </p>
        </div>

        {/* SHADCN CAROUSEL */}
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-1">
                    <Card className="h-full border-none shadow-none bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden">
                      <CardContent className="p-8 flex flex-col h-full">
                        <FaQuoteLeft className="text-emerald-500/20 text-4xl mb-6" />
                        
                        <div className="flex gap-1 mb-4">
                          {[...Array(t.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500 text-sm" />
                          ))}
                        </div>

                        <p className="text-zinc-600 dark:text-zinc-300 italic mb-8 flex-grow leading-relaxed">
                          "{t.text}"
                        </p>

                        <div className="flex items-center gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-500/20">
                            <Image
                              src={t.image}
                              alt={t.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-zinc-900 dark:text-white">{t.name}</h3>
                            <p className="text-xs text-zinc-400 font-medium uppercase">{t.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-12">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 border-zinc-200 dark:border-zinc-800" />
                <CarouselNext className="static translate-y-0 h-12 w-12 border-zinc-200 dark:border-zinc-800" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}