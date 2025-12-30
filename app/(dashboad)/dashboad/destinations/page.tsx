"use client";

import { AddDestination } from "@/components/web/destinations/add-destination";
import { DeleteDestination } from "@/components/web/destinations/delete";
import Image from "next/image";
import Link from "next/link";
import React, { useState,useEffect, Suspense } from "react";
import { FaPlus, FaEdit, FaTrash, FaEyeSlash, FaEye } from "react-icons/fa";
import Loading from './loading';

interface Destination {
  id: string;
  name: string;
  location: string;
  image_url: string;
  status: "Active" | "Inactive";
}



export default function DestinationsPage() {

  const [refresh,setRefresh]= useState<boolean>(false);
  const [destinations,setDestinations]= useState<Destination[]>([]);
  useEffect(() => {
     
      const fetchImages = async () => {
      const res = await fetch("http://localhost:8000/api/destinations", {
        cache: "no-store", // 
      });
  
      const data = await res.json();
    
      setDestinations(data.destinations.data ?? data);
  
    };
  
    fetchImages();
    }
    , [refresh]);
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-emerald-900">
          Destinations
        </h1>

        <AddDestination onAddDestination={() => setRefresh(prev => !prev)} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            <Suspense  fallback={<Loading />}>
{destinations.map((dest) => (
              <tr key={dest.id} className="border-b last:border-none">
                <td className="px-6 py-4">
                  <Image
                    src={dest.image_url ?? "/images/bg.jpg"}
                    alt={dest.name}
                    width={80}
                    height={60}
                    unoptimized
                    className="rounded-md object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {dest.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {dest.location}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        dest.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {dest.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-3 text-lg">
                    <Link href={`/destinations/${dest.id}`} className="text-yellow-600 hover:text-blue-800">
                      <FaEye />
                    </Link>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    

                     <DeleteDestination destination={dest.id} onDelete={() => setRefresh(prev => !prev)} />
                  </div>
                </td>
              </tr>
            ))}
            </Suspense>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
