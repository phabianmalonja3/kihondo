"use client";

import Image from "next/image";
import React, { Suspense } from "react";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Serengeti National Park",
    description: "Famous for its wildlife and annual migration of wildebeest.",
    image: "/images/serengeti.jpg",
  },
  {
    id: 2,
    name: "Zanzibar Island",
    description: "Beautiful beaches and rich Swahili culture.",
    image: "/images/zanzibar.jpg",
  },
  {
    id: 3,
    name: "Mount Kilimanjaro",
    description: "Africa’s highest mountain, perfect for trekking adventures.",
    image: "/images/kilimanjaro.jpg",
  },
  {
    id: 4,
    name: "Ngorongoro Crater",
    description: "A UNESCO World Heritage Site full of wildlife.",
    image: "/images/ngorongoro.jpg",
  },
  {
    id: 5,
    name: "Tarangire National Park",
    description: "Known for elephants and baobab trees.",
    image: "/images/tarangire.jpg",
  },
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      
      <div className="bg-emerald-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Destinations</h1>
        <p className="mt-3 text-gray-200">
          Discover the top destinations in Tanzania
        </p>
      </div>

      {/* Destinations Grid */}
      <Suspense fallback={<p>Loading ... </p>}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <Image
              src={dest.image}
              alt={dest.name}
              width={600}
              height={400}
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-semibold">{dest.name}</h3>
              <p className="text-gray-200 text-sm mt-1">{dest.description}</p>
            </div>
          </div>
        ))}
      </div>
      </Suspense>
    </div>
  );
}
