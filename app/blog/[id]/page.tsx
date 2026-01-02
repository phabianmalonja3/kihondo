import { Skeleton } from "@/components/ui/skeleton";
import { EventSkeleton } from "@/components/web/skeleton";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, useState } from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaArrowLeft,
  FaTag 
} from "react-icons/fa";

// Updated Interfaces to handle Eager Loading
interface Category {
  id: string;
  name: string;
}

interface EventData {
  id: string;
  category_id: string | null;
  category?: Category; // Eager-loaded from Laravel with(['category'])
  title: string;
  descriptions: string; 
  images: string[];     
  location: string;
  created_at: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Fetch Related Events
 * Uses the updated Laravel logic: filtering by category and excluding current ID
 */
async function getRelatedEvents(categoryId: string | null, currentId: string) {

  const [loading,setLoading]= useState<boolean>(true)
  if (!categoryId) return [];
  
  try {
    // Note: We add &exclude to use the logic we added to your Laravel Controller
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?category_id=${categoryId}&limit=3&exclude=${currentId}`, 
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.events; 
  } catch (error) {
    return [];
  }finally{
    setLoading(false)
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  // 1. Fetch Main Event (Ensure your Laravel show method also uses ->with('category'))
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
      <section className="relative h-[50vh] w-full bg-emerald-950 flex items-center justify-center overflow-hidden">
        {event.images?.[0] && (
          <div className="absolute inset-0">
            <Image 
              src={event.images[0]} 
              alt={event.title} 
              fill 
              className="object-cover opacity-30 blur-[2px]" 
              priority
              unoptimized 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          {/* Category Badge */}
          {event.category && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              <FaTag className="size-2" /> {event.category.name}
            </span>
          )}

          <h1 className="text-white text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-emerald-100/90 font-medium bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 inline-flex">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-400" /> {event.location}
            </span>
            <span className="hidden md:block text-white/20">|</span>
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
        <div className="lg:col-span-2 space-y-16">
          
          {/* About Section */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="flex items-center gap-4 mb-6">
               <h2 className="text-3xl font-bold text-zinc-900 dark:text-white m-0">About the Event</h2>
               <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed text-lg">
              {event.descriptions}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <h2 className="text-3xl font-bold text-zinc-900 dark:text-white m-0">Event Gallery</h2>
               <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.images && event.images.length > 0 ? (
                event.images.map((imgUrl, index) => (
                  <div 
                    key={index} 
                    className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 group"
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
                <div className="col-span-2 py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                  <p className="text-zinc-400">No images shared for this event</p>
                </div>
              )}
            </div>
          </div>

          {/* RELATED POSTS SECTION */}
          <div className="pt-16 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-10">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">


              <Suspense fallback={<EventSkeleton />}>
                {relatedEvents.length > 0 ? (
                relatedEvents.map((item: EventData) => (
                  <Link href={`/events/${item.id}`} key={item.id} className="group block">
                    <div className="relative h-64 w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-6 shadow-lg">
                      <Image 
                        src={item.images?.[0] || "/placeholder.jpg"} 
                        alt={item.title} 
                        fill 
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.category && (
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter text-emerald-600">
                          {item.category.name}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-3 leading-relaxed">
                      {item.descriptions}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-zinc-500 italic col-span-2">No other events found in this category.</p>
              )}
            </Suspense>
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <aside className="space-y-8">
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all font-medium"
          >
            <FaArrowLeft size={12} /> View All Events
          </Link>

          {/* Action Card */}
          <div className="p-8 rounded-[2.5rem] bg-emerald-900 text-white shadow-2xl shadow-emerald-950/40 sticky top-10 overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Join the Event</h3>
                <p className="text-emerald-100/80 text-sm mb-8 leading-relaxed">
                Have questions about this event? Contact our team for booking details and special requirements.
                </p>
                <Link 
                href="/contact" 
                className="block w-full py-4 bg-white text-emerald-900 text-center font-bold rounded-2xl hover:bg-emerald-50 hover:shadow-xl transition-all active:scale-95 shadow-lg"
                >
                Inquire Now
                </Link>
                <p className="text-center text-[10px] text-emerald-300/50 mt-6 uppercase tracking-[0.2em] font-black">
                Secure your spot today
                </p>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-800 rounded-full blur-3xl opacity-50" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20" />
          </div>

          {/* Share Card */}
          <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold mb-6 text-zinc-400 dark:text-zinc-500 text-center uppercase tracking-widest">Spread the word</h3>
            <div className="flex justify-center gap-4">
              <button className="p-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:bg-[#1877F2] hover:text-white transition-all">
                <FaFacebookF size={18} />
              </button>
              <button className="p-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:bg-[#1DA1F2] hover:text-white transition-all">
                <FaTwitter size={18} />
              </button>
              <button className="p-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all">
                <FaInstagram size={18} />
              </button>
            </div>
          </div>
        </aside>

      </section>
    </main>
  );


}