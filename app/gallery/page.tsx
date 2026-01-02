// import React, { useState } from "react";

"use client";
import Image from "next/image";
import {useEffect,useState} from "react"
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import banner from "@/public/contact.jpg"
import {ImageItem} from '@/lib/constants'
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";


export default function GalleryPage() {


  const [activeIndex, setActiveIndex] = useState<number>(0); // <-- index is a number
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [gallaries, setGallaries] = useState<ImageItem[]>([]);
  const [link, setLink] = useState([]);
 useEffect(() => {

   const getGallery = async ()=> {
      try {
           const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/galleries`, {
      cache: "no-store", // 
    });

    const data = await res.json();
 
    setGallaries(data.galleries.data ?? data);


    setLink(data.galleries.links) 
      } catch (error) {
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    }

    getGallery();

 },[]);

  
  const openPopup = (index: number) => {  // <-- index typed as number
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  if(loading){
    return <GallerySkeleton />
  }

  return (


    
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Gallery</h1>
                <p className="mt-3 text-gray-200">
                    Discover the top Gallery in Tanzania
                </p>
            </div>


      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallaries.map((g, index: number) => (  // <-- index typed as number
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
            onClick={() => openPopup(index)}
          >
                   <Image
             src={g.image_path ?? "/images/bg.jpg"}
             alt={g.id.toString()}
             width={400}
             height={300}
             unoptimized // <--- Add this
             className="h-48 w-full object-cover"
           />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end">
              <h3 className="text-white text-lg font-semibold p-4">{g.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl px-4">
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
              onClick={closePopup}
            >
              &times;
            </button>

            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {gallaries.map((g, index: number) => (
                  <CarouselItem
                    key={index}
                    className={`pl-1 md:basis-1/2 lg:basis-1/1 ${
                      index === activeIndex ? "block" : "hidden"
                    }`}
                  >
                    <Card className="shadow-lg">
                      <CardContent className="p-0">
                          <Image
             src={g.image_path ?? "/images/bg.jpg"}
             alt={g.id.toString()}
             width={400}
             height={300}
             unoptimized // <--- Add this
             className="h-48 w-full object-cover"
           />
                        <h3 className="text-white text-xl font-semibold absolute bottom-4 left-4 bg-black/40 px-3 py-1 rounded">
                          {g.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-emerald-900 text-white p-2 rounded-full" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-900 text-white p-2 rounded-full" />
            </Carousel>
          </div>
        </div>
      )}

       {/* PAGINATION (placeholder) */}
      <section className="py-8 text-center">
        <div className="flex justify-center gap-3">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">Prev</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">1</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">2</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">Next</button>
        </div>
      </section>
    </div>
  );
}


 function GallerySkeleton() {
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
