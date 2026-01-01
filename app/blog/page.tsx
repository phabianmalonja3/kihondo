
"use client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import banner from "@/public/contact.jpg"
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  excerpt: string;
  images?: string[] ;
  slug: string;
}


export default function Event() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();

        console.log(data.events);
        setEvents(data.events || []); // assuming Laravel returns { events: [...] }
      } catch (error) {
        toast.error("Failed to fetch events");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);


  return (
    <main className="bg-zinc-50 dark:bg-black min-h-screen font-sans">

      {/* HERO BANNER */}
      

                        <div className="bg-emerald-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Tours & Safaris</h1>
                <p className="mt-3 text-gray-200">
                    Get in touch with us to plan your next unforgettable adventure.
                </p>
            </div>
      {/* BLOG LISTING */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-zinc-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 w-full">
<Image 
  src={(blog?.images && blog.images.length > 0) ? blog.images[0] : "/placeholder.jpg"} 
  alt={blog?.title || "Blog image"} 
  fill 
  unoptimized
  className="object-cover" 
/>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-emerald-900 mb-2">{blog.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{blog.excerpt}</p>
                <Link href={`/blog/${blog.id}`} className=" font-semibold hover:underline bg-emerald-800 text-white px-3 py-2 rounded">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PAGINATION (placeholder) */}
      <section className="py-8 text-center">
        <div className="flex justify-center gap-3">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">Prev</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">1</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">2</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">Next</button>
        </div>
      </section>

    </main>
  );
}
