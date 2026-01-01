"use client";

import React, { useState } from "react"; // Added useState
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile toggle
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaMapMarkedAlt,
  FaImages,
  FaStar,
  FaChartArea,
  FaBoxes,
} from "react-icons/fa";
import { LogoutDialog } from "./logout";

const menuItems = [
  { name: "OverView", href: "/dashboad/overview", icon: <FaChartArea /> },
  { name: "Dashboad", href: "/dashboad", icon: <FaTachometerAlt /> },
  { name: "Bookings", href: "/dashboad/bookings", icon: <FaCalendarCheck /> },
  { name: "Destinations", href: "/dashboad/destinations", icon: <FaMapMarkedAlt /> },
  { name: "Gallery", href: "/dashboad/gallery", icon: <FaImages /> },
  { name: "Heroes", href: "/dashboad/heroes", icon: <FaStar /> },
  { name: "Events", href: "/dashboad/events", icon: <FaCalendarCheck /> },
  { name: "Packages", href: "/dashboad/packages", icon: <FaBoxes /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Mobile state

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* MOBILE TOP BAR (Visible only on small screens) */}
      <div className="lg:hidden flex items-center justify-between bg-emerald-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <span className="font-bold">Explore Tanzania</span>
        <button onClick={toggleSidebar} className="p-2 bg-emerald-800 rounded-md">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY (Closes sidebar when clicking outside on mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR ASIDE */}
      <aside 
        className={`fixed left-0 top-0 h-screen w-64 bg-emerald-900 text-white flex flex-col z-50 transition-transform duration-300 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`} // Shows by default on desktop
      >
        {/* Logo */}
        <div className="px-6 py-6 text-2xl font-bold border-b border-emerald-800 flex justify-between items-center">
          <span>Explore Tanzania</span>
          {/* Close button inside sidebar for mobile */}
          <button className="lg:hidden" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // Close sidebar when link is clicked
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${
                    isActive
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-800"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-emerald-800">
          <LogoutDialog />
        </div>
      </aside>
    </>
  );
}