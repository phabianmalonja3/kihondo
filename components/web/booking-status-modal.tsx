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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export const BookingStatusModal = ({ children }: { children: React.ReactNode }) => {
    const [reference, setReference] = useState("");
    const [statusData, setStatusData] = useState(null);
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
        const isEligibleStatus = 
            statusData.status.toLowerCase() !== "completed" && 
            statusData.status.toLowerCase() !== "cancelled" &&
            statusData.status.toLowerCase() !== "confirmed"; 
        return isEligibleStatus && hoursUntilTravel > 24;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none bg-[#f8fafc]">
                <div className="p-6 md:p-8">
                    <DialogHeader className="text-center mb-6">
                        <div className="inline-block p-3 bg-emerald-100 rounded-full mx-auto mb-4">
                            <FaSearch className="text-emerald-700 text-xl" />
                        </div>
                        <DialogTitle className="text-3xl font-black text-emerald-900 tracking-tight text-center">
                            Track Your Safari
                        </DialogTitle>
                        <p className="text-gray-500 text-sm">Manage your adventure with your reference code.</p>
                    </DialogHeader>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                        <form onSubmit={handleCheckStatus} className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="MIK-XXXXX"
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition uppercase font-mono text-center text-lg"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                required
                            />
                            <button 
                                disabled={loading}
                                className="w-full bg-emerald-900 text-white py-4 rounded-xl font-bold text-md hover:bg-emerald-800 transition-all disabled:bg-gray-300"
                            >
                                {loading ? "Searching..." : "Find My Booking"}
                            </button>
                        </form>
                        {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 text-xs"><FaExclamationCircle />{error}</div>}
                    </div>

                    {statusData && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-50 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-emerald-900 p-6 text-white">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${statusData.status.toLowerCase() === 'cancelled' ? 'bg-red-600 border-red-500' : 'bg-emerald-800 border-emerald-700'}`}>
                                        {statusData.status}
                                    </span>
                                    <span className="text-emerald-300 font-mono text-xs">{statusData.booking_reference}</span>
                                </div>
                                <h2 className="text-xl font-bold">{statusData.package?.name}</h2>
                            </div>

                            <div className="p-6 grid grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <FaCalendarAlt size={10}/> <span className="text-[9px] uppercase font-bold">Date</span>
                                    </div>
                                    <p className="font-bold text-gray-800 text-sm">{new Date(statusData.travel_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <FaUserFriends size={10}/> <span className="text-[9px] uppercase font-bold">Guests</span>
                                    </div>
                                    <p className="font-bold text-gray-800 text-sm">{Number(statusData.guest_counts.adults) + Number(statusData.guest_counts.youth) + Number(statusData.guest_counts.children)} People</p>
                                </div>
                            </div>

                            <div className="px-6 pb-6 flex justify-between items-center border-t pt-4">
                                <p className="font-bold text-emerald-700 text-lg">${statusData.total_price}</p>
                                
                                {canCancel() ? (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition text-xs">
                                                Cancel
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-3xl border-none">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-xl font-black">Cancel Safari?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cancel booking <span className="font-bold text-gray-800">{statusData.booking_reference}</span>?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="rounded-xl">Back</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleCancelBooking} className="bg-red-600 rounded-xl" disabled={cancelLoading}>
                                                    {cancelLoading ? "Wait..." : "Yes, Cancel"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ) : (
                                    statusData.status.toLowerCase() !== "cancelled" && (
                                        <span className="text-[9px] text-amber-600 font-bold uppercase italic">Locked</span>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};