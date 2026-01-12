"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Tag, CheckCircle, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Location {
  name: string;
  country: string;
}

interface Package {
  id: number | string;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  image_url: string;
  options: string[] | string;
  location: Location;
  category?: { name: string };
}

export default function PackageDetailPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [related, setRelated] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        // 1. Fetch Single Package
        const res = await fetch(`${baseUrl}/packages/${id}`);
        const data = await res.json();
        const mainPkg = data.package ?? data;

        setPkg(mainPkg);

        // 2. Fetch All Packages to filter "Related"
        const relatedRes = await fetch(`${baseUrl}/packages`);
        const relatedData = await relatedRes.json();
        
        // FIX: Ensure 'all' is always an array by checking multiple common API structures
        let all: Package[] = [];
        if (Array.isArray(relatedData)) {
            all = relatedData;
        } else if (relatedData.packages?.data) {
            all = relatedData.packages.data; // Handles Laravel Pagination
        } else if (relatedData.data) {
            all = relatedData.data;
        } else if (relatedData.packages) {
            all = relatedData.packages;
        }

        // 3. Filter Related Packages
        if (Array.isArray(all) && mainPkg) {
            const currentId = String(id); 

            const filtered = all.filter((item: Package) => {
                const isDifferentPackage = String(item.id) !== currentId;
                
                // Safety check: Make sure location exists before checking .name
                const isSameLocation = 
                    item.location?.name?.toLowerCase() === mainPkg.location?.name?.toLowerCase();

                return isDifferentPackage && isSameLocation;
            }).slice(0, 3);

            setRelated(filtered);
        }
      } catch (error) {
        console.error("Error fetching package details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  if (loading) return <DetailSkeleton />;
  if (!pkg) return <div className="py-20 text-center">Package not found</div>;

  // Safely parse options if they come as a JSON string
  const optionsArray = typeof pkg.options === 'string' 
    ? JSON.parse(pkg.options) 
    : (Array.isArray(pkg.options) ? pkg.options : []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation & Hero */}
      <div className="relative h-[60vh] w-full">
        <Image 
            src={pkg.image_url || "/placeholder-safari.jpg"} 
            alt={pkg.name} 
            fill 
            className="object-cover" 
            priority 
            unoptimized 
        />
        <div className="absolute inset-0 bg-black/30" />
        <Link href="/packages" className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition z-10">
          <ArrowLeft size={20} /> Back to Packages
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4">
            <Tag size={18} /> {pkg.category?.name || "Safari"}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{pkg.name}</h1>

          <div className="flex flex-wrap gap-6 mb-8 py-6 border-y border-gray-100">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Clock className="text-emerald-500" /> {pkg.duration_days} Days
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <MapPin className="text-emerald-500" /> {pkg.location?.name}, {pkg.location?.country}
            </div>
          </div>

          <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
            <p>{pkg.description || "No description provided for this amazing tour."}</p>
          </div>

          {/* Highlights/Options */}
          {optionsArray.length > 0 && (
            <div className="bg-emerald-50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-emerald-900 mb-6">Package Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {optionsArray.map((opt: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-emerald-800">
                        <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                        {opt}
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* Sidebar Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-gray-100 rounded-3xl p-8 shadow-xl bg-white">
            <p className="text-gray-500 text-sm mb-1">Total Price starting from</p>
            <div className="text-4xl font-bold text-emerald-700 mb-6">${pkg.price}</div>

            <Link href={`/book/${pkg.id}`}>
                <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
                Book This Tour
                </button>
            </Link>

            <p className="text-center text-xs text-gray-400 mt-4 italic">
              * Price depends on group size and season
            </p>
          </div>
        </div>
      </div>

      {/* Related Packages Section */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Related Packages in {pkg.location?.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((rel) => (
                <Link href={`/packages/${rel.id}`} key={rel.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                    <div className="relative h-48 w-full">
                    <Image src={rel.image_url || "/placeholder-safari.jpg"} alt={rel.name} fill className="object-cover" />
                    </div>
                    <div className="p-5">
                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition">{rel.name}</h4>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-emerald-700 font-bold">${rel.price}</span>
                        <span className="text-gray-500 text-sm">{rel.duration_days} Days</span>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
            </div>
        </section>
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
      <div className="h-[50vh] bg-gray-200 rounded-3xl w-full mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 bg-gray-200 w-1/2 rounded-lg" />
          <div className="h-6 bg-gray-200 w-1/4 rounded-lg" />
          <div className="h-40 bg-gray-200 w-full rounded-lg" />
        </div>
        <div className="lg:col-span-1 h-64 bg-gray-200 rounded-3xl" />
      </div>
    </div>
  );
}