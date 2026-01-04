"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CupSoda } from "lucide-react";

interface Package {
  id: string;
  name: string;
  location: { name: string }; // Updated to reflect the 'with("location")' relationship
  image_url: string;
  options: string[];
  price: string;
}

export default function PackageList() {
  const params = useParams();
  // This matches the folder name: app/packages/[location]/page.tsx
  const locationSlug = "zanzibar"; 

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        setLoading(true);
        // If locationSlug exists (e.g. 'zanzibar'), it fetches filtered data
        // If not (on the main packages page), it fetches all
       
         

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages/show/${locationSlug}`);
        const data = await res.json();
        setPackages(data.packages);
      } catch (error) {
        console.error("Failed to fetch packages", error);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, [locationSlug]);

  if (loading) return <div className="text-center py-20">Loading Adventure...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold capitalize">
          {locationSlug ? `${locationSlug} Packages` : "Tanzania Packages"}
        </h1>
        <p className="mt-3 text-gray-200">
          Discover the top Packages in {locationSlug || "Tanzania"}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {packages.map((dest) => (
          <Link href={`/packages/details/${dest.id}`} key={dest.id}>
            <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white h-[450px]">
              <Image
                src={dest.image_url ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${dest.image_url}` : "/images/bg.jpg"}
                alt={dest.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">{dest.name}</h3>
                <p className="text-emerald-400 font-medium mb-4">{dest.location?.name}</p>
                
                <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-sm">Includes:</p>
                  {dest.options.map((option) => (
                    <div key={option} className="flex items-center gap-2 text-gray-200 text-xs">
                      <CupSoda className="w-4 h-4 text-emerald-400" />
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}