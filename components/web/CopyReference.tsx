"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CopyReference({ reference }: { reference: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    toast.success("Reference copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={handleCopy}
      className="group flex items-center justify-between bg-emerald-50 border border-emerald-100 p-3 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors"
    >
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Booking Reference</span>
        <span className="text-xl font-mono font-bold text-emerald-900">{reference}</span>
      </div>
      <div className="p-2 bg-white rounded-md shadow-sm border border-emerald-200">
        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />}
      </div>
    </div>
  );
}