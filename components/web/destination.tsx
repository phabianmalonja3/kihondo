import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import lion from "@/public/images/lion.jpg"
import Link from 'next/link';


interface Destination{
    image:string,
    name:string,
}
interface Props{
    destinations:Destination[]
}

const Destination = ({destinations}:Props) => {
    return (
       <section className="py-16 px-4 bg-gray-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">Popular Destinations</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div key={dest.name} className="relative h-60 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <Image src={lion.src} alt={dest.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex text-center justify-center items-center pt-6">
          <Link href={"/destinations"}>

            <Button className='bg-emerald-900' > See More</Button>
          </Link>
        </div>
      </section>
    );
}

export default Destination;
