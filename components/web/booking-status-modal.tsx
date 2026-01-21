"use client";

import React, { useState, useEffect } from "react";
import { 
  FaCalendarAlt, FaUserFriends, 
  FaSearch, FaExclamationCircle, FaMapMarkerAlt, FaArrowRight, FaSuitcaseRolling, FaTrashAlt, FaClock
} from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const BookingStatusModal = ({ children }: { children: React.ReactNode }) => {
  const [reference, setReference] = useState("");
  const [statusData, setStatusData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  // Load the last successful reference from local storage on mount
  useEffect(() => {
    const savedRef = localStorage.getItem("last_booking_ref");
    if (savedRef) setReference(savedRef);
  }, []);

  const handleCheckStatus = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!reference) return;

    setLoading(true);
    setError(""); 
    setStatusData(null); 

    try {
      // Direct fetch from your database via API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking?reference=${reference.toUpperCase()}`);
      const data = await res.json();

      if (res.ok && data) {
        setStatusData(data);
        // Save to local storage to "prevent scan every time" as per your requirement
        localStorage.setItem("last_booking_ref", reference.toUpperCase());
        toast.success("Trip details synced with database.");
      } else {
        setError(data.message || "Booking reference not found in our records.");
      }
    } catch (err) {
      setError("Database connection error. Please try again.");
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
        toast.success("Trip successfully cancelled.");
      } else {
        toast.error("Database update failed.");
      }
    } catch (err) {
      toast.error("Failed to reach server.");
    } finally {
      setCancelLoading(false);
    }
  };

  // IMPROVED: Only check if it's already cancelled. 
  // No more 24-hour limit. If they booked 1 hour ago, they can cancel now.
  const canCancel = () => {
    return statusData && statusData.status.toLowerCase() !== "cancelled";
  };

  return (
    <Dialog onOpenChange={(isOpen) => { if(!isOpen) setError(""); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl max-h-[95vh] overflow-y-auto rounded-[2rem] p-0 border-none bg-slate-50 shadow-2xl">
        <div className="p-6 md:p-10">
          <DialogHeader className="items-center text-center mb-8">
            <div className="w-16 h-16 bg-emerald-900 flex items-center justify-center rounded-2xl rotate-3 shadow-lg mb-4">
              <FaSuitcaseRolling className="text-white text-2xl -rotate-3" />
            </div>
            <DialogTitle className="text-3xl font-black text-emerald-950 tracking-tight">Trip Manager</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCheckStatus} className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8 flex items-center">
            <input 
              type="text" 
              placeholder="ENTER REFERENCE"
              className="flex-1 p-4 bg-transparent outline-none uppercase font-mono font-bold text-emerald-900"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
            <button type="submit" disabled={loading || !reference} className="bg-emerald-900 text-white p-4 rounded-xl active:scale-95">
              {loading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaArrowRight />}
            </button>
          </form>

          {error && (
            <div className="bg-white p-8 rounded-[2rem] border border-red-100 shadow-xl text-center">
              <FaExclamationCircle className="text-red-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-800">No Booking Found</h3>
              <p className="text-slate-500 text-sm mb-6">{error}</p>
            </div>
          )}

          {statusData && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl">
                <div className="bg-emerald-900 p-6 text-white flex justify-between items-center">
                  <h3 className="font-mono font-bold tracking-tighter">{statusData.booking_reference}</h3>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 ${
                    statusData.status.toLowerCase() === 'cancelled' ? 'bg-red-500 border-red-400' : 'bg-emerald-800 border-emerald-600'
                  }`}>
                    {statusData.status}
                  </div>
                </div>

                <div className="p-8">
                  <h2 className="text-2xl font-black text-emerald-950 mb-6">{statusData.package?.name}</h2>

                  <div className="grid grid-cols-2 gap-8 py-6 border-y border-dashed border-slate-200">
                    <div>
                      <span className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase"><FaCalendarAlt /> Date</span>
                      <p className="font-black text-slate-800">
                        {new Date(statusData.travel_date).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase"><FaUserFriends /> Guests</span>
                      <p className="font-black text-slate-800">
                        {Number(statusData.guest_counts.adults) + Number(statusData.guest_counts.youth)} People
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <p className="text-3xl font-black text-emerald-900">${statusData.total_price}</p>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <QRCodeCanvas value={statusData.booking_reference} size={60} />
                    </div>
                  </div>

                  {/* CANCEL AREA - Always visible if trip is active */}
                  <div className="mt-8 pt-6 border-t">
                    {canCancel() ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="w-full flex items-center justify-center gap-2 font-black uppercase text-red-500 bg-red-50 py-4 rounded-xl hover:bg-red-100 transition-all">
                            <FaTrashAlt /> Cancel My Trip Now
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[2rem]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will update your booking status to **Cancelled** in our database immediately.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">Keep It</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCancelBooking} className="bg-red-600 rounded-xl">Confirm Cancellation</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <div className="w-full bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold text-xs uppercase">
                        This trip has been cancelled
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};