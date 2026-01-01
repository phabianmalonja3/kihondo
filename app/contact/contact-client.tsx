"use client";

import Image from "next/image";
import React, { useState } from "react";
import banner from "@/public/contact.jpg";
import { FaFacebookF, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";
import dynamic from "next/dynamic";
import Hero from "@/components/ui/hero";

// Leaflet dynamically imported to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactClient() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // For now, just show success message
      setMessage("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <>
   
      <div className="bg-emerald-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <p className="mt-3 text-gray-200">
                    Get in touch with us to plan your next unforgettable adventure.
                </p>
            </div>
      {/* CONTACT FORM + INFO + MAP */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {/* CONTACT FORM */}
          <div className="bg-white shadow rounded-lg p-8 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" required />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" required />
              <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" required />
              <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} rows={5}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" required></textarea>
              <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition font-semibold">
                Send Message
              </button>
            </form>
            {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
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
          
            {/* MAP */}
           
        </div>
         {/* <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <MapContainer center={[-6.85, 37.65]} zoom={13} scrollWheelZoom={false} className="h-64 w-full rounded-lg">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[-6.85, 37.65]}>
                  <Popup>We are here!</Popup>
                </Marker>
              </MapContainer>
            </div> */}
      </section>
    </>
   
  );
}
