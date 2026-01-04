"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPinOff, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-50 px-4">
      
      {/* Background Decorative Blobs */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-200/50 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

      <div className="z-10 flex flex-col items-center text-center">
        {/* Animated Icon Container */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
          <MapPinOff className="h-12 w-12 text-orange-500 animate-bounce" />
        </div>

        {/* Colorful Heading */}
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Destination <span className="text-orange-600">Not Found</span>
        </h1>
        
        <p className="mb-8 max-w-[450px] text-lg text-slate-600">
          Oops! It looks like your travel compass took a wrong turn. 
          Don't worry, even the best explorers get lost sometimes.
        </p>

        {/* Action Buttons with Colors */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button 
            onClick={() => reset()} 
            className="h-12 bg-orange-600 px-8 text-lg hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all hover:scale-105"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            asChild 
            className="h-12 border-2 border-sky-600 px-8 text-lg text-sky-700 hover:bg-sky-50 transition-all hover:scale-105"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Subtle Help Text */}
        <p className="mt-12 text-sm font-medium text-slate-400">
          Need help? <span className="text-sky-500 cursor-pointer hover:underline">Contact our guides</span>
        </p>
      </div>
    </div>
  );
}