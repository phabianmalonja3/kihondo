"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertTriangle className="w-16 h-16 text-red-600" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Something went wrong!
      </h1>
      
      <p className="text-gray-600 max-w-md mb-8">
        We encountered an unexpected error while loading the safari packages. 
        This might be a temporary connection issue.
      </p>

      {/* Technical Debug Info (Visible only in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="w-full max-w-2xl mb-8 text-left">
          <p className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">
            Debug Info:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-40">
            <pre className="text-pink-400 text-xs font-mono">
              {error.message || "Unknown error"}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => reset()} // Attempt to recover by re-rendering the segment
          className="bg-emerald-900 hover:bg-emerald-800 text-white px-8 h-12 flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>

        <Link href="/">
          <Button
            variant="outline"
            className="border-emerald-900 text-emerald-900 hover:bg-emerald-50 px-8 h-12 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}