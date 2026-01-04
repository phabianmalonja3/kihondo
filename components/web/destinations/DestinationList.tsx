
"use client"
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { DeleteDestination } from './delete';
import { FaEdit, FaEye } from "react-icons/fa";
import { AddDestination } from "./add-destination";
import TableSkeleton from "../TableSkeleton";


interface Destination {
  id: string;
  name: string;
  location: string;
  image_url: string;
  status:"Active"
}


export default function DestinationList({destinations}:{destinations: Destination[]}) {
   const [refresh, setRefresh] = useState<boolean>(false);
  return (
    


 <div className="px-4">
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
                      ${dest.status === "Active"
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

          </tbody>
            {/* </Suspense> */}
        </table>
      </div>
      
    </div>


    
          
  )
}
