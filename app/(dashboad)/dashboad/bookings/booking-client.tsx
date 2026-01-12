"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { 
  FaCalendarCheck, 
  FaEnvelope, 
  FaChevronLeft, 
  FaChevronRight, 

  FaCheck,
  FaTimes,
  FaEllipsisV, FaSpinner
//   FaLoader
} from "react-icons/fa";
import { Loader2, MoreVertical } from "lucide-react";

// Shadcn Components (Ensure these are installed)
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"; // Recommended toast library

interface PaginationProps {
  bookings: {
    data: any[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

export default function BookingClient({ bookings }: PaginationProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error();

      toast.success(`Booking ${newStatus}`);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      router.push(`/dashboard/bookings?page=${page}`);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
            <FaCalendarCheck className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Booking Management</h2>
            <p className="text-slate-500 text-sm">Review and manage incoming travel requests</p>
          </div>
        </div>
        {/* {isPending && <FaLoader className="animate-spin text-emerald-600" />} */}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Travel Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Guests</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Paid</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.data.map((booking) => {
                const counts = booking.guest_counts || {};
                const totalGuests = Number(counts.adults || 0) + Number(counts.youth || 0) + Number(counts.children || 0);

                return (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 leading-none mb-1">
                        {booking.first_name} {booking.last_name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <FaEnvelope className="text-[10px]" /> {booking.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {booking.travel_date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{totalGuests} Total</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {counts.adults}A · {counts.youth}Y · {counts.children}C
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-700">
                      ${Number(booking.total_price).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`
                        capitalize px-2 py-0.5 rounded-md text-[10px] font-bold
                        ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          booking.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                          'bg-red-50 text-red-700 border-red-100'}
                      `}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            {updatingId === booking.id ? (
  <Loader2 className="animate-spin h-3 w-3" />
) : (
  <MoreVertical className="h-3 w-3 text-slate-400" />
)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Manage</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {booking.status === 'pending' && (
                            <>
                              <DropdownMenuItem 
                                className="text-emerald-600 focus:text-emerald-700"
                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              >
                                <FaCheck className="mr-2 h-3 w-3" /> Accept
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-700"
                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              >
                                <FaTimes className="mr-2 h-3 w-3" /> Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/bookings/${booking.id}`)}>
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">
            Page {bookings.current_page} of {bookings.last_page} · Total {bookings.total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(bookings.current_page - 1)}
              disabled={bookings.current_page === 1 || isPending}
            >
              <FaChevronLeft className="h-3 w-3 mr-1" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(bookings.current_page + 1)}
              disabled={bookings.current_page === bookings.last_page || isPending}
            >
              Next <FaChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}