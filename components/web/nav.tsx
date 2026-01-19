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
  FaMapMarkerAlt
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookingStatusModal } from "./booking-status-modal";

/* ---------------- TYPES ---------------- */
interface Package {
  id: string;
  name: string;
  price: string;
  active: boolean | number;
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
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
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

  const allPackages = locations.flatMap((l) =>
    (l.packages || []).map((p) => ({ ...p, locationName: l.name }))
  );

  const searchResults = searchQuery
    ? allPackages.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const tanzania = locations?.filter(l => l.country === "Tanzania" && l.region !== "Zanzibar" && l.region !== "Kilimanjaro") || [];
  const zanzibar = locations?.filter(l => l.region === "Zanzibar") || [];
  const kilimanjaro = locations?.filter(l => l.region === "Kilimanjaro") || [];

  const links = [
    { path: "Home", href: "/" },
    { path: "Tanzania", href: "/destinations", locations: tanzania },
    { path: "Zanzibar", href: "/destinations?region=zanzibar", locations: zanzibar },
    { path: "Kilimanjaro", href: "/destinations?region=kilimanjaro", locations: kilimanjaro },
    { path: "Gallery", href: "/gallery" },
    { path: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* --- TOP BAR --- */}
      <div className="bg-emerald-950 text-white text-[10px] md:text-[11px] py-2.5 relative z-[60]">
        <div className="max-w-7xl mx-auto flex justify-between px-6 items-center">
          <div className="flex gap-4 md:gap-6 items-center opacity-90">
            <span className="flex items-center gap-2 hover:text-emerald-400 cursor-pointer">
              <FaEnvelope className="text-emerald-400" /> info@mikumisafari.co.tzne
            </span>
            <span className="hidden sm:flex items-center gap-2 border-l border-emerald-800/50 pl-4">
              <FaPhone className="text-emerald-400" /> +255 746 560 832
            </span>
          </div>
          <div className="max-w-7xl mx-auto flex justify-between px-6 items-center">
  <div className="flex gap-4 md:gap-6 items-center opacity-90">
    {/* Contact info... */}
  </div>
  
  {/* WRAP THE TRIGGER HERE */}
  <BookingStatusModal>
    <button className="flex items-center gap-2 bg-emerald-900/50 px-3 py-1 rounded-full hover:bg-emerald-800 transition-colors">
      <FaTicketAlt className="text-emerald-400" /> 
      <span className="font-bold uppercase tracking-widest text-[10px]">My Booking</span>
    </button>
  </BookingStatusModal>
</div>
        </div>
      </div>

      {/* --- MAIN NAV --- */}
      <nav className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
         <Link href="/" className="flex items-center gap-2 group">
  <Logo className="group-hover:rotate-12 transition-transform duration-500" />
  <span className="text-4xl font-normal text-emerald-950  lowercase tracking-normal -mt-1" style={{ 
      fontFamily: 'var(--font-brittany), cursive',
      WebkitTextStroke: '0.5px #022c22', // Adds a tiny bit of "weight" using the emerald-950 color
      lineHeight: '1' 
    }}>
    Mikumi Safari
  </span>
</Link>
          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <div 
                key={link.path} 
                className="relative group py-7"
                onMouseEnter={() => {
                    if(link.locations?.length) setActiveLocation(link.locations[0].id);
                }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-[13px] font-extrabold uppercase tracking-tight flex items-center gap-1.5 transition-colors",
                    pathname === link.href ? "text-emerald-700" : "text-slate-600 hover:text-emerald-700"
                  )}
                >
                  {link.path}
                  {link.locations && <FaChevronDown className="text-[9px] opacity-40 group-hover:rotate-180 transition-transform" />}
                </Link>

