import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { Metadata } from "next";

interface EventData {
  id: string;
  title: string;
  description: string;
  images: string[];
  category_id: string;
  location: string;
  created_at: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  // Server-side fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound(); // 404 if event not found
  }

  const data = await res.json();
  const event: EventData = data.event;

  if (!event) notFound();

  return (
    <main className="bg-white dark:bg-zinc-950 min-h-screen pb-20">
      {/* Header */}
      <section className="relative h-[40vh] w-full bg-emerald-900 flex items-center justify-center overflow-hidden">
        {event.images?.[0] && (
          <div className="absolute inset-0 opacity-30">
            <Image src={event.images[0]} alt="" fill className="object-cover blur-sm" unoptimized />
          </div>
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight">{event.title}</h1>
          <div className="mt-4 flex items-center justify-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {event.location}</span>
            <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(event.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left */}
        <div className="lg:col-span-2 space-y-10">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">About the Event</h2>
            <div className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
              {event.description}
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.images && event.images.length > 0 ? (
                event.images.map((imgUrl, index) => (
                  <div key={index} className="relative h-72 w-full rounded-2xl overflow-hidden shadow-lg border dark:border-zinc-800 group">
                    <Image src={imgUrl} alt={`${event.title} preview ${index + 1}`} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                ))
              ) : (
                <div className="col-span-2 h-64 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center border-2 border-dashed">
                  <p className="text-zinc-400">No images available for this event</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <aside className="space-y-8">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800">
            <h3 className="text-lg font-bold mb-4">Share Event</h3>
            <div className="flex gap-4">
              <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"><FaFacebookF /></button>
              <button className="p-3 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition"><FaTwitter /></button>
              <button className="p-3 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white rounded-full hover:opacity-90 transition"><FaInstagram /></button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-900 text-white shadow-xl shadow-emerald-900/20">
            <h3 className="text-xl font-bold mb-2">Interested?</h3>
            <p className="text-emerald-100 text-sm mb-6">Contact us to book your spot or get more details about this event.</p>
            <Link href="/contact" className="block w-full py-3 bg-white text-emerald-900 text-center font-bold rounded-xl hover:bg-emerald-50 transition">
              Inquire Now
            </Link>
          </div>

          <Link href="/blog" className="inline-block text-zinc-500 hover:text-emerald-600 transition font-medium">
            ← Back to all events
          </Link>
        </aside>
      </section>
    </main>
  );
}
