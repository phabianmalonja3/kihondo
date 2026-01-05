"use client";

import { SkeletonCard } from "@/components/web/heroes/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaTag, FaCheckCircle, FaChevronLeft } from "react-icons/fa";

interface Destination {
  id: number;
  name: string;
  location: string;
  descriptions: string;
  image_url: string;
  status: string;
  category?: { name: string };
}

interface Props {
  params: Promise<{ id: string }>;
}

export default function DestinationView({ params }: Props) {
  const [data, setData] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function getDestination() {
      try {
        const resolvedParams = await params;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/destinations/${resolvedParams.id}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Destination not found");
        const json = await res.json();

        console.log(json.destination)
        if (isMounted) setData(json.destination);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    getDestination();
    return () => { isMounted = false; };
  }, [params]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-10">
       <SkeletonCard /> 
    </div>
  );

  if (error || !data) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg mb-4">{error || "Destination not found"}</p>
        <Link href="/destinations" className="text-emerald-600 font-bold hover:underline">Return to Explore</Link>
    </div>
  );

  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* 1. Full-width Hero with Gradient Overlay */}
      <section className="relative w-full h-[60vh] min-h-[400px]">
        <Image
          src={data.image_url || "/images/placeholder.jpg"}
          alt={data.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Breadcrumb & Back Button */}
        <div className="absolute top-8 left-0 w-full px-4 md:px-10">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-emerald-600 transition-all text-sm font-medium">
            <FaChevronLeft size={12} /> Back to Destinations
          </Link>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-10 left-0 w-full px-4 md:px-10 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            {data.category && (
              <span className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded w-fit">
                {data.category.name}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-black text-white">{data.name}</h1>
            <p className="text-emerald-50 flex items-center gap-2 text-lg">
              <FaMapMarkerAlt /> {data.location}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Content Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">About the Destination</h2>
            <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg whitespace-pre-line">
              {data.descriptions}
            </div>
          </div>

          {/* Quick Features / Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <HighlightItem icon={<FaCheckCircle className="text-emerald-500"/>} label="Verified Status" value={data.status} />
             <HighlightItem icon={<FaTag className="text-emerald-500"/>} label="Type" value={data.category?.name || "Safari"} />
             <HighlightItem icon={<FaMapMarkerAlt className="text-emerald-500"/>} label="Region" value={data.location.split(',').pop() || "Tanzania"} />
          </div>
        </div>

        {/* Right: Sidebar Card */}
        <aside className="relative">
          <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white">Planning your trip?</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Booking Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${data.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {data.status}
                </span>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  Ready to explore <strong>{data.name}</strong>? Get a customized itinerary based on your budget.
                </p>
              </div>

              <Link href="/contact" className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                Inquire Now
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function HighlightItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center flex flex-col items-center gap-2">
      {icon}
      <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">{label}</span>
      <span className="text-sm font-bold text-zinc-900 dark:text-white">{value}</span>
    </div>
  );
}