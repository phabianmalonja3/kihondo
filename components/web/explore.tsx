import Image from "next/image";
import * as React from "react";

import travel from "@/public/images/travel.jpg";
import tv from "@/public/images/travel2.jpg";
// import mountain from "@/public/images/mountain.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Explore() {
  const features = [
    {
      title: "Wildlife Adventures",
      desc: "Experience Africa’s best safaris in Serengeti and Ngorongoro.",
      image: travel,
    },
    {
      title: "Beach Paradise",
      desc: "Relax on Zanzibar’s crystal-clear beaches and turquoise waters.",
      image: tv,
    },
    {
      title: "Beach Paradise",
      desc: "Relax on Zanzibar’s crystal-clear beaches and turquoise waters.",
      image: tv,
    },
    {
      title: "Beach Paradise",
      desc: "Relax on Zanzibar’s crystal-clear beaches and turquoise waters.",
      image: tv,
    },
    {
      title: "Beach Paradise",
      desc: "Relax on Zanzibar’s crystal-clear beaches and turquoise waters.",
      image: tv,
    },
    {
      title: "Beach Paradise",
      desc: "Relax on Zanzibar’s crystal-clear beaches and turquoise waters.",
      image: tv,
    },
    // Add more features if needed
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-emerald-900 mb-12">
          Why Explore Tanzania?
        </h2>

        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {features.map((feature, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card className="hover:shadow-lg transition">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={300}
                        height={200}
                        className="rounded-md object-cover mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-center">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-900 text-white p-2 rounded-full shadow" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-900 text-white p-2 rounded-full shadow" />
        </Carousel>
      </div>
    </section>
  );
}
