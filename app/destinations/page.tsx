"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, ArrowRight, Compass } from "lucide-react"; // Icons for professionalism

interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
  status: string;
  category?: { name: string };
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
          cache: "no-store",
        });
        const data = await res.json();
        setDestinations(data.destinations.data ?? data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) return <DestinationSkeleton />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section - More Professional Gradient */}
      <div className="relative bg-emerald-950 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-800 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Compass size={14} /> Explore Tanzania
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight md:text-6xl">
            Prime <span className="text-emerald-500">Destinations</span>
          </h1>
          <p className="mt-6 text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            From the endless plains of the Serengeti to the turquoise waters of Zanzibar, 
            experience the soul of the African wilderness.
          </p>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest) => (
            <Link href={`/destinations/${dest.id}`} key={dest.id} className="group">
              <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
                
                {/* Image Container */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={dest.image_url ?? "/images/bg.jpg"}
                    alt={dest.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Badge */}
                  {dest.category?.name && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-emerald-900 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-sm">
                      {dest.category.name}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-emerald-600 mb-2">
                    <MapPin size={14} className="shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wide italic">{dest.location}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-3">
                    {dest.name}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
                    {dest.description || "Experience the breathtaking beauty and wildlife of this unique Tanzanian destination."}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">
                      View Details
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-900 group-hover:text-white transition-all duration-300">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DestinationSkeleton() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="h-80 bg-slate-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4 rounded-[2rem] bg-white p-4 shadow-sm">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between items-center pt-4">
               <Skeleton className="h-4 w-20" />
               <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}