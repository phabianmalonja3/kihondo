"use client";

import { FaCalendarCheck } from "react-icons/fa";
import { BookingStatus,Booking,bookings } from '@/lib/booking';





const statusColors: Record<BookingStatus, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function BookingsPage() {
  return (
    <div className=" min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <FaCalendarCheck className="text-emerald-700 text-3xl" />
             <h2 className="text-xl font-semibold mb-4 text-emerald-900">
          Recent Bookings
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Bookings" value={bookings.length} />
        <StatCard title="Confirmed" value={bookings.filter(b => b.status === "confirmed").length} />
        <StatCard title="Pending" value={bookings.filter(b => b.status === "pending").length} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-emerald-900 bg-white">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{booking.customer}</td>
                <td className="px-6 py-4">{booking.destination}</td>
                <td className="px-6 py-4">{booking.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-emerald-900 mt-2">
        {value}
      </h2>
    </div>
  );
}
