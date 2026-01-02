import Image from "next/image";
import {CarouselPlugin} from "@/components/web/carousel";
import TestimonialsSection from "@/components/web/teststmonial";
import Explore from "@/components/web/explore";
import Destination from "@/components/web/destination";
import { SessionProvider } from "next-auth/react"
import elephant from "@/public/images/el.jpg"
import Link from "next/link";
export default function Home() {


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className=" w-full   py-2 bg-white dark:bg-black">
       <CarouselPlugin />
        
       <Explore />

      <Destination  />

       <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">About Explore Tanzania</h2>
            <p className="text-gray-600 mb-4">
              We are a trusted tourism company providing unforgettable experiences across Tanzania. From wildlife safaris to beach holidays and mountain adventures, we create memories that last a lifetime.
            </p>
            <Link href="/about" className="bg-emerald-900 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition">
              Learn More
            </Link>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src={elephant.src} alt="About us" fill className="object-cover hover:scale-110 transition duration-500" />
          </div>
        </div>
      </section>

       <section className="bg-emerald-900 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore Tanzania?</h2>
        <p className="mb-6">Let us plan your next unforgettable adventure.</p>
        <a href="/tours" className="bg-white text-emerald-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          View Tours
        </a>
      </section>

      <TestimonialsSection />
      </main>
    </div>
  );
}
