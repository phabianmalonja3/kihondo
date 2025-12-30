"use client";

import { SkeletonCard } from "@/components/web/heroes/skeleton";
import Image from "next/image";
import { useEffect, useState, ReactNode } from "react";

interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
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
        
        if (isMounted) {
          setData(json.destination);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getDestination();

    return () => { isMounted = false; };
  }, [params]); // params is a promise, but it's stable in the context of one render

  if (loading) return <SkeletonCard />;
  if (error || !data) return <div className="p-10 text-center text-red-500">{error || "Not found"}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Image */}
      <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={data.image_url || "/images/serengeti.jpg"}
          alt={data.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-emerald-900">{data.name}</h1>
          <p className="text-gray-500 mt-2 flex items-center gap-1">
            <span>📍</span> {data.location}
          </p>
          <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
            {data.description}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white rounded-xl shadow-md p-6 h-fit border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-emerald-900">Details</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{data.category?.name ?? "N/A"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className={`font-bold ${data.status === 'Available' ? 'text-green-600' : 'text-orange-600'}`}>
                {data.status}
              </span>
            </li>
          </ul>
          <button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold transition-colors">
            Book This Tour
          </button>
        </aside>
      </div>
    </div>
  );
}