"use client";

import { FaBoxes, FaCalendarCheck } from "react-icons/fa";
import { AddPackage } from "./add-package";
import { useState,useEffect, Suspense } from "react";
import { toast } from "sonner";
import { da } from "zod/v4/locales";
import Image from "next/image";
import { DeletePackage } from "./delete";





interface Package{
  id:string,
  name:string,
  location:string
  price:number
  image_url:string,
  options:[]

}

export  default  function Packages() {
 const [refresh,setRefresh] = useState<boolean>(false)
 const [packages,setPackages] = useState<Package[] | null>([])
  useEffect(()=>{
 async  function getPackage() {
     try{
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`,{cache:"no-cache"});

  const data = await  res.json()

      if (!res.ok){
          toast.error("Failed to Fetch package");
      };



      setPackages(data.packages)
     
 
    } catch {
      toast.error("Failed to add package");
    } finally {
      // setLoading(false);
    }
    
   }

   getPackage()

  },[refresh])


 
  return (
    <div className=" min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <FaBoxes className="text-emerald-700 text-3xl" />
        <h1 className="text-3xl font-bold text-emerald-900">
        Packages
        </h1>
      </div>

   
<div className="flex justify-end mb-2">

 <AddPackage onAddPackage={() => setRefresh(prev => !prev)} />
</div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-emerald-900 bg-white">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Offers</th>
              <th className="px-6 py-4">Location</th>
            </tr>
          </thead>
          <tbody>
           <Suspense fallback={<p>Loading ..</p>}>
             {packages?.map((pk) => (
              <tr
                key={pk.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{pk.name}</td>
                  <td className="px-6 py-4">
                                   <Image
                                     src={pk.image_url ?? "/images/bg.jpg"}
                                     alt={pk.name}
                                     width={80}
                                     height={60}
                                     unoptimized
                                     className="rounded-md object-cover"
                                   />
                                 </td>
                <td className="px-6 py-4">{pk.price}</td>
                <td className="px-6 py-4">{pk.options.join(" , ")}</td>
                <td className="px-6 py-4">{pk.location}</td>
                <td className="px-6 py-4">
                 <DeletePackage id={pk.id} onDelete={()=>setRefresh(prev=>!prev)}  />
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

/* ---------- Components ---------- */

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-emerald-900 mt-2">
        {value}
      </h2>
    </div>
  );
}
