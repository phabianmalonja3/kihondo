import { CheckCircle2, Calendar, Users, ArrowLeft, Ticket, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CopyReference from "@/components/web/CopyReference";
 // Import the client component

export default async function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) return <div className="text-center py-20 font-bold">Error loading booking.</div>;

  const booking = await res.json();

  if (!booking) {
    return <div className="text-center py-20">Booking not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl animate-in fade-in duration-500">
      <div className="text-center mb-8 space-y-2">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Confirmation sent to <span className="font-semibold text-emerald-700">{booking.email}</span>
        </p>
      </div>

      <Card className="border-t-8 border-t-emerald-600 shadow-2xl overflow-hidden rounded-2xl">
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">{booking.package.name}</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-medium">
                <Ticket className="h-3.5 w-3.5" />
                <span>INTERNAL ID: {booking.id.split('-')[0].toUpperCase()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Status</p>
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-black uppercase">
                {booking.status}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side: Reference and Details */}
            <div className="p-8 space-y-8 border-r border-slate-100">
              
              {/* THE COPY REFERENCE COMPONENT */}
              <CopyReference reference={booking.booking_reference} />

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-50 rounded-lg"><Calendar className="h-5 w-5 text-emerald-600" /></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Travel Date</p>
                    <p className="font-bold text-slate-800">
                        {new Date(booking.travel_date).toLocaleDateString('en-US', { dateStyle: 'full' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-50 rounded-lg"><Users className="h-5 w-5 text-emerald-600" /></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Travelers</p>
                    <p className="font-bold text-slate-800">
                      {booking.guest_counts.adults} Adults
                      {booking.guest_counts.youth > 0 && `, ${booking.guest_counts.youth} Youth`}
                      {booking.guest_counts.children > 0 && `, ${booking.guest_counts.children} Kids`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Payment Summary */}
            <div className="p-8 bg-slate-50/30 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                    <ReceiptText className="h-3 w-3" /> Price Breakdown
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium">${(Number(booking.total_price) - 15).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Service Fee</span>
                    <span className="font-medium">$15.00</span>
                  </div>
                </div>
                <div className="pt-4 border-t-2 border-dashed border-slate-200">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-slate-900">Total Paid</span>
                    <span className="text-3xl font-black text-emerald-700 leading-none">
                        ${Number(booking.total_price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-[10px] text-slate-400 leading-relaxed italic border-l-2 border-emerald-200 pl-3">
                Please save your reference code. You will need it to track your safari status or make changes.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="rounded-xl h-12 px-6 border-slate-200 hover:bg-slate-50">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
        <Button className="bg-emerald-700 hover:bg-emerald-800 rounded-xl h-12 px-8 font-bold shadow-lg shadow-emerald-700/20">
          Download PDF Receipt
        </Button>
      </div>
    </div>
  );
}