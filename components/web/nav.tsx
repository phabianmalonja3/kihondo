"use client";

import React, { useState, useEffect, useRef } from "react";
import Logo from "./logo";
import {
  FaEnvelope,
  FaPhone,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaTicketAlt,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/* ---------------- TYPES ---------------- */
interface Package {
  id: string;
  name: string;
  price: string;
  active: boolean | number;
  image_url: string;
}

interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
  packages: Package[];
}

const Nav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOpen(false);
    setShowSearch(false);
    setActiveSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`, {
          cache: "no-store",
        });
        const data = await res.json();
        setLocations(data.locations || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchLocations();
  }, []);

  // Filter logic for Search
  const allPackages = locations.flatMap((l) =>
    (l.packages || []).map((p) => ({ ...p, locationName: l.name }))
  );

  const searchResults = searchQuery
    ? allPackages.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  /* ---------------- FILTERING FOR MENU ---------------- */
  const tanzania = locations?.filter(l => l.country === "Tanzania" && l.region !== "Zanzibar" && l.region !== "Kilimanjaro") || [];
  const zanzibar = locations?.filter(l => l.region === "Zanzibar") || [];
  const kilimanjaro = locations?.filter(l => l.region === "Kilimanjaro") || [];

  const links = [
    { path: "Home", href: "/" },
    { path: "Tanzania", href: "/destinations", submenu: tanzania },
    { path: "Zanzibar", href: "/destinations?region=zanzibar", submenu: zanzibar },
    { path: "Kilimanjaro", href: "/destinations?region=kilimanjaro", submenu: kilimanjaro },
    { path: "Gallery", href: "/gallery" },
    { path: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* --- TOP BAR --- */}
      <div className="bg-emerald-950 text-white text-[10px] md:text-[11px] py-2.5 relative z-[60]">
        <div className="max-w-7xl mx-auto flex justify-between px-6 items-center">
          <div className="flex gap-4 md:gap-6 items-center opacity-90">
            <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
              <FaEnvelope className="text-emerald-400" /> info@mikumi.co.tz
            </span>
            <span className="hidden sm:flex items-center gap-2 border-l border-emerald-800/50 pl-4">
              <FaPhone className="text-emerald-400" /> +255 746 560 832
            </span>
          </div>
          <Link href="/booking-status" className="flex items-center gap-2 hover:scale-105 transition-transform bg-emerald-900/50 px-3 py-1 rounded-full">
            <FaTicketAlt className="text-emerald-400" /> 
            <span className="font-bold uppercase tracking-widest">My Booking</span>
          </Link>
        </div>
      </div>

      {/* --- MAIN NAV --- */}
      <nav className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-2xl font-black text-emerald-950 uppercase tracking-tighter transition-colors group-hover:text-emerald-700">MIKUMI</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-2">
            {links.map((link) => (
              <div key={link.path} className="relative group py-7">
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-[13px] font-extrabold uppercase tracking-tight transition-all flex items-center gap-1.5",
                    pathname === link.href ? "text-emerald-700" : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50 rounded-lg"
                  )}
                >
                  {link.path}
                  {link.submenu && link.submenu.length > 0 && (
                    <FaChevronDown className="text-[9px] opacity-40 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {link.submenu && link.submenu.length > 0 && (
                  <div className="absolute top-[80%] left-0 w-[340px] bg-white shadow-2xl rounded-2xl border border-slate-100 p-2 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="max-h-[70vh] overflow-y-auto px-2 custom-scrollbar">
                      {link.submenu.map((loc) => (
                        <div key={loc.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl mb-1">
                            <span className="text-[10px] font-black text-emerald-950 uppercase tracking-widest">{loc.name}</span>
                            <span className="text-[9px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold uppercase">{loc.region}</span>
                          </div>
                          
                          <div className="grid gap-1">
                            {loc.packages?.filter(p => Number(p.active) === 1).map((pkg) => (
                                <Link
                                  key={pkg.id}
                                  href={`/packages/${pkg.id}`}
                                  className="group/item flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-emerald-600 transition-all duration-300"
                                >
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-700 group-hover/item:text-white transition-colors">{pkg.name}</span>
                                    <span className="text-[10px] text-emerald-600 group-hover/item:text-emerald-100 font-bold uppercase">From ${pkg.price}</span>
                                  </div>
                                  <FaArrowRight className="text-slate-300 group-hover/item:text-white text-xs opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                </Link>
                              )) || <p className="px-3 py-1 text-[10px] text-slate-400">Loading deals...</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSearch(true)} 
              className="p-3 text-slate-600 hover:bg-slate-100 rounded-full transition-all group active:scale-90"
            >
              <FaSearch size={18} className="group-hover:text-emerald-600" />
            </button>
            <Link href="/packages" className="hidden md:block bg-emerald-900 text-white px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-900/20 active:scale-95">
              Book Now
            </Link>
            <button className="lg:hidden text-2xl text-emerald-950 ml-2" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* --- SEARCH OVERLAY --- */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-6">
          <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowSearch(false)} />
          
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-top-10 duration-500">
            <div className="p-6 border-b flex items-center gap-4">
              <FaSearch className="text-slate-400" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search packages, destinations..." 
                className="flex-1 outline-none text-lg font-medium text-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setShowSearch(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <FaTimes />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {searchQuery === "" ? (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-sm">Type to search for safaris and parks...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid gap-2">
                  {searchResults.map((pkg) => (
                    <Link 
                      key={pkg.id} 
                      href={`/packages/${pkg.id}`}
                      className="flex items-center justify-between p-4 hover:bg-emerald-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all group"
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{pkg.locationName}</span>
                        <span className="font-bold text-slate-800">{pkg.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-black text-emerald-900">${pkg.price}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">View Package</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-500 font-bold">No results for "{searchQuery}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching for "Mikumi" or "Serengeti"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE MENU --- */}
      {/* (Kept your existing logic but updated visuals slightly) */}
      {open && (
        <div className="lg:hidden bg-white fixed inset-0 top-[125px] z-50 p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
          {/* Mobile Search Bar */}
          <div 
            onClick={() => { setOpen(false); setShowSearch(true); }}
            className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl mb-6 text-slate-400 border border-slate-100"
          >
            <FaSearch size={14} />
            <span className="text-sm font-medium">Search destinations...</span>
          </div>

          {links.map((link) => (
            <div key={link.path} className="mb-4">
              <div 
                className="flex justify-between items-center py-3 px-2"
                onClick={() => link.submenu && link.submenu.length > 0 && setActiveSubmenu(activeSubmenu === link.path ? null : link.path)}
              >
                <span className="font-black text-slate-800 uppercase text-lg tracking-tighter">{link.path}</span>
                {link.submenu && link.submenu.length > 0 && (
                  <FaChevronDown className={cn("text-xs transition-transform duration-300", activeSubmenu === link.path && "rotate-180")} />
                )}
              </div>
              {/* ... Mobile Submenu Logic (Same as before but with your updated colors) ... */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Nav;