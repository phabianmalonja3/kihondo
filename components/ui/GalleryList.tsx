"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export interface ImageItem {
    id:string;
  image_path: string;
  title: string;
  description:string
}

export default function GalleryList({data}:{data:ImageItem[]}) {

    

      const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const openPopup = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <Suspense fallback={<GallerySkeleton />}>
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header Section */}
      <div className="bg-emerald-900 text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-brittany text-white" >Gallery</h1>
        <p className="mt-4 text-emerald-100 max-w-2xl mx-auto text-lg">
          A visual journey through the breathtaking landscapes and vibrant culture of Tanzania.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((g, index) => (
            <div
              key={g.id || index}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-zinc-200 dark:bg-zinc-800"
              onClick={() => openPopup(index)}
            >
              <Image
                src={g.image_path ?? "/images/bg.jpg"}
                alt={g?.title || "Gallery Image"}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Modern Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {g.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

     
       {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center backdrop-blur-sm">
          <button
            className="absolute top-6 right-8 text-white/70 hover:text-white text-5xl font-light z-[110] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>

          <div className="w-full max-w-5xl px-4">
            <Carousel opts={{ startIndex: activeIndex }} className="w-full">
              <CarouselContent>
                {data.map((g, index) => (
                  <CarouselItem key={index} className="flex items-center justify-center">
                    <div className="relative aspect-video w-full max-h-[80vh] rounded-xl overflow-hidden shadow-2xl">
                      <Image
                        src={g?.image_path ?? "/images/bg.jpg"}
                        alt={g.title ??"ikgfd"}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                        <h3 className="text-2xl font-bold">{g.title}</h3>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-16 bg-white/10 border-none text-white hover:bg-white/20 scale-150" />
              <CarouselNext className="hidden md:flex -right-16 bg-white/10 border-none text-white hover:bg-white/20 scale-150" />
            </Carousel>
          </div>
        </div>
      )}

      {/* Pagination */}
      <section className="pb-20 text-center">
        <div className="inline-flex items-center p-1 bg-zinc-200 dark:bg-zinc-800 rounded-xl gap-1">
          <button className="px-4 py-2 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition font-medium">Prev</button>
          <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg shadow-sm font-medium">1</button>
          <button className="px-4 py-2 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition font-medium">2</button>
          <button className="px-4 py-2 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition font-medium">Next</button>
        </div>
      </section>
    </div>
    </Suspense>
  );
}

function GallerySkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-emerald-900 py-20 animate-pulse" />
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3,4,6].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}