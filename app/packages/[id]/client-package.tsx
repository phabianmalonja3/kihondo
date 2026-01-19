"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, MapPin, Tag, CheckCircle, ArrowLeft } from "lucide-react";

export default function PackageClientView({ initialPackage, initialRelated }: any) {
  // Data is ready immediately from props (No useEffect fetching needed for main content)
  const [pkg] = useState(initialPackage);

  const related = initialRelated.filter((item: any) =>
      String(item.id) !== String(pkg.id) &&
      item.location?.name === pkg.location?.name
  ).slice(0, 3);

  const optionsArray = typeof pkg.options === 'string'
      ? JSON.parse(pkg.options)
      : (Array.isArray(pkg.options) ? pkg.options : []);

  const nightsCount = pkg.duration_nights ?? (pkg.duration_days > 0 ? pkg.duration_days - 1 : 0);

  return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
          <Image src={pkg.image_url || "/placeholder.jpg"} alt={pkg.name} fill className="object-cover" priority unoptimized />
          <Link href="/packages" className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full z-10">
            <ArrowLeft size={20} /> Back
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-emerald-600 font-bold uppercase text-sm mb-4">
              <Tag size={18} /> {pkg.category?.name || "Safari"}
            </div>
            <h1 className="text-4xl font-bold mb-6">{pkg.name}</h1>

            <div className="flex gap-6 mb-8 py-6 border-y border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Sun className="text-amber-500" size={20} /> <span>{pkg.days} Days</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Moon className="text-indigo-500" size={20} /> <span>{pkg.nights} Nights</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-10">{pkg.description}</p>

            {optionsArray.length > 0 && (
                <div className="bg-emerald-50 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {optionsArray.map((opt: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-emerald-800">
                        <CheckCircle size={20} className="text-emerald-500" /> {opt}
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 border rounded-3xl p-8 shadow-xl bg-white">
              <div className="text-4xl font-bold text-emerald-700 mb-6">${pkg.price}</div>
              <Link href={`/book/${pkg.id}`}>
                <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition">
                  Book This Tour
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
  );
}