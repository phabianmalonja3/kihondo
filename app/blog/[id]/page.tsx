"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { Metadata } from "next";

// export const metadata:Metadata={
//     title:"About Us | Kihondo"
// }


export default function BlogPost() {

    const blog = {
        title: "Top 10 Safari Destinations in Tanzania",
        image: "/images/blog1.jpg",
        content: `
Tanzania is home to some of the most amazing safari destinations in Africa. From the vast plains of the Serengeti to the stunning Ngorongoro Crater, wildlife enthusiasts will find plenty to explore. This guide will help you choose the perfect safari adventure, with tips on wildlife spotting, accommodations, and travel planning.

Discover breathtaking landscapes, majestic wildlife, and unforgettable experiences in the heart of Africa.
    `,
        author: "Admin",
        date: "Dec 28, 2025",
        tags: ["Safari", "Wildlife", "Tanzania"]
    };

    const relatedPosts = [
        { title: "Zanzibar: Beaches & Culture", slug: "zanzibar-beaches", image: "/images/zanzibar.jpg" },
        { title: "Climb Mount Kilimanjaro", slug: "kilimanjaro-climb", image: "/images/kilimanjaro.jpg" },
        { title: "Ngorongoro Crater Safari Tips", slug: "ngorongoro-safari", image: "/images/ngorongoro.jpg" }
    ];

    const comments = [
        { name: "John Doe", text: "This is an amazing guide, very helpful!" },
        { name: "Jane Smith", text: "I loved the safari tips. Can't wait to visit Tanzania!" }
    ];

    return (
        <main className="bg-zinc-50 dark:bg-black min-h-screen font-sans">

            {/* Hero Banner */}
            <section className="relative h-64 w-full bg-emerald-900 flex items-center justify-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-4xl md:text-5xl font-bold"
                >
                    {blog.title}
                </motion.h1>
            </section>

            {/* Blog Content */}
            <section className="max-w-4xl mx-auto py-16 px-4 space-y-8">

                {/* Blog Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full h-80 rounded-lg overflow-hidden shadow"
                >
                    <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                </motion.div>

                {/* Metadata */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-600 dark:text-gray-300 text-sm"
                >
                    <span>By {blog.author}</span>
                    <span>{blog.date}</span>
                </motion.div>

                {/* Blog Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="prose dark:prose-invert max-w-full"
                >
                    {blog.content.split("\n").map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </motion.div>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                >
                    {blog.tags.map((tag, i) => (
                        <span key={i} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Social Share */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 mt-4"
                >
                    <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebookF size={24} /></a>
                    <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
                    <a href="#" className="text-pink-600 hover:text-pink-800"><FaInstagram size={24} /></a>
                </motion.div>

                {/* Related Posts */}
                <div>
                    <h2 className="text-2xl font-bold text-emerald-900 mb-4">Related Posts</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {relatedPosts.map((r) => (
                            <Link href={`/blog/${r.slug}`} key={r.slug} className="flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg transition">
                                <div className="relative h-40 w-full">
                                    <Image src={r.image} alt={r.title} fill className="object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-emerald-900">{r.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-emerald-900 mb-4">Comments</h2>
                    <div className="space-y-4">
                        {comments.map((c, i) => (
                            <div key={i} className="p-4 bg-white dark:bg-zinc-800 rounded shadow">
                                <p className="font-semibold">{c.name}</p>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </main>
    );
}
