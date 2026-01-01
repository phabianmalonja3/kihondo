
"use client"
import TestimonialsSection from "@/components/web/teststmonial";
import { Metadata } from "next";
import Image from "next/image";
import Bg from "@/public/images/team.jpg";
import { motion } from "framer-motion";
import banner from '@/public/contact.jpg';



export default function AboutPage() {

    
  return (
    <main>

     <section className="relative w-full overflow-hidden">

        <div className="bg-emerald-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">About Us</h1>
                <p className="mt-3 text-gray-200">
                    Get in touch with us to plan your next unforgettable adventure.
                </p>
            </div>
            
  

  
</section>
      {/* ABOUT CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              Explore Tanzania is a trusted tourism company offering unforgettable
              safari experiences, cultural tours, and beach holidays across Tanzania.
            </p>
            <p className="text-gray-600">
              From Serengeti wildlife to Zanzibar beaches and Mount Kilimanjaro,
              we connect travelers with nature, culture, and adventure.
            </p>
          </div>

          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src={Bg.src}
              alt="Our Team"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To provide sustainable, authentic, and memorable travel experiences
              while supporting local communities and wildlife conservation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be Tanzania’s leading tourism company, inspiring travelers
              worldwide to explore Africa responsibly.
            </p>
          </div>

        </div>
      </section>
<TestimonialsSection />

      {/* CTA */}
      <section className="bg-emerald-900 text-white py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Explore Tanzania?
        </h2>
        <p className="mb-6">
          Let us plan your next unforgettable adventure.
        </p>
        <a
          href="/tours"
          className="inline-block bg-white text-emerald-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          View Tours
        </a>
      </section>

    </main>
  );
}
