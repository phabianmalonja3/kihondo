"use client";

import React, { useState } from "react";
import Logo from "./logo";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";
import Link from "next/link";
import Links from './links';
import { usePathname } from "next/navigation";

const Nav = () => {
    const [open, setOpen] = useState(false);
    const [mobileDestOpen, setMobileDestOpen] = useState(false);
    const [mobilePackageOpen, setMobilePackageOpen] = useState(false);

    const pathname = usePathname()

    const links = [

        {
            path: "Home",
            href: "/"
        },

        {
            path: "About",
            href: "/about"
        },

        {
            path: "Gallery",
            href: "/gallery"
        },

        {
            path: "Destinations",
            href: "/destinations"
        },

        {
            path: "Packages",
            href: "/packages"
        },

        {
            path: "Blog",
            href: "/blog"
        },
        {
            path: "Contact",
            href: "/contact"
        },
    ]

    return (
        <>


            {/* TOP HEADER */}
            <div className="bg-emerald-900 text-white text-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <FaEnvelope className=" text-white" />
                            <span>Email: info@mikumiwildlifesafari.co.tz</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPhone className=" text-white" />
                            <span className="hidden sm:inline">Phone: +255 (0)746 560 832</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            {/* MAIN NAV */}
            <nav className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <Link href={"/"} className="flex items-center gap-2">
                            <Logo />
                            <span className="text-xl font-bold text-emerald-900">Mikumi Wildlife experiance Safari</span>
                        </Link>
                        {/* Desktop Links */}
                        <div className="hidden md:flex space-x-6 items-center">

                            {links.map((link,index) =>(<Link href={link.href} key={index} className= {`hover:text-emerald-700 font-medium ${pathname === link.href ? ' bg-emerald-800 text-white px-2 hover:text-white py-1 rounded-md ' : " "}`}>{link.path.toString()} {pathname === link.path}</Link>)
                            )}

                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:block">
                            <Link href="/booking" className="bg-emerald-900 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">
                                Book Now
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setOpen(!open)}>
                            {open ? "✕" : "☰"}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {open && (
                    <div className="md:hidden bg-white border-t">
                        <div className="flex flex-col px-4 py-4 space-y-2">
                            <Link href="/" className={`hover:text-emerald-700 font-medium transition-all duration-300 ease-in-out ${pathname === '/' ? ' bg-emerald-600 text-white px-2 hover:text-white py-1 rounded-md ' : " "}`}>Home</Link>

                            <Link href={"/destinations"} className={`hover:text-emerald-700 font-medium ${pathname === '/destinations' ? ' bg-emerald-600 text-white px-2 py-1 rounded-md hover:text-white' : " "}`}></Link>
                            <Link href="/about" className={`hover:text-emerald-700 font-medium ${pathname === '/about' ? ' bg-emerald-600 text-white px-2 py-1 rounded-md hover:text-white' : " "}`}>About</Link>

                            {/* Mobile Destinations */}
                            <div>
                                <button
                                    onClick={() => setMobileDestOpen(!mobileDestOpen)}
                                    className="flex justify-between w-full  py-2 font-medium hover:bg-emerald-50 rounded"
                                >
                                    Destinations
                                </button>
                                {mobileDestOpen && (
                                    <div className="absolute hidden group-hover:block top-full left-0 mt-2 w-48 bg-white border  shadow-xl">
                                        <Link href="/destinations/safari" className="block px-4 py-2 border-b-2 hover:bg-emerald-50">Safari</Link>
                                        <Link href="/destinations/zanzibar" className="block px-4 py-2 border-b-2 hover:bg-emerald-50">Zanzibar</Link>
                                        <Link href="/destinations/kilimanjaro" className="block px-4 py-2 hover:bg-emerald-50">Kilimanjaro</Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Packages */}
                            <div>
                                <button
                                    onClick={() => setMobilePackageOpen(!mobilePackageOpen)}
                                    className="flex justify-between w-full  py-2 font-medium hover:bg-emerald-50 rounded"
                                >
                                    Packages
                                </button>
                                {mobilePackageOpen && (
                                    <div className="pl-4 mt-1 flex flex-col space-y-1">
                                        <Link href="/packages/family" className="block px-4 py-2 border-2 hover:bg-emerald-50">Family Package</Link>
                                        <Link href="/packages/honeymoon" className="block px-4 py-2 border-b-2 hover:bg-emerald-50">Honeymoon Package</Link>
                                        <Link href="/packages/adventure" className="block px-4 py-2 hover:bg-emerald-50">Adventure Package</Link>
                                    </div>
                                )}
                            </div>

                            <Link href="/blog">Blog</Link>
                            <Link href="/contact">Contact</Link>

                            <a href="/booking" className="bg-emerald-700 text-white px-4 py-2 rounded text-center mt-2">Book Now</a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Nav;
