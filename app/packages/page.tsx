"use client";

import { CupSoda, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
interface Package {
    id: string;
    name: string;
    location: string;
    image_url: string;
    options: []
}





export default function Package() {

    const [packages, setPackages] = useState<Package[]>([]);
    useEffect(() => {

        const fetchImages = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`, {
                cache: "no-store", // 
            });

            const data = await res.json();

            console.log(data.packages ?? data);

            setPackages(data.packages ?? data);

        };

        fetchImages();
    }
        , []);

        

    return (
        <>
        

            <div className="bg-emerald-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Packages</h1>
                <p className="mt-3 text-gray-200">
                    Discover the top Packages in Tanzania
                </p>
            </div>

            {/* Destinations Grid */}
            <Suspense fallback={<p>Loading ... </p>}>
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {packages.map((dest) => (
                        <Link href={`/packages/${dest.id}`} key={dest.id}>
                            <div

                                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer"
                            >
                                <Image
                                    src={dest.image_url ?? "/images/bg.jpg"}
                                    alt={dest?.name}
                                    width={600}
                                    height={400}
                                    unoptimized
                                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />


                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                                    <h3 className="text-white text-xl font-semibold">{dest.name.toString()}</h3>


                                    <p className="text-gray-200 text-sm mt-1">{dest.location}</p>
                                    <h1 className="text-gray-200  font-bold text-5xl mt-1">Includes</h1>

                                    {dest.options.map(e=>(


                                        <div key={e}>
                                         <p className="text-gray-200 text-sm mt-1"><CupSoda />{e}</p>
                                        </div>
                                    ))}
                                  
                                    
                                </div>
                               
                            </div>
                        </Link>

                    ))}
                </div>
            </Suspense>
        </>
    );
}
