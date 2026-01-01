"use client";

import { AddImage } from "@/components/web/gallery/add-image";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { GalleryItem } from "@/lib/gallarey";
import { DeleteGallery } from "@/components/web/gallery/delete-gallarey";


export default function GalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [refresh, setRefresh] = useState(false); // toggles to refresh gallery

  useEffect(() => {

    const fetchImages = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/galleries`, {
        cache: "no-store", // 
      });

      const data = await res.json();

      setGalleries(data.galleries.data ?? data);

    };

    fetchImages();
  }
    , [refresh]);

  const handleRemove = (id: string) => {
    // Handle remove action
    console.log("Remove clicked");
  }

  return (


    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-emerald-900">
          Gallery
        </h1>

        <AddImage onImageAdded={() => setRefresh(prev => !prev)} />



      </div>

      {/* Gallery Grid */}
      <Suspense fallback={<div>Loading...</div>}>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleries.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              <Image
                src={item.image_path ?? "/images/bg.jpg"}
                alt={item.id.toString()}
                width={400}
                height={300}
                unoptimized // <--- Add this
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {item.category.name}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${item.status
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {item.status}
                  </span>

                  <div className="flex gap-3 text-lg">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleRemove(item.id.toString())}>
                      <FaEdit />
                    </button>

                    <DeleteGallery gallery={item.id.toString()} onDelete={() => setRefresh(prev => !prev)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
