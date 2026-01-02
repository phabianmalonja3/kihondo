"use client";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function ShareButtons() {
  return (
    <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-bold mb-6 text-zinc-400 dark:text-zinc-500 text-center uppercase tracking-widest">
        Spread the word
      </h3>
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
          className="p-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:bg-[#1877F2] hover:text-white transition-all"
        >
          <FaFacebookF size={18} />
        </button>

        <button 
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
          className="p-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:bg-[#1877F2] hover:text-white transition-all"
        >
          <FaFacebookF size={18} />
        </button>
        <button 
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
          className="p-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:bg-[#1DA1F2] hover:text-white transition-all"
        >
          <FaInstagram size={18} />
        </button>
      </div>
    </div>
  );
}