                {link.locations && link.locations.length > 0 && (
                  <div className="absolute top-[90%] left-0 w-[600px] bg-white shadow-2xl rounded-2xl border border-slate-100 p-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 flex gap-4">
                    <div className="w-1/3 border-r pr-2 space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Locations</p>
                      {link.locations.map((loc) => (
                        <button
                          key={loc.id}
                          onMouseEnter={() => setActiveLocation(loc.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-between",
                            activeLocation === loc.id ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"
                          )}
                        >
                          {loc.name}
                          <FaChevronDown className="-rotate-90 text-[10px] opacity-30" />
                        </button>
                      ))}
                    </div>

                    <div className="w-2/3 pl-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Available Packages</p>
                       <div className="grid gap-1">
                          {link.locations.find(l => l.id === activeLocation)?.packages
                            ?.filter(p => Number(p.active) === 1)
                            .map((pkg) => (
                              <Link 
                                key={pkg.id} 
                                href={`/packages/${pkg.id}`}
                                className="group/item flex items-center justify-between px-3 py-3 rounded-xl hover:bg-emerald-600 transition-all"
                              >
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-700 group-hover/item:text-white">{pkg.name}</span>
                                  <span className="text-[10px] text-emerald-600 group-hover/item:text-emerald-100 font-bold uppercase">From ${pkg.price}</span>
                                </div>
                                <FaArrowRight className="text-white text-xs opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                              </Link>
                          ))}
                       </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowSearch(true)} className="p-3 text-slate-600 hover:bg-slate-100 rounded-full transition-transform active:scale-90">
              <FaSearch size={18} />
            </button>
            <Link href="/packages" className="hidden md:block bg-emerald-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-800">
              Book Now
            </Link>
            <button className="lg:hidden text-2xl text-emerald-950 ml-2" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <div className={cn("fixed inset-0 bg-white z-[90] transition-all duration-500 lg:hidden flex flex-col pt-24", open ? "translate-x-0" : "translate-x-full")}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {links.map((link) => (
            <div key={link.path} className="border-b border-slate-50 pb-4">
              <div 
                className="flex justify-between items-center py-2"
                onClick={() => link.locations ? setActiveSubmenu(activeSubmenu === link.path ? null : link.path) : setOpen(false)}
              >
                <span className="font-black text-slate-800 uppercase text-2xl tracking-tighter">
                  {link.locations ? link.path : <Link href={link.href}>{link.path}</Link>}
                </span>
                {link.locations && <FaChevronDown className={cn("transition-transform", activeSubmenu === link.path && "rotate-180")} />}
              </div>

              {link.locations && activeSubmenu === link.path && (
                <div className="mt-4 space-y-4 pl-4 border-l-2 border-emerald-50">
                  {link.locations.map((loc) => (
                    <div key={loc.id}>
                      <button 
                        onClick={() => setActiveLocation(activeLocation === loc.id ? null : loc.id)}
                        className="flex items-center gap-2 font-bold text-emerald-800 uppercase text-sm"
                      >
                        <FaMapMarkerAlt size={10} /> {loc.name}
                      </button>
                      
                      {activeLocation === loc.id && (
                        <div className="mt-2 grid gap-2 pl-4">
                          {loc.packages?.filter(p => Number(p.active) === 1).map((pkg) => (
                            <Link 
                              key={pkg.id} 
                              href={`/packages/${pkg.id}`}
                              onClick={() => setOpen(false)}
                              className="bg-slate-50 p-3 rounded-lg flex justify-between items-center"
                            >
                              <span className="text-sm font-medium">{pkg.name}</span>
                              <span className="text-xs font-bold text-emerald-700">${pkg.price}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- SEARCH OVERLAY (RESTORED) --- */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-6">
          <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xl animate-in fade-in" onClick={() => setShowSearch(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-top-10">
            <div className="p-6 border-b flex items-center gap-4">
              <FaSearch className="text-slate-400" />
              <input 
                ref={searchInputRef} 
                type="text" 
                placeholder="Where do you want to go?" 
                className="flex-1 outline-none text-lg font-medium" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <button onClick={() => setShowSearch(false)} className="p-2 hover:bg-slate-100 rounded-full"><FaTimes /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {searchQuery !== "" && searchResults.length > 0 ? (
                searchResults.map((pkg) => (
                  <Link key={pkg.id} href={`/packages/${pkg.id}`} className="flex items-center justify-between p-4 hover:bg-emerald-50 rounded-2xl transition-all">
                    <div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase block">{pkg.locationName}</span>
                      <span className="font-bold text-slate-800">{pkg.name}</span>
                    </div>
                    <span className="font-black text-emerald-900">${pkg.price}</span>
                  </Link>
                ))
              ) : (
                <p className="text-center py-10 text-slate-400">{searchQuery === "" ? "Type to search..." : "No results found."}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;