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
                            <span className="text-xl font-bold text-emerald-900">Mikumi Wildlife Safari</span>
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
                             {links.map((link,index) =>(<Link href={link.href} key={index} className= {`hover:text-emerald-700 font-medium ${pathname === link.href ? ' bg-emerald-800 text-white px-2 hover:text-white py-1 rounded-md ' : " "}`}>{link.path.toString()} {pathname === link.path}</Link>)
                            )}

                            <a href="/booking" className="bg-emerald-700 text-white px-4 py-2 rounded text-center mt-2">Book Now</a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Nav;
