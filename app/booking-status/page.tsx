"use client";

import React, { useState } from "react";
import { 
  FaTicketAlt, 
  FaCalendarAlt, 
  FaUserFriends, 

  FaSearch, 
  FaExclamationCircle 
} from "react-icons/fa";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BookingStatus = () => {
    const [reference, setReference] = useState("");
    const [statusData, setStatusData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cancelLoading, setCancelLoading] = useState(false);

    const handleCheckStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setStatusData(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking?reference=${reference.toUpperCase()}`);
            const data = await res.json();

            if (res.ok) {
                setStatusData(data);
                toast.success("Booking retrieved successfully!");
            } else {
                const msg = data.message || "Booking reference not found.";
                setError(msg);
                toast.error(msg);
            }
        } catch (err) {
            setError("Connectivity issue. Please check your internet.");
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async () => {
        if (!statusData) return;
        setCancelLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${statusData.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "cancelled" }), 
            });

            if (res.ok) {
                setStatusData({ ...statusData, status: "cancelled" });
                toast.success("Your safari has been cancelled.");
            } else {
                const data = await res.json();
                toast.error(data.message || "Cancellation failed.");
            }
        } catch (err) {
            toast.error("Failed to reach server.");
        } finally {
            setCancelLoading(false);
        }
    };

    const canCancel = () => {
        if (!statusData) return false;
        const travelDate = new Date(statusData.travel_date).getTime();
        const now = new Date().getTime();
        const hoursUntilTravel = (travelDate - now) / (1000 * 60 * 60);

        // Logic: Cannot cancel if Admin has confirmed, or if it's already done/cancelled
        const isEligibleStatus = 
            statusData.status.toLowerCase() !== "completed" && 
            statusData.status.toLowerCase() !== "cancelled" &&
            statusData.status.toLowerCase() !== "confirmed"; 
        
        return isEligibleStatus && hoursUntilTravel > 24;
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
                        <FaSearch className="text-emerald-700 text-2xl" />
                    </div>
                    <h1 className="text-4xl font-black text-emerald-900 tracking-tight">Track Your Safari</h1>
                    <p className="text-gray-500 mt-2">Manage your adventure with your reference code.</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
                    <form onSubmit={handleCheckStatus} className="space-y-6">
                        <input 
                            type="text" 
                            placeholder="MIK-XXXXX"
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition uppercase font-mono text-center text-lg"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            required
                        />
                        <button 
                            disabled={loading}
                            className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-lg disabled:bg-gray-300"
                        >
                            {loading ? "Searching..." : "Find My Booking"}
                        </button>
                    </form>
                    {error && <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 text-sm"><FaExclamationCircle />{error}</div>}
                </div>

                {statusData && (
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-50">
                        <div className="bg-emerald-900 p-8 text-white relative">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusData.status.toLowerCase() === 'cancelled' ? 'bg-red-600 border-red-500' : 'bg-emerald-800 border-emerald-700'}`}>
                                    Status: {statusData.status}
                                </span>
                                <span className="text-emerald-300 font-mono text-sm">{statusData.booking_reference}</span>
                            </div>
                            <h2 className="text-3xl font-bold">{statusData.package?.name}</h2>
                        </div>

                        <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <FaCalendarAlt size={12}/> <span className="text-[10px] uppercase font-bold tracking-tighter">Travel Date</span>
                                </div>
                                <p className="font-bold text-gray-800">{new Date(statusData.travel_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <FaUserFriends size={12}/> <span className="text-[10px] uppercase font-bold tracking-tighter">Group Size</span>
                                </div>
                                <p className="font-bold text-gray-800">{Number(statusData.guest_counts.adults) + Number(statusData.guest_counts.youth) + Number(statusData.guest_counts.children)} People</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <FaTicketAlt size={12}/> <span className="text-[10px] uppercase font-bold tracking-tighter">Total Price</span>
                                </div>
                                <p className="font-bold text-emerald-700 text-xl">${statusData.total_price}</p>
                            </div>
                        </div>

                        <div className="px-8 pb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-6">
                            <div className="text-[11px] text-gray-400">
                                <p>Adults: {statusData.guest_counts.adults} | Youth: {statusData.guest_counts.youth} | Kids: {statusData.guest_counts.children}</p>
                                <p className="mt-1 font-mono uppercase">UID: {statusData.id}</p>
                            </div>

                            <div className="flex gap-3 w-full sm:w-auto">
                                {canCancel() ? (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="flex-1 sm:flex-none bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition text-sm">
                                                Cancel Booking
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-3xl border-none">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-2xl font-black text-gray-900">Cancel Safari?</AlertDialogTitle>
                                                <AlertDialogDescription className="text-gray-500">
                                                    Are you sure you want to cancel booking <span className="font-bold text-gray-800">{statusData.booking_reference}</span>? 
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="mt-4">
                                                <AlertDialogCancel className="rounded-xl border-gray-200">Keep Booking</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleCancelBooking} className="bg-red-600 text-white hover:bg-red-700 rounded-xl font-bold" disabled={cancelLoading}>
                                                    {cancelLoading ? "Processing..." : "Confirm Cancellation"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ) : (
                                    statusData.status.toLowerCase() !== "cancelled" && (
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-amber-600 bg-amber-50 px-4 py-3 rounded-xl font-bold italic">
                                                {statusData.status.toLowerCase() === "confirmed" ? "Booking Confirmed" : "Cancellation Locked"}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingStatus;