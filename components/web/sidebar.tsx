"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaMapMarkedAlt,
  FaImages,
  FaUsers,
  FaSignOutAlt,
  FaStar,
  FaChartArea,
  FaBox,
  FaArchive,
  FaSuitcaseRolling,
  FaGifts,
  FaBoxes,
} from "react-icons/fa";
import { LogoutDialog } from "./logout";

const menuItems = [
  {
    name: "OverView",
    href: "/dashboad/overview",
    icon: <FaChartArea />,
  },
  {
    name: "Dashboad",
    href: "/dashboad",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Bookings",
    href: "/dashboad/bookings",
    icon: <FaCalendarCheck />,
  },
  {
    name: "Destinations",
    href: "/dashboad/destinations",
    icon: <FaMapMarkedAlt />,
  },
  {
    name: "Gallery",
    href: "/dashboad/gallery",
    icon: <FaImages />,
  },
  {
    name: "Heroes",
    href: "/dashboad/heroes",
    icon: <FaStar />,
  },

  {
    name: "Events",               // ✅ New item
    href: "/dashboad/events",      // Set the URL
    icon: <FaCalendarCheck />,     // You can reuse Calendar icon or pick another
  },
  {
    name: "Packages",               // ✅ New item
    href: "/dashboad/packages",      // Set the URL
    icon: <FaBoxes />,     // You can reuse Calendar icon or pick another
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-emerald-900 text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 text-2xl font-bold border-b border-emerald-800">
        Explore Tanzania
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
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
      <div className="px-4 py-6 border-t border-emerald-800 ">
        {/* <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-emerald-100 hover:bg-emerald-800 transition"> */}
          {/* <FaSignOutAlt /> */}
          <LogoutDialog />
        {/* </button> */}
      </div>
    </aside>
  );
}
