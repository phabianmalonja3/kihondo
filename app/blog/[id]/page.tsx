import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaArrowLeft 
} from "react-icons/fa";

// Interface matching your Laravel Schema
interface EventData {
  id: string;
  category_id: string | null;
  title: string;
  descriptions: string; // From $table->string("descriptions")
  images: string[];     // From $table->json("images")
  location: string;
  created_at: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Fetch Related Events
 * Filters by category_id and excludes the current event ID
 */
async function getRelatedEvents(categoryId: string | null, currentId: string) {
  if (!categoryId) return [];
  
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?category_id=${categoryId}&limit=5`, 
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    // Filter out the current event so it doesn't recommend itself
    return data.events
      .filter((e: EventData) => e.id !== currentId)
      .slice(0, 2); 
  } catch (error) {
    return [];
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  // 1. Fetch Main Event
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const data = await res.json();
  const event: EventData = data.event;

  if (!event) notFound();

  // 2. Fetch Related Events
  const relatedEvents = await getRelatedEvents(event.category_id, event.id);

  return (
    <main className="bg-white dark:bg-zinc-950 min-h-screen pb-20">
      
      {/* --- HERO HEADER --- */}
      <section className="relative h-[45vh] w-full bg-emerald-950 flex items-center justify-center overflow-hidden">
        {event.images?.[0] && (
          <div className="absolute inset-0">
            <Image 
              src={event.images[0]} 
              alt={event.title} 
              fill 
              className="object-cover opacity-40 blur-sm" 
              priority
              unoptimized 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-white mb-4 transition-colors text-sm font-medium"
          >
            <FaArrowLeft className="size-3" /> Back to Events
          </Link>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-emerald-100 font-medium">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-400" /> {event.location}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-emerald-400" /> 
              {new Date(event.created_at).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <section className="max-w-7xl mx-auto mt-12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT: Details & Gallery */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* About Section */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-500 rounded-full" />
              About the Event
            </h2>
            <div className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed mt-6">
              {event.descriptions}
            </div>
          </div>

          {/* Gallery Section - Handling JSON Array */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-500 rounded-full" />
              Event Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.images && event.images.length > 0 ? (
                event.images.map((imgUrl, index) => (
                  <div 
                    key={index} 
                    className="relative h-80 w-full rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 group"
                  >
                    <Image 
                      src={imgUrl} 
                      alt={`${event.title} ${index + 1}`} 
                      fill 
                      unoptimized 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                  <p className="text-zinc-400">No images shared for this event</p>
                </div>
              )}
            </div>
          </div>

          {/* RELATED POSTS SECTION */}
          <div className="pt-12 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Related Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedEvents.length > 0 ? (
                relatedEvents.map((item: EventData) => (
                  <Link href={`/events/${item.id}`} key={item.id} className="group block">
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-4">
                      <Image 
                        src={item.images?.[0] || "/placeholder.jpg"} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                      {item.descriptions}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-zinc-500 italic col-span-2">No other events found in this category.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <aside className="space-y-8">
          {/* Share Card */}
          <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold mb-6 text-zinc-900 dark:text-white text-center">Share with Friends</h3>
            <div className="flex justify-center gap-4">
              <button className="p-4 bg-[#1877F2] text-white rounded-2xl hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <FaFacebookF size={20} />
              </button>
              <button className="p-4 bg-[#1DA1F2] text-white rounded-2xl hover:scale-110 transition-transform shadow-lg shadow-sky-500/20">
                <FaTwitter size={20} />
              </button>
              <button className="p-4 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-2xl hover:scale-110 transition-transform shadow-lg shadow-pink-500/20">
                <FaInstagram size={20} />
              </button>
            </div>
          </div>

          {/* Action Card */}
          <div className="p-8 rounded-3xl bg-emerald-900 text-white shadow-2xl shadow-emerald-900/30 sticky top-10">
            <h3 className="text-2xl font-bold mb-3">Join the Event</h3>
            <p className="text-emerald-100/80 text-sm mb-8 leading-relaxed">
              Have questions about this event? Contact our team for booking details and special requirements.
            </p>
            <Link 
              href="/contact" 
              className="block w-full py-4 bg-white text-emerald-900 text-center font-bold rounded-2xl hover:bg-emerald-50 hover:shadow-xl transition-all active:scale-95"
            >
              Inquire Now
            </Link>
            <p className="text-center text-xs text-emerald-300/60 mt-4 uppercase tracking-widest font-bold">
              limited spots available
            </p>
          </div>
        </aside>

      </section>
    </main>
  );
}