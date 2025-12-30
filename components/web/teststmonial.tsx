"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TestimonialsSection() {
  const stats = [
    { label: "Happy Clients", value: "2000+" },
    { label: "Tours Completed", value: "150+" },
    { label: "Destinations", value: "20+" },
    { label: "Years Experience", value: "10+" },
  ];

  const testimonials = [
    {
      name: "Alice M.",
      text: "Exploring Tanzania with this team was an unforgettable experience. Highly recommended!",
      image: "/images/client1.jpg",
    },
    {
      name: "John D.",
      text: "Amazing safari and beautiful beaches! Everything was perfectly organized.",
      image: "/images/client2.jpg",
    },
    {
      name: "Fatima S.",
      text: "Professional and friendly guides. Loved every moment of our adventure.",
      image: "/images/client3.jpg",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">

        {/* Happy Clients Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-white shadow rounded-lg p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-3xl font-bold text-emerald-600">{stat.value}</h4>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
          What Our Clients Say
        </h2>

        <div className="flex overflow-x-auto gap-6 scrollbar-hide px-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="flex-none w-80 bg-white shadow-lg rounded-lg p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold text-gray-800">{t.name}</h3>
              </div>
              <p className="text-gray-600">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
