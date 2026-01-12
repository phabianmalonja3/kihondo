import { CheckCircle2, Calendar, Users, Mail, MapPin, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default async function SuccessPage({params}:{params:Promise<{id: string}>}) {

  const {id} = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  // return res.json();
  const booking = await res.json()
  if (!booking) {
    return <div className="text-center py-20">Booking not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="text-center mb-8 space-y-2">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          A confirmation email has been sent to <span className="font-medium text-foreground">{booking.email}</span>
        </p>
      </div>

      <Card className="border-t-8 border-t-emerald-600 shadow-xl overflow-hidden">
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">{booking.package.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Order ID: {booking.id.split('-')[0].toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase font-bold text-muted-foreground">Status</p>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {booking.status}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side: Details */}
            <div className="p-6 space-y-6 border-r border-slate-100">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Travel Date</p>
                  <p className="text-muted-foreground">{new Date(booking.travel_date).toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Travelers</p>
                  <p className="text-muted-foreground">
                    {booking.guest_counts.adults} Adults
                    {booking.guest_counts.youth > 0 && `, ${booking.guest_counts.youth} Youth`}
                    {booking.guest_counts.children > 0 && `, ${booking.guest_counts.children} Children`}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Summary */}
            <div className="p-6 bg-slate-50/50 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${(Number(booking.total_price) - 15).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>$15.00</span>
                </div>
                <div className="pt-2 border-t flex justify-between font-bold text-lg">
                  <span>Total Paid</span>
                  <span className="text-emerald-700">${Number(booking.total_price).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
        <Button className="bg-emerald-700 hover:bg-emerald-800">
          Download PDF Receipt
        </Button>
      </div>
    </div>
  );
}