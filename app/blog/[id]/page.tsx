import ShareButtons from "@/components/web/ShareButtons";
import { EventSkeleton } from "@/components/web/skeleton";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaArrowLeft,
  FaTag 
} from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}

interface EventData {
  id: string;
  category_id: string | null;
  category?: Category;
  title: string;
  descriptions: string; 
  images: string[];     
  location: string;
  created_at: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

// Fetching Logic
async function getRelatedEvents(categoryId: string | null, currentId: string) {
  if (!categoryId) return [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?category_id=${categoryId}&limit=3&exclude=${currentId}`, 
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || []; 
  } catch (error) {
    return [];
  }
}

// Sub-component for Suspense
async function RelatedEventsList({ categoryId, currentId }: { categoryId: string | null, currentId: string }) {
  const relatedEvents = await getRelatedEvents(categoryId, currentId);

  if (relatedEvents.length === 0) {
    return <p className="text-zinc-500 italic col-span-2">No other events found in this category.</p>;
  }

  return (
    <>
      {relatedEvents.map((item: EventData) => (
        <Link href={`/blog/${item.id}`} key={item.id} className="group block">
          <div className="relative h-64 w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-6 shadow-lg">
            <Image 
              src={item.images?.[0] || "/placeholder.jpg"} 
              alt={item.title} 
              fill 
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {item.category && (
              <div className="absolute top-4 left-4 font-brittany text-white  bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter text-emerald-600">
                {item.category.name}
              </div>
            )}
          </div>
          <h3 className="font-bold text-xl font-brittany text-white text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-3 leading-relaxed">
            {item.descriptions}
          </p>
        </Link>
      ))}
    </>
  );
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();
  const data = await res.json();
  const event: EventData = data.event;
  if (!event) notFound();

  return (
    <main className="bg-white dark:bg-zinc-950 min-h-screen pb-20">
      
      {/* HERO HEADER */}
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
          {event.category && (
            <span className="inline-flex font-brittany text-white items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              <FaTag className="size-2" /> {event.category.name}
            </span>
          )}

          <h1 className=" text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight font-brittany text-white">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-emerald-100/90 font-medium bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 inline-flex">
            <span className="flex items-center gap-2 font-brittany text-white">
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

      {/* CONTENT GRID */}
      <section className="max-w-7xl mx-auto mt-12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-16">
          {/* About */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="flex items-center gap-4 mb-6">
               <h2 className="text-3xl font-bold text-zinc-900 dark:text-white m-0">About the Event</h2>
               <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed text-lg">
              {event.descriptions}
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <h2 className="text-3xl font-bold text-zinc-900 dark:text-white m-0">Event Gallery</h2>
               <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.images && event.images.length > 0 ? (
                event.images.map((imgUrl, index) => (
                  <div key={index} className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 group">
                    <Image src={imgUrl} alt={event.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                  <p className="text-zinc-400">No images shared for this event</p>
                </div>
              )}
            </div>
          </div>

          {/* RELATED POSTS with Suspense */}
          <div className="pt-16 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-10">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <Suspense fallback={<EventSkeleton />}>
                <RelatedEventsList categoryId={event.category_id} currentId={event.id} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}


        <aside className="space-y-8">
          <Link href="/blogs" className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all font-medium">
            <FaArrowLeft size={12} /> View All Events
          </Link>




          <div className="p-8 rounded-[2.5rem] bg-emerald-900 text-white sticky top-10 overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Join the Event</h3>
                <p className="text-emerald-100/80 text-sm mb-8 leading-relaxed">
                  Have questions about this event? Contact our team for booking details.
                </p>
                <Link href="/contact" className="block w-full py-4 bg-white text-emerald-900 text-center font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg">
                  Inquire Now
                </Link>
            </div>

            
          </div>

          {/* Client-side Share Buttons */}
          <ShareButtons />
        </aside>

      </section>
    </main>
  );
}