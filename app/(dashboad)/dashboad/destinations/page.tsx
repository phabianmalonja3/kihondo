"use client";

import { AddDestination } from "@/components/web/destinations/add-destination";
import Image from "next/image";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEyeSlash, FaEye } from "react-icons/fa";

interface Destination {
  id: number;
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
     
      console.log(data.destinations.data)
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
                    {dest.status}
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
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
