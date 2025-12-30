"use client";

import { useEffect, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";

// 1. Define the Interface based on your Laravel API response
interface Booking {
  id: number;
  user_name: string; // Changed from 'customer' to match your previous booking form
  destination_name: string;
  date_from: string;
  status: "confirmed" | "pending" | "cancelled";
}

const statusColors: Record<Booking["status"], string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        // Replace with your actual Server IP
        const res = await fetch("http://190.179.245.188:8000/api/bookings");
        const data = await res.json();
        
        // Handle Laravel's common data nesting
        setBookings(data.bookings?.data ?? data.bookings ?? []);
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) {
    return <div className="p-20 text-center animate-pulse text-emerald-900">Loading your bookings...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <FaCalendarCheck className="text-emerald-700 text-3xl" />
        <h1 className="text-3xl font-bold text-emerald-900">Bookings Management</h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Bookings" value={bookings.length} />
        <StatCard 
          title="Confirmed" 
          value={bookings.filter(b => b.status === "confirmed").length} 
        />
        <StatCard 
          title="Pending" 
          value={bookings.filter(b => b.status === "pending").length} 
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-emerald-900 text-white">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">{booking.user_name}</td>
                    <td className="px-6 py-4">{booking.destination_name}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.date_from}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                    No bookings found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h2 className="text-3xl font-bold text-emerald-900 mt-2">{value}</h2>
    </div>
  );
}