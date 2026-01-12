"use client";

import React, { useState, useEffect } from "react";
import Logo from "./logo";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaSearch, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
    const [open, setOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();

    // Close mobile menu or search when route changes
    useEffect(() => {
        setOpen(false);
        setShowSearch(false);
    }, [pathname]);

    const links = [
        { path: "Home", href: "/" },
        { path: "About", href: "/about" },
        { path: "Gallery", href: "/gallery" },
        { path: "Tours", href: "/destinations" },
        { path: "Zanzibar", href: "/packages?package=zanzibar" },
        { path: "Blog", href: "/blog" },
        { path: "Contact", href: "/contact" },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to a search results page or booking check page
        console.log("Searching for:", searchQuery);
        // window.location.href = `/search?q=${searchQuery}`;
    };

    return (
        <>
            {/* 1. TOP MINI-HEADER */}
            <div className="bg-emerald-900 text-white text-[11px] sm:text-xs">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                            <FaEnvelope className="text-emerald-300" />
                            <span className="hidden xs:inline">info@mikumi.co.tz</span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-emerald-700 pl-4">
                            <FaPhone className="text-emerald-300" />
                            <span>+255 746 560 832</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Status Check Link */}
                        <Link href="/booking-status" className="hover:text-emerald-300 transition-colors font-medium">
                            Check Booking Status
                        </Link>
                        <div className="hidden sm:flex items-center gap-3 ml-2">
                            <a href="#" className="hover:text-emerald-300"><FaFacebookF /></a>
                            <a href="#" className="hover:text-emerald-300"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN NAVIGATION */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <Logo />
                            <span className="text-2xl font-bold text-emerald-900 group-hover:text-emerald-700 transition">Mikumi</span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex space-x-1 items-center">
                            {links.map((link, index) => (
                                <Link 
                                    href={link.href} 
                                    key={index} 
                                    className={`px-3 py-2 text-sm font-semibold transition-all hover:text-emerald-700 
                                    ${pathname === link.href 
                                        ? 'text-emerald-800 border-b-2 border-emerald-800' 
                                        : 'text-gray-600'}`}
                                >
                                    {link.path}
                                </Link>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            {/* Search Trigger */}
                            <button 
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
                                aria-label="Toggle Search"
                            >
                                {showSearch ? <FaTimes size={20} /> : <FaSearch size={20} />}
                            </button>

                            <Link href="/packages" className="hidden md:block bg-emerald-900 text-white px-6 py-2.5 rounded-md font-bold hover:bg-emerald-800 transition transform hover:scale-105">
                                Book Now
                            </Link>

                            {/* Mobile Menu Button */}
                            <button 
                                className="lg:hidden p-2 text-emerald-900" 
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <FaTimes size={24} /> : <span className="text-3xl leading-none">☰</span>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. SEARCH OVERLAY (DROPDOWN) */}
                {showSearch && (
                    <div className="absolute top-20 left-0 w-full bg-white border-b-2 border-emerald-900 p-4 shadow-2xl animate-in slide-in-from-top duration-300">
                        <form onSubmit={handleSearch} className="max-w-4xl mx-auto flex items-center gap-3">
                            <div className="relative flex-grow">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    autoFocus
                                    placeholder="Enter Destination, Tour Name, or Booking Reference..." 
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-emerald-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-800 transition">
                                Search
                            </button>
                        </form>
                    </div>
                )}

                {/* 4. MOBILE MENU */}
                {open && (
                    <div className="lg:hidden bg-white border-t overflow-y-auto max-h-screen pb-10">
                        <div className="flex flex-col px-4 py-6 space-y-4">
                            {links.map((link, index) => (
                                <Link 
                                    href={link.href} 
                                    key={index} 
                                    className={`text-lg font-medium py-2 border-b border-gray-50 ${pathname === link.href ? 'text-emerald-800 pl-2 border-l-4 border-emerald-800' : 'text-gray-700'}`}
                                >
                                    {link.path}
                                </Link>
                            ))}
                            <Link 
                                href="/booking-status" 
                                className="text-lg font-medium py-2 text-emerald-600 italic"
                            >
                                Check My Booking
                            </Link>
                            <Link href="/packages" className="bg-emerald-900 text-white px-4 py-4 rounded-xl text-center font-bold text-lg mt-4 shadow-lg">
                                Book Your Trip Now
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Nav;