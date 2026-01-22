import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import localFont from 'next/font/local'
 

import "./globals.css";
import Nav from "@/components/web/nav";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/web/footer";

import { SessionProvider } from "next-auth/react"
import WrapNav from "@/components/web/wrapLayout";
import { Toaster } from "@/components/ui/sonner";
import FooterLayout from "@/components/web/footer-layout";
import { FloatingSocials } from "@/components/web/floating-social";


export const metadata: Metadata = {
  title: "Mikumi Safari's | Discover the Heart of Tanzania",
  description: "Book your ultimate adventure with Mikumi Safari's. Experience wildlife tours, luxury stays, and seamless voucher management for an unforgettable Tanzanian safari.",
  
  // ADD THIS SECTION:
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_ID_HERE", 
  },
  
  // Optional but recommended for 2026:
  alternates: {
    canonical: "https://mikumisafaris.com", // Replace with your real domain
  },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const myFont = localFont({
  src: '../public/fonts/BrittanySignature.ttf', // Adjust path to your file
  variable: '--font-brittany',
})
export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (

    <html lang="en" className={`${myFont.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <WrapNav />
        

        {children}
<FooterLayout />
<Toaster position="top-center" richColors />
<FloatingSocials />
      </body>
    </html>
  );
}
