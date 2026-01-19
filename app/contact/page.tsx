// app/contact/page.tsx (Server Component)
import { Metadata } from "next";
import ContactClient from "./contact-client";

// 1. Define Static Metadata for SEO
export const metadata: Metadata = {
  title: "Contact Us | Mikumi Safari's",
  description: "Have questions about our Tanzania safari packages? Get in touch with the Mikumi Safari's team for bookings, travel advice, and custom tours.",
  openGraph: {
    title: "Contact Mikumi Safari's",
    description: "Connect with our safari experts today.",
    images: ["/images/contact-hero.jpg"], // Ensure this path exists in your public folder
  },
};

export default function ContactPage() {
  // 2. The Server renders the SEO tags, then loads the Client Component
  return <ContactClient />;
}