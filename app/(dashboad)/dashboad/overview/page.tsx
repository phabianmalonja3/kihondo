"use client";

import React from "react";
import { FaUsers, FaMapMarkedAlt, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const stats: StatCard[] = [
  {
    title: "Total Bookings",
    value: "128",
    icon: <FaCalendarCheck />,
  },
  {
    title: "Destinations",
    value: "12",
    icon: <FaMapMarkedAlt />,
  },
  {
    title: "Users",
    value: "86",
    icon: <FaUsers />,
  },
  {
    title: "Revenue",
    value: "$24,500",
    icon: <FaMoneyBillWave />,
  },
];

const recentBookings = [
  { id: 1, name: "John Doe", destination: "Serengeti", date: "2025-01-12", status: "Confirmed" },
  { id: 2, name: "Asha Ali", destination: "Zanzibar", date: "2025-01-15", status: "Pending" },
  { id: 3, name: "Michael Smith", destination: "Kilimanjaro", date: "2025-01-18", status: "Cancelled" },
];

export default function Dashboad() {
  return (
    <div className=" bg-gray-100 p-6">
      {/* Page Title */}
      
      <h1 className="text-3xl font-bold text-emerald-900 mb-6">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 flex items-center gap-4"
          >
            <div className="text-emerald-900 text-3xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}

    </div>
  );
}
