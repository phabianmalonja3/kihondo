"use client";

import { useState } from "react";
import { Eye, X, MapPin, Clock, Tag, CheckCircle2, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ShowPackageModalProps {
  pkg: any; // Using any to match your dynamic data from the table loop
}

export default function ShowPackageModal({ pkg }: ShowPackageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Parse options if it's a JSON string from Laravel
  const options = typeof pkg.options === "string" ? JSON.parse(pkg.options) : pkg.options;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Quick View"
      >
        <Eye size={18} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full hover:bg-white shadow-md transition-all"
            >
              <X size={20} className="text-slate-600" />
            </button>

            {/* Header Image */}
            <div className="relative h-56 w-full">
              <Image
                src={pkg.image_url || "/images/placeholder.jpg"}
                alt={pkg.name}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ${pkg.price}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-2">
                <Tag size={12} /> {pkg.category?.name || "Tour Package"}
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{pkg.name}</h2>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin size={16} className="text-emerald-500" />
                  {pkg.location?.name}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock size={16} className="text-emerald-500" />
                  {pkg.duration_days} Days
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Globe size={16} className="text-emerald-500" />
                  {pkg.location?.country || "Tanzania"}
                </div>
              </div>

              {/* Package Options/Highlights */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800">Inclusions & Highlights</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {Array.isArray(options) ? (
                    options.map((opt: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{opt}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No specific options listed</p>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <Link
                  href={`/packages/${pkg.id}`}
                  className="flex-1 py-3 bg-emerald-600 text-white text-center font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  Open Full Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}