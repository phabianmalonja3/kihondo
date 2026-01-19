"use client";

import React, { useState, useEffect } from "react";
import { 
  FaTicketAlt, FaCalendarAlt, FaUserFriends, 
  FaSearch, FaExclamationCircle, FaMapMarkerAlt, FaArrowRight 
} from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react"; // Import the QR generator
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking?reference=${reference.toUpperCase()}`);
      const data = await res.json();

      if (res.ok) {
        setStatusData(data);
        localStorage.setItem("last_booking_ref", reference.toUpperCase());
        toast.success("Booking retrieved!");
      } else {
        setError(data.message || "Booking reference not found.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
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
        toast.success("Safari cancelled.");
      }
    } catch (err) {
      toast.error("Server connection failed.");
    } finally {
      setCancelLoading(false);
    }
  };

  const canCancel = () => {
    if (!statusData || statusData.status.toLowerCase() === "cancelled") return false;
    const travelDate = new Date(statusData.travel_date).getTime();
    return (travelDate - Date.now()) / (1000 * 60 * 60) > 24;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl max-h-[95vh] overflow-y-auto rounded-[2rem] p-0 border-none bg-slate-50 shadow-2xl">
        <div className="p-6 md:p-10">
          <DialogHeader className="items-center text-center mb-8">
            <div className="w-16 h-16 bg-emerald-900 flex items-center justify-center rounded-2xl rotate-3 shadow-lg mb-4">
              <FaTicketAlt className="text-white text-2xl -rotate-3" />
            </div>
            <DialogTitle className="text-3xl font-black text-emerald-950 tracking-tight">Safari Manager</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCheckStatus} className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8 flex items-center">
            <input 
              type="text" 
              placeholder="REFERENCE (MIK-XXXXX)"
              className="flex-1 p-4 bg-transparent outline-none uppercase font-mono font-bold text-emerald-900 placeholder:text-slate-300"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
            <button type="submit" disabled={loading || !reference} className="bg-emerald-900 text-white p-4 rounded-xl">
              {loading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaArrowRight />}
            </button>
          </form>

          {statusData && (
            <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl">
                {/* Voucher Header */}
                <div className="bg-emerald-900 p-6 text-white flex justify-between items-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-300 mb-1">Official Voucher</p>
                    <h3 className="font-mono font-bold">{statusData.booking_reference}</h3>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 ${
                    statusData.status.toLowerCase() === 'cancelled' ? 'bg-red-500 border-red-400' : 'bg-emerald-800 border-emerald-600'
                  }`}>
                    {statusData.status}
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-emerald-700 mb-1">
                      <FaMapMarkerAlt size={12} />
                      <span className="text-[10px] uppercase font-black">Experience</span>
                    </div>
                    <h2 className="text-2xl font-black text-emerald-950">{statusData.package?.name}</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-8 py-6 border-y border-dashed border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 text-slate-400 mb-1 text-[10px] font-bold uppercase"><FaCalendarAlt /> Date</div>
                      <p className="font-black text-slate-800 text-sm">
                        {new Date(statusData.travel_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-slate-400 mb-1 text-[10px] font-bold uppercase"><FaUserFriends /> Guests</div>
                      <p className="font-black text-slate-800 text-sm">
                        {Number(statusData.guest_counts.adults) + Number(statusData.guest_counts.youth) + Number(statusData.guest_counts.children)} People
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Total Paid</p>
                      <p className="text-3xl font-black text-emerald-900">${statusData.total_price}</p>
                      
                      {/* Cancel Button */}
                      {canCancel() && (
                        <div className="mt-4">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors">
                                Request Cancellation
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-[2rem]">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Trip?</AlertDialogTitle>
                                <AlertDialogDescription>Confirm cancellation for {statusData.booking_reference}.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Back</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCancelBooking} className="bg-red-600 rounded-xl">Confirm</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>

                    {/* QR CODE SECTION */}
                    <div className="flex flex-col items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <QRCodeCanvas 
                        value={statusData.booking_reference} 
                        size={80}
                        level={"H"}
                        includeMargin={false}
                        imageSettings={{
                            src: "/images/logo.png", // Optional: put your small logo icon here
                            x: undefined,
                            y: undefined,
                            height: 16,
                            width: 16,
                            excavate: true,
                          }}
                      />
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Scan to Verify</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Ticket Circles */}
              <div className="absolute top-[108px] -left-3 w-6 h-6 bg-slate-50 rounded-full" />
              <div className="absolute top-[108px] -right-3 w-6 h-6 bg-slate-50 rounded-full" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};