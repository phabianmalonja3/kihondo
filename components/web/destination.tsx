"use client"

import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

// 1. Define the shape of a single destination
interface DestinationType {
  id: string | number;
  image_url: string;
  name: string;
}

// 2. Define the Props interface that the component expects
interface DestinationProps {
  destinations: DestinationType[];
}

// 3. Pass the props to the function
const Destination = ({ destinations }: DestinationProps) => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
          Popular Destinations
        </h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Ensure destinations is an array before mapping to avoid crashes */}
          {destinations?.map((dest) => (
            <div key={dest.id} className="relative h-60 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <Link href={`/destinations/${dest.id}`}>
                <Image 
                  src={dest.image_url} 
                  alt={dest.name} 
                  unoptimized 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex text-center justify-center items-center pt-6">
        <Link href="/destinations">
          <Button className='bg-emerald-900'>See More</Button>
        </Link>
      </div>
    </section>
  );
}

export default Destination;