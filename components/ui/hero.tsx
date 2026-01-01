"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  height?: string; // Optional: allow different heights like h-[40vh] or h-[60vh]
}

export default function Hero({ title, subtitle, image, height = "h-[60vh]" }: HeroProps) {
  return (
    <section className={`relative ${height} w-full overflow-hidden`}>
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />

      {/* The Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-emerald-50 mt-4 text-lg md:text-xl max-w-2xl font-light"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}