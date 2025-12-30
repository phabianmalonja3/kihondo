"use client";

import {useRef,useEffect,useState} from "react"
import Autoplay from "embla-carousel-autoplay";
import imag from '@/public/images/img.jpg';
import imag1 from '@/public/images/img1.jpg';
import imag2 from '@/public/images/img2.jpg';
import bg1 from "@/public/images/bg.jpg"
import bg2 from "@/public/images/bg2.png"



import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Hero } from "@/lib/heros";

export function CarouselPlugin() {
  const slides = [
    {
      image: imag,
      title: "Discover Tanzania",
      subtitle: "Wildlife, Nature & Adventure",
    },
    {
      image: imag1,
      title: "Relax in Zanzibar",
      subtitle: "Crystal Clear Beaches & Culture",
    },
    {
      image: imag2,
      title: "Climb Kilimanjaro",
      subtitle: "The Roof of Africa Awaits",
    },
    {
      image: bg1,
      title: "Climb Kilimanjaro",
      subtitle: "The Roof of Africa Awaits",
    },
    {
      image: bg2,
      title: "Climb Kilimanjaro",
      subtitle: "The Roof of Africa Awaits",
    },
  ];

  const [heroes,setHeroes]= useState<Hero[] | null>(null);

  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );


   
  
     useEffect(() => {
       const fetchImages = async () => {
        const res = await fetch("http://localhost:8000/api/heroes", {
          cache: "no-store", // 
        });
    
        const data = await res.json();
       
        console.log(data.heroes.data ?? data)

        setHeroes(data.heroes.data ?? data)
    
    
      };
    
      fetchImages();
      
     }, []);

     
  
  return (
    <section className="relative h-screen w-full">
      <Carousel
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        className="h-full"
      >
        <CarouselContent className="h-full">
          {heroes?.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              {/* Background image */}
              <div
                className="h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image_url})` }}
              >
                {/* Overlay */}
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
  {/* Navigation */}
        <CarouselPrevious className="left-6 " />
        <CarouselNext className="right-6 " />
      </Carousel>
    </section>
  );
}
