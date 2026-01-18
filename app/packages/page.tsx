"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Tag, AlertCircle, Moon, Sun } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// --- Interfaces ---
interface Location {
  id: number;
  name: string;
  slug: string;
  region: string;
  country: string;
}

interface Package {
  id: number;
  name: string;
  duration_days: number;
  price: number;
  image_url: string;
  category?: { name: string };
  active: boolean;
  days: number;
  nights: number;
  location: Location; // This is an object
}

function PackagesList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("package");

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(false);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL
        const fetchUrl = query
          ? `${baseUrl}/packages?package=${encodeURIComponent(query)}`
          : `${baseUrl}/packages`;

        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        const allPackages = data.packages?.data ?? data.packages ?? data;

        // Ensure we only show active ones and handle array check
        if (Array.isArray(allPackages)) {
          setPackages(allPackages.filter((p: Package) => p.active));
        } else {
          setPackages([]);
        }
      } catch (err) {
        console.error("Failed to load packages:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [query]);

  if (loading) return <PackageGridSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500">
        <AlertCircle size={48} />
        <p className="mt-4 font-semibold">Error loading packages. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {packages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <Link href={`/packages/${pkg.id}`} key={pkg.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={pkg.image_url || "/images/placeholder.jpg"}
                    alt={pkg.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                    ${pkg.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                    <Tag size={14} />
                    {pkg.category?.name || "Tour"}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {pkg.name}
                  </h3>

                  <div className="space-y-2 mt-4 mb-6">
                    <div className="flex items-center text-gray-600 text-sm gap-2">
                      <MapPin size={16} className="text-emerald-500" />
                      {/* FIX: Accessing .name property instead of the whole object */}
                      {pkg.location?.name || "Tanzania"}
                    </div>

                    <div className="flex items-center gap-3 text-gray-700 text-sm font-semibold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 w-fit">
                      {/* Days Part */}
                      <div className="flex items-center gap-1.5">
                        <Sun size={16} className="text-amber-500" />
                        <span>{pkg.days} {pkg.days > 1 ? 'Days' : 'Day'}</span>
                      </div>

                      <span className="text-gray-300">/</span>

                      {/* Nights Part */}
                      <div className="flex items-center gap-1.5">
                        <Moon size={16} className="text-indigo-500" />
                        <span>{pkg.nights} {pkg.nights > 1 ? 'Nights' : 'Night'}</span>
                      </div>
                    </div>

                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="w-full py-3 bg-emerald-50 text-emerald-700 text-center font-semibold rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      View Details
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No packages found for "{query}".</p>
          <Link href="/packages" className="text-emerald-600 underline mt-2 inline-block">
            Clear filters and view all
          </Link>
        </div>
      )}
    </div>
  );
}

// Main component with Suspense
export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <Suspense fallback={<PackageGridSkeleton />}>
        <PackagesList />
      </Suspense>
    </div>
  );
}

function HeroSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get("package");

  return (
    <div className="bg-emerald-900 text-white py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold capitalize">
        {query ? `${query} Packages` : "Our Tour Packages"}
      </h1>
      <p className="mt-4 text-emerald-100 max-w-2xl mx-auto px-4">
        Discover life-changing experiences across Tanzania’s most iconic locations.
      </p>
    </div>
  );
}

function PackageGridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
          <Skeleton className="h-60 w-full rounded-xl" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}