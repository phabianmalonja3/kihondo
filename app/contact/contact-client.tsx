"use client";

import Image from 'next/image';
import React, { Suspense, useState } from 'react';
import banner from "@/public/contact.jpg";

import { FaFacebookF, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapLoader } from './maploader';

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ContactClient = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    alert("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main>
      {/* Header Banner */}
      <section className="relative h-[60vh] w-full bg-cover">
        <Image
          src={banner.src}
          alt="About Explore Tanzania"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">About Us</h1>
        </div>
      </section>

      {/* CONTACT FORM + INFO + MAP */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {/* CONTACT FORM */}
          <div className="bg-white shadow rounded-lg p-8 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <p>Email: info@mikumiwildlifesafari.co.tz</p>
              <p>Phone: +255 (0)746 560 832</p>
              <p>Address: Mikumi, Morogoro</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex items-center gap-4">
                <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebookF size={24} /></a>
                <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
                <a href="#" className="text-pink-600 hover:text-pink-800"><FaInstagram size={24} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-emerald-900 text-center">Mikumi National Park</h3>
          <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Suspense fallback={<MapLoader />}>
              <MapContainer
              center={[-7.9167, 36.8500]}
              zoom={10}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[-7.9167, 36.8500]}>
                <Popup>Mikumi National Park</Popup>
              </Marker>
            </MapContainer>
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactClient;
